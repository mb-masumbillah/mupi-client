const PersonalInfo = ({ user }: { user: any }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Full Name" value={user.fullName} />
        <Info label="Email" value={user.email} />
        {user.roll && <Info label="Roll" value={user.roll} />}
        {user.department && <Info label="Department" value={user.department} />}
        {user.semester && <Info label="Semester" value={user.semester} />}
      </div>
    </div>
  );
};

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "N/A"}</p>
    </div>
  );
}

export default PersonalInfo;
