import React, { useState } from "react";
import {
  Search,
  Filter,
  Heart,
  User,
  Bell,
  HelpCircle,
  Star,
  StarOff,
  Mail,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import UserProfileButton from "../../components/UserProfileButton";

<UserProfileButton />

// Sample User Data
const userData = {
  name: "",  // Will be populated from fullName
  email: "john.doe@example.com",
  phone: "", // Will be populated from mobileNumber
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60"
};

// Sample Scholarships Data
const scholarships = [
  {
    id: 1,
    title: "Merit Excellence Scholarship",
    amount: "$5000",
    deadline: "2024-05-15",
    type: "merit-based",
  },
  {
    id: 2,
    title: "Need-Based Support Grant",
    amount: "$3000",
    deadline: "2024-06-01",
    type: "need-based",
  },
];

const news = [
  { id: 1, title: "New Government Scholarship Announced", date: "2024-03-01" },
  {
    id: 2,
    title: "Deadline Extended for Merit Scholarships",
    date: "2024-03-05",
  },
];

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([2]);
  const [showProfile, setShowProfile] = useState(false);
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [question, setQuestion] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  // Toggle Favorite Function
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setQuestion("");
    setTimeout(() => {
      setShowThankYou(false);
      setShowHelpForm(false);
    }, 3000);
  };

  // Get favorite scholarships
  const favoriteScholarships = scholarships.filter(scholarship => 
    favorites.includes(scholarship.id)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        {showProfile ? (
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={userData.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-indigo-100"
              />
              <h2 className="text-xl font-semibold text-[#001a33]">{userData.name || "Not provided"}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{userData.phone || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowProfile(false)}
              className="w-full mt-6 px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-opacity-90"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <nav className="mt-8 space-y-2">
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
              {["all", "merit", "need"].map((type) => (
                <button
                  key={type}
                  className={`w-full text-left p-1 rounded ${
                    activeFilter === type ? "text-[#001a33]" : "text-gray-400"
                  }`}
                  onClick={() => setActiveFilter(type)}
                >
                  {type === "all"
                    ? "Governmental"
                    : type === "merit"
                    ? "Non Governmental"
                    : "Others"}
                </button>
              ))}
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
                setShowProfile(true);
                setShowFavorites(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <User className="w-5 h-5" /> Profile
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
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {showHelpForm ? (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-400">
            <h2 className="text-xl font-semibold mb-6">Help & FAQs</h2>
            {showThankYou ? (
              <div className="text-center py-8">
                <p className="text-lg text-green-600">Thanks for asking your question!</p>
                <p className="text-gray-600 mt-2">You will receive an answer shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
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
          <>
            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Scholarships Section */}
              <section className="col-span-2 space-y-6">
                <h2 className="text-xl font-semibold">
                  {showFavorites ? "Favorite Scholarships" : "Available Scholarships"}
                </h2>
                {(showFavorites ? favoriteScholarships : scholarships).map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-400 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{scholarship.title}</h3>
                        <p className="text-gray-600 mt-1">Amount: {scholarship.amount}</p>
                        <p className="text-gray-600">Deadline: {scholarship.deadline}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-[#001a33] rounded-full text-sm">
                          {scholarship.type}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(scholarship.id)}
                        className="text-gray-400 hover:text-yellow-400"
                      >
                        {favorites.includes(scholarship.id) ? (
                          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-opacity-90">
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
                {showFavorites && favoriteScholarships.length === 0 && (
                  <div className="text-center py-8 bg-white rounded-lg border border-gray-400">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No favorite scholarships yet</p>
                    <p className="text-sm text-gray-500 mt-1">Click the star icon on any scholarship to add it to your favorites</p>
                  </div>
                )}
              </section>

              {/* Right Sidebar */}
              <aside className="space-y-8">
                {/* News & Updates */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-400">
                  <h2 className="text-lg font-semibold mb-4">News & Updates</h2>
                  {news.map((item) => (
                    <div key={item.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{item.date}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;