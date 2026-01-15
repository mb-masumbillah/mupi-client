"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
  linkClass: (href: string) => string;
  navClass: (isActive: boolean) => string;
}

const SuperAdminNavItem = ({
  openMenu,
  setOpenMenu,
  linkClass,
  navClass,
}: Props) => {
  const pathname = usePathname();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div>
      {/* Dashboard */}
      <Link
        href="/dashboard"
        className={navClass(pathname === "/dashboard")}
      >
        <span>Dashboard</span>
        <ChevronRight />
      </Link>

      {/* All Student Menu */}
      <div>
        <button
          onClick={() => toggleMenu("allStudent")}
          className={`w-full px-3 py-2 flex justify-between items-center rounded-tl rounded-tr mt-2 ${
            openMenu === "allStudent"
              ? "bg-[#00455D] text-white"
              : "hover:bg-[#e0f0f7]"
          }`}
        >
          <span>All Student</span>
          <ChevronDown
            className={`transition-transform ${
              openMenu === "allStudent" ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {openMenu === "allStudent" && (
          <div className="bg-[#00455D] text-white rounded-b px-5 py-2 space-y-1">
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
    </div>
  );
};

export default SuperAdminNavItem;
