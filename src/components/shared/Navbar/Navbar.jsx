"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, logoutUser } = useUser(); // ✅ get logoutUser from context

  const links = [
    { href: "/", label: "Home" },
    { href: "/notice", label: "Notice" },
    { href: "/academic", label: "Academic" },
    { href: "/instructors", label: "Instructor" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About MUPI" },
  ];

  const navLinkClass = (href) =>
    `relative text-xl pb-1 transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:h-[3px] before:bg-[#00455D] 
     before:w-0 before:transition-all before:duration-300 hover:before:w-full ${
       pathname === href ? "font-semibold text-primary before:w-full" : "text-gray-800"
     }`;

  const handleDashboardRedirect = () => {
    if (!user) return;

    switch (user.role) {
      case "superAdmin":
        router.push("/dashboard/super-admin");
        break;
      case "temporaryAdmin":
        router.push("/dashboard/temporary-admin");
        break;
      case "student":
        router.push("/dashboard/student");
        break;
      case "instructor":
        router.push("/dashboard/instructor");
        break;
      default:
        router.push("/dashboard");
    }
  };

  const handleLogout = () => {
    logoutUser(); // ✅ clear context + cookies
    router.push("/"); // home redirect
    setIsOpen(false);
  };

  return (
    <section className="relative z-50 max-width">
      <nav className="flex justify-between items-center wrapper py-3">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" className="h-16 w-auto" width={64} height={64} />
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-8 items-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {user ? (
              <>
                <button
                  onClick={handleDashboardRedirect}
                  className="bg-[#00455D] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#00455D] duration-500 hover:text-black"
                >
                  {user.fullName || "Profile"}
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-transparent border border-red-500 duration-500 hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-[#00455D] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#00455D] duration-500 hover:text-black"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#00455D] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#00455D] duration-500 hover:text-black"
                >
                  Registration
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white w-full absolute top-full left-0 shadow-lg z-50 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass(link.href)} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 p-4">
          {user ? (
            <>
              <button
                onClick={() => {
                  handleDashboardRedirect();
                  setIsOpen(false);
                }}
                className="bg-[#00455D] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#00455D] duration-500 hover:text-black text-center"
              >
                {user.fullName || "Profile"}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-transparent border border-red-500 duration-500 hover:text-red-500 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-[#00455D] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#00455D] duration-500 hover:text-black text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-[#00455D] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#00455D] duration-500 hover:text-black text-center"
                onClick={() => setIsOpen(false)}
              >
                Registration
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
