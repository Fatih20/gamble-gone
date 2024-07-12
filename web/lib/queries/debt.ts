import { prisma } from "../prisma";

async function getUserDebt(userId: string) {
  return await prisma.debt.findFirst({
    where: {
      userId: userId,
      isFinished: false,
    },
  });
}

async function getTransactionHistory(id: string) {
  return await prisma.debtManager.findMany({
    where: {
      debtId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export { getUserDebt, getTransactionHistory };
