"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { completeQuest } from "@/lib/api/quests";
import { useToast } from "@/hooks/use-toast";
import { isValidQuestSource, clearQuestSource } from "@/lib/utils/quest-source";

export function QuestSourceHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const source = searchParams.get("source");

    if (source && isValidQuestSource(source)) {
      const processQuest = async () => {
        try {
          // TODO: Replace with actual quest ID and verification data
          const result = await completeQuest(8, {
            verificationProof: {
              source,
              timestamp: new Date().toISOString(),
            },
          });

          toast({
            title: "Quest Completed!",
            description: `You earned ${result.pointsEarned} points!`,
          });

          // Clear the source from storage
          clearQuestSource();

          // Remove the source from URL without navigation
          const url = new URL(window.location.href);
          url.searchParams.delete("source");
          window.history.replaceState({}, "", url);
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
