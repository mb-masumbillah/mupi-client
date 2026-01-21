"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
  linkClass: (href: string) => string;
  navClass: (isActive: boolean) => string;
}

const SuperAdminNavItem = ({ openMenu, setOpenMenu, linkClass, navClass }: Props) => {
  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);

  // ✅ use client-only hook
  const pathname = usePathname() || "";

  const isActive = (href: string) => pathname === href;

  return (
    <div>
      <Link href="/dashboard/super-admin" className={navClass(isActive("/dashboard/super-admin"))}>
        <span>Dashboard</span>
        <ChevronRight />
      </Link>

      <button
        onClick={() => toggleMenu("allStudent")}
        className={`w-full px-3 py-2 flex justify-between items-center rounded mt-2 ${
          openMenu === "allStudent" ? "bg-[#00455D] text-white" : "hover:bg-[#e0f0f7]"
        }`}
      >
        <span>All Student</span>
        <ChevronDown />
      </button>

      {openMenu === "allStudent" && (
        <div className="bg-[#00455D] text-white rounded px-5 py-2">
          <Link
            href="/dashboard/super-admin/all-student"
            className={linkClass("/dashboard/super-admin/all-student")}
          >
            All Student
          </Link>
          <Link
            href="/dashboard/super-admin/student-approval"
            className={linkClass("/dashboard/super-admin/student-approval")}
          >
            Student Approval
          </Link>
          <Link
            href="/dashboard/super-admin/all-payment"
            className={linkClass("/dashboard/super-admin/all-payment")}
          >
            All Payment
          </Link>
          <Link
            href="/dashboard/super-admin/payment-approval"
            className={linkClass("/dashboard/super-admin/payment-approval")}
          >
            Payment Approval
          </Link>
        </div>
      )}
    </div>
  );
};

export default SuperAdminNavItem;
