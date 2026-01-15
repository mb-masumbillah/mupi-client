"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import TextInput from "@/components/form/TextInput";
import ImageUpload from "@/components/form/ImageUpload";

interface TeacherRegisterFormData {
  name: string;
  teacherId: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
  image: File | null;
}

const TeacherRegisterForm = () => {
  const { handleSubmit, control, watch } =
    useForm<TeacherRegisterFormData>({
      defaultValues: {
        image: null,
      },
    });

  const password = watch("password");

  const onSubmit = (data: TeacherRegisterFormData) => {
    console.log("Teacher Register Data:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("teacherId", data.teacherId);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("password", data.password);
    if (data.image) formData.append("image", data.image);

    // 👉 API call here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6 animate-fadeIn">

        {/* 🔰 Header with Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="Institute Logo"
              width={90}
              height={90}
              priority
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Teacher Registration
          </h2>
          <p className="text-sm text-gray-500">
            Please fill up the form to register
          </p>
        </div>

        {/* 🧾 Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextInput<TeacherRegisterFormData>
            label="Teacher Name"
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            placeholder="Enter teacher name"
          />

          <TextInput<TeacherRegisterFormData>
            label="Teacher ID"
            name="teacherId"
            control={control}
            rules={{ required: "Teacher ID is required" }}
            placeholder="TCH-001"
          />

          <TextInput<TeacherRegisterFormData>
            label="Email"
            name="email"
            type="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
            placeholder="example@gmail.com"
          />

          <TextInput<TeacherRegisterFormData>
            label="WhatsApp Number"
            name="number"
            control={control}
            rules={{
              required: "Number is required",
              pattern: {
                value: /^\+8801[3-9][0-9]{8}$/,
                message: "Use valid BD number (+8801XXXXXXXXX)",
              },
            }}
            placeholder="+8801XXXXXXXXX"
          />

          <TextInput<TeacherRegisterFormData>
            label="Password"
            name="password"
            type="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            }}
            placeholder="••••••"
          />

          <TextInput<TeacherRegisterFormData>
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            control={control}
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            placeholder="••••••"
          />

          {/* 📷 Image Upload */}
          <ImageUpload<TeacherRegisterFormData>
            label="Teacher Image"
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#00455D] text-white text-base md:text-lg px-6 py-2 md:px-8 md:py-3 rounded-xl hover:bg-transparent border-transparent border hover:border-[#00455D] hover:text-[#00455D] transition"
            >
              Register Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegisterForm;
