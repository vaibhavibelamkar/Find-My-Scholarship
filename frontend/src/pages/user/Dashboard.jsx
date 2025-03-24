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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const news = [
  { id: 1, title: "New Government Scholarship Announced", date: "2024-03-01" },
  {
    id: 2,
    title: "Deadline Extended for Merit Scholarships",
    date: "2024-03-05",
  },
];

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
];

function Dashboard() {
  const [userData, setUserData] = useState();
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [announcementData, setAnnouncementData] = useState([]);

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
    fetchAnnouncements();
  }, [navigate]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([2]);
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [question, setQuestion] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  // Filter scholarships based on search query and active filter
  const filteredScholarships = React.useMemo(() => {
    let filtered = [...scholarships];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.schemeName.toLowerCase().includes(query) ||
          scholarship.state.toLowerCase().includes(query) ||
          scholarship.benefits.toLowerCase().includes(query)
      );
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter(
        (scholarship) => scholarship.state === selectedState
      );
    }

    // Apply category filter
    if (activeFilter !== "all" && activeFilter !== "state") {
      filtered = filtered.filter((scholarship) => {
        switch (activeFilter) {
          case "caste":
            return scholarship.caste;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [scholarships, searchQuery, activeFilter, selectedState]);

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
      }
      const apiUrl = "http://localhost:8080/api/user/questions";
      const response = await axios.post(apiUrl, {
        question,
        token,
      });

      if (response.status === 201) {
        setShowThankYou(true);
        setQuestion("");
      }
    } catch (error) {
      toast.error("Error submitting question:", error);
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

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setActiveFilter("state");
    setShowStateDropdown(false);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Profile Section - Moved up */}
        <div className="mt-5 mr-10 p-4 bg-white rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100 shadow-md flex-shrink-0">
              <img
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
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
              <div
                className="relative"
                onMouseEnter={() => setShowStateDropdown(true)}
                onMouseLeave={() => setShowStateDropdown(false)}
              >
                <button
                  className={`w-full text-left p-1 rounded flex items-center justify-between ${
                    activeFilter === "state"
                      ? "text-[#001a33]"
                      : "text-gray-400"
                  }`}
                >
                  <span>
                    {selectedState ? `State: ${selectedState}` : "State"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                {showStateDropdown && (
                  <div className="absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="max-h-64 overflow-y-auto">
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
              <button
                className={`w-full text-left p-1 rounded ${
                  activeFilter === "caste" ? "text-[#001a33]" : "text-gray-400"
                }`}
                onClick={() => {
                  setActiveFilter("caste");
                  setSelectedState("");
                }}
              >
                Caste
              </button>
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
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-400">
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
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-opacity-90"
                    >
                      Send Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowHelpForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
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
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Bell className="w-6 h-6" />
                </button>
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
    </div>
  );
}

export default Dashboard;
