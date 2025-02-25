"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function BackgroundImage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative flex flex-col w-full h-full items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/rng-bg.png"
            alt="Stadium at Night Background"
            fill
            priority
            className="object-cover opacity-40 object-[40%_center]"
            onLoad={() => setIsLoaded(true)}
            unoptimized
          />
        </div>

        {/* Overlay Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/GFX-1.png"
            alt="Overlay Graphic"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black from-20% to-transparent to-30% sm:from-10% sm:to-40% " />
      <div className="absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent to-20% sm:from-5% sm:to-40% ">
        <p className="absolute bottom-0 w-full p-16 text-center text-white text-2xl font-bold leading-9 z-10 md:p-10">
          WE ARE THE GAME!
        </p>
      </div>
    </div>
  );
}
