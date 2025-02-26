import { getUserProfile } from "@/lib/api";

const getInviteLink = async () => {
  const profile = await getUserProfile();
  const origin = "https://rngfanclub.com";
  return `${origin}/invite?ref=${profile.id}`;
};

export const getQuests = async () => {
  // Get the invite link for the mock data
  const link = await getInviteLink();

  return [
    {
      id: 1,
      campaignId: 1,
      name: "Following",
      description: "@rngfanclub on X",
      pointsValue: 100,
      verificationType: "social_follow",
      verificationData: {
        platform: "twitter",
        intent_url: "https://twitter.com/intent/follow?screen_name=rngfanclub",
      },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 2,
      campaignId: 1,
      name: "Following",
      description: "@Sweatcoin on X",
      pointsValue: 100,
      verificationType: "social_follow",
      verificationData: {
        platform: "twitter",
        intent_url: "https://x.com/SweatEconomy",
      },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 3,
      campaignId: 1,
      name: "Following",
      description: "@rngfanclub on Instagram",
      pointsValue: 100,
      verificationType: "social_follow",
      verificationData: {
        platform: "Instagram",
        intent_url: "https://www.instagram.com/rngfanclub/",
      },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 4,
      campaignId: 1,
      name: "Sign-up",
      description: "with Sweatcoin",
      pointsValue: 250,
      verificationType: "signup_scan",
      verificationData: {
        action: "Sign-up",
        platform: "sweatcoin",
        intent_url: "123456789",
      },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 5,
      campaignId: 1,
      name: "Add more points",
      description: "sharing our referral link",
      pointsValue: 100,
      verificationType: "invite",
      verificationData: { action: "Copy", invite_link: link },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 6,
      campaignId: 1,
      name: "Scanning the",
      description: "QR billboard",
      pointsValue: 500,
      verificationType: "signup_scan",
      verificationData: { action: "Scan", intent_url: "123456789" },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 7,
      campaignId: 1,
      name: "Walking 2000 steps and",
      description: "scanning the finish line QR",
      pointsValue: 1000,
      verificationType: "signup_scan",
      verificationData: { action: "Scan", intent_url: "123456789" },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
  ];
};
