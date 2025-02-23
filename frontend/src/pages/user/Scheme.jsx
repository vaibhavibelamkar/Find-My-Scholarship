import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { 
  GraduationCap, 
  Filter, 
  Calendar, 
  DollarSign, 
  Building2, 
  Search,
  Share2,
  Bookmark,
  ExternalLink,
  Users,
  Clock,
  ChevronLeft,
  ChevronDown,
  CheckCircle
} from 'lucide-react';

const scholarships = [
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Education",
    amount: 75000,
    deadline: "2024-05-15",
    type: "Central Ministry",
    gender: "All",
    category: "General",
    eligibility: ["Engineering students", "CGPA > 8.5", "Family income < 8L/year"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  },
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Education",
    amount: 75000,
    deadline: "2024-05-15",
    type: "Central Ministry",
    gender: "All",
    category: "General",
    eligibility: ["Engineering students", "CGPA > 8.5", "Family income < 8L/year"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  },
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Education",
    amount: 75000,
    deadline: "2024-05-15",
    type: "Central Ministry",
    gender: "All",
    category: "General",
    eligibility: ["Engineering students", "CGPA > 8.5", "Family income < 8L/year"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  },
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Education",
    amount: 75000,
    deadline: "2024-05-15",
    type: "Central Ministry",
    gender: "All",
    category: "General",
    eligibility: ["Engineering students", "CGPA > 8.5", "Family income < 8L/year"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  },
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Education",
    amount: 75000,
    deadline: "2024-05-15",
    type: "Central Ministry",
    gender: "All",
    category: "General",
    eligibility: ["Engineering students", "CGPA > 8.5", "Family income < 8L/year"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  },
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Education",
    amount: 75000,
    deadline: "2024-05-15",
    type: "Central Ministry",
    gender: "All",
    category: "General",
    eligibility: ["Engineering students", "CGPA > 8.5", "Family income < 8L/year"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  },
  
  {
    id: 2,
    name: "State Merit Scholarship",
    provider: "State Ministry",
    amount: 50000,
    deadline: "2024-06-30",
    type: "State Ministry",
    gender: "all",
    category: "OBC",
    eligibility: ["First year students", "State resident", "Merit based"],
    applicationUrl: "https://mahadbtmahait.gov.in/"
  }
];

function Scheme() {
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState('');
 
  const [filters, setFilters] = useState({
    deadline: 'all',
    category: 'all',
    gender: 'all'
  });
  
  const filteredScholarships = scholarships.filter(scholarship => {
    return (
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender === 'all' || scholarship.gender === filters.gender) &&
      (filters.category === 'all' || scholarship.category === filters.category)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <nav className="bg-[#001a33] shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
          <ChevronLeft 
                className="h-6 w-6 text-white cursor-pointer" 
                onClick={() => navigate('/user/dashboard')} 
              /> <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl">FindMyScholarship</span>
          </div>
        </div>
      </div>
    </nav>

      <div className="container mx-auto px-4 mt-6 flex flex-col">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4 sticky top-16 z-10">
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
          
          <div className="flex flex-wrap gap-4 mt-4">
            <select className="bg-gray-100 px-3 py-2 rounded-lg" onChange={(e) => setFilters({...filters, gender: e.target.value})}>
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select className="bg-gray-100 px-3 py-2 rounded-lg" onChange={(e) => setFilters({...filters, category: e.target.value})}>
              <option value="all">All Categories</option>
              <option value="SC/ST">SC/ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScholarships.map(scholarship => (
              <div key={scholarship.id} className="bg-white rounded-lg shadow-sm p-3 text-sm">
                <h2 className="text-base font-semibold w-full">{scholarship.name}</h2>
                <p className="text-gray-600 flex items-center"><Building2 className="h-4 w-4 mr-2" />{scholarship.provider}</p>
                <p className="text-gray-600 flex items-center"><DollarSign className="h-4 w-4 mr-2" />₹{scholarship.amount}</p>
                <p className="text-gray-600 flex items-center"><Calendar className="h-4 w-4 mr-2" />Deadline: {scholarship.deadline}</p>
                
                <div className="mt-2">
                  <h3 className="font-semibold flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Eligibility:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {scholarship.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-center"><CheckCircle className="h-3.5 w-3.5 mr-2 text-blue-500" />{criteria}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <a href={scholarship.applicationUrl} className="flex-1 bg-[#001a33] text-white px-3 py-1.5 rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-1">
                    Apply Now
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scheme;
