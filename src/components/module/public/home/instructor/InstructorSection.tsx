"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const teachers = [
  {
    name: "Dr. Md. Example Sir",
    role: "Principal",
    image: "/images/teachers/principal.jpg",
  },
  {
    name: "Engr. Example Mam",
    role: "Vice Principal",
    image: "/images/teachers/vice-principal.jpg",
  },
  {
    name: "Engr. Dept Head",
    role: "Head of Department",
    image: "/images/teachers/hod.jpg",
  },
  {
    name: "Engr. Senior Instructor",
    role: "Senior Instructor",
    image: "/images/teachers/instructor.jpg",
  },
];

const InstructorSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-width px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Our Leadership & Instructors
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {teachers.map((teacher, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-64">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {teacher.name}
                  </h3>
                  <p className="text-primary font-medium mt-1">
                    {teacher.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InstructorSection;
