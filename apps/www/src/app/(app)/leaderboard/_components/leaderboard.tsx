"use client";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getAllTimeLeaderboard } from "@/lib/api/leaderboard";
import { LeaderboardRankingResponse } from "@renegade-fanclub/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPoints } from "@/lib/utils/format-points";

export function Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getAllTimeLeaderboard(1, 10),
  });

  if (isLoading) {
    return (
      <div className="grid">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4 flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8">
              <Skeleton className="h-6 w-4 bg-white/10 rounded" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-24 bg-white/10 rounded" />
                <Skeleton className="h-6 w-16 bg-white/10 rounded-full shrink-0" />
              </div>
              <Skeleton className="h-3 w-32 bg-white/10 rounded mt-2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!leaderboard) return null;

  return (
    <div className="grid">
      {!leaderboard.rankings ? (
        <div className="flex flex-col items-center justify-center p-0 h-[calc(100vh-380px)] gap-4">
          <p className="text-center text-white/60">
            No one has completed any quests yet.
          </p>
        </div>
      ) : (
        <>
          <div className="relative flex justify-center mt-28 gap-6">
            {[2, 1, 3].map((rank) => {
              const ranking = leaderboard.rankings.find((r) => r.rank === rank);
              if (!ranking) return null;

              const rankColorsBg = {
                1: "bg-yellow-500",
                2: "bg-[#C0C0C0]",
                3: "bg-[#CE8946]",
              };
              const rankColorsText = {
                1: "text-yellow-500",
                2: "text-[#C0C0C0]",
                3: "text-[#CE8946]",
              };

              return (
                <div
                  key={ranking.rank}
                  className="flex items-end justify-center gap-6 w-full h-full"
                >
                  <div
                    className={`flex flex-col items-center justify-start w-32 md:w-52 ${
                      ranking.rank === 1 ? "absolute bottom-0" : ""
                    }`}
                  >
                    <div className="relative flex flex-col items-center -mb-8">
                      {ranking.rank === 1 && (
                        <FontAwesomeIcon
                          icon={faCrown}
                          className="text-4xl text-yellow-500"
                        />
                      )}
                      <Avatar
                        className={`border-2 border-secondary z-10 ${
                          ranking.rank === 1
                            ? "h-24 w-24 md:h-28 md:w-28"
                            : "h-20 w-20 md:h-24 md:w-24"
                        }`}
                      >
                        <AvatarImage
                          src={ranking.avatar ?? undefined}
                          alt={ranking.username}
                        />
                        <AvatarFallback className="bg-[#1c1c1c] text-sm">
                          {ranking.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`${
                          rankColorsBg[ranking.rank as 1 | 2 | 3]
                        } h-5 w-5 md:w-6 md:h-6 md:-mt-4 -mt-3 z-10 rotate-45 rounded-md flex items-center justify-center border border-white/20`}
                      >
                        <p className="-rotate-45 text-xs text-white">
                          {ranking.rank}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center w-full bg-gradient-to-b from-[#1c1c1c] to-black rounded-lg border border-[#717171] md:gap-1 ${
                        ranking.rank === 1
                          ? "pt-8 h-40 md:h-48"
                          : "pt-12 pb-2 h-32 md:h-36 md:pb-3"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faTrophy}
                        className={`text-3xl md:text-4xl ${
                          rankColorsText[ranking.rank as 1 | 2 | 3]
                        }`}
                      />
                      <span
                        className={`font-jersey font-normal leading-relaxed text-[26px] md:text-3xl ${
                          rankColorsText[ranking.rank as 1 | 2 | 3]
                        }`}
                      >
                        {formatPoints(ranking.totalPoints)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {leaderboard.rankings.slice(3).map((ranking: LeaderboardRankingResponse) => (
            <div
              key={ranking.userId}
              className="flex items-center mt-5 gap-4 h-[72px] p-6 bg-black/90 rounded-lg border border-[#717171] justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-jersey font-medium text-[32px] truncate">
                    {ranking.username}
                  </p>
                  <div className="flex gap-4 items-center justify-start">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-2xl text-white"
                    />
                    <span className="font-jersey font-medium text-[32px] leading-relaxed">
                      {formatPoints(ranking.totalPoints)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
