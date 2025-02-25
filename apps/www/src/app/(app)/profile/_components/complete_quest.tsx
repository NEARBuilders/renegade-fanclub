import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuestCompletionResponse } from "@renegade-fanclub/types";

interface CompleteQuestProps {
  completedQuests: QuestCompletionResponse[];
}

export default function CompleteQuest({ completedQuests }: CompleteQuestProps) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Quest Completions</CardTitle>
        <CardDescription className="text-white/60">
          Your progress towards Super Bowl tickets
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-4">
          {completedQuests.length === 0 ? (
            <p className="text-white/60">
              Complete quests to earn achievements!
            </p>
          ) : (
            completedQuests.map((quest) => (
              <div
                key={quest.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faTrophy}
                    className="h-4 w-4 text-yellow-500"
                  />
                  <span className="text-sm">{quest.questName}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium">
                    +{quest.pointsEarned}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
