// src/services/auth/index.ts
import { LoginFormValues } from "@/components/module/auth/login/LoginForm";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const login = async (userData: LoginFormValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include", // refresh token cookie backend থেকে পাঠানোর জন্য
    });


    const result = await res.json();

    // Client-side cookie set (js-cookie)
    if (result?.success && result?.data?.accessToken) {
      Cookies.set("accessToken", result.data.accessToken, { expires: 1 }); // 1 day
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const getRefreshTokenToAccessToken = async () => {
  return fetchWithAuth("/user/profile", { method: "GET" });
};


export const getCurrentUser = async() => {
  const accessToken = Cookies.get("accessToken"); 

  let decodedData = null

  if(accessToken){
    decodedData = await jwtDecode(accessToken)
    return decodedData
  }else{
    decodedData = null
  }

};


export const logout = async () => {
  Cookies.remove("accessToken")
};
