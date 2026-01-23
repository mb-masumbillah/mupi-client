import React from "react";
import Navbar from "@/src/components/shared/Navbar/Navbar";
import Footer from "@/src/components/shared/Footer/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
