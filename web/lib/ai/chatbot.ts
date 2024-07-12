import envVar from "@/envVar";
import { ChatAnthropic, ChatAnthropicCallOptions } from "@langchain/anthropic";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { DocumentInterface } from "@langchain/core/documents";
import { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import { HumanMessage, AIMessageChunk } from "@langchain/core/messages";
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import {
  Runnable,
  RunnableConfig,
  RunnableLambda,
  RunnableSequence,
} from "@langchain/core/runnables";
import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { ToolExecutor, ToolNode } from "@langchain/langgraph/prebuilt";
import { Index } from "@upstash/vector";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrieverTool } from "langchain/tools/retriever";
import { traceable } from "langsmith/traceable";
import { wrapSDK } from "langsmith/wrappers";

interface QuestionClassification {
  question: string;
  sentiment: "venting" | "talk" | "question";
}

const promptString = {
  questionRefinement: `
  You are part of a therapist team that helps online gambling addicts recover from their addiction. Your task is to contextualize the question given by addicts to based on the conversation history between your team and the addict.
  -----
  The following are the log of your team's conversation, from the oldest to the latest, with the gambler you're talking to and assisting:
  {chatMessageHistory}
  -----
  The online gambling addict's question is the following:
  {question}
  -----
  Your task is to improve the question by contextualizing the question based on your team's conversation history with the gambler. Make it so that the question can be understood even without knowing the conversation history.

  In contextualizing the question, please still be succinct and to the point.

  Respond ONLY with the improved question:
  `,
  questionClassification: `
  You are a bot responsible to do sentiment analysis on a statement given by a person. You have been given the following statement:
  {question}
  -----
  You may classify the statement into three type:
  - "venting" // the person is just telling you about their struggle
  - "question" // the person asked you something
  - "talk" // the person is just making small talk
  
  -----
  IF AND ONLY IF the statement is a question. You must also process the question with the following instruction:
  - Rephrase and reword that question to be more expansive
  - Contextualize the question based on the following conversation history between you and the person, from the oldest to the latest. Make it so that the question can be understood even without knowing the conversation history.
  -----
  Prior conversation history:
  {chatMessageHistory}

  -----
  Output strictly only the following JSON format:
  {{
    "question" : string // if the statement was a question, put the processed question here. Otherwise, put in the given statement VERBATIM WITHOUT ANY MODIFICATION.
    "sentiment" : string // the classification for the statement that you have given
  }}

  ----
  `,
  answer: `
  You are a therapist that is tasked to help people recovering from online gambling addiction. Those recovering addict is currently talking to you in their path to recovery.
  -------
  The addict's background is as follows:
  {gamblingStory}

  The addict's have been gambling for {gamblingDuration} months.

  The addict's wanted to stop because of the following reason:
  {whyStop}
  -------
  The following are the log of your conversation, from the oldest to the latest, with the gambler you're talking to and assisting:
  {chatMessageHistory}
  -------
  The gambler just replied to your most recent answer.
  Your input #1 is what the gambler you're treating has just replied to you:
  {question}

  Your input #2 is the sentiment classification of what the gambler just replied to you:
  {sentiment}

  The sentiment could only be three of the following: "venting", "question", "talk".
  -------
  You now must answer the gambler's reply. Pay attention to the history and understand the context of the conversation when giving your reply.
  The way that you reply is ALSO dependent on your input #2, the sentiment.

  # Case 1: sentiment is "venting"
  Just lend your ear to the gambler. You don't need to put forth any factual information. Give advice ONLY WHEN appropriate. 

  # Case 2: sentiment is "talk"
  Just respond with the gambler normally as another person. For example, when they said "Hi", you may respond with a "Hello".

  # Case 3: sentiment is "question"
  Answer that question using the following excerpts from various documents that are relevant to the question:
  {context}

  -------
  In doing your task, you must act as a helpful and patient therapist with years of experience who understands clearly the suffering of that recovering gambler. You may only answer as long as 5 sentences.

  If you do not know the answer, answer "Sorry, I cannot answer that question".

  Respond only with your answer:
`,
};

