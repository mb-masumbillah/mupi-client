import Button from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="bg-gray-100 py-20 ">
      <div className="max-width mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT SIDE - TEXT */}
          <div>
            <span className="text-primary font-semibold tracking-wide uppercase">
              About Our Institute
            </span>

            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Munshiganj Polytechnic Institute
            </h2>

            <div className="w-24 h-1 bg-primary mt-4 rounded-full" />

            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              Munshiganj Polytechnic Institute is a renowned government technical
              institution committed to delivering high-quality diploma-level
              engineering education. Since its establishment, the institute has
              played a significant role in producing skilled professionals for
              national and international industries.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed text-lg">
              Our academic system emphasizes practical learning, modern
              technology, and professional discipline. Through experienced
              faculty members, advanced laboratories, and a structured learning
              environment, we ensure the comprehensive development of our
              students.
            </p>
            <Button text="About us" className="px-10 border hover:border mt-5" icon={<MoveRight/>} />
        
          </div>

          {/* RIGHT SIDE - 3 IMAGES */}
          <div className="relative w-full h-[400px]">
            {/* Main Image */}
            <div className="absolute -top-5 left-0 w-[80%] h-[70%] rounded-2xl overflow-hidden ">
              <Image
                src="https://diplomabd.com/wp-content/uploads/2017/02/munshiganj-e1693044919312.jpg"
                alt="Campus View"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="absolute -bottom-5 right-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="https://m.media-amazon.com/images/I/71x2SI+h3BL.jpg"
                alt="Academic Building"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 3 */}
            <div className="absolute -bottom-5 left-14 w-[35%] h-[35%] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="https://m.media-amazon.com/images/I/71x2SI+h3BL.jpg"
                alt="Institute Environment"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
