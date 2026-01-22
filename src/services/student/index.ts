"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

// ================== HELPER FUNCTION ==================
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) throw new Error("Unauthorized: No access token found");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: token,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Something went wrong");
  }

  return res.json();
};

// ================== GET ALL STUDENTS ==================
export const getAllStudents = async () => {
  try {
    return await fetchWithAuth(`${BASE_URL}/student`);
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ================== GET SINGLE STUDENT ==================
export const getSingleStudent = async (email: string) => {
  try {
    return await fetchWithAuth(`${BASE_URL}/student/${email}`);
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ================== UPDATE STUDENT ==================
export const updateStudent = async (email: string, data: FormData) => {
  try {
    return await fetchWithAuth(`${BASE_URL}/student/update/${email}`, {
      method: "PATCH",
      body: data,
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  } finally {
    // profile "default" add করা হলো
    revalidateTag("STUDENT", "default");
  }
};

// ================== SOFT DELETE STUDENT ==================
export const deleteStudent = async (email: string) => {
  try {
    return await fetchWithAuth(`${BASE_URL}/student/delete/${email}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  } finally {
    revalidateTag("STUDENT", "default");
  }
};

// ================== PERMANENT DELETE STUDENT ==================
export const deleteStudentPermanent = async (email: string) => {
  try {
    return await fetchWithAuth(`${BASE_URL}/user/student-delete/${email}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  } finally {
    revalidateTag("STUDENT", "default");
  }
};
