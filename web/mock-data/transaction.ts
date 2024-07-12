import { DebtManagerData } from "@/types/debt-manager";
import { addDays } from "date-fns";

export const mockDebtManagerTransactions: DebtManagerData[] = [
  {
    id: "1",
    type: "relapse",
    amount: 100000,
    note: "Gambling h3h3.com",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "payment",
    amount: 420000,
    note: "Gambling at foo.com",
    createdAt: addDays(new Date(), -1),
  },
  {
    id: "3",
    type: "relapse",
    amount: 100000,
    note: "Gambling at bar.com",
    createdAt: addDays(new Date(), -2),
  },
  {
    id: "4",
    type: "payment",
    amount: 420000,
    note: "Gambling at baz.com",
    createdAt: addDays(new Date(), -3),
  },
  {
    id: "5",
    type: "relapse",
    amount: 100000,
    note: "Gambling at qux.com",
    createdAt: addDays(new Date(), -4),
  },
  {
    id: "6",
    type: "payment",
    amount: 420000,
    note: "Gambling at quux.com",
    createdAt: addDays(new Date(), -5),
  },
  {
    id: "7",
    type: "relapse",
    amount: 100000,
    note: "Gambling at corge.com",
    createdAt: addDays(new Date(), -6),
  },
  {
    id: "8",
    type: "payment",
    amount: 420000,
    note: "Gambling at grault.com",
    createdAt: addDays(new Date(), -7),
  },
  {
    id: "9",
    type: "relapse",
    amount: 100000,
    note: "Gambling at garply.com",
    createdAt: addDays(new Date(), -8),
  },
  {
    id: "10",
    type: "payment",
    amount: 420000,
    note: "Gambling at waldo.com",
    createdAt: addDays(new Date(), -9),
  },
];
