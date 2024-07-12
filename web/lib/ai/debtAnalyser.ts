import envVar from "@/envVar";
import { ChatAnthropic } from "@langchain/anthropic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { traceable } from "langsmith/traceable";
import { wrapSDK } from "langsmith/wrappers";

const possibleDebtTransactionTypes = ["payment", "relapse"] as const;

export type DebtTransactionType = (typeof possibleDebtTransactionTypes)[number];

export type DebtTransaction = {
  type: DebtTransactionType;
  amount: number;
  date: string;
};

const promptString = `
You are a data analyst and a financial planner tasked with analyzing the debt payment history owed by gamblers. You'll be given the background of the gambler, the current debt owed by the gambler, and the debt payment history of the gambler.
------
The debt history that you'll be given is a list of transaction, formatted in the following JSON format:
[
    {{
        "date" : string, // the date in which the payment is done. It's formatted in month/day/year
        "amount" : number, // the transaction value in Indonesia Rupiah
        "type" : "payment" | "relapse", // the type of transaction. "payment" means that the gambler paid their debt by the given amount. "relapse" means that the gambler increased their debt by the given amount
    }},
    ...
]

Example:
[
    {{
        "date" : "9/15/2024",
        "amount": 2000000,
        "type": "relapse" 
    }},
    {{
        "date" : "8/15/2024",
        "amount": 1000000,
        "type": "payment"
    }},
    {{
        "date" : "7/15/2024",
        "amount": 500000,
        "type": "payment"
    }},
]

In the given example, the gambler started paying his debt by 500000 IDR and 1000000 IDR on the 15th of July and August of 2024, respectively. But in the next month, the gambler wiped away the gains they have gained in the repayment of their debt by incurring another 2000000 IDR.

------
The gambler has this background:
{background}

The gambler currently has this much debt in Indonesian Rupiah (IDR):
{currentDebt}

The gambler currently has this transaction history on their debt:
{debtTransactions}

------
As a data analyst, you are tasked to analyze the transaction history along with the gambler's current debt within the confine of the gambler's background. Your analysis must contain the following:
- Any discernible and notable pattern on the gambler's transaction history
- Recommendations on how the gambler could do better on the payment of their debt so that it can be paid quicker. PAY ATTENTION to the gambler's background when giving your recommendation.

As these are gambling addicts who are trying to recover, be kind, but straightforward in making your analysis. Be concise and straight to the point, avoid any fluff or filler in your analysis! Limit your output to a maximum of 10 sentences.

`;

export class DebtAnalyser {
  private static instance: DebtAnalyser;
  private llm: ChatAnthropic;
  private prompt: PromptTemplate;
  private chain: Runnable<any, string, RunnableConfig>;

  private constructor() {
    const llm = new ChatAnthropic({
      model: "claude-3-5-sonnet-20240620",
      temperature: 0.4,
      anthropicApiKey: envVar.anthropicAPIKey,
      streaming: true,
    });
    this.llm = wrapSDK(llm);
    const prompt = PromptTemplate.fromTemplate(promptString);
    this.prompt = prompt;
    const chain = this.prompt.pipe(this.llm).pipe(new StringOutputParser());
    this.chain = chain;
    console.log("Done construction");
  }

  public static getInstance(): DebtAnalyser {
    console.log("Prev instance:");
    console.log(DebtAnalyser.instance);
    if (!DebtAnalyser.instance) {
      DebtAnalyser.instance = new DebtAnalyser();
    }
    console.log("");
    console.log("After instance:");
    console.log(DebtAnalyser.instance);
    return DebtAnalyser.instance;
  }

  private async askUnwrapped(
    currentDebt: number,
    debtTransactions: DebtTransaction[],
    background: string,
    chain: Runnable<any, string, RunnableConfig>,
  ) {
    return await chain.stream({
      currentDebt,
      debtTransactions: JSON.stringify(debtTransactions),
      background,
    });
  }

  public async ask(
    currentDebt: number,
    debtTransactions: DebtTransaction[],
    background: string,
  ) {
    const res = await traceable(this.askUnwrapped)(
      currentDebt,
      debtTransactions,
      background,
      this.chain,
    );
    return res;
  }
}
