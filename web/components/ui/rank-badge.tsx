import { Badge } from "./badge";

interface RankBadgeProps {
  className?: string;
  points: number;
}

const RankBadge = ({ points, className, ...props }: RankBadgeProps) => {
  const getRank = (points: number) => {
    if (points >= 500) {
      return "Supreme";
    } else if (points >= 300) {
      return "Elite";
    } else if (points > 140) {
      return "Mid";
    } else {
      return "Newborn";
    }
  };

  const rank = getRank(points);

  return (
    <Badge variant={rank} className={className} {...props}>
      {rank}
    </Badge>
  );
};

export default RankBadge;
