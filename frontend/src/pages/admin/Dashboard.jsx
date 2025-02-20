import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Award, 
  Users, 
  Bell, 
  Settings,
  FileText,
  PlusCircle,
  Trash2,
  Edit,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  Search
} from 'lucide-react';

// Mock data for demonstration
const scholarships = [
  {
    id: 1,
    title: "Merit Excellence Scholarship",
    amount: "$5000",
    deadline: "2024-05-15",
    type: "merit-based",
    status: "active",
    eligibility: {
      minGPA: 3.5,
      academicLevel: "Undergraduate",
      fieldOfStudy: "Any",
      familyIncome: "< $50,000"
    }
  },
  {
    id: 2,
    title: "Need-Based Support Grant",
    amount: "$3000",
    deadline: "2024-06-01",
    type: "need-based",
    status: "inactive",
    eligibility: {
      minGPA: 3.0,
      academicLevel: "Graduate",
      fieldOfStudy: "STEM",
      familyIncome: "< $30,000"
    }
  }
];

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    appliedScholarships: 3,
    status: "verified",
    registeredDate: "2024-02-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    appliedScholarships: 2,
    status: "pending",
    registeredDate: "2024-03-01"
  }
];

const announcements = [
  {
    id: 1,
    title: "Deadline Extension Notice",
    content: "The deadline for Merit Excellence Scholarship has been extended to May 30th, 2024",
    date: "2024-03-05",
    status: "scheduled"
  },
  {
    id: 2,
    title: "New Scholarship Launch",
    content: "Introducing new STEM scholarship opportunities for graduate students",
    date: "2024-03-01",
    status: "sent"
  }
];

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNewScholarshipModal, setShowNewScholarshipModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'scholarships':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Scholarships</h2>
              <button 
                onClick={() => setShowNewScholarshipModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <PlusCircle className="w-5 h-5" />
                Add New Scholarship
              </button>
            </div>
            
            <div className="grid gap-6">
              {scholarships.map(scholarship => (
                <div key={scholarship.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{scholarship.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          scholarship.status === 'active' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {scholarship.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">Amount: {scholarship.amount}</p>
                      <p className="text-gray-600">Deadline: {scholarship.deadline}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Eligibility Criteria:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>Min GPA: {scholarship.eligibility.minGPA}</li>
                            <li>Level: {scholarship.eligibility.academicLevel}</li>
                            <li>Field: {scholarship.eligibility.fieldOfStudy}</li>
                            <li>Family Income: {scholarship.eligibility.familyIncome}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'students':
        return (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Scholarships</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          student.status === 'verified' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-yellow-50 text-yellow-600'
                        }`}>
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
      
      case 'announcements':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Announcements</h2>
              <button 
                onClick={() => setShowAnnouncementModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Send className="w-5 h-5" />
                New Announcement
              </button>
            </div>
            
            <div className="grid gap-4">
              {announcements.map(announcement => (
                <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <p className="text-gray-600 mt-1">{announcement.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">{announcement.date}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          announcement.status === 'sent' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {announcement.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Active Scholarships</div>
                    <div className="text-2xl font-semibold">12</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Registered Students</div>
                    <div className="text-2xl font-semibold">245</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Applications</div>
                    <div className="text-2xl font-semibold">89</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Pending Reviews</div>
                    <div className="text-2xl font-semibold">15</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Recent Applications</h3>
                <div className="space-y-4">
                  {students.slice(0, 3).map(student => (
                    <div key={student.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.status === 'verified' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Recent Announcements</h3>
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="py-2 border-b last:border-b-0">
                      <div className="font-medium">{announcement.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{announcement.date}</div>
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
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-600">
            <GraduationCap className="w-6 h-6" />
            Admin Dashboard
          </h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === 'dashboard' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            
            <button 
              onClick={() => setActiveSection('scholarships')}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === 'scholarships' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Award className="w-5 h-5" />
              Scholarships
            </button>
            
            <button 
              onClick={() => setActiveSection('students')}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === 'students' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              Students
            </button>
            
            <button 
              onClick={() => setActiveSection('announcements')}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === 'announcements' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              Announcements
            </button>
            
            <button 
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                activeSection === 'settings' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderDashboardContent()}
      </div>
    </div>
  );
}

export default Dashboard;