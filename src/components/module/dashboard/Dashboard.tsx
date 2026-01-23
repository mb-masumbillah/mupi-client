"use client";

import useUser from "@/src/hooks/useUser";
import SuperAdminNavItem from "../../ui/NavItem/SuperAdminNavItem";
import { Home, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StudentNavItem from "../../ui/NavItem/StudentNavItem";
import InstructorNavItem from "../../ui/NavItem/InstructorNavItem";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutUser, user } = useUser();
  const router = useRouter();

  // replace with RTK Query / Auth context
  const designation = user?.role

  const handleLogout = () => {
    logoutUser();
    router.replace("/");
  };

  const navClass = (isActive: boolean) =>
    `px-3 py-2 rounded flex justify-between items-center ${
      isActive ? "text-white bg-[#00455D]" : "text-[#00202E] hover:bg-[#e0f0f7]"
    }`;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-white p-2 rounded shadow border"
      >
        <Menu />
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r pl-3 border-gray-300 bg-white z-40 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-5 right-5 bg-gray-100 p-2 rounded"
        >
          <X />
        </button>

        <div className="border border-gray-300 py-4 flex justify-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>

        <div className="p-4 pt-8 pl-0 space-y-3 flex-1 overflow-y-auto">
          {designation === "superAdmin" && (
            <SuperAdminNavItem navClass={navClass} />
          )}
          {designation === "student" && (
            <StudentNavItem navClass={navClass} />
          )}
          {designation === "instructor" && (
            <InstructorNavItem navClass={navClass} />
          )}

          {/* TemporaryAdminNavItem, StudentNavItem, InstructorNavItem */}
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 py-4 border-t px-3 border-gray-300"
        >
          <Home />
          <span>Go To Home</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-4 px-3"
        >
          <LogOut className="text-red-500" />
          <span>Log Out</span>
        </button>
      </aside>

      <main className="flex-1 h-full overflow-y-auto ml-0 lg:ml-64 transition-all">
        <div className="pb-6 pt-6 border-b border-gray-300 text-2xl font-bold bg-white sticky top-0 text-center lg:text-left lg:pl-6">
           DASHBOARD
        </div>
        <div className="p-6">{children}</div>
      </main>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 lg:hidden z-30"
        />
      )}
    </div>
  );
};

export default Dashboard;
