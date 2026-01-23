"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  navClass: (isActive: boolean) => string;
}

const InstructorNavItem = ({
  navClass,
}: Props) => {

  // ✅ use client-only hook
  const pathname = usePathname() || "";

  const isActive = (href: string) => pathname === href;

  return (
    <div>
      <Link
        href="/dashboard/instructor"
        className={navClass(isActive("/dashboard/instructor"))}
      >
        <span>Dashboard</span>
        <ChevronRight />
      </Link>

    </div>
  );
};

export default InstructorNavItem;
