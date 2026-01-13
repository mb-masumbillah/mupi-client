"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = `text-xl relative before:absolute before:content-[''] before:bg-[#003646] before:h-0.75 before:left-0 before:duration-400 hover:scale-105 transition-all duration-400 before:-bottom-[4px] hover:before:w-full`;

  const links = [
    { href: "/", label: "Home" },
    { href: "/notice", label: "Notice" },
    { href: "/academic", label: "Academic" },
    { href: "/instructors", label: "Instructor" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About MUPI" },
  ];

  return (
    <section className="relative z-50 max-width">
      <nav className="flex justify-between items-center wrapper py-3">
        {/* Logo */}
        <div className="">
          <Link href="/">
            <Image
              src="logo.svg"
              alt="Logo"
              className="h-16 w-auto"
              width={64}
              height={64}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-8 items-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="bg-[#003646] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#003646] duration-500 hover:text-black"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#003646] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#003646] duration-500 hover:text-black"
            >
              Registration
            </Link>
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
              <Link
                href={link.href}
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 p-4">
          <Link
            href="/login"
            className="bg-[#003646] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#003646] duration-500 hover:text-black text-center"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-[#003646] text-white px-5 py-2 rounded-lg hover:bg-transparent border border-[#003646] duration-500 hover:text-black text-center"
            onClick={() => setIsOpen(false)}
          >
            Registration
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