export type ChatParameter = {
  question: string;
  gamblingStory: string;
  gamblingDuration: string;
  whyStop: string;
  chatMessageHistory: string;
};

export type RefinementOutput = ChatParameter & {
  context: DocumentInterface<Record<string, any>>[];
  sentiment: string;
};

export class Chatbot {
  private static instance: Chatbot;
  private store: UpstashVectorStore;
  private retriever: VectorStoreRetriever<UpstashVectorStore>;
  private classificationChain: Runnable<
    ChatParameter,
    QuestionClassification,
    RunnableConfig
  >;
  private composedChain?: Runnable<ChatParameter, string, RunnableConfig>;
  private answerChain?: RunnableSequence<Record<string, unknown>, string>;

  private constructor() {
    console.log("Instantiating index");
    const indexWithCredentials = new Index({
      url: envVar.upstashVectorRestURL,
      token: envVar.upstashVectorRestToken,
    });

    // const index = pc.index(envVar.pineconeIndex);
    console.log("Instantiating embeddings");
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: envVar.huggingFaceToken,
      //   model: "sentence-transformers/all-MiniLM-L6-v2",
      model: "intfloat/multilingual-e5-large",
    });

    console.log("Instantiating store");
    const UpstashVector = new UpstashVectorStore(embeddings, {
      index: indexWithCredentials,
    });

    this.store = UpstashVector;
    console.log("Instantiating retriever");
    const retriever = this.store.asRetriever({ k: 5 });
    this.retriever = retriever;

    console.log("Constructing LLM");

    const llmClassification = wrapSDK(
      new ChatAnthropic({
        model: "claude-3-5-sonnet-20240620",
        temperature: 0.4,
      }),
    );

    console.log("Constructing prompt template");

    const classificationPrompt = PromptTemplate.fromTemplate(
      promptString.questionClassification,
    );

    console.log("Constructing chains");

    const classificationChain = classificationPrompt
      .pipe(llmClassification)
      .pipe(new JsonOutputParser<QuestionClassification>());

    this.classificationChain = classificationChain;
  }

  static async getInstance() {
    if (!Chatbot.instance) {
      console.log("Constructing the chatbot");
      Chatbot.instance = new Chatbot();
      Chatbot.instance.composeChain();
    }

    console.log("App:");
    return Chatbot.instance;
  }

  private async composeChain() {
    const answerPrompt = PromptTemplate.fromTemplate(promptString.answer);

    const llmAnswer = wrapSDK(
      new ChatAnthropic({
        model: "claude-3-5-sonnet-20240620",
        temperature: 0.2,
      }),
    );

    this.answerChain = await createStuffDocumentsChain({
      llm: llmAnswer,
      prompt: answerPrompt,
      outputParser: new StringOutputParser(),
    });

    const composedChain = new RunnableLambda({
      func: async ({
        gamblingDuration,
        chatMessageHistory,
        gamblingStory,
        question,
        whyStop,
      }: ChatParameter) => {
        const result = await this.classificationChain.invoke({
          gamblingDuration,
          chatMessageHistory,
          gamblingStory,
          question,
          whyStop,
        });
        const retrievedDocs = await this.retriever.invoke(result.question);
        return {
          question: result.question,
          gamblingStory,
          gamblingDuration,
          whyStop,
          context: retrievedDocs,
          sentiment: result.sentiment,
          chatMessageHistory,
        } as RefinementOutput;
      },
    }).pipe(this.answerChain);

    this.composedChain = composedChain;
  }

  public async askUnwrapped(
    input: ChatParameter,
    chain: Runnable<ChatParameter, string, RunnableConfig>,
  ) {
    return await chain.invoke(input);
  }

  public async ask(input: ChatParameter) {
    if (!this.composedChain) {
      throw new Error("Composed chain not formed!");
    }
    return traceable(this.askUnwrapped)(input, this.composedChain);
  }
}
