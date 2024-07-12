import { AddDebtButton } from "./add-debt-button";
import { AddPaymentButton } from "./add-payment-button";
import { DebtAnalyzer } from "./debt-analyzer";
import { TransactionTable } from "./transaction-table";
import { Separator } from "@/components/ui/separator";
import { formatIDR } from "@/lib/utils";
import { mockDebtManagerTransactions } from "@/mock-data/transaction";

export default function DebtManagerPage() {
  // Mock get data from query
  const transactions = mockDebtManagerTransactions;

  return (
    <main className="flex flex-col p-24 items-center">
      <section className="flex w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <header>
          <h1 className="text-5xl font-extrabold text-primary-black">
            AI Debt Analyzer
          </h1>
          <h2 className="mt-2 text-2xl font-semibold text-primary-purple">
            Analyze your online gambling debt and payment history!
          </h2>
        </header>

        <div className="flex flex-row justify-between items-center">
          {/* Currency */}
          <div className="flex flex-row items-center gap-8 h-28">
            {/* Debt */}
            <div>
              <h3 className="text-2xl font-bold text-destructive">Debt</h3>
              <p className="text-4xl mt-2 font-extrabold text-primary-black">
                {formatIDR(1000000)}
              </p>
            </div>

            <Separator orientation="vertical" />

            {/* Paid */}
            <div>
              <h3 className="text-2xl font-bold text-green-500">Payment</h3>
              <p className="text-4xl mt-2 font-extrabold text-primary-black">
                {formatIDR(500000)}
              </p>
            </div>
          </div>

          {/* Button Modal */}
          <div className="space-x-4">
            {/* Add payment*/}
            <AddPaymentButton />

            {/* Add debt */}
            <AddDebtButton />
          </div>
        </div>

        {/* Table */}
        <TransactionTable transactions={transactions} />

        {/* Analyze component */}
        <DebtAnalyzer />
      </section>
    </main>
  );
}
