import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Heart,
  Bell,
  HelpCircle,
  Star,
  StarOff,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
// List of Indian states
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

function Dashboard() {
  const [userData, setUserData] = useState();
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCasteDropdown, setShowCasteDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [announcementData, setAnnouncementData] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [selectedCaste, setSelectedCaste] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [publicQuestions, setPublicQuestions] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const fetchPublicQuestions = async () => {
    try {
      const API_BASE_URL = "http://localhost:8080/api/user/public-questions";
      const response = await axios.get(`${API_BASE_URL}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data?.success) {
        setPublicQuestions(response.data.data || []);
      }
    } catch (error) {
      toast.error("Error fetching public questions:", error);
    }
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie("token");
      if (!token) {
        toast.error("token not found");
      }
      try {
        const API_BASE_URL = "http://localhost:8080/api/user/profile";
        const response = await axios.post(
          `${API_BASE_URL}`,
          { token },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data?.success && response.data?.user) {
          setUserData(response.data.user);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchProfile();

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
          setScholarships(response.data.data);
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

    const fetchUserQuestions = async () => {
      try {
        const token = getCookie("token");
        if (!token) {
          toast.error("token not found");
          return;
        }
        const API_BASE_URL = "http://localhost:8080/api/user/questions";
        const response = await axios.get(`${API_BASE_URL}?token=${token}`, {
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

    fetchProfile();
    fetchScholarships();
    fetchAnnouncements();
    fetchUserQuestions();
    fetchPublicQuestions();
  }, [navigate]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([2]);
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [question, setQuestion] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  // Update handleStateSelect to work with existing "All States" option
  const handleStateSelect = (state) => {
    setSelectedState(state === "All States" ? "" : state);
    setActiveFilter(state === "All States" ? "" : "state");
    setShowStateDropdown(false);
  };

  // Update handleCasteSelect to work with "All" option
  const handleCasteSelect = (caste) => {
    setSelectedCaste(caste === "All" ? "" : caste);
    setActiveFilter(caste === "All" ? "" : "caste");
    setShowCasteDropdown(false);
  };

  // Update the filteredScholarships logic with improved search
  const filteredScholarships = React.useMemo(() => {
    let filtered = [...scholarships];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((scholarship) => {
        const schemeName = (scholarship.schemeName || "").toLowerCase();
        const state = (scholarship.state || "").toLowerCase();
        const benefits = (scholarship.benefits || "").toLowerCase();
        const casteCategory = (scholarship.casteCategory || "").toLowerCase();

        return (
          schemeName.includes(query) ||
          state.includes(query) ||
          benefits.includes(query) ||
          casteCategory.includes(query)
        );
      });
    }

    // Apply state filter only if a specific state is selected
    if (selectedState && selectedState !== "All States") {
      filtered = filtered.filter(
        (scholarship) => scholarship.state === selectedState
      );
    }

    // Apply caste filter only if a specific caste is selected
    if (selectedCaste && selectedCaste !== "All") {
      filtered = filtered.filter((scholarship) => {
        const casteCategories = (scholarship.casteCategory || "").split("/");
        return casteCategories.some((caste) => caste.trim() === selectedCaste);
      });
    }

    return filtered;
  }, [scholarships, searchQuery, selectedState, selectedCaste]);

  // Toggle Favorite Function
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getCookie("token");
      if (!token) {
        toast.error("token not found");
        return;
      }
      const apiUrl = "http://localhost:8080/api/user/questions";
      const response = await axios.post(
        apiUrl,
        {
          question,
          visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setShowThankYou(true);
        setQuestion("");
        // Add the new question to the list immediately
        setUserQuestions((prevQuestions) => [
          response.data.data,
          ...prevQuestions,
        ]);
        // Refresh public questions if the new question is public
        if (visibility === "public") {
          fetchPublicQuestions();
        }
      } else {
        toast.error(response.data?.message || "Error submitting question");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error(error.response?.data?.message || "Error submitting question");
    }
    setTimeout(() => {
      setShowThankYou(false);
      setShowHelpForm(false);
    }, 3000);
  };

  // Get favorite scholarships
  const favoriteScholarships = (scholarships ?? []).filter((scholarship) =>
    favorites.includes(scholarship._id)
  );

  // Get scholarships to display based on showFavorites
  const displayedScholarships = showFavorites
    ? favoriteScholarships
    : filteredScholarships;

  // Add a click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setShowStateDropdown(false);
        setShowCasteDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteQuestion = async (id) => {
    try {
      const token = getCookie("token");
      if (!token) {
        toast.error("token not found");
        return;
      }
      const API_BASE_URL = "http://localhost:8080/api/user/questions";
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        toast.success("Question deleted successfully");
        setUserQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q._id !== id)
        );
        // Refresh public questions if the deleted question is public
        if (visibility === "public") {
          fetchPublicQuestions();
        }
      } else {
        toast.error(response.data?.message || "Error deleting question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error(error.response?.data?.message || "Error deleting question");
    }
  };

  const confirmDelete = (question) => {
    setQuestionToDelete(question);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      handleDeleteQuestion(questionToDelete._id);
      setShowDeleteConfirm(false);
      setQuestionToDelete(null);
    }
  };

  return (
    <div className="h-screen flex 1 pt-16 p-6 bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Profile Section - Moved up */}
        <div className="mt-5 mr-10 p-4 bg-white rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100 shadow-md flex-shrink-0">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.https://www.google.com/search?sca_esv=072bf505c6b5844f&sxsrf=AHTn8zq5KcWL0NgV_uX9FsooR5qb0Q_AVQ:1746110639085&q=profile+icon&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBpcx8kZB4NRoUjdgt8WwoMuwgcVebmzp5FdJBsH8BgTUuyIEQIiViBx-KnlnfIT13uWK4b_j4sRl4BdB2xZMYbprgqudsq2YfKrQk6Qe0G4qsF-t3FnXU9cIp3M9r6j_5C8w5CzrQ04tzAjU62qfbzyT8UaIwyNfMoA-iRL7Fan7eI-y7w&sa=X&sqi=2&ved=2ahUKEwjZ1IWDwYKNAxU-n68BHU3EH0MQtKgLegQIFhAB&biw=1536&bih=730&dpr=1.25#vhid=kWsq6vAopZPvOM&vssid=mosaic&pid=Api&P=0&h=220"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {userData ? userData.username : ""}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="truncate">
                  {userData ? userData.email : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => {
                setShowFavorites(false);
                setShowHelpForm(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg bg-indigo-50 text-[#001a33]"
            >
              <Filter className="w-5 h-5" /> Filters
            </button>
            <div className="pl-7 space-y-2 text-sm">
              <button
                className={`w-full text-left p-1 rounded ${
                  activeFilter === "all" ? "text-[#001a33]" : "text-gray-400"
                }`}
                onClick={() => {
                  setActiveFilter("all");
                  setSelectedState("");
                }}
              >
                All
              </button>
              <div className="flex space-x-2 mb-4">
                <div className="relative filter-dropdown">
                  <button
                    className={`w-full text-left p-1 rounded flex items-center justify-between ${
                      activeFilter === "state"
                        ? "text-[#001a33]"
                        : "text-gray-400"
                    }`}
                    onClick={() => {
                      setShowStateDropdown(!showStateDropdown);
                      setShowCasteDropdown(false);
                    }}
                  >
                    <span>
                      {selectedState ? `State: ${selectedState}` : "State"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {showStateDropdown && (
                    <div className="absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="max-h-64 overflow-y-auto">
                        <button
                          key="all-states"
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                            !selectedState || selectedState === "All States"
                              ? "text-[#001a33] font-medium"
                              : "text-gray-600"
                          }`}
                          onClick={() => handleStateSelect("All States")}
                        >
                          All States
                        </button>
                        {indianStates.map((state) => (
                          <button
                            key={state}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                              selectedState === state
                                ? "text-[#001a33] font-medium"
                                : "text-gray-600"
                            }`}
                            onClick={() => handleStateSelect(state)}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative filter-dropdown">
                  <button
                    className={`w-full text-left p-1 rounded flex items-center justify-between ${
                      activeFilter === "caste"
                        ? "text-[#001a33]"
                        : "text-gray-400"
                    }`}
                    onClick={() => {
                      setShowCasteDropdown(!showCasteDropdown);
                      setShowStateDropdown(false);
                    }}
                  >
                    <span>
                      {selectedCaste ? `Caste: ${selectedCaste}` : "Caste"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {showCasteDropdown && (
                    <div className="absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="max-h-64 overflow-y-auto">
                        <button
                          key="all-castes"
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                            !selectedCaste
                              ? "text-[#001a33] font-medium"
                              : "text-gray-600"
                          }`}
                          onClick={() => handleCasteSelect("All")}
                        >
                          All Castes
                        </button>
                        {["SC", "SBC", "OBC", "EWS"].map((caste) => (
                          <button
                            key={caste}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                              selectedCaste === caste
                                ? "text-[#001a33] font-medium"
                                : "text-gray-600"
                            }`}
                            onClick={() => handleCasteSelect(caste)}
                          >
                            {caste}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowFavorites(true);
                setShowHelpForm(false);
              }}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                showFavorites
                  ? "bg-indigo-50 text-[#001a33]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className="w-5 h-5" /> Favorites
            </button>
            <button
              onClick={() => {
                setShowHelpForm(true);
                setShowFavorites(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <HelpCircle className="w-5 h-5" /> Help & FAQs
            </button>
            <Link to="/user/scholarships/check-eligibility">
              <button className="px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-[#001a33]">
                Check Eligibility
              </button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="h-screen p-6">
          {showHelpForm ? (
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Help & FAQs</h2>
              {showThankYou ? (
                <div className="text-center py-8">
                  <p className="text-lg text-green-600">
                    Thanks for asking your question!
                  </p>
                  <p className="text-gray-600 mt-2">
                    You will receive an answer shortly.
                  </p>
                </div>
              ) : (
                <div className="flex gap-8">
                  {/* Left side - Question form and user's questions */}
                  <div className="flex-1">
                    <form onSubmit={handleQuestionSubmit} className="space-y-6">
                      {/* Question Input */}
                      <div>
                        <label
                          htmlFor="question"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Ask your question
                        </label>
                        <textarea
                          id="question"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                          rows={4}
                          required
                        />
                      </div>

                      {/* Visibility Radio Buttons */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Question Visibility
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="visibility"
                              value="public"
                              checked={visibility === "public"}
                              onChange={(e) => setVisibility(e.target.value)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Public (Visible to all users)
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="visibility"
                              value="private"
                              checked={visibility === "private"}
                              onChange={(e) => setVisibility(e.target.value)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Private (Visible only to admin)
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#001a33] text-white rounded-lg hover:bg-opacity-90"
                        >
                          Send Question
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowHelpForm(false)}
                          className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>

                    {/* User's Question History */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">
                        Your Questions
                      </h3>
                      {userQuestions.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {userQuestions.map((q) => (
                            <div
                              key={q._id || q.id}
                              className="p-3 border border-gray-200 rounded-lg bg-white hover:border-[#001a33] transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span
                                  className={`px-2 py-0.5 text-xs rounded-full ${
                                    q.visibility === "public"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-purple-100 text-purple-800"
                                  }`}
                                >
                                  {q.visibility}
                                </span>
                                {q.status !== "Deleted" && (
                                  <button
                                    onClick={() => confirmDelete(q)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              <p className="font-medium text-gray-900 line-clamp-2 text-sm mb-2">
                                {q.question}
                              </p>
                              {q.status === "Answered" && q.answer && (
                                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                                  <p className="text-xs font-medium text-gray-700">
                                    Answer:
                                  </p>
                                  <p className="mt-1 text-gray-600 line-clamp-2 text-xs">
                                    {q.answer}
                                  </p>
                                </div>
                              )}
                              {q.status === "Deleted" && (
                                <div className="mt-2 p-2 bg-red-50 rounded-lg">
                                  <p className="text-xs font-medium text-red-700">
                                    This question has been deleted by the admin
                                  </p>
                                </div>
                              )}
                              <div className="mt-2 flex justify-between items-center">
                                <span
                                  className={`px-2 py-0.5 text-xs rounded-full ${
                                    q.status === "Answered"
                                      ? "bg-green-100 text-green-800"
                                      : q.status === "Deleted"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {q.status}
                                </span>
                                <p className="text-xs text-gray-500">
                                  {new Date(q.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          You haven't asked any questions yet.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right side - Public Questions */}
                  <div className="w-80">
                    <div className="sticky top-0 border-l-2 border-gray-200 pl-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Public Questions from Other Users
                      </h3>
                      {publicQuestions.length > 0 ? (
                        <div className="space-y-4">
                          {publicQuestions.map((q) => (
                            <div
                              key={q._id || q.id}
                              className="p-4 border border-gray-200 rounded-lg bg-white"
                            >
                              <div className="flex flex-col gap-2">
                                <p className="font-medium text-gray-900 line-clamp-2">
                                  {q.question}
                                </p>
                                {q.status === "Answered" && q.answer && (
                                  <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700">
                                      Answer:
                                    </p>
                                    <p className="mt-1 text-gray-600 line-clamp-2">
                                      {q.answer}
                                    </p>
                                  </div>
                                )}
                                <span
                                  className={`px-3 py-1 text-xs rounded-full w-fit ${
                                    q.status === "Answered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {q.status}
                                </span>
                                <p className="text-xs text-gray-500">
                                  Asked by {q.user?.username || "Anonymous"} on{" "}
                                  {new Date(q.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          No public questions available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Search Bar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 flex-1">
                {/* Scholarships Section */}
                <section className="col-span-2">
                  <h2 className="text-xl font-semibold mb-3">
                    {showFavorites
                      ? "Favorite Scholarships"
                      : selectedState
                      ? `Scholarships in ${selectedState}`
                      : "Available Scholarships"}
                  </h2>
                  <div className="grid gap-3">
                    <div className="max-h-[500px] overflow-y-auto p-4 border border-gray-300 rounded-lg">
                      {displayedScholarships.length > 0 ? (
                        displayedScholarships.map((scholarship) => (
                          <div
                            key={scholarship._id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-400 hover:shadow-md transition-shadow mb-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {scholarship.schemeName}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                  Benefits: {scholarship.benefits}
                                </p>
                                <p className="text-gray-600">
                                  Caste: {scholarship.casteCategory}
                                </p>
                                <p className="text-gray-600">
                                  State: {scholarship.state}
                                </p>
                              </div>
                              <button
                                onClick={() => toggleFavorite(scholarship._id)}
                                className="text-gray-400 hover:text-yellow-400"
                              >
                                {favorites.includes(scholarship._id) ? (
                                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                ) : (
                                  <StarOff className="w-6 h-6" />
                                )}
                              </button>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <button
                                onClick={() =>
                                  window.open(scholarship.siteLink, "_blank")
                                }
                                className="px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-opacity-90"
                              >
                                Apply Now
                              </button>
                              <button
                                onClick={() =>
                                  window.open(
                                    scholarship.schemeDocuments,
                                    "_blank"
                                  )
                                }
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Learn More
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 bg-white rounded-lg border border-gray-400">
                          <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600">
                            {showFavorites
                              ? "No favorite scholarships yet"
                              : selectedState
                              ? `No scholarships found in ${selectedState}`
                              : "No scholarships found"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {showFavorites
                              ? "Click the star icon on any scholarship to add it to your favorites"
                              : "Try adjusting your search or filters"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Right Sidebar */}
                <aside>
                  <div className="bg-white h-full p-4 rounded-lg shadow-sm border border-gray-400">
                    <h2 className="text-lg font-semibold mb-3">
                      Announcements
                    </h2>
                    {announcementData.map((item) => (
                      <div
                        key={item.title}
                        className="pb-3 mb-3 last:pb-0 last:mb-0"
                      >
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this question? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setQuestionToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
