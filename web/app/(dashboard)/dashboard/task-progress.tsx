import { Progress } from "@/components/ui/progress";

interface TaskProgressProps {
  points: number;
}
const TaskProgress: React.FC<TaskProgressProps> = ({ points }) => {
  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-400 bg-[#FAFAFA]">
      <div className="m-5 flex w-fit rounded-[3px] border border-neutral-400 bg-[#FFFFFF] p-3 text-3xl text-primary-purple">
        {points}pt
      </div>
      <div className="mt-auto px-10 py-20">
        <Progress value={points} checkpoints={[0, 75, 200]} maxValue={200} />
      </div>
    </div>
  );
};

export default TaskProgress;
