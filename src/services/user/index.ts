"use server";
import { cookies } from "next/headers";

export const registerStudent = async (formData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-student`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerInstructor = async (formData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-instructor`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createTemporaryAdmin = async(formData:FormData) =>{
  const token = (await cookies()).get("accessToken")?.value

  if(!token) throw new Error("Unauthorized")

  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create-temporaryAdmin`, {
      method: "POST",
      headers:{
        authorization: token
      },
      body:formData,
    })

    const result = await res.json()

    return result

  }catch(error:any){
    throw new Error(error?.message)
  }
}

export const chnageStatus = async (email: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) throw new Error("Unauthorized: No access token found");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/change-status/${email}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: {
          authorization: token,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const myProfile = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) throw new Error("Unauthorized: No access token found");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
