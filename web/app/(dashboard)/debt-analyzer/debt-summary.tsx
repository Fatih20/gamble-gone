import { AddDebtButton } from "./add-debt-button";
import { AddPaymentButton } from "./add-payment-button";
import { DebtAnalyzer } from "./debt-analyzer";
import { TransactionTable } from "./transaction-table";
import { Separator } from "@/components/ui/separator";
import { H2, P } from "@/components/ui/typography";
import { getTransactionHistory, getUserDebt } from "@/lib/queries/debt";
import { formatIDR } from "@/lib/utils";
import { Debt } from "@prisma/client";

interface DebtSummaryProps {
  debt: Debt;
}

const DebtSummary: React.FC<DebtSummaryProps> = async ({ debt }) => {
  const transactions = await getTransactionHistory(debt.id);

  return (
    <div className="flex flex-col justify-between items-center gap-10">
      {/* Currency */}
      <div className="flex flex-col gap-5">
        <H2 level="6xl" className="font-extra-bold ">
          Your Current Debt{" "}
          {/* <span className="text-destructive">{debt.debtName}</span> */}
        </H2>
        <P
          className="text-destructive font-extrabold text-center "
          level={"4xl"}
        >
          {formatIDR(debt.amount)}
        </P>
      </div>

      {/* Button Modal */}
      <div className="space-x-4">
        {/* Add payment*/}
        <AddPaymentButton id={debt.id} />

        {/* Add debt */}
        <AddDebtButton id={debt.id} />
      </div>

      {/* Table */}
      <TransactionTable transactions={transactions} />

      {/* Analyze component */}
      <DebtAnalyzer currentDebt={debt.amount} history={transactions} />
    </div>
  );
};

export default DebtSummary;
