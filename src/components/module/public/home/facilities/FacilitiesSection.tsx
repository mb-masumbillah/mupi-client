"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  Library,
  Monitor,
  Wrench,
  Trophy,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const facilities = [
  {
    id: "library",
    title: "Modern Library",
    description:
      "A well-equipped library with academic books, journals, and digital resources.",
    icon: Library,
  },
  {
    id: "computer-lab",
    title: "Computer Lab",
    description:
      "High-performance computers with modern software for practical learning.",
    icon: Monitor,
  },
  {
    id: "workshop",
    title: "Engineering Workshops",
    description:
      "Advanced workshops for hands-on training in mechanical and electrical fields.",
    icon: Wrench,
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    description:
      "Facilities for physical fitness, sports, and recreational activities.",
    icon: Trophy,
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    description:
      "Facilities for physical fitness, sports, and recreational activities.",
    icon: Trophy,
  },
];

const FacilitiesSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-width px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Campus Facilities
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Our campus provides modern facilities to ensure quality education,
            practical experience, and student well-being.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {facilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <SwiperSlide key={`facility-${item.id}-${index}`}>
                <Link href={`/facilities/${item.id}`}>
                  <div className="h-full border rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-block mt-4 text-primary font-medium">
                      View Details →
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default FacilitiesSection;
