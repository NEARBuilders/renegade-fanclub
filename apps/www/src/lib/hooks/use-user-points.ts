import { useQuery } from "@tanstack/react-query";
import { getUserPoints } from "../api/user";
import { UserPointsResponse } from "@renegade-fanclub/types";

export type UserPoints = UserPointsResponse["points"];

export function useUserPoints() {
  return useQuery<UserPoints>({
    queryKey: ["user-points"],
    queryFn: async () => {
      const response = await getUserPoints();
      return response.points;
    },
    staleTime: 0,  // Consider data immediately stale
  });
}
