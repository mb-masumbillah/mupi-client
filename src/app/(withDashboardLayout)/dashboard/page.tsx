"use client";

import SuperAdminNavItem from "@/components/ui/NavItem/SuperAdminNavItem";
import { Home, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardLayoutProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  //   const { logout, role: designation } = useAuth();

  const handleLogout = () => {
    // logout();
    router.replace("/");
  };

  const linkClass = (href: string) =>
    `block w-full px-2 py-2 rounded text-sm border mb-2 border-[#006A8E] ${
      pathname === href ? "bg-[#006A8E] text-white" : "hover:bg-[#006A8E]/30"
    }`;

  const navClass = (isActive: boolean) =>
    `px-3 py-2 rounded flex justify-between items-center ${
      isActive ? "text-white bg-[#00455D]" : "text-[#00202E] hover:bg-[#e0f0f7]"
    }`;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-white p-2 rounded shadow border"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r pl-3 border-gray-300 bg-white z-40 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-5 right-5 bg-gray-100 p-2 rounded"
        >
          <X />
        </button>

        {/* Logo */}
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

        {/* Navigation */}
        <div className="p-4 pt-8 pl-0 space-y-3 flex-1 overflow-y-auto">
          <SuperAdminNavItem
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            linkClass={linkClass}
            navClass={navClass}
          />

          {/* {designation === "superAdmin" && (
            <SuperAdminNavItem
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              linkClass={linkClass}
              navClass={navClass}
            />
          )}

          {designation === "student" && (
            <StudentNavItem
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              linkClass={linkClass}
              navClass={navClass}
            />
          )} */}
        </div>

        {/* Footer links */}
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

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto ml-0 lg:ml-64 transition-all">
        <div className="pb-6 pt-6 border-b border-gray-300 text-2xl font-bold bg-white sticky top-0 text-center lg:text-left lg:pl-6">
          loading..............
          {/* {designation === "superAdmin" && <p>Super Admin</p>}
          {designation === "student" && <p>Student</p>} */}
        </div>

        <div className="p-6">{children}</div>
      </main>

      {/* Overlay */}
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
