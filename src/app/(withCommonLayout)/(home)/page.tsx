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
      <NoticeSection/>
      <AboutSection/>
      <DepartmentsSection/>
    <InstructorSection/>
    <FacilitiesSection/>
    </div>
  );
};

export default Home;
