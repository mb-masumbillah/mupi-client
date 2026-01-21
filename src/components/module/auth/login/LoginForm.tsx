// src/components/module/auth/login/LoginForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/services/auth";
import TextInput from "@/components/form/TextInput";
import Image from "next/image";
import Link from "next/link";

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image src="/logo.svg" alt="Logo" width={90} height={90} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Email"
            name="email"
            type="text"
            control={control}
            rules={{ required: "Email is required" }}
            placeholder="example@gmail.com"
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            control={control}
            rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
            placeholder="••••••"
          />

          <button type="submit" className="w-full bg-[#00455D] text-white py-2 px-6 rounded-xl hover:bg-transparent hover:text-[#00455D] border border-transparent hover:border-[#00455D] transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          {"Don't have an account? "}
          <Link href="/student-register" className="text-[#00455D] font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
