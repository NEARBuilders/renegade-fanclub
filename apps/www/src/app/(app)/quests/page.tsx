export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Header } from "@/components/header";
import { Container } from "@/components/ui/container";
import { getUserProfile } from "@/lib/api";
import { getUserQuests, listQuests } from "@/lib/api/quests";
import { QuestsList } from "./_components/quests-list";
import { QuestSourceHandler } from "./_components/quest-source-handler";
import { Metadata } from "next";
import { Title } from "@/components/ui/title";

export const metadata: Metadata = {
  title: "Quests | RNG Fan Club",
  description:
    "Complete exciting quests and challenges to earn points and win Super Bowl tickets. Track your progress and unlock achievements!",
  openGraph: {
    title: "Quests | RNG Fan Club",
    description:
      "Complete exciting quests and challenges to earn points and win Super Bowl tickets. Track your progress and unlock achievements!",
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
    title: "Quests | RNG Fan Club",
    description:
      "Complete exciting quests and challenges to earn points and win Super Bowl tickets. Track your progress and unlock achievements!",
    images: ["/images/logo_white.png"],
  },
};

export default async function QuestsPage() {
  const [profile, completedQuests, quests] = await Promise.all([
    getUserProfile(),
    getUserQuests(),
    listQuests(),
  ]);

  return (
    <>
      <QuestSourceHandler />
      <Header profile={profile} />
      <Container>
        <Title
          title="FINISH OUR QUESTS TO WIN!"
          description="Earn points for each quest - be quick!"
        />
        {/* Quests List */}
        <QuestsList quests={quests} completedQuests={completedQuests} />
      </Container>
    </>
  );
}
