"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  storeQuestSource,
  getStoredQuestSource,
  clearQuestSource,
} from "@/lib/utils/quest-source";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { completeQuest } from "@/lib/api/quests";
import { useToast } from "@/hooks/use-toast";

export function QuestSourceHandler() {
  const searchParams = useSearchParams();
  const { user } = useCurrentUser();
  const { toast } = useToast();

  // Store source on initial load, regardless of auth state
  useEffect(() => {
    const source = searchParams.get("source");
    if (source) {
      storeQuestSource(source);
    }
  }, [searchParams]);

  // Handle quest completion when auth state changes
  useEffect(() => {
    const handleQuestCompletion = async () => {
      const storedSource = getStoredQuestSource();
      if (user && storedSource) {
        try {
          // Attempt to complete quest with stored source
          const result = await completeQuest(8, {
            verificationProof: {
              source: storedSource,
              completedAt: new Date().toISOString(),
            },
          });
          // Clear source after successful completion
          clearQuestSource();
          // Show success toast
          toast({
            title: "Quest completed!",
            description: `You earned ${result.pointsEarned} points`,
            variant: "default",
          });
        } catch (error) {
          // Handle error
          console.error(error);
          // Only show error toast if it's not "already completed"
          if (
            error instanceof Error &&
            !error.message.includes("already completed")
          ) {
            toast({
              title: "Failed to complete quest",
              description: error.message,
              variant: "destructive",
            });
          } else if (!(error instanceof Error)) {
            toast({
              title: "Failed to complete quest",
              description: "An unexpected error occurred",
              variant: "destructive",
            });
          }
          // Clear source in all cases since we don't want to retry
          clearQuestSource();
        }
      }
    };

    handleQuestCompletion();
  }, [user, toast]);

  return null;
}
