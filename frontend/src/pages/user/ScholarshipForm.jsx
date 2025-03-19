import React, { useState } from "react";
import { GraduationCap, CheckCircle, Circle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const STEPS = [
  "Contact Details",
  "Personal Details",
  "Education Details",
  "Eligibility Check",
];

const STATES = [
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

const RELIGIONS = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Other",
];
const CASTES = ["General", "OBC", "SC", "ST", "Other"];
const YEARS_OF_STUDY = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
  "Fifth Year",
];
const SCHOLARSHIP_TYPES = ["Merit-based", "Need-based", "Special Category"];

function FormField({ label, hint, error, children }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <p className="text-xs text-gray-500 mt-1 mb-2">{hint}</p>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function FormStep({ title, currentStep, stepNumber, children }) {
  if (currentStep !== stepNumber) return null;

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );
}

function ProgressBar({ steps, currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index <= currentStep - 1
                    ? "bg-[#001a33] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep - 1 ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <span
                className={`ml-2 text-sm ${
                  index <= currentStep - 1 ? "text-[#001a33]" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-12 ${
                  index < currentStep - 1 ? "bg-[#001a33]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function ScholarshipForm() {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    console.log(cookies);
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact Details
    fullName: "",
    dateOfBirth: "",
    parentName: "",
    mobileNumber: "",
    parentMobileNumber: "",

    // Personal Details
    annualIncome: "",
    profession: "",
    caste: "",
    religion: "",
    state: "",
    minorityStatus: false,
    bplStatus: false,
    singleParent: false,
    disabledStatus: false,

    // Education Details
    tenthMarks: "",
    twelfthMarks: "",
    collegeName: "",
    courseName: "",
    yearOfStudy: "",
    scholarshipCriteria: "",
    areaOfResidence: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.parentName)
        newErrors.parentName = "Parent/Guardian name is required";
      if (!formData.mobileNumber) {
        newErrors.mobileNumber = "Mobile number is required";
      } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Please enter a valid 10-digit number";
      }
      if (!formData.parentMobileNumber) {
        newErrors.parentMobileNumber = "Parent mobile number is required";
      } else if (!/^\d{10}$/.test(formData.parentMobileNumber)) {
        newErrors.parentMobileNumber = "Please enter a valid 10-digit number";
      }
    }

    if (step === 2) {
      if (!formData.annualIncome)
        newErrors.annualIncome = "Annual income is required";
      if (!formData.profession) newErrors.profession = "Profession is required";
      if (!formData.caste) newErrors.caste = "Caste is required";
      if (!formData.religion) newErrors.religion = "Religion is required";
      if (!formData.state) newErrors.state = "State is required";
    }

    if (step === 3) {
      if (!formData.tenthMarks) {
        newErrors.tenthMarks = "10th marks are required";
      } else if (
        parseFloat(formData.tenthMarks) < 0 ||
        parseFloat(formData.tenthMarks) > 100
      ) {
        newErrors.tenthMarks = "Marks should be between 0 and 100";
      }
      if (!formData.twelfthMarks) {
        newErrors.twelfthMarks = "12th marks are required";
      } else if (
        parseFloat(formData.twelfthMarks) < 0 ||
        parseFloat(formData.twelfthMarks) > 100
      ) {
        newErrors.twelfthMarks = "Marks should be between 0 and 100";
      }
      if (!formData.collegeName)
        newErrors.collegeName = "College name is required";
      if (!formData.courseName)
        newErrors.courseName = "Course name is required";
      if (!formData.yearOfStudy)
        newErrors.yearOfStudy = "Year of study is required";
      if (!formData.scholarshipCriteria)
        newErrors.scholarshipCriteria = "Scholarship criteria is required";
      if (!formData.areaOfResidence)
        newErrors.areaOfResidence = "Area of residence is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  var decoded;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(3)) {
      setCurrentStep(4);
    }
    const token = getCookie("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/scholarships/check-eligibility",
        { ...formData, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Scheme checked successfully!");
      } else {
        toast.error("Failed to check schemes. Try again.");
      }
    } catch (error) {
      console.error("Error in checking scheme:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <GraduationCap className="mx-auto h-12 w-12 text-[#001a33]" />
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <ProgressBar steps={STEPS} currentStep={currentStep} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormStep
              title="Contact Details"
              currentStep={currentStep}
              stepNumber={1}
            >
              <FormField
                hint="Enter your full name as per official documents"
                error={errors.fullName}
              >
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Date of Birth"
                placeholder="Select your date of birth"
                error={errors.dateOfBirth}
              >
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Parent/Guardian Name"
                placeholder="Enter your parent or guardian's name"
                error={errors.parentName}
              >
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Mobile Number"
                hint="Provide a valid 10-digit number"
                error={errors.mobileNumber}
              >
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                  maxLength="10"
                />
              </FormField>

              <FormField
                label="Parent's Mobile Number"
                placeholder="Provide a contact number for emergency communication"
                error={errors.parentMobileNumber}
              >
                <input
                  type="tel"
                  name="parentMobileNumber"
                  value={formData.parentMobileNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                  maxLength="10"
                />
              </FormField>
            </FormStep>

            <FormStep
              title="Personal Details"
              currentStep={currentStep}
              stepNumber={2}
            >
              <FormField
                label="Annual Family Income"
                hint="Enter your total family income per year"
                error={errors.annualIncome}
              >
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Profession"
                hint="Mention your or your guardian's occupation"
                error={errors.profession}
              >
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Caste"
                hint="Select your caste category from the list"
                error={errors.caste}
              >
                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                >
                  <option value="">Select Caste</option>
                  {CASTES.map((caste) => (
                    <option key={caste} value={caste}>
                      {caste}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Religion"
                hint="Choose your religion"
                error={errors.religion}
              >
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                >
                  <option value="">Select Religion</option>
                  {RELIGIONS.map((religion) => (
                    <option key={religion} value={religion}>
                      {religion}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="State"
                hint="Select the state of residence"
                error={errors.state}
              >
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                >
                  <option value="">Select State</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="minorityStatus"
                    checked={formData.minorityStatus}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#001a33] focus:ring-[#001a33] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Belong to Minority Community
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="bplStatus"
                    checked={formData.bplStatus}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#001a33] focus:ring-[#001a33] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Below Poverty Line (BPL)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="singleParent"
                    checked={formData.singleParent}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#001a33] focus:ring-[#001a33] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Single Parent
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="disabledStatus"
                    checked={formData.disabledStatus}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#001a33] focus:ring-[#001a33] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Person with Disability
                  </label>
                </div>
              </div>
            </FormStep>

            <FormStep
              title="Education Details"
              currentStep={currentStep}
              stepNumber={3}
            >
              <FormField
                label="10th Marks (%)"
                hint="Enter your percentage or CGPA"
                error={errors.tenthMarks}
              >
                <input
                  type="number"
                  name="tenthMarks"
                  value={formData.tenthMarks}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="12th Marks (%)"
                hint="Enter your percentage or CGPA"
                error={errors.twelfthMarks}
              >
                <input
                  type="number"
                  name="twelfthMarks"
                  value={formData.twelfthMarks}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Current College/Institution Name"
                hint="Enter your current college/university name"
                error={errors.collegeName}
              >
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Course Name"
                hint="Enter your enrolled course"
                error={errors.courseName}
              >
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                />
              </FormField>

              <FormField
                label="Year of Study"
                hint="Select your current year of study"
                error={errors.yearOfStudy}
              >
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                >
                  <option value="">Select Year</option>
                  {YEARS_OF_STUDY.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Scholarship Criteria"
                hint="Select if you need a merit-based, need-based, or special-category scholarship"
                error={errors.scholarshipCriteria}
              >
                <select
                  name="scholarshipCriteria"
                  value={formData.scholarshipCriteria}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                >
                  <option value="">Select Criteria</option>
                  {SCHOLARSHIP_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Area of Residence"
                hint="Select whether you live in an urban or rural area"
                error={errors.areaOfResidence}
              >
                <select
                  name="areaOfResidence"
                  value={formData.areaOfResidence}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#001a33] focus:ring-[#001a33]"
                >
                  <option value="">Select Area</option>
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                </select>
              </FormField>
            </FormStep>

            <FormStep
              title="Eligibility Results"
              currentStep={currentStep}
              stepNumber={4}
            >
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Based on your profile, you are eligible for the following
                      scholarships:
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    National Scholarship Portal
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Merit-cum-Means Scholarship for Professional and Technical
                    Courses
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center text-sm text-[#001a33] hover:text-opacity-80"
                  >
                    Learn more
                    <span className="ml-2">→</span>
                  </a>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    State Merit Scholarship
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    For high-achieving students in higher education
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center text-sm text-[#001a33] hover:text-opacity-80"
                  >
                    Learn more
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </FormStep>

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001a33]"
                >
                  Back
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto bg-[#001a33] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001a33]"
                >
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  className="ml-3 bg-[#001a33] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001a33]"
                >
                  Check Eligibility
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipForm;