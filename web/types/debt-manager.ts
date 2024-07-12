export interface DebtManagerData {
  id: string;
  type: "DEBT" | "PAYMENT";
  amount: number;
  note: string;
  createdAt: Date;
}
