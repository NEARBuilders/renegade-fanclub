"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useToast } from "@/hooks/use-toast";
import { createUserProfile } from "@/lib/api/user";
import { getCurrentUserInfo } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserInfo } from "./_components/user-info";

type OnboardingStep = "userInfo";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("userInfo");
  const [initialData, setInitialData] = useState<{
    email?: string;
    phoneNumber?: string;
  }>({});
  const { toast } = useToast();

  // Get initial data from Magic SDK
  useEffect(() => {
    async function getInitialData() {
      const userInfo = await getCurrentUserInfo();
      if (userInfo?.email) {
        setInitialData({ email: userInfo.email });
      }
    }
    getInitialData();
  }, []);

  // const handleSportsNext = (sports: Sport[]) => {
  //   setSelectedSports(sports);
  //   setCurrentStep("teams");
  // };

  // const handleTeamsBack = () => {
  //   setCurrentStep("sports");
  // };

  // const handleTeamsNext = async () => {
  //   try {
  //     router.replace("/quests");
  //   } catch (error) {
  //     console.error("Failed to complete onboarding:", error);
  //   }
  // };

  return (
    <Container>
      <div className="flex min-h-dvh flex-col items-center justify-center py-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">
              Welcome to Renegade Fan Club
            </h1>
            <p className="text-muted-foreground text-center">
              Let's get you set up
            </p>
          </CardHeader>
          <CardContent>
            {currentStep === "userInfo" && (
              <UserInfo
                initialEmail={initialData.email}
                onNext={async (username, email) => {
                  // Validate all required data
                  if (!username || !email) {
                    throw new Error("Username and email are required");
                  }

                  // Create profile data object
                  const profileData: Record<string, unknown> = {
                    onboardingComplete: true,
                  };

                  // Only add phoneNumber if it exists
                  if (initialData?.phoneNumber) {
                    profileData.phoneNumber = initialData.phoneNumber;
                  }

                  // Create user profile
                  await createUserProfile({
                    username,
                    email,
                    profileData,
                  });

                  // Navigate to quests page
                  router.push("/quests");
                }}
              />
            )}
            {/* {currentStep === "sports" && (
              <SportsSelection onNext={handleSportsNext} />
            )}
            {currentStep === "teams" && (
              <TeamsSelection
                selectedSports={selectedSports}
                onNext={handleTeamsNext}
                onBack={handleTeamsBack}
              />
            )} */}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
