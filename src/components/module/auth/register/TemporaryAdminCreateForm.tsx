"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import TextInput from "@/components/form/TextInput";
import ImageUpload from "@/components/form/ImageUpload";

interface TemporaryAdminFormData {
  fullName: string;
  email: string;
  password: string;
  image: File | null;
}

const TemporaryAdminCreateForm = () => {
  const { handleSubmit, control } =
    useForm<TemporaryAdminFormData>({
      defaultValues: {
        image: null,
      },
    });

  const onSubmit = (data: TemporaryAdminFormData) => {
    console.log("Temporary Admin Data:", data);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.image) {
      formData.append("image", data.image);
    }

    // 👉 API call here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6 animate-fadeIn">

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
            Temporary Admin Create
          </h2>
          <p className="text-sm text-gray-500">
            Create a temporary admin account
          </p>
        </div>

        {/* 🧾 Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextInput<TemporaryAdminFormData>
            label="Full Name"
            name="fullName"
            control={control}
            rules={{ required: "Full name is required" }}
            placeholder="Enter full name"
          />

          <TextInput<TemporaryAdminFormData>
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
            placeholder="admin@example.com"
          />

          <TextInput<TemporaryAdminFormData>
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

          {/* 📷 Image Upload */}
          <ImageUpload<TemporaryAdminFormData>
            label="Admin Image"
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#00455D] text-white text-base md:text-lg px-6 py-2 md:px-8 md:py-3 rounded-xl hover:bg-transparent border-transparent border hover:border-[#00455D] hover:text-[#00455D] transition"
            >
              Create Temporary Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemporaryAdminCreateForm;
