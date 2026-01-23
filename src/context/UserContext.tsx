"use client";

import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout } from "@/src/services/auth";
import { IUser } from "@/src/types/user";

interface IUserProvider {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<IUserProvider | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ===================== FETCH USER =====================
  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("User fetch error:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ===================== LOGOUT =====================
  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  // ===================== INITIAL LOAD =====================
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
