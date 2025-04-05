import React, { useEffect, useState } from "react";
import StudentsTable from "../../components/dashboard/StudentsTable";
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
  User,
  Bell as BellIcon,
  Shield,
  Mail,
  Key,
  Save,
  HelpCircle,
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
  const [schemes, setSchemes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showEditAnnouncementModal, setShowEditAnnouncementModal] =
    useState(false);
  const [showDeleteAnnouncementModal, setShowDeleteAnnouncementModal] =
    useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcementData, setAnnouncementData] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });
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
  const [userQuestions, setUserQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
  const [answer, setAnswer] = useState("");

  // Admin settings state
  const [adminProfile, setAdminProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [adminSettings, setAdminSettings] = useState({
    emailNotifications: true,
    notifications: {
      userQueries: true,
      newUsers: true,
      eligibilityChecks: true,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

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
          setAnnouncementData(response.data.data || []);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchAnnouncements();

    const fetchUserQuestions = async () => {
      try {
        const API_BASE_URL = "http://localhost:8080/api/admin/questions";
        const response = await axios.get(`${API_BASE_URL}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data?.success) {
          setUserQuestions(response.data.data || []);
        }
      } catch (error) {
        toast.error("Error fetching questions:", error);
      }
    };

    fetchUserQuestions();
  }, [navigate]);

  // Fetch admin profile and settings
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        if (!token) {
          navigate("/login");
          return;
        }
        // Fetch admin profile
        const profileResponse = await axios.post(
          "http://localhost:8080/api/admin/profile",
          { token },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (profileResponse.data?.success) {
          setAdminProfile({
            fullName: profileResponse.data.data.fullName || "",
            email: profileResponse.data.data.email || "",
            phoneNumber: profileResponse.data.data.mobileNumber || "",
          });
        }

        // Fetch admin settings
        const settingsResponse = await axios.get(
          "http://localhost:8080/api/admin/settings",
          { token },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (settingsResponse.data?.success) {
          setAdminSettings(settingsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load admin data" + error);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeSection === "settings") {
      fetchAdminData();
    }
  }, [activeSection, navigate]);

  // Handle admin profile input change
  const handleAdminProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle admin settings input change
  const handleAdminSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("notifications.")) {
      const notificationType = name.split(".")[1];
      setAdminSettings((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setAdminSettings((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Save admin profile and settings
  const handleSaveAdminChanges = async () => {
    try {
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        navigate("/login");
        return;
      }

      // Update admin profile
      await axios.put(
        "http://localhost:8080/api/admin/profile",
        {
          token,
          fullName: adminProfile.fullName,
          email: adminProfile.email,
          mobileNumber: adminProfile.phoneNumber,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update admin settings
      await axios.put(
        "http://localhost:8080/api/admin/settings",
        {
          emailNotifications: adminSettings.emailNotifications,
          notifications: adminSettings.notifications,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating admin settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

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
    setNewAnnouncement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendAnnouncement = async () => {
    try {
      const API_BASE_URL = "http://localhost:8080/api/admin/addannouncements";
      const response = await axios.post(`${API_BASE_URL}`, newAnnouncement, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        const newAnnouncementWithId = {
          ...newAnnouncement,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          status: "sent",
        };

        setAnnouncementData((prev) => [newAnnouncementWithId, ...prev]);
        setNewAnnouncement({ title: "", content: "" });
        setShowAnnouncementModal(false);
        toast.success(response.data.message);
      } else {
        toast.error(
          response.data.message ||
            "Failed to send announcement. Please try again."
        );
      }
    } catch (error) {
      toast.error("Error sending announcement. Please try again.");
    }
  };

  const handleEditAnnouncement = async () => {
    try {
      const API_BASE_URL = "http://localhost:8080/api/admin/editannouncement";
      const response = await axios.put(
        `${API_BASE_URL}/${selectedAnnouncement.id}`,
        newAnnouncement,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        setAnnouncementData((prev) =>
          prev.map((announcement) =>
            announcement.id === selectedAnnouncement.id
              ? { ...announcement, ...newAnnouncement }
              : announcement
          )
        );
        setShowEditAnnouncementModal(false);
        setNewAnnouncement({ title: "", content: "" });
        toast.success("Announcement updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update announcement");
      }
    } catch (error) {
      toast.error("Error updating announcement");
    }
  };

  const handleDeleteAnnouncement = async () => {
    try {
      const API_BASE_URL = "http://localhost:8080/api/admin/deleteannouncement";
      const response = await axios.delete(
        `${API_BASE_URL}/${selectedAnnouncement.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        setAnnouncementData((prev) =>
          prev.filter(
            (announcement) => announcement.id !== selectedAnnouncement.id
          )
        );
        setShowDeleteAnnouncementModal(false);
        toast.success("Announcement deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete announcement");
      }
    } catch (error) {
      toast.error("Error deleting announcement");
    }
  };

  const openEditAnnouncementModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setNewAnnouncement({
      title: announcement.title,
      content: announcement.content,
    });
    setShowEditAnnouncementModal(true);
  };

  const openDeleteAnnouncementModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowDeleteAnnouncementModal(true);
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

  const handleAnswerSubmit = async () => {
    try {
      const API_BASE_URL = "http://localhost:8080/api/admin/questions";
      const response = await axios.put(
        `${API_BASE_URL}/${selectedQuestion._id}`,
        {
          answer,
          status: "Answered",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        setUserQuestions((prev) =>
          prev.map((q) =>
            q._id === selectedQuestion._id
              ? { ...q, answer, status: "Answered" }
              : q
          )
        );
        setShowAnswerModal(false);
        setAnswer("");
        toast.success("Answer submitted successfully!");
      }
    } catch (error) {
      toast.error("Error submitting answer:", error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      const API_BASE_URL = "http://localhost:8080/api/admin/questions";
      const response = await axios.delete(
        `${API_BASE_URL}/${selectedQuestion._id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        setUserQuestions((prev) =>
          prev.filter((q) => q._id !== selectedQuestion._id)
        );
        setShowDeleteQuestionModal(false);
        toast.success("Question deleted successfully!");
      }
    } catch (error) {
      toast.error("Error deleting question:", error);
    }
  };

  const SchemeForm = ({ onSubmit, buttonText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
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
    if (activeSection === "students") {
      return <StudentsTable setActiveSection={setActiveSection} />;
    }
    switch (activeSection) {
      case "editSchemes":
        return renderScholarshipManager();

      case "announcements":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setActiveSection("dashboard")}
                className="flex items-center gap-2 text-[#002b4d] hover:text-[#004d80] mb-2 w-max"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
              <h2 className="text-2xl font-semibold">Announcements</h2>
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#002b4d] text-white rounded-lg hover:bg-[#004d80]"
              >
                <PlusCircle className="w-5 h-5" />
                New Announcement
              </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {announcementData.map((announcement) => (
                    <tr key={announcement.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {announcement.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-md truncate">
                          {announcement.content}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(announcement.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              openEditAnnouncementModal(announcement)
                            }
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              openDeleteAnnouncementModal(announcement)
                            }
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

            {/* New Announcement Modal */}
            {showAnnouncementModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">New Announcement</h2>
                    <button
                      onClick={() => {
                        setShowAnnouncementModal(false);
                        setNewAnnouncement({ title: "", content: "" });
                      }}
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
                        value={newAnnouncement.title}
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
                        value={newAnnouncement.content}
                        onChange={handleAnnouncementInputChange}
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter announcement description"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => {
                          setShowAnnouncementModal(false);
                          setNewAnnouncement({ title: "", content: "" });
                        }}
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

            {/* Edit Announcement Modal */}
            {showEditAnnouncementModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Announcement</h2>
                    <button
                      onClick={() => {
                        setShowEditAnnouncementModal(false);
                        setNewAnnouncement({ title: "", content: "" });
                      }}
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
                        value={newAnnouncement.title}
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
                        value={newAnnouncement.content}
                        onChange={handleAnnouncementInputChange}
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter announcement description"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => {
                          setShowEditAnnouncementModal(false);
                          setNewAnnouncement({ title: "", content: "" });
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditAnnouncement}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#002b4d] border border-transparent rounded-md hover:bg-[#004d80]"
                      >
                        Update Announcement
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Announcement Modal */}
            {showDeleteAnnouncementModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Delete Announcement
                    </h2>
                    <button
                      onClick={() => setShowDeleteAnnouncementModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-500 mb-4">
                    Are you sure you want to delete this announcement?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteAnnouncementModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAnnouncement}
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

      case "settings":
        return (
          <div className="space-y-6">
            <button
              onClick={() => setActiveSection("dashboard")}
              className="flex items-center gap-2 text-[#002b4d] hover:text-[#004d80] mb-2 w-max"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002b4d]"></div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Admin Profile</h3>
                        <p className="text-gray-500">
                          Manage your account settings and preferences
                        </p>
                      </div>
                    </div>

                    <form className="space-y-6 max-w-2xl">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={adminProfile.fullName}
                            onChange={handleAdminProfileChange}
                            name="fullName"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={adminProfile.email}
                          onChange={handleAdminProfileChange}
                          name="email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={adminProfile.phoneNumber}
                          onChange={handleAdminProfileChange}
                          name="phoneNumber"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="p-6 border-b">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <BellIcon className="w-6 h-6 text-[#001a33]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <p className="text-gray-500">
                          Configure how you receive notifications
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">
                            Enable or disable all email notifications
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={adminSettings.emailNotifications}
                            onChange={handleAdminSettingsChange}
                            name="emailNotifications"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-text-[#001a33] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-text-[#001a33]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">User Queries</h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications for new user questions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={adminSettings.notifications.userQueries}
                            onChange={handleAdminSettingsChange}
                            name="notifications.userQueries"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-text-[#001a33] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-text-[#001a33]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">New Users</h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications for new user registrations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={adminSettings.notifications.newUsers}
                            onChange={handleAdminSettingsChange}
                            name="notifications.newUsers"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-text-[#001a33] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-text-[#001a33]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Eligibility Checks</h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications for eligibility checks
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={
                              adminSettings.notifications.eligibilityChecks
                            }
                            onChange={handleAdminSettingsChange}
                            name="notifications.eligibilityChecks"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-text-[#001a33] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-text-[#001a33]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-[#002b4d] text-white rounded-lg hover:bg-[#004d80]"
                      onClick={handleSaveAdminChanges}
                      disabled={isLoading}
                    >
                      <Save className="w-5 h-5" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case "scholarships":
        return <Scheme />;

      case "faqs":
        return (
          <div className="space-y-6">
            <div className="mb-6 flex flex-col">
              <button
                onClick={() => setActiveSection("dashboard")}
                className="flex items-center gap-2 text-[#002b4d] hover:text-[#004d80] mb-2 w-max"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
              <h2 className="text-2xl font-semibold">User Questions</h2>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asked By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userQuestions.map((question) => (
                    <tr key={question._id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {question.question}
                        </div>
                        {/* {question.answer && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700">
                              Answer:
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                              {question.answer}
                            </p>
                          </div>
                        )} */}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {question.user.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          {question.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            question.status === "Answered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {question.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(question.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedQuestion(question);
                              setAnswer(question.answer || "");
                              setShowAnswerModal(true);
                            }}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedQuestion(question);
                              setShowDeleteQuestionModal(true);
                            }}
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

            {/* Answer Modal */}
            {showAnswerModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedQuestion?.status === "Answered"
                        ? "Edit Answer"
                        : "Answer Question"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowAnswerModal(false);
                        setAnswer("");
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question
                      </label>
                      <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                        {selectedQuestion?.question}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer
                      </label>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter your answer here"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => {
                          setShowAnswerModal(false);
                          setAnswer("");
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAnswerSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#002b4d] border border-transparent rounded-md hover:bg-[#004d80]"
                      >
                        {selectedQuestion?.status === "Answered"
                          ? "Update Answer"
                          : "Submit Answer"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Question Modal */}
            {showDeleteQuestionModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Delete Question</h2>
                    <button
                      onClick={() => setShowDeleteQuestionModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-500 mb-4">
                    Are you sure you want to delete this question? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteQuestionModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteQuestion}
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
                  {announcementData.map((announcement) => (
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
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed left-0 top-16 h-[calc(100vh-4rem)]">
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

            <button
              onClick={() => setActiveSection("faqs")}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === "faqs"
                  ? "bg-indigo-50 text-[#242a4b]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              User FAQs
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">{renderDashboardContent()}</div>
    </div>
  );
}

export default Dashboard;
