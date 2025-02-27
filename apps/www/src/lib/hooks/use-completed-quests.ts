import { useQuery } from "@tanstack/react-query";
import { getUserQuests } from "@/lib/api/quests";
import { QuestCompletionResponse } from "@renegade-fanclub/types";

export function useCompletedQuests() {
  return useQuery<QuestCompletionResponse[]>({
    queryKey: ["quests", "completed"],
    queryFn: () => getUserQuests(),
    staleTime: 0  // Make it refetch immediately like points
  });
}
