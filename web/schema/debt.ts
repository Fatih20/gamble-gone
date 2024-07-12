import * as z from "zod";

export const DebtAnalysisSchema = z.object({
  currentDebt: z.number({ message: "Hutang pejudi harus ada!" }).min(0),
  debtTransactions: z.array(
    z.object({
      // Formatted in month/day/year. Use Date.toLocaleDateString() to convert from Javascript Date object into date.
      date: z.string({ message: "Tanggal transaksi harus ada" }),
      type: z.enum(["payment", "relapse"], {
        message: "Tipe transaksi harus ada!",
      }),
      amount: z
        .number({ message: "Nilai transaksi harus ada!" })
        .min(0, { message: "Nilai transaksi tidak boleh kurang dari 0" }),
    }),
  ),
});

export const AddDebtManagerDataSchema = z.object({
  amount: z.coerce.number({ message: "Transaction mager is required" }).min(0),
  type: z.enum(["DEBT", "PAYMENT"], {
    message: "Transaction type (DEBT or PAYMENT) is required",
  }),
  note: z
    .string({ message: "Note is required" })
    .min(1, { message: "Note is required" })
    .max(64, { message: "Note maximum length is 64 characters." }),
});
