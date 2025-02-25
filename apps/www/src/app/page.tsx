import { Container } from "@/components/ui/container";
import Image from "next/image";
import { Login } from "./(auth)/_components/login";
import { BackgroundImage } from "./(auth)/_components/background-image";
import { SplashScreen } from "@/components/splash-screen";
import { Suspense } from "react";
import { Metadata } from "next";

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
      <SplashScreen />
      {/* Background layers */}
      <div className="fixed inset-0 z-5">
        <BackgroundImage />
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
