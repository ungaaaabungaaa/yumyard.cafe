import { StoreClosedScreen } from "@/components/store-closed-screen";
import { isStoreOpen } from "@/lib/store-hours";

export const dynamic = "force-dynamic";

export default function Home() {
  if (!isStoreOpen()) {
    return <StoreClosedScreen />;
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="w-full max-w-full whitespace-nowrap text-[clamp(2rem,10.5vw,3rem)] font-bold leading-none tracking-normal text-neutral-950">
        YumYard<span className="text-[#67BD1F]">.Cafe</span>
      </h1>
      <p className="mt-5 text-base font-medium text-neutral-700">
        We are open
      </p>
    </main>
  );
}
