import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const currentAccessToken = Cookies.get("accessToken"); // const use

  // Helper: make fetch call
  const makeRequest = async (token?: string) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      authorization: token || "",
    };

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });

    return response;
  };

  // Initial request
  let res = await makeRequest(currentAccessToken);

  // যদি access token expired হয় (401 Unauthorized)
  if (res.status === 400) {
    try {
      // Refresh token থেকে নতুন access token নাও
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      console.log(refreshRes)

      if (!refreshRes.ok) {
        throw new Error("Session expired. Please login again.");
      }

      const refreshData = await refreshRes.json();
      const newAccessToken = refreshData.data.accessToken;

      // নতুন access token save করো
      Cookies.set("accessToken", newAccessToken, { expires: 1 });

      // Retry original request with new token
      res = await makeRequest(newAccessToken);
    } catch (error: any) {
      Cookies.remove("accessToken");
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};
