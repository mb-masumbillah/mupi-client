"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#003646] text-gray-200">
      {/* Top Section */}
      <div className="max-width mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="MUPI Logo"
              width={50}
              height={50}
              className="bg-white rounded-md p-1"
            />
            <span className="text-xl font-bold text-white">
              MUPI
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-300">
            Munshiganj Polytechnic Institute is committed to providing quality
            technical education and preparing skilled professionals for the future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/academic" className="hover:text-white transition">Academic</Link></li>
            <li><Link href="/instructors" className="hover:text-white transition">Instructors</Link></li>
            <li><Link href="/notice" className="hover:text-white transition">Notice</Link></li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Important</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About MUPI</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
            <li><Link href="/register" className="hover:text-white transition">Registration</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Munshiganj, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1XXX-XXXXXX
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@mupi.edu.bd
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Link href="#" className="hover:text-white transition">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Munshiganj Polytechnic Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
