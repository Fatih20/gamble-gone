import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatIDR } from "@/lib/utils";
import { DebtManagerData } from "@/types/debt-manager";

export function TransactionTable({
  transactions,
}: {
  transactions: DebtManagerData[];
}) {
  return (
    <div className="border rounded-2xl w-full">
      <Table className="text-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No debt payment/relapse found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-semibold",
                    transaction.type === "relapse"
                      ? "text-destructive"
                      : "text-green-500",
                  )}
                >
                  {formatIDR(transaction.amount)}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-semibold",
                    transaction.type === "relapse"
                      ? "text-destructive"
                      : "text-green-500",
                  )}
                >
                  {transaction.type}
                </TableCell>
                <TableCell>{transaction.note}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
