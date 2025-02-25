import { useQuery } from "@tanstack/react-query";
import { getUserPoints } from "../api/user";

// Helper function to format points
const formatPoints = (points: number): string => {
  if (points >= 1_000_000_000) {
    return (points / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  }
  if (points >= 1_000_000) {
    return (points / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  }
  if (points >= 1_000) {
    return (points / 1_000).toFixed(2).replace(/\.00$/, "") + "K";
  }
  return points.toString();
};

export function useUserPoints(options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: ["user-points"],
    queryFn: async () => {
      const { points } = await getUserPoints();
      return formatPoints(points); // Apply formatting
    },
    refetchInterval: options?.refetchInterval ?? 5000,
    refetchIntervalInBackground: false,
  });
}
