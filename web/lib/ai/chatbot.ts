import envVar from "@/envVar";
import { ChatAnthropic, ChatAnthropicCallOptions } from "@langchain/anthropic";
import { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import {
  HumanMessage,
  AIMessage,
  AIMessageChunk,
} from "@langchain/core/messages";
import { Runnable } from "@langchain/core/runnables";
import { DynamicStructuredTool } from "@langchain/core/tools";
import {
  CompiledStateGraph,
  END,
  START,
  StateGraph,
  StateGraphArgs,
} from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { wrapSDK } from "langsmith/wrappers";
import { z } from "zod";

// Define the state interface
interface AgentState {
  messages: HumanMessage[];
}

// Define the graph state
const graphState: StateGraphArgs<AgentState>["channels"] = {
  messages: {
    value: (x: HumanMessage[], y: HumanMessage[]) => x.concat(y),
    default: () => [],
  },
};

export class Chatbot {
  private static instance: Chatbot;
  private llm: Runnable<
    BaseLanguageModelInput,
    AIMessageChunk,
    ChatAnthropicCallOptions
  >;
  private toolNode: ToolNode<AgentState>;
  private app: CompiledStateGraph<
    AgentState,
    Partial<AgentState>,
    "tools" | "__start__" | "agent"
  >;

  private constructor() {
    console.log("Constructing tools");

    // Define the tools for the agent to use
    const searchTool = new DynamicStructuredTool({
      name: "search",
      description: "Call to surf the web.",
      schema: z.object({
        query: z.string().describe("The query to use in your search."),
      }),
      func: async ({ query }: { query: string }) => {
        // This is a placeholder for the actual implementation
        if (
          query.toLowerCase().includes("sf") ||
          query.toLowerCase().includes("san francisco")
        ) {
          return "It's 60 degrees and foggy.";
        }
        return "It's 90 degrees and sunny.";
      },
    });

    const tools = [searchTool];

    const toolNode = new ToolNode<AgentState>(tools);
    this.toolNode = toolNode;

    console.log("Constructing LLM");

    const llm = new ChatAnthropic({
      model: "claude-3-5-sonnet-20240620",
      temperature: 0.2,
    }).bindTools(tools);
    this.llm = wrapSDK(llm);

    // Define the function that determines whether to continue or not
    function shouldContinue(state: AgentState): "tools" | typeof END {
      const messages = state.messages;
      const lastMessage = messages[messages.length - 1] as AIMessage;

      // If the LLM makes a tool call, then we route to the "tools" node
      if (lastMessage.tool_calls?.length) {
        return "tools";
      }
      // Otherwise, we stop (reply to the user)
      return END;
    }

    // Define the function that calls the model
    async function callModel(state: AgentState) {
      const messages = state.messages;
      const response = await llm.invoke(messages);

      // We return a list, because this will get added to the existing list
      return { messages: [response] };
    }

    console.log("Constructing workflow");
    // Define a new graph
    const workflow = new StateGraph<AgentState>({ channels: graphState })
      .addNode("agent", callModel)
      .addNode("tools", toolNode)
      .addEdge(START, "agent")
      .addConditionalEdges("agent", shouldContinue)
      .addEdge("tools", "agent");

    // Initialize memory to persist state between graph runs
    const checkpointer = new MemorySaver();

    console.log("Constructing app");
    // Finally, we compile it!
    // This compiles it into a LangChain Runnable.
    // Note that we're (optionally) passing the memory when compiling the graph
    const app = workflow.compile({ checkpointer });
    this.app = app;
    console.log("Setting app");
  }

  static getInstance() {
    if (!Chatbot.instance) {
      console.log("Constructing the chatbot");
      Chatbot.instance = new Chatbot();
    }

    console.log("App:");
    return Chatbot.instance;
  }

  private getLastMessage(state: AgentState) {
    return state.messages[state.messages.length - 1].content;
  }

  public async ask(question: string, session: string) {
    const finalState = await this.app.invoke(
      { messages: [new HumanMessage(question)] },
      { configurable: { thread_id: session } },
    );
    return this.getLastMessage(finalState);
  }
}
