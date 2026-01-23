"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Eye,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "sonner";

import { getAllStudents, deleteStudentPermanent } from "@/src/services/student";
import StudentApprovalDetails from "@/src/components/module/dashboard/student/StudentApprovalDetails";
import { chnageStatus } from "@/src/services/user";
import useUser from "@/src/hooks/useUser";

const MySwal = withReactContent(Swal);

const AllStudent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deptFilter, setDeptFilter] = useState("all");
  const [semFilter, setSemFilter] = useState("all");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalType, setModalType] = useState<"view" | "delete" | null>(null);
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const perPage = 10;

  // ================= Fetch Students =================
  const fetchStudents = async () => {
    try {
      const res: any = await getAllStudents();
      if (!res.success) {
        toast.error(res.message || "Failed to fetch students");
        return;
      }
      const studentArray = Array.isArray(res.data) ? res.data : [];
      startTransition(() => setStudents(studentArray));
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const approvedStudents =
    students.filter((s: any) => s.users.status === "pending") || [];

  // ================= Filter & Search =================
  const filteredStudents = approvedStudents.filter((s: any) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.fullName?.toLowerCase().includes(q) || s.roll?.toString().includes(q);
    const matchDept = deptFilter === "all" || s.department === deptFilter;
    const matchSem = semFilter === "all" || s.semester === semFilter;
    const matchShift = shiftFilter === "all" || s.shift === shiftFilter;
    const matchSession = sessionFilter === "all" || s.session === sessionFilter;
    return matchSearch && matchDept && matchSem && matchShift && matchSession;
  });

  const totalPages = Math.ceil(filteredStudents.length / perPage);
  const paginatedData = filteredStudents.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  //   // ================= Student Actions =================
  const handleApprove = async (email: string) => {
    try {
      const confirmed = await MySwal.fire({
        title: "Approve Student?",
        text: "Do you want to approve this student?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Approve",
      });

      if (confirmed.isConfirmed) {
        // ✅ Call server to update status
        const result = await chnageStatus(email);

        if (result.success) {
          toast.success("Student approved successfully!");

          // ✅ Refetch students to update UI immediately
          fetchStudents();

          // ✅ Close modal
          setModalType(null);
        } else {
          toast.error(result.message || "Failed to approve student");
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Approval failed!");
    }
  };

  const handlePermanentDelete = async (email: string) => {
    try {
      const confirmed = await MySwal.fire({
        title: "Permanent Delete?",
        text: "This action cannot be undone!",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete Permanently",
      });
      if (confirmed.isConfirmed) {
        await deleteStudentPermanent(email);
        toast.success("Student permanently deleted!");
        fetchStudents();
        setModalType(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Permanent delete failed!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 p-4 border-b border-gray-300 sticky top-0 bg-white z-10">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm border border-slate-400 rounded-md"
          >
            <option value="all">All Dept</option>
            {[...new Set(approvedStudents.map((s) => s.department))].map(
              (d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ),
            )}
          </select>

          <select
            value={semFilter}
            onChange={(e) => {
              setSemFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm border border-slate-400 rounded-md"
          >
            <option value="all">All Semester</option>
            {[...new Set(approvedStudents.map((s) => s.semester))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={shiftFilter}
            onChange={(e) => {
              setShiftFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm border border-slate-400 rounded-md"
          >
            <option value="all">All Shift</option>
            {[...new Set(approvedStudents.map((s) => s.shift))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={sessionFilter}
            onChange={(e) => {
              setSessionFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm border border-slate-400 rounded-md"
          >
            <option value="all">All Session</option>
            {[...new Set(approvedStudents.map((s) => s.session))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-400 rounded-md focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white border border-slate-400 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[600px] md:min-w-full">
          <thead className="bg-slate-200 border-b border-slate-400">
            <tr className="text-slate-800">
              {[
                "Name",
                "Roll",
                "Department",
                "Semester",
                "Shift",
                "Date",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-semibold ${h === "Action" ? "text-center" : "text-left"} border-r last:border-r-0 border-slate-400`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((s, i) => (
              <tr key={i} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 border-r">{s.fullName}</td>
                <td className="px-4 py-3 border-r">{s.roll}</td>
                <td className="px-4 py-3 border-r">{s.department}</td>
                <td className="px-4 py-3 border-r">{s.semester}</td>
                <td className="px-4 py-3 border-r">{s.shift}</td>
                <td className="px-4 py-3 border-r">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-r text-center">
                  {s.users.status}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      title="View Details"
                      onClick={() => {
                        setSelectedStudent(s);
                        setModalType("view");
                      }}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Delete"
                      onClick={() =>
                        handlePermanentDelete(selectedStudent.email)
                      }
                      className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No student found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 p-3 border-t">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 border border-slate-400 rounded disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-slate-700 text-white border-slate-700" : "border-slate-400"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 border border-slate-400 rounded disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ================= Modals ================= */}

      {/* View Modal */}
      {modalType === "view" && selectedStudent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-h-[34rem] overflow-y-auto p-6 relative w-full max-w-3xl">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setModalType(null)}
            >
              <X />
            </button>
            <StudentApprovalDetails
              students={selectedStudent}
              handleApprove={handleApprove}
              handlePermanentDelete={handlePermanentDelete}
              setModalType={setModalType}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudent;
