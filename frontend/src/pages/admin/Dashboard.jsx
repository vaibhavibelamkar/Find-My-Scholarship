import React, { useEffect, useState } from "react";
import StudentsTable from "../../components/dashboard/StudentsTable";
import AnnouncementsList from "../../components/dashboard/AnnouncementsList";
import axios from "axios";
import {
  LayoutDashboard,
  Award,
  Users,
  Bell,
  Settings,
  PlusCircle,
  Trash2,
  Edit,
  X,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Scheme from "../user/Scheme.jsx";

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    appliedScholarships: 3,
    status: "verified",
    registeredDate: "2024-02-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    appliedScholarships: 2,
    status: "pending",
    registeredDate: "2024-03-01",
  },
];

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [schemes, setSchemes] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [announcementData, setAnnouncementData] = useState(null);
  const [formData, setFormData] = useState({
    schemeName: "",
    gender: "",
    state: "",
    areaOfResidence: "",
    casteCategory: "",
    annualIncome: "",
    religion: "",
    benefits: "",
    schemeDocuments: "",
    siteLink: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const API_BASE_URL = "http://localhost:8080/api/scholarships/all";
        const response = await axios.get(`${API_BASE_URL}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data?.success) {
          setSchemes(response.data.data);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchScholarships();

    const fetchAnnouncements = async () => {
      try {
        const API_BASE_URL = "http://localhost:8080/api/announcements/all";
        const response = await axios.get(`${API_BASE_URL}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data?.success) {
          console.log(response.data.data);
          setAnnouncementData(response.data.data);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchAnnouncements();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAnnouncementInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendAnnouncement = async () => {
    const newAnnouncement = {
      id: announcementData.length + 1,
      title: announcementData.title,
      content: announcementData.content,
      date: new Date().toISOString().split("T")[0],
      status: "sent",
    };

    // Add the new announcement to the list
    announcementData.unshift(newAnnouncement);
    // Clear the form and close the modal
    setAnnouncementData({ title: "", content: "" });
    setShowAnnouncementModal(false);

    try {
      const API_BASE_URL = "http://localhost:8080/api/admin/addannouncements";
      const response = await axios.post(`${API_BASE_URL}`, announcementData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        toast.success(response.data.message);
      } else {
        toast.error(
          response.data.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      toast.error(errorMessage);
    }
  };

  const handleAddScheme = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/addscheme",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSchemes((prevSchemes) => [...prevSchemes, response.data]);
        toast.success("Scheme added successfully!");
      } else {
        toast.error("Failed to add scheme. Try again.");
      }
    } catch (error) {
      console.error("Error adding scheme:", error);
      toast.error("Something went wrong. Please try again.");
    }

    setShowAddModal(false);
    setFormData({
      schemeName: "",
      gender: "",
      state: "",
      areaOfResidence: "",
      casteCategory: "",
      annualIncome: "",
      religion: "",
      benefits: "",
      schemeDocuments: "",
      siteLink: "",
    });
  };

  const handleEditScheme = (e) => {
    e.preventDefault();
    setSchemes((prev) =>
      prev.map((scheme) =>
        scheme.id === selectedScheme.id
          ? { ...formData, id: scheme.id }
          : scheme
      )
    );
    setShowEditModal(false);
  };

  const handleDeleteScheme = () => {
    setSchemes((prev) =>
      prev.filter((scheme) => scheme.id !== selectedScheme.id)
    );
    setShowDeleteModal(false);
  };

  const openEditModal = (scheme) => {
    setSelectedScheme(scheme);
    setFormData(scheme);
    setShowEditModal(true);
  };

  const openDeleteModal = (scheme) => {
    setSelectedScheme(scheme);
    setShowDeleteModal(true);
  };

  const SchemeForm = ({ onSubmit, buttonText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Scheme Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Scheme Name
        </label>
        <input
          type="text"
          name="schemeName"
          value={formData.schemeName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Area of Residence */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Area of Residence
        </label>
        <input
          type="text"
          name="areaOfResidence"
          value={formData.areaOfResidence}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Caste Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Caste Category
        </label>
        <input
          type="text"
          name="casteCategory"
          value={formData.casteCategory}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Annual Income */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Annual Income
        </label>
        <input
          type="number"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Religion */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Religion
        </label>
        <input
          type="text"
          name="religion"
          value={formData.religion}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Benefits */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Benefits
        </label>
        <input
          type="text"
          name="benefits"
          value={formData.benefits}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Scheme Documents */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Scheme Documents
        </label>
        <input
          type="text"
          name="schemeDocuments"
          value={formData.schemeDocuments}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Site Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Site Link
        </label>
        <input
          type="url"
          name="siteLink"
          value={formData.siteLink}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            setShowAddModal(false);
            setShowEditModal(false);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#002b4d] border border-transparent rounded-md"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  const renderScholarshipManager = () => (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="flex items-center gap-2 text-[#002b4d] hover:text-[#004d80] mb-2 w-max"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h2 className="text-2xl font-semibold">Edit Schemes</h2>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex-1"></div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#002b4d] text-white rounded-lg hover:bg-[#002b4d]"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Scheme
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheme Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benefits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schemes.map((scheme) => (
              <tr key={scheme.id}>
                <td className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {scheme.schemeName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{scheme.state}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    ${scheme.benefits}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{scheme.deadline}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(scheme)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(scheme)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Scheme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Scheme</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#002b4d] hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pr-2">
              <SchemeForm onSubmit={handleAddScheme} buttonText="Add Scheme" />
            </div>
          </div>
        </div>
      )}

      {/* Edit Scheme Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Scheme</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#002b4d] hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pr-2">
              <SchemeForm
                onSubmit={handleEditScheme}
                buttonText="Update Scheme"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Delete Scheme</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete "{selectedScheme?.schemeName}"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteScheme}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "editSchemes":
        return renderScholarshipManager();

      case "students":
        return <StudentsTable students={students} />;

      case "announcements":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Announcements</h2>
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#002b4d] text-white rounded-lg hover:bg-[#004d80]"
              >
                <PlusCircle className="w-5 h-5" />
                New Announcement
              </button>
            </div>
            <AnnouncementsList announcements={announcementData} />

            {/* New Announcement Modal */}
            {showAnnouncementModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">New Announcement</h2>
                    <button
                      onClick={() => setShowAnnouncementModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={announcementData.title}
                        onChange={handleAnnouncementInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter announcement title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="content"
                        value={announcementData.content}
                        onChange={handleAnnouncementInputChange}
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter announcement description"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => setShowAnnouncementModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendAnnouncement}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#002b4d] border border-transparent rounded-md hover:bg-[#004d80]"
                      >
                        Send Announcement
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "scholarships":
        return <Scheme />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

            <div className="grid grid-cols-3 gap-6">
              <button
                onClick={() => setActiveSection("editSchemes")}
                className="bg-white p-8 rounded-lg shadow-sm border hover:border-[#242a4b] hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-indigo-50 text-[#242a4b] rounded-full group-hover:bg-indigo-100">
                    <Edit className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800">
                      Edit Schemes
                    </div>
                    <div className="text-gray-500 mt-1">
                      Manage scholarship schemes
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveSection("scholarships")}
                className="bg-white p-8 rounded-lg shadow-sm border hover:border-green-500 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-green-50 text-green-600 rounded-full group-hover:bg-green-100">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800">
                      Active Scholarships
                    </div>
                    <div className="text-gray-500 mt-1">
                      View active scholarships
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveSection("students")}
                className="bg-white p-8 rounded-lg shadow-sm border hover:border-yellow-500 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full group-hover:bg-yellow-100">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800">
                      Registered Students
                    </div>
                    <div className="text-gray-500 mt-1">
                      Manage student registrations
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Recent Announcements</h3>
                <div className="space-y-4">
                  {(announcementData || []).map((announcement) => (
                    <div
                      key={announcement.id}
                      className="py-2 border-b last:border-b-0"
                    >
                      <div className="font-medium">{announcement.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {announcement.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === "dashboard"
                  ? "bg-indigo-50 text-[#242a4b]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveSection("scholarships")}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === "scholarships"
                  ? "bg-indigo-50 text-[#242a4b]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Award className="w-5 h-5" />
              Scholarships
            </button>

            <button
              onClick={() => setActiveSection("announcements")}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === "announcements"
                  ? "bg-indigo-50 text-[#242a4b]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Bell className="w-5 h-5" />
              Announcements
            </button>

            <button
              onClick={() => setActiveSection("settings")}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === "settings"
                  ? "bg-indigo-50 text-[#242a4b]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{renderDashboardContent()}</div>
    </div>
  );
}

export default Dashboard;
