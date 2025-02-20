import React, { useState } from "react";
import {
  Search,
  GraduationCap,
  Filter,
  Heart,
  User,
  Bell,
  HelpCircle,
  Star,
  StarOff,
} from "lucide-react";

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

const appliedScholarships = [
  {
    id: 1,
    title: "STEM Leaders Scholarship",
    amount: "$4000",
    appliedDate: "2024-02-15",
    status: "pending",
  },
  {
    id: 2,
    title: "Future Engineers Fund",
    amount: "$6000",
    appliedDate: "2024-02-01",
    status: "approved",
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

  // Toggle Favorite Function
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <nav className="mt-8 space-y-2">
          <button className="w-full flex items-center gap-2 p-2 rounded-lg bg-indigo-50 text-[#001a33]">
            <Filter className="w-5 h-5" /> Filters
          </button>
          <div className="pl-7 space-y-2 text-sm">
            {["all", "merit", "need"].map((type) => (
              <button
                key={type}
                className={`w-full text-left p-1 rounded ${
                  activeFilter === type ? "text-[#001a33]" : "text-gray-600"
                }`}
                onClick={() => setActiveFilter(type)}
              >
                {type === "all"
                  ? "All Scholarships"
                  : type === "merit"
                  ? "Merit Based"
                  : "Need Based"}
              </button>
            ))}
          </div>

          <button className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Heart className="w-5 h-5" /> Favorites
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <User className="w-5 h-5" /> Profile
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <HelpCircle className="w-5 h-5" /> Help & FAQs
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search scholarships..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400  focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
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
            <h2 className="text-xl font-semibold">Available Scholarships</h2>
            {scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-400 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {scholarship.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Amount: {scholarship.amount}
                    </p>
                    <p className="text-gray-600">
                      Deadline: {scholarship.deadline}
                    </p>
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
                  <button className="px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-[#001a33]">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            {/* Applied Scholarships */}
            <div className="bg-white p-6 rounded-lg border-gray-400 shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">
                Applied Scholarships
              </h2>
              {appliedScholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <h3 className="font-medium">{scholarship.title}</h3>
                  <p className="text-sm text-gray-600">
                    Applied: {scholarship.appliedDate}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                      scholarship.status === "approved"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {scholarship.status.charAt(0).toUpperCase() +
                      scholarship.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>

            {/* News & Updates */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-400">
              <h2 className="text-lg font-semibold mb-4">News & Updates</h2>
              {news.map((item) => (
                <div
                  key={item.id}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{item.date}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
