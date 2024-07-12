import DebtSummary from "./debt-summary";
import NoDebtView from "./no-debt-view";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import { getUserDebt } from "@/lib/queries/debt";
import { mockDebtManagerTransactions } from "@/mock-data/transaction";
import { redirect } from "next/navigation";

export default async function DebtManagerPage() {
  // Mock get data from query

  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }
  const debt = await getUserDebt(session.id);

  return (
    <main className="h-full min-h-screen flex flex-col p-24 items-center">
      <section className="flex h-full w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <header>
          <h1 className="text-5xl font-extrabold text-primary-black">
            AI Debt Analyzer
          </h1>
          <h2 className="mt-2 text-2xl font-semibold text-primary-purple">
            Analyze your online gambling debt and payment history!
          </h2>
        </header>
        {debt == null ? <NoDebtView /> : <DebtSummary debt={debt} />}
      </section>
    </main>
  );
}
