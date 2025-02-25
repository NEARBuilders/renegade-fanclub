"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface BackgroundImageProps {
  overlay?: boolean;
}

export function BackgroundImageMain({ overlay = true }: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      <Image
        src="/images/bg-2.webp"
        alt="Stadium at Night Background"
        fill
        priority
        className="object-cover"
        unoptimized
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative flex flex-col w-full h-full items-center justify-center"
      >
        {/* Overlay Image */}
        {overlay && (
          <div className="absolute inset-0">
            <Image
              src="/images/GFX-2.png"
              alt="Overlay Graphic"
              fill
              className="object-cover object-center"
              unoptimized
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
