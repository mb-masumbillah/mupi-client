import Link from "next/link";
import Image from "next/image";
import departments from "@/public/departments.json";
import {
  Clock,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
  ChevronLeft,
} from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const DepartmentDetails = async ({ params }: Props) => {
  // ✅ params unwrap
  const { id } = await params;

  console.log(id)

  const department = departments.find((dep) => dep.id === id);

  if (!department) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500">
          Department Not Found
        </h2>
        <Link href="/" className="mt-4 text-[#00455D] underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* HERO */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={department.image}
          alt={department.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10 flex flex-col justify-end">
          <Link
            href="/academic"
            className="text-white/80 hover:text-white flex items-center mb-6"
          >
            <ChevronLeft size={20} />
            Back to Departments
          </Link>

          <h1 className="text-5xl font-extrabold text-white">
            {department.name}
          </h1>

          <p className="text-white/90 max-w-2xl mt-3">
            {department.description}
          </p>
        </div>
      </div>

      {/* INFO */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <InfoCard title="Duration" value={department.duration} icon={<Clock />} />
          <InfoCard
            title="Total Seats"
            value={`${department.seat} Seats`}
            icon={<Users />}
          />
          <InfoCard title="Shift" value={department.shift} icon={<BookOpen />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Skills */}
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="flex items-center mb-6">
              <GraduationCap className="text-[#00455D] mr-3" size={30} />
              <h3 className="text-2xl font-bold">Skills You Will Master</h3>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
              {department.skills.map((skill, i) => (
                <li
                  key={i}
                  className="bg-blue-50 p-3 rounded-xl text-blue-800 font-medium"
                >
                  • {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Career */}
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="flex items-center mb-6">
              <Briefcase className="text-orange-600 mr-3" size={30} />
              <h3 className="text-2xl font-bold">Career Opportunities</h3>
            </div>

            <div className="space-y-4">
              {department.career.map((job, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-xl hover:bg-orange-50 transition"
                >
                  {i + 1}. {job}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;

/* InfoCard */
interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const InfoCard = ({ title, value, icon }: InfoCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-bold uppercase">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);
