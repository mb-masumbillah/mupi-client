import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const students = [
  { id: 1, fullName: "Masum Billah", roll: "651278", email: "masum@gmail.com", department: "CST", session: "2022-2023" },
  { id: 2, fullName: "Rahim Khan", roll: "651279", email: "rahim@gmail.com", department: "EEE", session: "2022-2023" },
  { id: 3, fullName: "Karim Ali", roll: "651280", email: "karim@gmail.com", department: "Civil", session: "2022-2023" },
  { id: 4, fullName: "Jony Das", roll: "651281", email: "jony@gmail.com", department: "Mechanical", session: "2022-2023" },
  { id: 5, fullName: "Salim Hossain", roll: "651282", email: "salim@gmail.com", department: "CST", session: "2022-2023" },
];


const App = () => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "students.xlsx");
  };

  return (
    <div className="p-4">
      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download Excel
      </button>

      <table className="table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Roll</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Session</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border px-4 py-2">{s.fullName}</td>
              <td className="border px-4 py-2">{s.roll}</td>
              <td className="border px-4 py-2">{s.email}</td>
              <td className="border px-4 py-2">{s.department}</td>
              <td className="border px-4 py-2">{s.session}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;