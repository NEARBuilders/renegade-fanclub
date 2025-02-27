"use client";

import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserPoints } from "@/lib/hooks/use-user-points";
import { formatPoints } from "@/lib/utils/format-points";

export function PointsDisplay() {
  const { data: points } = useUserPoints();
  
  return (
    <div className="flex items-center space-x-2 bg-white/10 px-5 py-1.5 rounded-full">
      <FontAwesomeIcon icon={faTrophy} className="h-5 w-5 text-white" />
      <span
        className="text-white text-lg font-normal leading-relaxed font-jersey
        overflow-hidden whitespace-nowrap text-ellipsis relative max-w-[100px]"
        data-testid="user-points"
        title={points ? `Predictions: ${formatPoints(points.predictions)} · Quests: ${formatPoints(points.quests)} · Rank: #${points.rank}` : ""}
      >
        {points !== undefined ? formatPoints(points.total) : ""}
      </span>
    </div>
  );
}
