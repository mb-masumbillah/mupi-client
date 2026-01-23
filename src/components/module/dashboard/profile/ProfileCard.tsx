"use client";

import Image from "next/image";

const ProfileCard = ({ user }: { user: any }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <Image
        src={user.image || "/avatar.png"}
        alt="profile"
        width={120}
        height={120}
        className="rounded-full border-4 border-blue-500"
      />
      <h2 className="text-xl font-semibold mt-4">{user.fullName}</h2>
      <p className="text-gray-500">{user.email}</p>

      <div className="flex gap-2 mt-3">
        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
          {user.role}
        </span>

        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
          {user.status}
        </span>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Last login: {user.lastLogin || "N/A"}
      </p>
    </div>
  );
}


export default ProfileCard;
