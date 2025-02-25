"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { completeQuest } from "@/lib/api/quests";
import { QuestResponse } from "@renegade-fanclub/types";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTrophy, faFootball } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface QuestCardProps {
  quest: QuestResponse;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function QuestCard({ quest, onComplete, isCompleted }: QuestCardProps) {
  const { toast } = useToast();
  const [isQuestCompleted, setQuestCompleted] = useState(isCompleted);
  const queryClient = useQueryClient();
  const verificationData = quest.verificationData as {
    platform?: string;
    action?: string;
    intent_url?: string;
    game_id?: number;
    game_link?: string;
    game_type?: string;
  };

  const handleQuestComplete = useCallback(async () => {
    try {
      // Optimistically update points
      const currentPoints =
        queryClient.getQueryData<number>(["user-points"]) ?? 0;
      queryClient.setQueryData(
        ["user-points"],
        currentPoints + quest.pointsValue,
      );

      // Make API call
      await completeQuest(quest.id, { verificationProof: {} });

      // Ensure data is refetched before showing toast
      await queryClient.invalidateQueries({ queryKey: ["quests"] });
      await queryClient.invalidateQueries({ queryKey: ["user-points"] });

      toast({
        title: "Quest Completed!",
        description: `You earned ${quest.pointsValue} points!`,
      });

      setQuestCompleted(true);

      onComplete?.();
    } catch (error: any) {
      // Revert optimistic update on error

      const currentPoints =
        queryClient.getQueryData<number>(["user-points"]) ?? 0;
      queryClient.setQueryData(
        ["user-points"],
        currentPoints - quest.pointsValue,
      );
      const errorMessage = error?.message || "Unknown error";
      // If error includes specific messages, show appropriate message
      if (errorMessage.includes("already completed")) {
        toast({
          title: "Already Completed",
          description: "You've already completed this quest!",
        });
      } else {
        toast({
          title: "Error",
          description: errorMessage.includes("not active")
            ? "This quest is not currently active"
            : errorMessage.includes("Campaign is not active")
              ? "This campaign is not currently active"
              : "Failed to complete quest. Please try again.",
        });
      }
    }
  }, [quest.id, quest.pointsValue, onComplete, toast]);

  const handleSocialFollow = useCallback(async () => {
    // Open social link in new tab first to ensure it's directly tied to user interaction
    if (verificationData.intent_url) {
      window.open(verificationData.intent_url, "_blank");
    }
    // Then complete the quest
    await handleQuestComplete();
  }, [handleQuestComplete, verificationData.intent_url]);

  return (
    <Card className="flex flex-col justify-betweenm w-full overflow-hidden p-6 md:p-8">
      <div className="flex items-stretch justify-between gap-2 flex-grow">
        <div
          title={`You will earn ${quest.pointsValue} points for completing this quest`}
          className="flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTrophy} className="h-7 w-7 text-white" />
          <span className="font-jersey text-center text-white text-[32px] font-normal font-['Jersey M54'] leading-relaxed">
            {quest.pointsValue}
          </span>
        </div>
        <div className="flex flex-col items-end justify-end gap-1.5 sm:gap-2 pt-2">
          <CardTitle className="text-white text-[15px] leading-normal md:text-base">
            {quest.name}
          </CardTitle>
          <CardDescription className="text-white text-[15px] leading-normal md:text-base">
            {quest.description}
          </CardDescription>
        </div>
      </div>

      <CardContent className="pt-7">
        <div className="flex flex-col items-end justify-end">
          {/* Quest-specific actions */}
          {quest.verificationType === "social_follow" &&
            verificationData.platform === "twitter" && (
              <button
                name={quest.verificationType}
                onClick={handleSocialFollow}
                disabled={isQuestCompleted}
                className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                  isQuestCompleted
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-purple hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faXTwitter} />
                <span>Follow</span>
              </button>
            )}

          {quest.verificationType === "prediction" &&
            verificationData.game_link && (
              <Button
                asChild
                className={`flex items-center space-x-2 text-sm px-5 py-2 h-9 w-28 mt-auto ${
                  isCompleted ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isCompleted}
              >
                <Link href={verificationData.game_link}>
                  <FontAwesomeIcon icon={faFootball} />
                  <span>Predict</span>
                </Link>
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
