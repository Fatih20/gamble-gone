import NoDebtModal from "./no-debt-modal";
import { H1, H2 } from "@/components/ui/typography";

const NoDebtView = () => {
  return (
    <div className="flex flex-col gap-10 w-full h-full items-center justify-center">
      <H1 className="text- text-center font-extrabold" level={"6xl"}>
        {" "}
        You do not have any debt
      </H1>
      <H2 className="text-bold text-center" level={"4xl"}>
        {" "}
        Keep Up Your Good Work!
      </H2>
      <NoDebtModal />
    </div>
  );
};

export default NoDebtView;
