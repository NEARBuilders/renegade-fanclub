"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);

    const handleKeyDown = () => setIsVisible(false);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsVisible]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="fixed inset-0 z-50 bg-black"
    >
      <div className="fixed inset-0">
        <div className="flex flex-col items-center justify-center absolute inset-0 ">
          <div className="flex flex-col items-center justify-center h-[50vh] sm:h-full w-[200%] max-w-none sm:w-full ">
            <Image
              src="/images/bg_gif.gif"
              alt="Stadium at Night Background"
              height={1080}
              width={1920}
              priority
              className="object-cover "
              unoptimized
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black from-30% to-transparent to-40% sm:from-20% sm:to-40% " />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-30% to-transparent to-40% sm:from-20% sm:to-40% " />
      </div>

      <div className="relative flex flex-col justify-between h-screen w-full ">
        <div className="relative flex items-start justify-start w-full py-20 px-4 sm:py-16">
          <p className=" text-white text-[75px] font-bold font-['Inter'] leading-[61px]">
            THE FUTURE
          </p>
        </div>

        <div className="relative flex flex-col items-end justify-end w-full pb-16 px-4 sm:pb-8 break-word overflow-hidden space-y-8 sm:space-y-6">
          <p className="text-right text-white text-5xl font-bold leading-[61px] ">
            OF FAN ENGAGEMENT
          </p>
          <p className="w-full text-center text-white text-2xl font-bold leading-9">
            WE ARE THE GAME!
          </p>
        </div>
      </div>
    </div>
  );
};
