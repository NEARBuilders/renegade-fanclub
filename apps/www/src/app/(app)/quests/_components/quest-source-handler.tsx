"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { completeQuest } from "@/lib/api/quests";
import { useToast } from "@/hooks/use-toast";
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
        try {
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

          // Invalidate points query to trigger immediate update
          queryClient.invalidateQueries({ queryKey: ["user-points"] });

          // Only clear storage and URL if completion was successful
          clearQuestSource();

          if (source) {
            // Remove the source from URL without navigation
            const url = new URL(window.location.href);
            url.searchParams.delete("source");
            window.history.replaceState({}, "", url);
          }
        } catch (error) {
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
  }, [searchParams, toast]);

  return null;
}
