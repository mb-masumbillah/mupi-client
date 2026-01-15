"use client";

import { useState } from "react";
import StudentRegisterForm from "@/components/module/auth/register/StudentRegisterForm";
import TeacherRegisterForm from "@/components/module/auth/register/TeacherRegisterForm";
import Image from "next/image";

const Register = () => {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);

  return (
    <div>
      <div className="min-h-screen">
        {/* Role Select */}

        {!role && (
          <div className="flex max-w-md mx-auto justify-center items-center min-h-screen">
            <div className="border p-10 border-gray-300 rounded-2xl w-full">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <Image src="/logo.svg" alt="Logo" width={90} height={90} />
              </div>

              <h2 className="text-xl font-semibold text-center mb-6">
                Register As
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setRole("student")}
                  className="w-full py-3 rounded-xl border-2 border-[#00455D] text-[#00455D] font-semibold hover:bg-[#00455D] hover:text-white transition px-5 cursor-pointer"
                >
                  Student Register
                </button>

                <button
                  onClick={() => setRole("teacher")}
                  className="w-full py-3 px-5 rounded-xl border-2 border-[#00455D] text-[#00455D] font-semibold hover:bg-[#00455D] hover:text-white transition  cursor-pointer"
                >
                  Teacher Register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Student Form */}
        {role === "student" && (
          <>
           <button
              onClick={() => setRole(null)}
              className="text-sm text-gray-500 mb-2"
            >
              ← Back
            </button>
            <StudentRegisterForm />
          </>
        )}

        {/* Teacher Form */}
        {role === "teacher" && (
          <>
           <button
              onClick={() => setRole(null)}
              className="text-sm text-gray-500 mb-2"
            >
              ← Back
            </button>
            <TeacherRegisterForm />
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
