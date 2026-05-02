"use client";

import chevronLeft from "@iconify-icons/mdi/chevron-left";
import { Icon } from "@iconify/react/offline";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type NavHeaderProps = {
  ariaLabel: string;
  showBack?: boolean;
  title: ReactNode;
};

export function NavHeader({
  ariaLabel,
  showBack = true,
  title,
}: NavHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 h-auto shrink-0 bg-transparent py-4 text-[#363A33]">
      <nav
        aria-label={ariaLabel}
        className="relative flex h-full items-center justify-center"
      >
        {showBack ? (
          <button
            aria-label="Go back"
            className="absolute left-0 inline-flex items-center p-0 text-[#363A33]"
            type="button"
            onClick={() => router.back()}
          >
            <Icon
              aria-hidden
              icon={chevronLeft}
              color="#363A33"
              height={32}
              width={32}
              className="-ml-2 shrink-0"
            />
            <span className="text-base font-semibold leading-none">Back</span>
          </button>
        ) : null}
        <span className="text-lg font-semibold leading-none text-[#363A33]">
          {title}
        </span>
      </nav>
    </header>
  );
}
