import { CheckCircle2, Eye, Search, XCircle } from "lucide-react";

const StudentsTable = ({ students }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Registered Students</h2>
      <div className="flex gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied Scholarships
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registered Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    student.status === "verified"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {student.status}
                </span>
              </td>
              <td className="px-6 py-4">{student.appliedScholarships}</td>
              <td className="px-6 py-4">{student.registeredDate}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-1 text-gray-600 hover:text-indigo-600">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-red-600">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default StudentsTable;
