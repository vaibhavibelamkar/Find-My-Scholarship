import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Award, 
  Users, 
  Bell, 
  Settings,
  PlusCircle,
  Trash2,
  Edit,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  Search,
  X,
  Calendar,
  DollarSign,
  Building,
  FileText
} from 'lucide-react';

// Mock data for scholarships/schemes
const initialSchemes = [
  {
    id: 1,
    name: "Merit Excellence Scholarship",
    provider: "Government",
    amount: 5000,
    deadline: "2024-05-15",
    description: "Scholarship for meritorious students",
    eligibility: {
      income: "Below $50,000",
      academics: "GPA 3.5+",
      category: "All",
    }
  },
  {
    id: 2,
    name: "Need-Based Grant",
    provider: "NGO",
    amount: 3000,
    deadline: "2024-06-01",
    description: "Support for economically disadvantaged students",
    eligibility: {
      income: "Below $30,000",
      academics: "GPA 3.0+",
      category: "Undergraduate",
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
  const [schemes, setSchemes] = useState(initialSchemes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    provider: 'Government',
    amount: '',
    deadline: '',
    description: '',
    eligibility: {
      income: '',
      academics: '',
      category: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('eligibility.')) {
      const eligibilityField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        eligibility: {
          ...prev.eligibility,
          [eligibilityField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddScheme = (e) => {
    e.preventDefault();
    const newScheme = {
      id: schemes.length + 1,
      ...formData
    };
    setSchemes(prev => [...prev, newScheme]);
    setShowAddModal(false);
    setFormData({
      name: '',
      provider: 'Government',
      amount: '',
      deadline: '',
      description: '',
      eligibility: {
        income: '',
        academics: '',
        category: ''
      }
    });
  };

  const handleEditScheme = (e) => {
    e.preventDefault();
    setSchemes(prev => prev.map(scheme => 
      scheme.id === selectedScheme.id ? { ...formData, id: scheme.id } : scheme
    ));
    setShowEditModal(false);
  };

  const handleDeleteScheme = () => {
    setSchemes(prev => prev.filter(scheme => scheme.id !== selectedScheme.id));
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
      <div>
        <label className="block text-sm font-medium text-gray-700">Scheme Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Provider</label>
        <select
          name="provider"
          value={formData.provider}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Government">Government</option>
          <option value="NGO">NGO</option>
          <option value="Private">Private</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Eligibility Criteria</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Income Criteria</label>
          <input
            type="text"
            name="eligibility.income"
            value={formData.eligibility.income}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Requirements</label>
          <input
            type="text"
            name="eligibility.academics"
            value={formData.eligibility.academics}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="eligibility.category"
            value={formData.eligibility.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
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
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  const renderScholarshipManager = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Edit Schemes</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Scheme
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schemes.map((scheme) => (
              <tr key={scheme.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{scheme.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{scheme.provider}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${scheme.amount}</div>
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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Scheme</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SchemeForm onSubmit={handleAddScheme} buttonText="Add Scheme" />
          </div>
        </div>
      )}

      {/* Edit Scheme Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Scheme</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SchemeForm onSubmit={handleEditScheme} buttonText="Update Scheme" />
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
              Are you sure you want to delete "{selectedScheme?.name}"? This action cannot be undone.
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
      case 'editSchemes':
        return renderScholarshipManager();
      
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
            
            <div className="grid grid-cols-3 gap-6">
              <button 
                onClick={() => setActiveSection('editSchemes')}
                className="bg-white p-8 rounded-lg shadow-sm border hover:border-indigo-500 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full group-hover:bg-indigo-100">
                    <Edit className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800">Edit Schemes</div>
                    <div className="text-gray-500 mt-1">Manage scholarship schemes</div>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveSection('scholarships')}
                className="bg-white p-8 rounded-lg shadow-sm border hover:border-green-500 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-green-50 text-green-600 rounded-full group-hover:bg-green-100">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800">Active Scholarships</div>
                    <div className="text-gray-500 mt-1">View active scholarships</div>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveSection('students')}
                className="bg-white p-8 rounded-lg shadow-sm border hover:border-yellow-500 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full group-hover:bg-yellow-100">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800">Registered Students</div>
                    <div className="text-gray-500 mt-1">Manage student registrations</div>
                  </div>
                </div>
              </button>
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