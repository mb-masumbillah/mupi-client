"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  navClass: (isActive: boolean) => string;
}

const StudentNavItem = ({
  navClass,
}: Props) => {

  // ✅ use client-only hook
  const pathname = usePathname() || "";

  const isActive = (href: string) => pathname === href;

  return (
    <div>
      <Link
        href="/dashboard/student"
        className={navClass(isActive("/dashboard/student"))}
      >
        <span>Dashboard</span>
        <ChevronRight />
      </Link>
      <Link
        href="/dashboard/student/payment"
        className={navClass(isActive("/dashboard/student/payment"))}
      >
        <span>Payment</span>
        <ChevronRight />
      </Link>

    </div>
  );
};

export default StudentNavItem;
