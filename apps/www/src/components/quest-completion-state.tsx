"use client";

import { useCompletedQuests } from "@/lib/hooks/use-completed-quests";

interface QuestCompletionStateProps {
  questId: number;
  children: (isCompleted: boolean) => React.ReactNode;
}

export function QuestCompletionState({ questId, children }: QuestCompletionStateProps) {
  const { data: completedQuests = [] } = useCompletedQuests();
  const isQuestCompleted = completedQuests.some(
    (completed) => completed.questId === questId
  );
  
  return <>{children(isQuestCompleted)}</>;
}
