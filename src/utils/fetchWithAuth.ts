
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let accessToken = Cookies.get("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    authorization: accessToken ? accessToken : "",
  };

  let res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include", // refresh token send
  });

  if (res.status === 401) {
    // refresh token দিয়ে নতুন access token নাও
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) throw new Error("Session expired. Please login again.");

    const refreshData = await refreshRes.json();
    accessToken = refreshData.data.accessToken;

    Cookies.set("accessToken", accessToken as string, { expires: 1 });

    // retry original request
    const retryHeaders = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      authorization: accessToken as string,
    };

    res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: retryHeaders,
      credentials: "include",
    });
  }

  return res.json();
};
