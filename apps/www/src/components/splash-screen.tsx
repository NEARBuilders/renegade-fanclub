"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  });

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black from-30% to-transparent to-40% sm:from-20% sm:to-40% ">
          <p className="absolute bottom-0 w-full pb-10 text-center text-white text-2xl font-bold leading-9 z-10 md:p-10">
            WE ARE THE GAME!
          </p>
        </div>
      </div>

      <div className="relative flex flex-col h-screen items-stretch justify-between w-full ">
        <motion.div
          initial={{ opacity: 0, x: -700 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative flex items-start justify-start w-full py-20 px-4 sm:py-16"
        >
          <p className=" text-white text-[75px] font-bold font-['Inter'] leading-[61px]">
            THE FUTURE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 700 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative flex items-end justify-end w-full pb-32 px-4 sm:pb-24 overflow-hidden"
        >
          <p className="text-right text-white text-[55px] font-bold font-['Inter'] leading-[61px]">
            OF FAN ENGAGEMENT
          </p>
        </motion.div>
      </div>
    </div>
  );
};
