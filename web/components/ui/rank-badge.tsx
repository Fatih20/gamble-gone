import { Badge } from "./badge";

const RankBadge = ({ points }: { points: number }) => {
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

  return <Badge variant={rank}>{rank}</Badge>;
};

export default RankBadge;
