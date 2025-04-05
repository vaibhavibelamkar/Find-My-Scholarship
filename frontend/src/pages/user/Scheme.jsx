import React, { useState, useEffect } from "react";
import {
  Search,
  Share2,
  ExternalLink,
  Calendar,
  DollarSign,
  Building2,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

function Scheme() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    deadline: "all",
    category: "all",
    gender: "all",
  });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/scholarships/all");
      if (response.data?.success) {
        setScholarships(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch scholarships");
    } finally {
      setLoading(false);
    }
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    return (
      scholarship.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender === "all" || scholarship.gender === filters.gender) &&
      (filters.category === "all" || scholarship.casteCategory === filters.category)
    );
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden mt-16">
      {/* Search and Filters */}
      <div className="container mx-auto px-4 mt-0 flex flex-col">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4 sticky top-0 z-10">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search scholarships..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-4 mt-4">
            <select
              className="bg-gray-100 px-3 py-2 rounded-lg"
              onChange={(e) =>
                setFilters({ ...filters, state: e.target.value })
              }
            >
              <option value="All States">All States</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>

            <button className="bg-gray-100 px-3 py-2 rounded-lg">
              Deadline
            </button>
          </div>
        </div>

        {/* Scholarship Cards */}
        <div className="overflow-y-auto max-h-[calc(100vh-180px)] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">Loading scholarships...</div>
            ) : filteredScholarships.length > 0 ? (
              filteredScholarships.map((scholarship) => (
                <div
                  key={scholarship._id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-400 hover:shadow-md transition-shadow"
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
                      <p className="text-gray-600">
                        Gender: {scholarship.gender}
                      </p>
                      <p className="text-gray-600">
                        Area: {scholarship.areaOfResidence}
                      </p>
                      <p className="text-gray-600">
                        Income: {scholarship.annualIncome}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => window.open(scholarship.siteLink, "_blank")}
                      className="px-4 py-2 bg-[#001a33] text-white rounded-lg hover:bg-opacity-90"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => window.open(scholarship.schemeDocuments, "_blank")}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No scholarships found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scheme;
