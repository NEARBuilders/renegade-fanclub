"use client";

import { faArrowLeft, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ProfileResponse } from "@renegade-fanclub/types";
import { useUserPoints } from "@/lib/hooks/use-user-points";

interface HeaderProps {
  showtitle?: boolean;
  showBackButton?: boolean;
  rightChildren?: React.ReactNode;
  profile?: ProfileResponse;
}

export function Header({
  showtitle = false,
  showBackButton = false,
  rightChildren,
  profile,
}: HeaderProps) {
  const { data: totalPoints } = useUserPoints();
  const router = useRouter();
  const pathname = usePathname();

  const formatTitle = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments
      .map(
        (segment) =>
          segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
      )
      .join(" • ");
  };

  return (
    <header className="sticky top-4 left-0 right-0 z-50 bg-transparent pb-4">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center justify-center min-w-[64px]">
          {showBackButton ? (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center h-10 w-10 rounded-xl bg-none hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 text-" />
            </button>
          ) : profile ? (
            <Avatar
              onClick={() => router.push("/profile")}
              className="h-14 w-14 border border-secondary cursor-pointer"
            >
              <AvatarImage
                src={profile.avatar ?? undefined}
                alt={profile.username}
              />
              <AvatarFallback className="bg-white/5 text-lg">
                {profile.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Center Section */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          {showtitle ? (
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              {formatTitle(pathname)}
            </h1>
          ) : (
            <Image
              src="/images/logo_white.png"
              alt="RNG Fan Club"
              width={100}
              height={64}
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center min-w-[64px]">
          {rightChildren ? (
            <div className="flex items-center space-x-2">{rightChildren}</div>
          ) : totalPoints !== undefined ? (
            <div className="flex items-center space-x-2 bg-white/10 px-5 py-1.5 rounded-full">
              <FontAwesomeIcon icon={faTrophy} className="h-5 w-5 text-white" />
              <span
                className="text-white text-lg font-normal leading-relaxed font-jersey"
                data-testid="user-points"
              >
                {totalPoints}
              </span>
            </div>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>
    </header>
  );
}
