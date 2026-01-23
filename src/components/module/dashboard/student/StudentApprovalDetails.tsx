"use client";

import Image from "next/image";

const studentApprovalDetails = ({
  students,
  handleApprove,
  handlePermanentDelete,
  setModalType
}: any) => {



  const image =
    students.image || students.users?.image || "/avatar.png";

  return (
    <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6 space-y-6">

      {/* ===== Header ===== */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">
          students Application Details
        </h2>

        <p className="text-sm text-orange-600 font-medium">
          Status: {students.users?.status}
        </p>
      </div>

      {/* ===== Profile ===== */}
      <div className="flex justify-center">
        <Image
          src={image}
          alt={students.fullName || "students photo"}
          width={120}
          height={120}
          className="w-30 h-30 rounded-full border object-cover"
        />
      </div>

      {/* ===== students Info ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Info label="Full Name" value={students.fullName} />
        <Info label="Roll" value={students.roll} />
        <Info label="Registration" value={students.registration} />
        <Info label="Department" value={students.department} />
        <Info label="Session" value={students.session} />
        <Info label="Shift" value={students.shift} />
        <Info label="Semester" value={students.semester} />
        <Info label="Email" value={students.email} />
        <Info label="Mobile Number" value={students.number} />

        {/* ===== User Table Data ===== */}
        <Info label="Role" value={students.users?.role} />
        <Info
          label="Last Login"
          value={
            students.users?.lastLogin
              ? new Date(students.users.lastLogin).toLocaleString()
              : "N/A"
          }
        />
      </div>

      {/* ===== Actions ===== */}
      <div className="flex justify-center gap-4 pt-6">

        <button
          onClick={() => setModalType(null)}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => handleApprove(students.email)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Approve students
        </button>

      </div>
    </div>
  );
};

export default studentApprovalDetails;

/* ===== Reusable Info Field ===== */
const Info = ({ label, value }: any) => {
  return (
    <div className="flex flex-col border rounded p-2 bg-slate-50">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">
        {value || "N/A"}
      </span>
    </div>
  );
};
