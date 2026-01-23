
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const departments = [
  {
    id: "cst",
    name: "Computer Technology",
    short:
      "Focused on software development, networking, and modern computing technologies.",
    image:
      "/academic/computer.png",
  },
  {
    id: "et",
    name: "Electrical Technology",
    short:
      "Covers electrical systems, power generation, and industrial automation.",
    image: "/academic/Electrical.png",
  },
  {
    id: "cst",
    name: "Civil Technology",
    short:
      "Specializes in construction, structural design, and infrastructure development.",
    image: "/academic/Civil.png",
  },
];

const DepartmentsSection = () => {


  return (
    <section className="bg-gray-100 py-20">
      <div className="max-width px-4">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Engineering Departments
            </h2>
            <p className="mt-3 text-gray-600 max-w-lg">
              Explore our industry-oriented engineering departments designed to
              build strong technical skills and professional excellence.
            </p>
          </div>

          <Link
            href="/academic"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all border-b-0 hover:border-b"
          >
            <span>View All Departments</span>
            <MoveRight size={18} />
          </Link>
        </div>

        {/* Departments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden  shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* BIG IMAGE */}
              <div className="relative w-full h-52">
                
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dept.name}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {dept.short}
                </p>

               <Link
                  href={`/academic/${dept.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 hover:border-b border-b-0 transition-all"
                >
                  <span>Explore Department</span>
                  <MoveRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
