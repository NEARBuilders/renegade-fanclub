"use client";

import { QuestCard } from "./quest-card";
import {
  QuestResponse,
  QuestCompletionResponse,
  ProfileResponse,
} from "@renegade-fanclub/types";
import { useQueryClient } from "@tanstack/react-query";

interface QuestsListProps {
  quests: QuestResponse[];
  completedQuests: QuestCompletionResponse[];
  profile?: ProfileResponse;
}

export function QuestsList({
  quests,
  completedQuests,
  profile,
}: QuestsListProps) {
  const queryClient = useQueryClient();

  return (
    <div className="grid grid-cols-1">
      {quests.map((quest) => {
        const isCompleted = completedQuests.some(
          (completed) => completed.questId === quest.id,
        );
        return (
          <QuestCard
            key={quest.id}
            quest={quest}
            profile={profile}
            isCompleted={isCompleted}
            onComplete={() => {
              // Invalidate quests and user points data
              queryClient.invalidateQueries({ queryKey: ["quests"] });
              queryClient.invalidateQueries({ queryKey: ["user-points"] });
            }}
          />
        );
      })}
    </div>
  );
}
