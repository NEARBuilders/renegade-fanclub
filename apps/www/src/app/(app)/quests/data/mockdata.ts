export const getQuests = async () => {
  return [
    {
      id: 1,
      campaignId: 1,
      name: "Follow",
      description: "@rngfanclub on X",
      pointsValue: 100,
      verificationType: "social_follow",
      verificationData: {
        action: "follow",
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
      name: "Follow",
      description: "@SweatEconomy on X",
      pointsValue: 100,
      verificationType: "social_follow",
      verificationData: {
        action: "follow",
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
      name: "Follow",
      description: "@rngfanclub on Instagram",
      pointsValue: 100,
      verificationType: "social_follow",
      verificationData: {
        action: "follow",
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
        action: "sign-up",
        platform: "sweatcoin",
        app_url: "https://apps.apple.com/us/app/sweat-wallet/id1619316571",
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
      name: "Refer a friend",
      description: "and they create an account",
      pointsValue: 100,
      verificationType: "invite",
      verificationData: { action: "copy" },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 6,
      campaignId: 1,
      name: "Scan QR Code",
      description: "Located on the corner of X and X",
      pointsValue: 500,
      verificationType: "scan_qrcode",
      verificationData: { action: "scan", intent_url: "123456789" },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
    {
      id: 7,
      campaignId: 1,
      name: "Walk 2000 steps and",
      description: "post a screenshot on X",
      pointsValue: 1000,
      verificationType: "social_post",
      verificationData: {
        action: "post",
        platform: "twitter",
        intent_url:
          "https://twitter.com/intent/tweet?text=@rngfanclub @sweateconomy [ATTACH SCREENSHOT OF 2000 STEPS IN SWEATCOIN MOBILE APP]",
      },
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2024-02-28T23:59:59Z",
      createdAt: "2024-01-25T12:00:00Z",
      campaignName: "Engagement Rewards",
      completionCount: 120,
    },
  ];
};
