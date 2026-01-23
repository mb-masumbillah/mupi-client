import { Metadata } from "next";
import Link from "next/link";
import departments from "@/public/departments.json";
import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Academic",
  description:
    "Munshiganj Polytechnic Institute official academic page with latest notices, departments, and announcements.",
};

const Academic = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-l-8 border-[#00455D] pl-6">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Academic <span className="text-[#00455D]">Departments</span>
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Explore our specialized engineering programs at Munshiganj
            Polytechnic Institute.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {departments.map((department) => (
            <div
              key={department.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={department.image}
                  alt={department.name}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#00455D] flex items-center">
                  <GraduationCap size={14} className="mr-1" />
                  MPI
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#00455D]">
                  {department.name}
                </h3>

                <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm border-t pt-4">
                  <div>
                    <p className="font-bold text-gray-800">{department.seat}</p>
                    <p>Seats</p>
                  </div>
                  <div className="w-[1px] h-8 bg-gray-200" />
                  <div>
                    <p className="font-bold text-gray-800">4 Years</p>
                    <p>Duration</p>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Link href={`/academic/${department.id}`}>
                    <button className="w-full bg-gray-100 hover:bg-[#00455D] hover:text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                      View Details
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="h-2 w-0 group-hover:w-full bg-[#00455D] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Academic;
