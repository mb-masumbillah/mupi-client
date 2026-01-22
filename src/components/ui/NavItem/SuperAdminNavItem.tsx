"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  navClass: (isActive: boolean) => string;
}

const SuperAdminNavItem = ({
  navClass,
}: Props) => {

  // ✅ use client-only hook
  const pathname = usePathname() || "";

  const isActive = (href: string) => pathname === href;

  return (
    <div>
      <Link
        href="/dashboard/super-admin"
        className={navClass(isActive("/dashboard/super-admin"))}
      >
        <span>Dashboard</span>
        <ChevronRight />
      </Link>

      <Link
        href="/dashboard/super-admin/all-student"
        className={navClass(isActive("/dashboard/super-admin/all-student"))}
      >
        <span>All Student</span>
        <ChevronRight />
      </Link>

      <Link
        href="/dashboard/super-admin/all-payment"
        className={navClass(isActive("/dashboard/super-admin/all-payment"))}
      >
        <span>All Payment</span>
        <ChevronRight />
      </Link>
      <Link
        href="/dashboard/super-admin/student-approval"
        className={navClass(isActive("/dashboard/super-admin/student-approval"))}
      >
        <span>Student Approval</span>
        <ChevronRight />
      </Link>
      <Link
        href="/dashboard/super-admin/payment-approval"
        className={navClass(isActive("/dashboard/super-admin/payment-approval"))}
      >
        <span>Payment Approval</span>
        <ChevronRight />
      </Link>
    </div>
  );
};

export default SuperAdminNavItem;
