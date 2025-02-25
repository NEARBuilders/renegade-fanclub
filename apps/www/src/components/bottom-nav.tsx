"use client";

import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faFileLines,
  faFootball,
  faHouse,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

export function BottomNav() {
  const currentPath = usePathname();
  const links = [
    {
      to: "/quests",
      icon: faHouse,
      label: "Home",
    },
    {
      to: "/profile",
      icon: faUser,
      label: "Profile",
    },
    // {
    //   to: "/games",
    //   icon: faFootball,
    //   label: "Games",
    // },
    // {
    //   to: "/shop",
    //   icon: faBasketShopping,
    //   label: "Shop",
    // },
    {
      to: "/leaderboard",
      icon: faTrophy,
      label: "Leaderboard",
    },
    {
      to: "/terms",
      icon: faFileLines,
      label: "Terms",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset bg-gradient-to-b from-transparent to-black to-60%">
      <div className="container py-2.5 mx-auto flex h-32 justify-center items-end gap-6 max-w-sm">
        {links.map((link) => {
          const isActive = currentPath === link.to;
          return (
            <Link
              key={link.to}
              href={link.to}
              className={cn(
                "relative flex flex-col items-center justify-center h-12 w-16 rounded-2xl transition-all duration-200",
                "hover:scale-105 active:scale-95",
                "touch-none select-none",
                isActive
                  ? "text-white after:absolute after:bottom-0 after:h-1 after:w-8 after:rounded-full after:bg-secondary"
                  : "text-white/60 hover:text-white/80",
              )}
            >
              <FontAwesomeIcon
                icon={link.icon}
                className={cn(
                  "h-6 w-6 transition-transform duration-200",
                  isActive && "scale-110",
                )}
              />
              <span className="mt-1 text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
