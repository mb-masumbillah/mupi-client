"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <section className="bg-[#091924] pt-10">
      <div className="max-width">
        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">

          {/* Footer logo and text  */}
          <div className="py-10">
            <div className="flex gap-4 items-center flex-col md:flex-row md:items-center">
              <div>
                <Image
                  src="/logo.svg" // logo.svg must be in /public folder
                  alt="MUPI Logo"
                  width={48}      // ✅ fixed width
                  height={48}     // ✅ fixed height
                  className="h-12 w-auto"
                />
              </div>
              <h2 className="text-2xl font-semibold text-white text-center md:text-left">
                <span className="text-4xl">Munshiganj</span> <br /> Polytechnic Institute
              </h2>
            </div>

            <p className="text-gray-500 py-4 text-center md:text-left">
              Munshiganj Polytechnic Institute, Mirkadim, Munshiganj
            </p>
            <p className="text-gray-500 py-3 text-center md:text-left">
              Copyright © 2025 MUPI. All Rights Reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-gray-400">
            <h3 className="py-3 text-2xl">Quick Links</h3>
            <p className="py-2 cursor-pointer hover:text-white">Home</p>
            <p className="py-2 cursor-pointer hover:text-white">About</p>
            <p className="py-2 cursor-pointer hover:text-white">Academic</p>
            <p className="py-2 cursor-pointer hover:text-white">Institute</p>
            <p className="py-2 cursor-pointer hover:text-white">About MUPI</p>
          </div>

          <div className="text-gray-400">
            <h3 className="py-3 text-2xl">Quick Links</h3>
            <p className="py-2 cursor-pointer hover:text-white">Dashboard</p>
            <p className="py-2 cursor-pointer hover:text-white">Admission</p>
          </div>

          <div className="text-gray-400">
            <h3 className="py-3 text-2xl">Contact Us</h3>
            <p className="py-2">Email: munpoly@gmail.com</p>
            <p className="py-2">Phone: +088 1234567890</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Footer;
