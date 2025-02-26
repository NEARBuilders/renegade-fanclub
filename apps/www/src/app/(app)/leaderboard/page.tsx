export const dynamic = "force-dynamic";

import { Header } from "@/components/header";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { getUserProfile } from "@/lib/api";
import { Metadata } from "next";
import { Leaderboard } from "./_components/leaderboard";

export const metadata: Metadata = {
  title: "Leaderboard | RNG Fan Club",
  description:
    "See the top fans competing for Super Bowl tickets. Track points from predictions and completed quests.",
  openGraph: {
    title: "Leaderboard | RNG Fan Club",
    description:
      "See the top fans competing for Super Bowl tickets. Track points from predictions and completed quests.",
    images: [
      {
        url: "/images/logo_white.png",
        width: 1200,
        height: 630,
        alt: "RNG Fan Club Logo",
      },
    ],
  },
  twitter: {
    title: "Leaderboard | RNG Fan Club",
    description:
      "See the top fans competing for Super Bowl tickets. Track points from predictions and completed quests.",
    images: ["/images/logo_white.png"],
  },
};

export default async function LeaderboardPage() {
  const [profile] = await Promise.all([getUserProfile()]);

  return (
    <>
      <Header profile={profile} />
      <Container>
        <div className="px-2 pb-20">
          <Title
            title="Leaderboard"
            description="Top fans competing for Super Bowl tickets"
          />
          <Leaderboard />
        </div>
      </Container>
    </>
  );
}
