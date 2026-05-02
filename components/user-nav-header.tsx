"use client";

import { NavHeader } from "@/components/nav-header";
import { usePathname } from "next/navigation";

type UserNavHeaderProps = {
  initialPathname: string;
  storeOpen: boolean;
};

function isStaffPath(pathname: string) {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/kitchen" ||
    pathname.startsWith("/kitchen/")
  );
}

export function UserNavHeader({
  initialPathname,
  storeOpen,
}: UserNavHeaderProps) {
  const pathname = usePathname() ?? initialPathname;

  if (!storeOpen || isStaffPath(pathname)) {
    return null;
  }

  return (
    <NavHeader
      ariaLabel="User navigation"
      showBack={pathname !== "/"}
      title={
        <>
          YumYard<span className="text-[#67BD1F]">.Cafe</span>
        </>
      }
    />
  );
}
