"use client"

import ChangePassword from "@/src/components/module/dashboard/profile/ChangePassword";
import PersonalInfo from "@/src/components/module/dashboard/profile/PersonalInfo";
import ProfileCard from "@/src/components/module/dashboard/profile/ProfileCard";
import { useEffect, useState } from "react";



// types/student.ts
export interface IStudent {
  id: string;
  fullName: string;
  roll: string;
  registration: string;
  email: string;
  number: string;
  department: string;
  session: string;
  shift: string;
  semester: string;
  image: string;
  role: string;
  status: string;
  lastLogin: string;
  isDeleted: boolean;
}


export const studentProfile = {
  id: "stu-12345",
  fullName: "Masum Billah",
  roll: "2023001",
  registration: "REG2023-001",
  email: "masum@student.com",
  number: "+8801712345678",
  department: "Computer",
  session: "2023-2024",
  shift: "First",
  semester: "Fourth",
  image: "/images/student-avatar.jpg",
  role: "student",
  status: "approved",
  lastLogin: "2026-01-23 10:15 AM",
  isDeleted: false,
};

const Student = () => {
  const [student, setStudent] = useState<IStudent | null>(studentProfile);

  console.log(student);

  useEffect(() => {


    // const fetchData = async () => {
    //   const res = await myProfile("student"); 
    //   setStudent(res.data);
    // };
    // fetchData();
  }, []);

  if (!student) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="">
        <ProfileCard user={student} />
      </div>
      <div className="md:col-span-2 space-y-6">
        <PersonalInfo user={student} />
        <ChangePassword />
      </div>
    </div>
  );
}

export default Student;
