export const dynamic = "force-dynamic";
import { ProfileInfo } from "./_components/profile-info";
import { Metadata } from "next";
import { getUserQuests } from "@/lib/api/quests";
import { getUserProfile } from "@/lib/api/user";
import Link from "next/link";
import { Header } from "@/components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { CopyLink } from "@/components/ui/copy-link";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

export const metadata: Metadata = {
  title: "My Profile | RNG Fan Club",
  description:
    "View your achievements, points earned, and progress towards Super Bowl tickets. Track your completed quests and refer friends to earn more points.",
  openGraph: {
    title: "My Profile | RNG Fan Club",
    description:
      "View your achievements, points earned, and progress towards Super Bowl tickets. Track your completed quests and refer friends to earn more points.",
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
    title: "My Profile | RNG Fan Club",
    description:
      "View your achievements, points earned, and progress towards Super Bowl tickets. Track your completed quests and refer friends to earn more points.",
    images: ["/images/logo_white.png"],
  },
};

export default async function ProfilePage() {
  const [profile, completedQuests] = await Promise.all([
    getUserProfile(),
    getUserQuests(),
  ]);

  return (
    <>
      <Header
        showBackButton={true}
        rightChildren={
          <Link
            href="/settings"
            className="bg-none rounded-full border-none p-0 h-9 w-9 hover:bg-none"
          >
            <FontAwesomeIcon icon={faCog} className="h-6 w-6" />
          </Link>
        }
      />
      <Container>
        <div className="px-2 pb-20">
          <Title
            title="PROFILE OVERVIEW"
            description={"Hello, " + profile.username + "!"}
          />
          <ProfileInfo profile={profile} completedQuests={completedQuests} />

          <CopyLink
            title="Refer a Friend"
            description="Earn more points"
            link={"/invite?ref=" + profile.id}
          />
        </div>
      </Container>
    </>
  );
}
