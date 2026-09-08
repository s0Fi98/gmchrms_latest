import React, { useState } from "react";
import {
  Users,
  UserPlus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  Trash2,
  Edit3,
  Search,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";

// 1. Reusable Form & UI Component Imports
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import TextAreaField from "../../../components/common/textarea/TextArea";
import RadioButton from "../../../components/common/radio/RadioButton";
import Checkbox from "../../../components/common/checkbox/Checkbox";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function EmployeeData() {
  const [activeTab, setActiveTab] = useState("directory"); // "directory" | "register"
  const [formStep, setFormStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [cadreFilter, setCadreFilter] = useState("All");

  // Initial State capturing all required establishment fields
  const initialFormData = {
    // Step 1: Personal Profile
    empCode: "",
    name: "",
    dob: "",
    gender: "Male",
    bloodGroup: "",
    religion: "",
    caste: "",
    maritalStatus: "",
    address: "",
    localAddress: "",
    
    // Step 2: Statutory & Government IDs
    aadhar: "",
    pan: "",
    voterId: "",
    drivingLicense: "",
    passport: "",
    passportExpiry: "",
    pfAccount: "",
    esiNumber: "",

    // Step 3: Service & Cadre Allocation
    employeeType: "Permanent",
    department: "",
    designation: "",
    payGrade: "",
    joiningDate: "",
    retirementDate: "",
    qualification: "",
    reportingTo: "",

    // Step 4: Contact & Bank Disbursement
    mobile: "",
    altMobile: "",
    email: "",
    personalEmail: "",
    emergencyName: "",
    emergencyPhone: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "Savings",
    termsAccepted: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Mock employee master register
  const [employees, setEmployees] = useState([
    {
      id: 1,
      empCode: "GMC-0011",
      name: "Rajib Borah",
      department: "Administration",
      designation: "HR Manager",
      payGrade: "GP-6 (₹4200)",
      type: "Permanent",
      status: "Active",
      joiningDate: "01 Jan 2010",
      mobile: "+91 98540 00011",
    },
    {
      id: 2,
      empCode: "GMC-0104",
      name: "Priya Sharma",
      department: "Engineering",
      designation: "Executive Engineer",
      payGrade: "GP-8 (₹4800)",
      type: "Permanent",
      status: "Active",
      joiningDate: "15 Mar 2014",
      mobile: "+91 98540 00012",
    },
    {
      id: 3,
      empCode: "GMC-0210",
      name: "Deepak Kalita",
      department: "Finance & Accounts",
      designation: "Accountant",
      payGrade: "GP-4 (₹2400)",
      type: "Contractual",
      status: "Active",
      joiningDate: "10 Jul 2021",
      mobile: "+91 98540 00013",
    },
    {
      id: 4,
      empCode: "GMC-0315",
      name: "Anupam Gogoi",
      department: "Public Works",
      designation: "Junior Engineer",
      payGrade: "Fixed Pay",
      type: "Deputation",
      status: "Suspended",
      joiningDate: "01 Nov 2018",
      mobile: "+91 98540 00014",
    },
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: employees.length + 1,
      empCode: formData.empCode || `GMC-0${employees.length + 100}`,
      name: formData.name,
      department: formData.department || "General Administration",
      designation: formData.designation || "Junior Assistant",
      payGrade: formData.payGrade || "GP-2",
      type: formData.employeeType,
      status: "Active",
      joiningDate: formData.joiningDate || "01 Sep 2026",
      mobile: formData.mobile || "—",
    };

    setEmployees([newEntry, ...employees]);
    setFormData(initialFormData);
    setFormStep(1);
    setActiveTab("directory");
  };

  // Directory Columns for the Reusable Table Component
  const columns = [
    {
      key: "empCode",
      label: "Emp Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800">{row.empCode}</span>
      ),
    },
    {
      key: "name",
      label: "Officer / Staff Name",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium">{row.mobile}</span>
        </div>
      ),
    },
    {
      key: "department",
      label: "Cadre & Wing",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 leading-tight">{row.department}</p>
          <span className="text-[11px] text-indigo-600 font-medium">{row.designation}</span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Employment Type",
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          {row.type}
        </span>
      ),
    },
    {
      key: "status",
      label: "Current Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            icon={<Edit3 size={13} className="text-slate-500" />}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Editing ${row.name}`);
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={13} className="text-rose-500" />}
            onClick={(e) => {
              e.stopPropagation();
              setEmployees(employees.filter((emp) => emp.id !== row.id));
            }}
          />
        </div>
      ),
    },
  ];

  // Filtering Logic
  const filteredData = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCadre = cadreFilter === "All" || emp.type === cadreFilter;
    return matchesSearch && matchesCadre;
  });

  return (
    <div className="space-y-6">
      {/* ── Top Header & Tab Trigger Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Employee Cadre Administration
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Register, audit, and onboard municipal staff
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant={activeTab === "directory" ? "primary" : "secondary"}
            icon={Users}
            onClick={() => setActiveTab("directory")}
          >
            Employee Directory
          </Button>
          <Button
            size="md"
            variant={activeTab === "register" ? "primary" : "secondary"}
            icon={UserPlus}
            onClick={() => setActiveTab("register")}
          >
            New Onboarding
          </Button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 1: EMPLOYEE MASTER DIRECTORY                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          {/* Filter Toolbar Card */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, employee code, or wing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800"
                />
              </div>
              {searchTerm && (
                <Button
                  size="sm"
                  variant="ghost"
                  icon={RotateCcw}
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>

            {/* Quick Cadre Filter Buttons */}
            <div className="flex items-center gap-1.5 self-end md:self-auto overflow-x-auto">
              {["All", "Permanent", "Contractual", "Deputation"].map((type) => (
                <button
                  key={type}
                  onClick={() => setCadreFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    cadreFilter === type
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Reusable Data Table Component */}
          <Table columns={columns} data={filteredData} />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 2: STEPPED ONBOARDING REGISTRATION                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "register" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Multi-step Header Indicator */}
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-indigo-200">
                {formStep}
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {formStep === 1 && "Step 1: Personal & Demographic Profile"}
                  {formStep === 2 && "Step 2: Statutory Identification & Social Security"}
                  {formStep === 3 && "Step 3: Service Cadre & Official Designation"}
                  {formStep === 4 && "Step 4: Contact & Bank Disbursement Details"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Fill in the verified documentation for municipal personnel dossier.
                </p>
              </div>
            </div>

            {/* Progress Pill Bar */}
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`h-2 rounded-full transition-all ${
                    formStep === stepNum
                      ? "w-8 bg-indigo-600"
                      : formStep > stepNum
                      ? "w-2 bg-emerald-500"
                      : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dynamic Step Body */}
          <form onSubmit={handleFormSubmit} className="p-6 md:p-8">
            {/* STEP 1: PERSONAL DETAILS */}
            {formStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InputField
                    label="Employee Code / Cadre ID"
                    id="empCode"
                    value={formData.empCode}
                    onChange={(e) => handleChange("empCode", e.target.value)}
                    placeholder="e.g. GMC-2026-09"
                    required
                  />
                  <InputField
                    label="Full Legal Name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="As printed on Aadhaar"
                    required
                  />
                  <InputField
                    label="Date of Birth"
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SelectField
                    label="Blood Group"
                    id="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange("bloodGroup", e.target.value)}
                    options={[
                      { value: "A+", label: "A+" },
                      { value: "A-", label: "A-" },
                      { value: "B+", label: "B+" },
                      { value: "B-", label: "B-" },
                      { value: "O+", label: "O+" },
                      { value: "O-", label: "O-" },
                      { value: "AB+", label: "AB+" },
                      { value: "AB-", label: "AB-" },
                    ]}
                  />
                  <SelectField
                    label="Religious Faith"
                    id="religion"
                    value={formData.religion}
                    onChange={(e) => handleChange("religion", e.target.value)}
                    options={[
                      { value: "Hindu", label: "Hindu" },
                      { value: "Muslim", label: "Muslim" },
                      { value: "Christian", label: "Christian" },
                      { value: "Sikh", label: "Sikh" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                  <SelectField
                    label="Caste Reservation Category"
                    id="caste"
                    value={formData.caste}
                    onChange={(e) => handleChange("caste", e.target.value)}
                    options={[
                      { value: "General", label: "General" },
                      { value: "OBC", label: "OBC" },
                      { value: "MOBC", label: "MOBC" },
                      { value: "SC", label: "SC" },
                      { value: "ST", label: "ST" },
                    ]}
                  />
                  <SelectField
                    label="Marital Status"
                    id="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={(e) => handleChange("maritalStatus", e.target.value)}
                    options={[
                      { value: "Single", label: "Single" },
                      { value: "Married", label: "Married" },
                      { value: "Widowed", label: "Widowed" },
                    ]}
                  />
                </div>

                {/* Reusable Radio Button for Gender Selection */}
                <div className="pt-2">
                  <RadioButton
                    label="Gender Identity"
                    name="gender"
                    direction="row"
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <TextAreaField
                    label="Permanent Residential Address"
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Enter permanent domicile address..."
                  />
                  <TextAreaField
                    label="Current Local Address"
                    id="localAddress"
                    rows={3}
                    value={formData.localAddress}
                    onChange={(e) => handleChange("localAddress", e.target.value)}
                    placeholder="Enter address in Guwahati if different..."
                  />
                </div>
              </div>
            )}

            {/* STEP 2: STATUTORY IDS */}
            {formStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Aadhaar Identifier"
                    id="aadhar"
                    value={formData.aadhar}
                    onChange={(e) => handleChange("aadhar", e.target.value)}
                    placeholder="12-digit UIDAI number"
                    maxLength={14}
                    required
                  />
                  <InputField
                    label="Income Tax PAN"
                    id="pan"
                    value={formData.pan}
                    onChange={(e) => handleChange("pan", e.target.value)}
                    placeholder="10-character PAN (e.g. ABCDE1234F)"
                    maxLength={10}
                    required
                  />
                  <InputField
                    label="Election Commission Voter ID"
                    id="voterId"
                    value={formData.voterId}
                    onChange={(e) => handleChange("voterId", e.target.value)}
                    placeholder="e.g. ASD1234567"
                  />
                  <InputField
                    label="Driving License Reference"
                    id="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={(e) => handleChange("drivingLicense", e.target.value)}
                    placeholder="e.g. AS01-2010-0001234"
                  />
                </div>

                <hr className="my-2 border-slate-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="PF Universal Account Number (UAN)"
                    id="pfAccount"
                    value={formData.pfAccount}
                    onChange={(e) => handleChange("pfAccount", e.target.value)}
                    placeholder="e.g. AS/GHY/001/0011"
                  />
                  <InputField
                    label="ESI Registration No."
                    id="esiNumber"
                    value={formData.esiNumber}
                    onChange={(e) => handleChange("esiNumber", e.target.value)}
                    placeholder="16-digit ESI number"
                  />
                  <InputField
                    label="Passport Number (Optional)"
                    id="passport"
                    value={formData.passport}
                    onChange={(e) => handleChange("passport", e.target.value)}
                    placeholder="e.g. P1234567"
                  />
                  <InputField
                    label="Passport Expiry Date"
                    id="passportExpiry"
                    type="date"
                    value={formData.passportExpiry}
                    onChange={(e) => handleChange("passportExpiry", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: EMPLOYMENT & CADRE */}
            {formStep === 3 && (
              <div className="space-y-4">
                <RadioButton
                  label="Establishment Cadre Allocation"
                  name="employeeType"
                  direction="row"
                  value={formData.employeeType}
                  onChange={(e) => handleChange("employeeType", e.target.value)}
                  options={[
                    { value: "Permanent", label: "Permanent", description: "Regular Cadre strength" },
                    { value: "Contractual", label: "Contractual", description: "Fixed tenure engagement" },
                    { value: "Deputation", label: "Deputation", description: "Attached from external dept" },
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <SelectField
                    label="Allocated Municipal Wing"
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    options={[
                      { value: "Administration", label: "Administration" },
                      { value: "Engineering & Works", label: "Engineering & Works" },
                      { value: "Finance & Accounts", label: "Finance & Accounts" },
                      { value: "Revenue & Assessment", label: "Revenue & Assessment" },
                      { value: "Information Technology", label: "Information Technology" },
                      { value: "Public Health & Conservancy", label: "Public Health & Conservancy" },
                    ]}
                    required
                  />
                  <SelectField
                    label="Official Designation"
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => handleChange("designation", e.target.value)}
                    options={[
                      { value: "Executive Engineer", label: "Executive Engineer" },
                      { value: "Assistant Engineer", label: "Assistant Engineer" },
                      { value: "Junior Engineer", label: "Junior Engineer" },
                      { value: "HR Manager", label: "HR Manager" },
                      { value: "Superintendent", label: "Superintendent" },
                      { value: "Senior Accounts Officer", label: "Senior Accounts Officer" },
                      { value: "Junior Assistant", label: "Junior Assistant" },
                      { value: "Tax Collector", label: "Tax Collector" },
                    ]}
                    required
                  />
                  <SelectField
                    label="Pay Scale / Grade Band"
                    id="payGrade"
                    value={formData.payGrade}
                    onChange={(e) => handleChange("payGrade", e.target.value)}
                    options={[
                      { value: "Fixed Pay", label: "Fixed Pay (Contractual)" },
                      { value: "GP-1 (₹1800)", label: "Grade Pay 1 (₹1,800)" },
                      { value: "GP-2 (₹1900)", label: "Grade Pay 2 (₹1,900)" },
                      { value: "GP-4 (₹2400)", label: "Grade Pay 4 (₹2,400)" },
                      { value: "GP-6 (₹4200)", label: "Grade Pay 6 (₹4,200)" },
                      { value: "GP-8 (₹4800)", label: "Grade Pay 8 (₹4,800)" },
                    ]}
                    required
                  />
                  <InputField
                    label="Educational Qualification"
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) => handleChange("qualification", e.target.value)}
                    placeholder="e.g. B.Tech (Civil), MBA, B.Com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <InputField
                    label="Date of Service Joining"
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleChange("joiningDate", e.target.value)}
                    required
                  />
                  <InputField
                    label="Superannuation / Retirement Date"
                    id="retirementDate"
                    type="date"
                    value={formData.retirementDate}
                    onChange={(e) => handleChange("retirementDate", e.target.value)}
                  />
                  <InputField
                    label="Reporting Officer Designation"
                    id="reportingTo"
                    value={formData.reportingTo}
                    onChange={(e) => handleChange("reportingTo", e.target.value)}
                    placeholder="e.g. Deputy Commissioner"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT & DISBURSEMENT */}
            {formStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Primary Mobile Contact"
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="+91 98540 00000"
                    required
                  />
                  <InputField
                    label="Alternate Contact Number"
                    id="altMobile"
                    value={formData.altMobile}
                    onChange={(e) => handleChange("altMobile", e.target.value)}
                    placeholder="+91 94010 00000"
                  />
                  <InputField
                    label="Corporate Official Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="name@gmc.gov.in"
                  />
                  <InputField
                    label="Personal Email Address"
                    id="personalEmail"
                    type="email"
                    value={formData.personalEmail}
                    onChange={(e) => handleChange("personalEmail", e.target.value)}
                    placeholder="personal@gmail.com"
                  />
                </div>

                <hr className="my-2 border-slate-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <InputField
                    label="Disbursement Bank Name"
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                    placeholder="State Bank of India"
                  />
                  <InputField
                    label="Bank Account Number"
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                    placeholder="Account number"
                  />
                  <InputField
                    label="IFSC Code"
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleChange("ifscCode", e.target.value)}
                    placeholder="SBIN0001234"
                  />
                  <SelectField
                    label="Account Classification"
                    id="accountType"
                    value={formData.accountType}
                    onChange={(e) => handleChange("accountType", e.target.value)}
                    options={[
                      { value: "Savings", label: "Savings Account" },
                      { value: "Salary", label: "Salary Account" },
                      { value: "Current", label: "Current Account" },
                    ]}
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleChange("termsAccepted", e.target.checked)}
                    label="Verification of Official Credentials"
                    description="I certify that all educational credentials, age proofs, and reservation certificates have been physically audited against original dossiers."
                  />
                </div>
              </div>
            )}

            {/* ── Form Navigation & Submission Buttons ── */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              {formStep > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  icon={ArrowLeft}
                  onClick={() => setFormStep((s) => s - 1)}
                >
                  Previous Step
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveTab("directory")}
                >
                  Cancel Onboarding
                </Button>
              )}

              {formStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setFormStep((s) => s + 1)}
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="success"
                  icon={CheckCircle2}
                >
                  Complete Cadre Enrollment
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
