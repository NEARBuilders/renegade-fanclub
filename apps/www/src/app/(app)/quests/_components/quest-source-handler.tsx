"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { completeQuest } from "@/lib/api/quests";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import {
  isValidQuestSource,
  clearQuestSource,
  getStoredQuestSource,
  storeQuestSource,
} from "@/lib/utils/quest-source";

export function QuestSourceHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  useEffect(() => {
    const source = searchParams.get("source");
    const storedSource = getStoredQuestSource();

    // If we have a new source in URL, store it
    if (source && isValidQuestSource(source)) {
      storeQuestSource(source);
    }

    // Try to complete quest with either URL source or stored source
    if ((source && isValidQuestSource(source)) || storedSource) {
      const questSource = source || storedSource;
      const processQuest = async () => {
        const QRCODE_POINTS = 500; // Known points value for Twitter quest

        // Store previous states before any updates
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
                  questId: 8,
                  pointsEarned: QRCODE_POINTS,
                  completedAt: new Date().toISOString(),
                },
              ];
            }
            
            // Handle points
            if (typeof old === 'number') {
              return old + QRCODE_POINTS;
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
                        totalPoints: ranking.totalPoints + QRCODE_POINTS,
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
          const result = await completeQuest(8, {
            verificationProof: {
              source: questSource,
              timestamp: new Date().toISOString(),
            },
          });

          toast({
            title: "Quest Completed!",
            description: `You earned ${result.pointsEarned} points!`,
          });

          // Only clear storage and URL if completion was successful
          clearQuestSource();

          if (source) {
            // Remove the source from URL without navigation
            const url = new URL(window.location.href);
            url.searchParams.delete("source");
            window.history.replaceState({}, "", url);
          }
        } catch (error) {
          // Revert all optimistic updates on error
          queryClient.setQueryData(["user-points"], previousPoints);
          queryClient.setQueryData(["leaderboard"], previousLeaderboard);
          queryClient.setQueryData(["quests", "completed"], previousCompletedQuests);

          console.error("Failed to complete quest:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to complete the quest. Please try again.",
          });
        }
      };

      processQuest();
    }
  }, [searchParams, toast, queryClient, user]);

  return null;
}
