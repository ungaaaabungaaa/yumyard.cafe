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
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 w-full -translate-y-1/2 px-4 text-center">  
        <h1 className="w-full  max-w-full whitespace-nowrap text-[clamp(2rem,10.5vw,3rem)] font-bold leading-none tracking-normal text-neutral-950">
          YumYard<span className="text-[#67BD1F]">.Cafe</span>
        </h1>
        <Lottie
          lottieRef={lottieRef}
          animationData={storeClosedAnimation}
          autoplay
          loop
          className="h-[min(34dvh,260px)] min-h-[180px] w-full max-w-[340px]"
        />
      </div>
    </main>
  );
}
