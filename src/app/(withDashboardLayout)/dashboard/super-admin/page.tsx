"use client";

import Profile from "@/components/module/dashboard/Profile";
import { myProfile } from "@/services/user";
import { useEffect, useState, useTransition } from "react";

const SuperAdminPage = () => {
  const [me, setMe] = useState(null);
  const [isPending, startTransition] = useTransition();

  const result = async () => {
    const res = await myProfile();

    startTransition(() => setMe(res.data));
  };

  useEffect(() => {
    result();
  }, []);

  if (!me) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div>
      <Profile me={me}/>
    </div>
  );
};

export default SuperAdminPage;
