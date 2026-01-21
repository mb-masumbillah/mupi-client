

import AboutSection from "@/components/module/public/home/about/AboutSection";
import Banner from "@/components/module/public/home/banner/Banner";
import DepartmentsSection from "@/components/module/public/home/department/DepartmentsSection";
import FacilitiesSection from "@/components/module/public/home/facilities/FacilitiesSection";
import InstructorSection from "@/components/module/public/home/instructor/InstructorSection";
import NoticeSection from "@/components/module/public/home/notice/NoticeSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Munshiganj Polytechnic Institute official home page with latest notices, departments, and announcements.",
};

const Home = () => {
  return (
    <div>
      <Banner />
      <NoticeSection />
      <AboutSection />
      <DepartmentsSection />
      <InstructorSection />
      <FacilitiesSection />

  {/* <button
        onClick={() =>
          (window.location.href = `http://localhost:5000/api/notice/download/488eba7e-04c1-43a3-8ca2-9956f325bd55`)
        }
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Download
      </button> */}


    </div>
  );
};

export default Home;
