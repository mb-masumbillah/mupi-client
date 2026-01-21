"use client";

import ImageUpload from "@/components/form/ImageUpload";
import SelectInput from "@/components/form/SelectInput";
import TextInput from "@/components/form/TextInput";
import { registerStudent } from "@/services/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface StudentRegisterForm {
  fullName: string;
  roll: number;
  registration: number;
  department: string;
  session: string;
  shift: string;
  semester: string;
  email: string;
  password: string;
  confirmPassword: string;
  number: string;
  image: File;
}

const StudentRegisterForm = () => {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<StudentRegisterForm>({
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (data: StudentRegisterForm) => {
    const studentData = {
      password: data.password,
      student: {
        fullName: data.fullName,
        roll: data.roll,
        registration: data.registration,
        department: data.department,
        session: data.session,
        shift: data.shift,
        semester: data.semester,
        email: data.email,
        number: data.number,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    if (data.image) formData.append("file", data.image);

    try {
      const res = await registerStudent(formData);

      console.log(res);

      if (res.success) {
        Swal.fire({
          title: "রেজিস্ট্রেশন সফল হয়েছে 🎉",
          text: "আপনি রেজিস্টার সফলভাবে সম্পন্ন করেছেন। এখন রেজিস্টার শাখায় যোগাযোগ করে আপনার অ্যাকাউন্ট Approve নিশ্চিত করুন।",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          router.replace("/");
        });
      } else {
        toast.error(res?.message);
      }

      reset();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image src="/logo.svg" alt="Logo" width={90} height={90} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Student Registration
          </h2>
          <p className="text-sm text-gray-500">
            Please fill the form carefully
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextInput
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            control={control}
            rules={{ required: "Full name is required" }}
          />

          <TextInput
            label="Roll"
            name="roll"
            type="number"
            placeholder="123456"
            control={control}
            rules={{ required: "Roll number is required" }}
          />

          <TextInput
            label="Registration No"
            name="registration"
            type="number"
            placeholder="1234567890"
            control={control}
            rules={{ required: "Registration number is required" }}
          />

          <SelectInput
            label="Department"
            name="department"
            control={control}
            rules={{ required: "Select your department" }}
            options={[
              "Computer",
              "Electrical",
              "Civil",
              "Mechanical",
              "IPCT",
              "Electronics",
              "Electro_Medical",
              "RAC",
            ]}
          />

          <TextInput
            label="Session"
            name="session"
            placeholder="2022-2023"
            control={control}
            rules={{
              required: "Session is required",
              pattern: {
                value: /^\d{4}-\d{4}$/,
                message: "Use format: 2022-2023",
              },
            }}
          />

          <SelectInput
            label="Shift"
            name="shift"
            control={control}
            rules={{ required: "Select shift" }}
            options={["First", "Second"]}
          />

          <SelectInput
            label="Semester"
            name="semester"
            control={control}
            rules={{ required: "Select semester" }}
            options={[
              "First",
              "Second",
              "Third",
              "Fourth",
              "Fifth",
              "Sixth",
              "Seventh",
              "Eighth",
            ]}
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            control={control}
            rules={{
              required: "Password required",
              minLength: { value: 6, message: "At least 6 characters" },
            }}
          />

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            control={control}
            rules={{
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />

          <TextInput
            label="WhatsApp Number"
            name="number"
            placeholder="+8801XXXXXXXXX"
            control={control}
            rules={{
              required: "Phone number required",
              pattern: {
                value: /^\+8801[3-9][0-9]{8}$/,
                message: "Use +8801XXXXXXXXX format",
              },
            }}
          />

          <ImageUpload
            label="Student Image"
            name="image"
            control={control}
            rules={{ required: "Student image is required" }}
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#00455D] text-white px-6 py-3 rounded-xl hover:bg-transparent border hover:border-[#00455D] hover:text-[#00455D] transition"
            >
              Submit Registration
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#00455D] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
