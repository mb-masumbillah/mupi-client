"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "sonner";

import {
  getAllStudents,
  updateStudent,
  deleteStudent,
  deleteStudentPermanent,
} from "@/src/services/student";

import ImageUpload from "@/src/components/form/ImageUpload";
import TextInput from "@/src/components/form/TextInput";
import SelectInput from "@/src/components/form/SelectInput";
import { useForm } from "react-hook-form";
import Image from "next/image";

// Excel
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const MySwal = withReactContent(Swal);

interface StudentFormData {
  fullName: string;
  roll: number;
  registration: number;
  department: string;
  session: string;
  shift: string;
  semester: string;
  email: string;
  number: string;
  image?: File | null;
}

const AllStudent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deptFilter, setDeptFilter] = useState("all");
  const [semFilter, setSemFilter] = useState("all");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalType, setModalType] = useState<
    "view" | "update" | "delete" | null
  >(null);
  const [isPending, startTransition] = useTransition();

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
    students.filter((s: any) => s.users.status === "approved") || [];

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

  // ================= Excel Download =================
  const handleDownloadExcel = () => {
    try {
      const dataToExport = filteredStudents.map((s) => ({
        Name: s.fullName,
        Roll: s.roll,
        Department: s.department,
        Semester: s.semester,
        Shift: s.shift,
        Session: s.session,
        Email: s.email,
        Phone: s.number,
        Status: s.users.status,
        CreatedAt: new Date(s.createdAt).toLocaleDateString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, "Students.xlsx");
      toast.success("Excel downloaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Excel download failed!");
    }
  };


  const handleSoftDelete = async (email: string) => {
    try {
      const confirmed = await MySwal.fire({
        title: "Soft Delete?",
        text: "This student can be recovered later!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Soft Delete",
      });
      if (confirmed.isConfirmed) {
        await deleteStudent(email);
        toast.success("Student soft deleted successfully!");
        fetchStudents();
        setModalType(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Soft delete failed!");
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

  // ================= Update Form =================
  const { handleSubmit, control, reset } = useForm<StudentFormData>({
    mode: "onChange",
  });

  const onUpdateSubmit = async (data: StudentFormData) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (data.image) formData.append("file", data.image);

      await updateStudent(selectedStudent.email, formData);
      toast.success("Student updated successfully!");
      fetchStudents();
      setModalType(null);
    } catch (error: any) {
      toast.error(error.message || "Update failed!");
    }
  };

  const openUpdateModal = (student: any) => {
    setSelectedStudent(student);
    setModalType("update");
    reset({
      fullName: student.fullName,
      roll: student.roll,
      registration: student.registration,
      department: student.department,
      session: student.session,
      shift: student.shift,
      semester: student.semester,
      email: student.email,
      number: student.number,
      image: undefined,
    });
  };


  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold flex items-center justify-between">
        Students Information
        <button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Download size={16} /> Download Excel
        </button>
      </h1>

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
                      title="Update"
                      onClick={() => openUpdateModal(s)}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => {
                        setSelectedStudent(s);
                        setModalType("delete");
                      }}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
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
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Name:</strong> {selectedStudent.fullName}
              </p>
              <p>
                <strong>Roll:</strong> {selectedStudent.roll}
              </p>
              <p>
                <strong>Department:</strong> {selectedStudent.department}
              </p>
              <p>
                <strong>Semester:</strong> {selectedStudent.semester}
              </p>
              <p>
                <strong>Shift:</strong> {selectedStudent.shift}
              </p>
              <p>
                <strong>Session:</strong> {selectedStudent.session}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedStudent.number}
              </p>
              <div className="col-span-2 flex justify-center mt-4">
                {selectedStudent.image && (
                  <Image
                    src={selectedStudent.image}
                    alt="Student"
                    width={150}
                    height={150}
                    className="rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {modalType === "update" && selectedStudent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto p-6 relative w-full max-w-3xl">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setModalType(null)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Student</h2>
            <form
              onSubmit={handleSubmit(onUpdateSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <TextInput label="Full Name" name="fullName" control={control} />
              <TextInput
                label="Roll"
                name="roll"
                type="number"
                control={control}
              />
              <TextInput
                label="Registration"
                name="registration"
                type="number"
                control={control}
              />
              <SelectInput
                label="Department"
                name="department"
                control={control}
                options={[
                  "Computer",
                  "Electrical",
                  "Civil",
                  "Mechanical",
                  "IPCT",
                  "Electronics",
                  "Electro_Medical",
                  "RAC",
                ]}
              />
              <TextInput label="Session" name="session" control={control} />
              <SelectInput
                label="Shift"
                name="shift"
                control={control}
                options={["First", "Second"]}
              />
              <SelectInput
                label="Semester"
                name="semester"
                control={control}
                options={[
                  "First",
                  "Second",
                  "Third",
                  "Fourth",
                  "Fifth",
                  "Sixth",
                  "Seventh",
                  "Eighth",
                ]}
              />
              <TextInput label="Email" name="email" control={control} />
              <TextInput label="Phone" name="number" control={control} />
              <ImageUpload
                label="Student Image"
                name="image"
                control={control}
              />
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modalType === "delete" && selectedStudent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setModalType(null)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">Delete Student</h2>
            <p>
              Choose the type of deletion for{" "}
              <strong>{selectedStudent.fullName}</strong>:
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => handleSoftDelete(selectedStudent.email)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Soft Delete
              </button>
              <button
                onClick={() => handlePermanentDelete(selectedStudent.email)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Permanent Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudent;
