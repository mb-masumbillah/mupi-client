"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import TextInput from "@/src/components/form/TextInput";
import { toast } from "sonner";

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}




const ChangePassword = () => {

  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, reset } =
    useForm<ChangePasswordFormValues>({
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

  // ✅ useWatch to get real-time newPassword
  const newPasswordValue = useWatch({
    control,
    name: "newPassword",
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {

    console.log(data)
    // try {
    //   if (data.newPassword !== data.confirmPassword) {
    //     toast.error("New Password and Confirm Password must match");
    //     return;
    //   }


    //   const res = await changePassword({
    //     currentPassword: data.currentPassword,
    //     newPassword: data.newPassword,
    //   });

    //   if (res.success) {
    //     toast.success(res.message || "Password updated successfully");
    //     reset();
    //   } else {
    //     toast.error(res.message || "Password update failed");
    //   }
    // } catch (error: any) {
    //   toast.error(error.message || "Something went wrong");
    // }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6  mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center">
        Change Password
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {/* Current Password */}
        <TextInput
            label="Current Password"
            name="currentPassword"
            type="password"
            control={control}
            rules={{
              required: "Current Password is required",
              minLength: {
                value: 6,
                message: "Current Password must be at least 6 characters",
              },
            }}
            placeholder="••••••"
          />

        <TextInput
            label="New Password"
            name="newPassword"
            type="password"
            control={control}
            rules={{
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "New Password must be at least 6 characters",
              },
            }}
            placeholder="••••••"
          />


        {/* Confirm Password */}
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            control={control}
            rules={{
              required: "Confirm your password",
              validate: (value) =>
                value === newPasswordValue || "Passwords do not match",
            }}
          />

      

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#00455D] text-white py-2 px-6 rounded-xl hover:bg-transparent hover:text-[#00455D] border border-transparent hover:border-[#00455D] transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}


export default ChangePassword;