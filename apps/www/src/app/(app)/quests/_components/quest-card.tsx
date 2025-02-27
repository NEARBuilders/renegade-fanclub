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
import { useCurrentUser } from "@/lib/hooks/use-current-user";
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
import { QuestCompletionState } from "@/components/quest-completion-state";

interface QuestCardProps {
  quest: QuestResponse;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function QuestCard({ quest, onComplete }: QuestCardProps) {
  const { toast } = useToast();
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
      // Store previous states
      const previousPoints = queryClient.getQueryData(["user-points"]);
      const previousLeaderboard = queryClient.getQueryData(["leaderboard"]);
      const previousCompletedQuests = queryClient.getQueryData([
        "quests",
        "completed",
      ]);
      try {
        // Update all queries atomically
        queryClient.setQueriesData({
          predicate: (query) => {
            return (
              query.queryKey[0] === "quests" ||
              query.queryKey[0] === "user-points" ||
              query.queryKey[0] === "leaderboard"
            );
          },
        }, (old: any) => {
          // Handle completed quests
          if (Array.isArray(old)) {
            return [
              ...old,
              {
                questId: quest.id,
                pointsEarned: quest.pointsValue,
                completedAt: new Date().toISOString(),
              },
            ];
          }
          
          // Handle points
          if (typeof old === 'number') {
            return old + quest.pointsValue;
          }
          
          // Handle leaderboard
          if (old?.rankings) {
            return {
              ...old,
              rankings: old.rankings.map(
                (ranking: { userId: string; totalPoints: number }) => {
                  if (ranking.userId === user?.issuer) {
                    return {
                      ...ranking,
                      totalPoints: ranking.totalPoints + quest.pointsValue,
                    };
                  }
                  return ranking;
                }
              ),
            };
          }
          
          return old;
        });

        // Make API call after optimistic updates
        await completeQuest(quest.id, {
          verificationProof: username ? { username } : {},
        });

        toast({
          title: "Quest Completed!",
          description: `You earned ${quest.pointsValue} points!`,
        });

        onComplete?.();
      } catch (error: any) {
        // Revert all optimistic updates on error
        queryClient.setQueryData(["user-points"], previousPoints);
        queryClient.setQueryData(["leaderboard"], previousLeaderboard);
        queryClient.setQueryData(
          ["quests", "completed"],
          previousCompletedQuests,
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
    // Open social link in new tab
    if (verificationData.intent_url) {
      window.open(verificationData.intent_url, "_blank");
    }
    // Complete quest and run optimistic updates
    if (quest.verificationType === "social_follow") {
      await handleQuestComplete();
    }
  }, [
    handleQuestComplete,
    verificationData.intent_url,
    quest.verificationType,
  ]);

  const { user } = useCurrentUser();
  const handleCopy = useCallback(async () => {
    if (!user?.issuer) {
      toast({
        title: "Error",
        description: "Could not generate invite link. Please try again.",
      });
      return;
    }

    const origin = "https://app.rngfanclub.com";
    const inviteLink = `${origin}/?ref=${user.issuer}`;

    // Copy the invite link to the clipboard
    await navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Success",
      description: "Link copied to clipboard!",
    });
  }, [user?.issuer, toast]);

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
              <QuestCompletionState questId={quest.id}>
                {(isCompleted) => (
                  <button
                    name={quest.verificationType}
                    onClick={handleSocialAction}
                    disabled={isCompleted}
                    className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                      isCompleted
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
                  </button>
                )}
              </QuestCompletionState>
            )}

            {quest.verificationType === "signup_scan" && (
              <QuestCompletionState questId={quest.id}>
                {(isCompleted) => (
                  <button
                    name={quest.verificationType}
                    onClick={
                      verificationData.action === "sign-up"
                        ? verificationData.platform === "sweatcoin"
                          ? () => setIsSweatcoinModalOpen(true)
                          : handleSocialAction
                        : handleSocialAction
                    }
                    disabled={isCompleted}
                    className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                      isCompleted
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
              </QuestCompletionState>
            )}

            {quest.verificationType === "invite" && (
              <QuestCompletionState questId={quest.id}>
                {(isCompleted) => (
                  <button
                    name={quest.verificationType}
                    onClick={handleCopy}
                    disabled={isCompleted}
                    className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                      isCompleted
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-200 "
                    }`}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                    <span>Copy</span>
                  </button>
                )}
              </QuestCompletionState>
            )}

            {quest.verificationType === "prediction" &&
              verificationData.game_link && (
              <QuestCompletionState questId={quest.id}>
                {(isCompleted) => (
                  <Button
                    asChild
                    className={`flex items-center space-x-2 text-sm px-5 py-2 h-9 w-28 mt-auto ${
                      isCompleted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isCompleted}
                  >
                    <Link href={verificationData.game_link || '#'}>
                      <FontAwesomeIcon icon={faFootball} />
                      <span>Predict</span>
                    </Link>
                  </Button>
                )}
              </QuestCompletionState>
            )}

            {quest.verificationType === "social_post" && (
              <QuestCompletionState questId={quest.id}>
                {(isCompleted) => (
                  <button
                    name={quest.verificationType}
                    onClick={handleSocialAction}
                    disabled={isCompleted}
                    className={`flex items-center justify-center space-x-2 h-9 w-28 text-sm px-5 py-2 rounded-full mt-auto ${
                      isCompleted
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-white text-purple hover:bg-gray-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                    <span>Post</span>
                  </button>
                )}
              </QuestCompletionState>
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
