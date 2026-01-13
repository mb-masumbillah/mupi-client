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
      {/* 🔤 Static Center Text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
        <div className="px-6 text-white">
          {/* H1 - 1 Line */}
          <h1 className="text-4xl md:text-6xl font-bold ">
            Munshiganj Polytechnic Institute
          </h1>

          {/* Paragraph - 2 lines max */}
          <p className="mt-4 text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed line-clamp-2">
            A leading technical institute committed to excellence in engineering
            education and innovation. 
          </p>

          {/* Button */}
          <div className="flex justify-center items-center mt-6">
            <Button text="Register Now" />
          </div>
        </div>
      </div>

      {/* 🌑 Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 🖼 Image Slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1200} // 👈 smooth transition
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        className="h-full w-full banner-swiper"
      >
        <SwiperSlide>
          <div className="relative h-full w-full slide-animate">
            <Image
              src="https://m.media-amazon.com/images/I/71x2SI+h3BL.jpg"
              alt="Campus View"
              fill
              priority
              className="object-cover brightness-75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full w-full slide-animate">
            <Image
              src="https://diplomabd.com/wp-content/uploads/2017/02/munshiganj-e1693044919312.jpg"
              alt="Munshiganj Polytechnic"
              fill
              className="object-cover brightness-75"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
