"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import {
  ProfileResponse,
  QuestCompletionResponse,
} from "@renegade-fanclub/types";
import { useUserPoints } from "@/lib/hooks/use-user-points";
import { Card } from "@/components/ui/card";

interface ProfileInfoProps {
  profile: ProfileResponse;
  completedQuests: QuestCompletionResponse[];
}

export function ProfileInfo({ profile, completedQuests }: ProfileInfoProps) {
  const { data: totalPoints } = useUserPoints();

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div
        className="flex items-center mt-5 gap-4 p-6 justify-between 
      bg-black/90 rounded-lg border border-[#717171] w-[100%] h-[72px]"
      >
        <p className="font-jersey font-medium text-[32px] truncate">
          POINTS WON...
        </p>
        <div className="flex gap-4 items-center justify-start ">
          <FontAwesomeIcon icon={faTrophy} className={`text-2xl text-white`} />
          <span className="font-jersey font-medium text-[32px] leading-relaxed">
            {totalPoints}
          </span>
        </div>
      </div>
      <div
        className="flex items-center mt-5 gap-4 p-6 justify-between 
      bg-black/90 rounded-lg border border-[#717171] w-[100%] h-[72px]"
      >
        <p className="font-jersey font-medium text-[32px] truncate">
          QUESTS COMPLETED
        </p>
        <span className="font-jersey font-medium text-[32px] leading-relaxed">
          {completedQuests.length}
        </span>
      </div>

      <Card className="flex flex-col items-center p-6 gap-2">
        <Avatar className="w-[188px] h-[188px] bg-black rounded-full border-8 border-[#39ff14]">
          <AvatarImage
            src={profile.avatar ?? undefined}
            alt={profile.username}
          />
          <AvatarFallback className="bg-white/5 text-3xl">
            {profile.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center">
          <p className="font-semibold tracking-tight text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
            {profile.username}
          </p>
          <p className="text-sm text-white/60 overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
            {profile.email}
          </p>
        </div>
      </Card>
    </div>
  );
}
