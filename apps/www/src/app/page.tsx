import { Container } from "@/components/ui/container";
import Image from "next/image";
import { Login } from "./(auth)/_components/login";
import { Suspense } from "react";
import { Metadata } from "next";
import { BackgroundImage } from "./(auth)/_components/background-image";

export const metadata: Metadata = {
  title: "Home | RNG Fan Club",
  description: "Get in the game with your friends",
  openGraph: {
    title: "Home | RNG Fan Club",
    description:
      "Welcome to RNG Fan Club, your destination for amazing games and events",
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
    title: "Home | RNG Fan Club",
    description:
      "Welcome to RNG Fan Club, your destination for amazing games and events",
    images: [
      {
        url: "/images/logo_white.png",
        width: 1200,
        height: 630,
        alt: "RNG Fan Club Logo",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Background layers */}
      <div className="fixed inset-0 z-5">
        {/* Base background image */}
        <BackgroundImage />
        {/* Overlay bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-black from-20% to-transparent to-30% sm:from-10% sm:to-40% " />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent to-30% sm:from-5% sm:to-40% " />
      </div>
      {/* Page content with contrast from the background (whether it is the black gradient, or the faded image) */}
      <Container className="relative z-10">
        <div className="flex h-screen overflow-hidden flex-col items-center px-4 py-16 z-20">
          <div className="w-80 h-28">
            <Image
              src="/images/logo_white.png"
              alt="Renegade Fan Club"
              width={320}
              height={320}
              className="w-full h-full object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="space-y-6 mt-60 md:mt-36">
            <Suspense fallback="Loading...">
              <Login />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
