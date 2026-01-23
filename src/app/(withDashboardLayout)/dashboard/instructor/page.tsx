import ChangePassword from "@/src/components/module/dashboard/profile/ChangePassword";
import PersonalInfo from "@/src/components/module/dashboard/profile/PersonalInfo";
import ProfileCard from "@/src/components/module/dashboard/profile/ProfileCard";
import { useEffect, useState } from "react";





export type InstructorProfile = {
  id: string;
  fullName: string;
  instructorId: string;
  email: string;
  number: string;
  department: string;
  image: string;
  role: "instructor";
  status: "approved" | "pending";
  lastLogin: string; // তুমি চাইলে Date টাইপও দিতে পারো
  isDeleted: boolean;
};




export const instructorProfile: InstructorProfile = {
  id: "ins-98765",
  fullName: "Rakib Hasan",
  instructorId: "INS2023-01",
  email: "rakib@instructor.com",
  number: "+8801711122233",
  department: "Computer",
  image: "/images/instructor-avatar.jpg",
  role: "instructor", 
  status: "approved",
  lastLogin: "2026-01-22 09:30 AM",
  isDeleted: false,
};

export default function Instructor() {
  const [instructor, setInstructor] = useState<InstructorProfile | null>(instructorProfile);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await myProfile("instructor"); // pass role
  //     setInstructor(res.data);
  //   };
  //   fetchData();
  // }, [setInstructor]);

  if (!instructor) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProfileCard user={instructor} />

      <div className="md:col-span-2 space-y-6">
        <PersonalInfo user={instructor} />
        <ChangePassword />
      </div>
    </div>
  );
}
