"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Button from "@/components/ui/Button";

const Banner = () => {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* 🔥 Gradient + Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      {/* 🏫 Center Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="text-center bg-black/15 backdrop-blur-xs border border-white/20 rounded-2xl px-10 py-12 shadow-2xl">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            Munshiganj Polytechnic Institute
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            A premier government technical institute dedicated to producing
            skilled engineers through quality education, innovation, and
            practical excellence.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button text="Registration Now" />
            <button className="px-6 py-3 rounded-lg border border-white/60 text-white hover:bg-white hover:text-black transition">
              Explore Departments
            </button>
          </div>
        </div>
      </div>

      {/* 🖼 Slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        <SwiperSlide>
          <Image
            src="https://diplomabd.com/wp-content/uploads/2017/02/munshiganj-e1693044919312.jpg"
            alt="Campus"
            fill
            priority
            className="object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            src="https://m.media-amazon.com/images/I/71x2SI+h3BL.jpg"
            alt="Institute View"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
