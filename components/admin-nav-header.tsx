"use client";

import { Icon } from "@iconify/react/offline";
import chevronLeft from "@iconify-icons/mdi/chevron-left";
import { useRouter } from "next/navigation";

export function AdminNavHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 h-auto py-4 shrink-0 bg-transparent text-[#363A33]">
      <nav
        aria-label="Admin navigation"
        className="relative flex h-full items-center justify-center"
      >
        <button
          aria-label="Go back"
          className="absolute left-0 inline-flex items-center p-0"
          type="button"
          onClick={() => router.back()}
        >
          <Icon aria-hidden icon={chevronLeft} className="size-8 text-[#363A33]" />
          <span className="text-base font-semibold leading-none">Back</span>
        </button>
        <span className="text-lg font-semibold leading-none text-[#363A33]">
          Admin
        </span>
      </nav>
    </header>
  );
}
