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
        className="relative flex flex-col w-full h-full items-center justify-center"
      >
        <Image
          src={"/images/RNG-bg.png"}
          alt="Stadium at Night Background"
          fill
          priority
          className="object-cover opacity-40"
          unoptimized
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Overlay Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/GFX-1.png"
          alt="Overlay Graphic"
          fill
          className="object-cover"
          unoptimized
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
