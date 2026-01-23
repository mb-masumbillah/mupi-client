import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/src/types/user";
import { LoginFormValues } from "@/src/components/module/auth/login/LoginForm";

export const login = async (userData: LoginFormValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include", // refresh token cookie backend থেকে পাঠানোর জন্য
    });

    const result = await res.json();

    if (result?.success && result?.data?.accessToken) {
      Cookies.set("accessToken", result.data.accessToken, { expires: 10 }); // 10 মিনিট
      // 2 মিনিট { expires: 1 / 720 }
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const getCurrentUser = async (): Promise<IUser | null> => {
  const token = Cookies.get("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token) as IUser;
    return decoded;
  } catch {
    return null;
  }
};

export const logout = async () => {
  Cookies.remove("accessToken");
};
