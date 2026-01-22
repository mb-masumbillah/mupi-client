
import Image from "next/image";
import { useState } from "react";

export default function Profile({me}: any) {
  const [showPassword, setShowPassword] = useState(false);

  const user = {
    fullName: "Masum Billah",
    email: "masum@gmail.com",
    roll: "2023001",
    role: "STUDENT",
    status: "ACTIVE",
    image: "/logo.svg",
    lastLogin: "2026-01-22",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <Image
            src={user.image}
            alt="profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-500"
          />

          <h2 className="text-xl font-semibold mt-4">
            {me?.fullName}
          </h2>

          <p className="text-gray-500">{me?.email}</p>

          <div className="flex gap-2 mt-3">
            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
              {me?.role}
            </span>

            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
              {me?.status}
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Last login: {me?.lastLogin}
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">

          {/* PERSONAL INFO */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Full Name" value={me?.fullName} />
              <Info label="Email" value={me?.email} />
              <Info label="Role" value={me?.role} />
            </div>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
              Change Password
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                className="input"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="input"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show password
              </label>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Update Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "N/A"}</p>
    </div>
  );
}
