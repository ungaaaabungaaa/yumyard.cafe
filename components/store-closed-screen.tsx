"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

import storeClosedAnimation from "@/public/lottie/Dineout Temp Closed.json";

// Change this number to tune playback speed. 1 is the exported Lottie speed.
const ANIMATION_SPEED = 1;

export function StoreClosedScreen() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(ANIMATION_SPEED);
  }, []);

  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-white px-6">
      <div
        aria-hidden="true"
        className="flex w-full justify-center pt-10 sm:pt-12"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={storeClosedAnimation}
          autoplay
          loop
          className="h-[min(34dvh,260px)] min-h-[180px] w-full max-w-[340px]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 text-center">
        <h1 className="text-[clamp(2.4rem,12vw,3.6rem)] font-semibold leading-none tracking-normal text-neutral-950">
          YumYard<span className="text-[#67BD1F]">.Cafe</span>
        </h1>
      </div>
    </main>
  );
}
