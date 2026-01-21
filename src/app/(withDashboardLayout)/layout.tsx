import Dashboard from "@/components/module/dashboard/Dashboard";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <Dashboard>{children}</Dashboard>;
};

export default DashboardLayout;
