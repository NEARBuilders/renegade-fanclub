"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { completeQuest } from "@/lib/api/quests";
import { ProfileResponse, QuestResponse } from "@renegade-fanclub/types";
import { faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faTrophy,
  faFootball,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { SweatcoinModal } from "@/components/modals/sweatcoin-modal";

interface QuestCardProps {
  quest: QuestResponse;
  onComplete?: () => void;
  isCompleted?: boolean;
  profile?: ProfileResponse;
}

export function QuestCard({
  quest,
  onComplete,
  isCompleted,
  profile,
}: QuestCardProps) {
  const { toast } = useToast();
  const [isQuestCompleted, setQuestCompleted] = useState(isCompleted);
  const [isSweatcoinModalOpen, setIsSweatcoinModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const verificationData = quest.verificationData as {
    platform?: string;
    action?: string;
    intent_url?: string;
    app_url?: string;
    game_id?: number;
    game_link?: string;
    game_type?: string;
    invite_link: string;
  };

  const handleQuestComplete = useCallback(
    async (username?: string) => {
      try {
        // Optimistically update points
        const currentPoints =
          queryClient.getQueryData<number>(["user-points"]) ?? 0;
        queryClient.setQueryData(
          ["user-points"],
          currentPoints + quest.pointsValue,
        );

        // Make API call
        await completeQuest(quest.id, {
          verificationProof: username ? { username } : {},
        });

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
    },
    [quest.id, quest.pointsValue, onComplete, toast],
  );

  const handleSocialAction = useCallback(async () => {
    // Open social link in new tab first to ensure it's directly tied to user interaction
    if (verificationData.intent_url) {
      window.open(verificationData.intent_url, "_blank");
    }
    // Only complete the quest for social_follow type
    if (quest.verificationType === "social_follow") {
      await handleQuestComplete();
    }
  }, [
    handleQuestComplete,
    verificationData.intent_url,
    quest.verificationType,
  ]);

  // const { user } = useCurrentUser();
  const handleCopy = useCallback(async () => {
    if (!profile?.id) {
      toast({
        title: "Error",
        description: "Could not generate invite link. Please try again.",
      });
      return;
    }
    const origin = "https://app.rngfan.club";
    const inviteLink = `${origin}/?ref=${profile.id}`;

    // Copy the invite link to the clipboard
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Success",
        description: "Link copied to clipboard!",
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
      });
    }
  }, [toast, origin]);

  return (
    <>
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
            {quest.verificationType === "social_follow" && (
              <Button
                name={quest.verificationType}
                onClick={handleSocialAction}
                disabled={isQuestCompleted}
                className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                  isQuestCompleted
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-purple hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    verificationData.platform == "twitter"
                      ? faXTwitter
                      : faInstagram
                  }
                />
                <span>Follow</span>
              </Button>
            )}

            {quest.verificationType === "signup_scan" && (
              <button
                name={quest.verificationType}
                onClick={
                  verificationData.action === "sign-up"
                    ? verificationData.platform === "sweatcoin"
                      ? () => setIsSweatcoinModalOpen(true)
                      : handleSocialAction
                    : handleSocialAction
                }
                disabled={isQuestCompleted}
                className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                  isQuestCompleted
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple text-white hover:bg-purple/80"
                }`}
              >
                {verificationData?.action
                  ? verificationData.action.charAt(0).toUpperCase() +
                    verificationData.action.slice(1)
                  : "Sign-up"}
              </button>
            )}

            {quest.verificationType === "invite" && (
              <button
                name={quest.verificationType}
                onClick={handleCopy}
                className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                  isQuestCompleted
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-200 "
                }`}
              >
                <FontAwesomeIcon icon={faCopy} />
                <span>Copy</span>
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

            {quest.verificationType === "social_post" && (
              <button
                name={quest.verificationType}
                onClick={handleSocialAction}
                disabled={isQuestCompleted}
                className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                  isQuestCompleted
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-purple hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faXTwitter} />
                <span>Post</span>
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sweatcoin Modal */}
      <SweatcoinModal
        isOpen={isSweatcoinModalOpen}
        onClose={() => setIsSweatcoinModalOpen(false)}
        onComplete={(username) => handleQuestComplete(username)}
        appUrl={verificationData.app_url || ""}
      />
    </>
  );
}
