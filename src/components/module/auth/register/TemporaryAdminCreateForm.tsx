"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import ImageUpload from "@/src/components/form/ImageUpload";
import TextInput from "@/src/components/form/TextInput";
import { createTemporaryAdmin } from "@/src/services/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  image: File;
}

const CreateTemporaryAdminForm = ({ onClose }: Props) => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      password: "123456",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      password: data.password,
      temporaryAdmin: {
        fullName: data.fullName,
        email: data.email,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    formData.append("file", data.image);

    try {
      const res = await createTemporaryAdmin(formData);

      console.log(res);

      if (res.success) {
        Swal.fire({
          title: "রেজিস্ট্রেশন সফল হয়েছে 🎉",
          text: "আপনি Temporary Admin রেজিস্টার সফলভাবে সম্পন্ন করেছেন। এখন আপনি Temporary Admin হয়েছেন  ",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          router.replace("/");
        });
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      throw new Error(error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      {/* MODAL */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Image src="/logo.svg" alt="logo" width={70} height={70} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Create Temporary Admin
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            This admin will have limited access
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Full Name"
            name="fullName"
            control={control}
            rules={{ required: "Full name is required" }}
            placeholder="Rakib Hasan"
          />

          <TextInput
            label="Email Address"
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            placeholder="tempadmin@mupi.edu.bd"
          />

          <TextInput
            label="Default Password"
            name="password"
            control={control}
            placeholder="123456"
          />

          <ImageUpload
            label="Profile Image"
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
          />

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#00455D] text-white font-medium hover:bg-[#003448] transition"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemporaryAdminForm;
