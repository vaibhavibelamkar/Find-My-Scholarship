import { ArrowLeft, CheckCircle2, Eye, Search, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const StudentsTable = ({ setActiveSection }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 0,
  });

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await axios.get(
        `http://localhost:8080/api/admin/students`,
        {
          params: {
            search: searchTerm,
            page: pagination.page,
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setStudents(response.data.data);
        setPagination(response.data.pagination);
      } else {
        toast.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);

    // Clear suggestions if search term is empty
    if (value.length === 0) {
      setSuggestions([]);
      fetchStudents();
    } else {
      fetchSuggestions(value);
    }
  };

  // Fetch suggestions based on search term
  const fetchSuggestions = async (term) => {
    try {
      const token = getCookie("token");
      const response = await axios.get(
        `http://localhost:8080/api/admin/students`,
        {
          params: {
            search: term,
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuggestions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.fullName || suggestion.email);
    setShowSuggestions(false);
    fetchStudents();
  };
  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  // View student details
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Delete student
  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;

    try {
      const token = getCookie("token");
      const response = await axios.delete(
        `http://localhost:8080/api/admin/students/${selectedStudent._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Student deleted successfully");
        setShowDeleteModal(false);
        fetchStudents(); // Refresh the list
      } else {
        toast.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student");
    }
  };

  // Fetch students when search, filter, or page changes
  useEffect(() => {
    fetchStudents();
  }, [searchTerm, pagination.page]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="flex items-center gap-2 text-[#002b4d] hover:text-[#004d80] mb-2 w-max"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h2 className="text-2xl font-semibold">Registered Students</h2>
      </div>

      <div className="flex justify-end gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-64"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              setShowSuggestions(value.length > 0);
              if (value.length === 0) {
                setSuggestions([]);
                fetchStudents();
              } else {
                fetchSuggestions(value);
              }
            }}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(suggestion.fullName || suggestion.email);
                    setShowSuggestions(false);
                    fetchStudents();
                  }}
                >
                  <div className="font-medium">{suggestion.fullName}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.email}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading students...</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
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
                  <tr key={student._id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{student.fullName}</div>
                        <div className="text-sm text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-1 text-gray-600 hover:text-indigo-600"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:text-red-600"
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowDeleteModal(true);
                          }}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-6 py-4 flex justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Student Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Personal Information
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedStudent.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedStudent.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedStudent.mobileNumber}
                  </p>
                  <p>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {selectedStudent.dateOfBirth}
                  </p>
                  <p>
                    <span className="font-medium">Parent Name:</span>{" "}
                    {selectedStudent.parentName}
                  </p>
                  <p>
                    <span className="font-medium">Parent Phone:</span>{" "}
                    {selectedStudent.parentMobileNumber}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Education Details
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">College:</span>{" "}
                    {selectedStudent.collegeName}
                  </p>
                  <p>
                    <span className="font-medium">Course:</span>{" "}
                    {selectedStudent.courseName}
                  </p>
                  <p>
                    <span className="font-medium">Year of Study:</span>{" "}
                    {selectedStudent.yearOfStudy}
                  </p>
                  <p>
                    <span className="font-medium">10th Marks:</span>{" "}
                    {selectedStudent.tenthMarks}
                  </p>
                  <p>
                    <span className="font-medium">12th Marks:</span>{" "}
                    {selectedStudent.twelfthMarks}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Additional Information
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Annual Income:</span>{" "}
                    {selectedStudent.annualIncome}
                  </p>
                  <p>
                    <span className="font-medium">Profession:</span>{" "}
                    {selectedStudent.profession}
                  </p>
                  <p>
                    <span className="font-medium">Caste:</span>{" "}
                    {selectedStudent.caste}
                  </p>
                  <p>
                    <span className="font-medium">Religion:</span>{" "}
                    {selectedStudent.religion}
                  </p>
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {selectedStudent.state}
                  </p>
                  <p>
                    <span className="font-medium">Area of Residence:</span>{" "}
                    {selectedStudent.areaOfResidence}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Special Status
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Minority Status:</span>{" "}
                    {selectedStudent.minorityStatus ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-medium">BPL Status:</span>{" "}
                    {selectedStudent.bplStatus ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-medium">Single Parent:</span>{" "}
                    {selectedStudent.singleParent ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-medium">Disabled:</span>{" "}
                    {selectedStudent.disabledStatus ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Delete Student</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <p className="mb-4">
              Are you sure you want to delete {selectedStudent.fullName}? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudent}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
