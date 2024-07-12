export interface DebtManagerData {
  id: string;
  type: "relapse" | "payment";
  amount: number;
  note: string;
  createdAt: Date;
}
