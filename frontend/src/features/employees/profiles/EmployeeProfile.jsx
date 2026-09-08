import React, { useState } from "react";
import {
  User,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Clock,
  Printer,
  Download,
  Camera,
  KeyRound,
  Building2,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Briefcase,
  X,
} from "lucide-react";

// Mock Employee Dataset
const employee = {
  name: "Rajib Borah",
  empCode: "GMC0011",
  designation: "HR Manager",
  department: "Administration",
  type: "Permanent",
  status: "Active",
  payGrade: "GP-6 (₹4,200)",
  dob: "15 Mar 1982",
  gender: "Male",
  religion: "Hindu",
  caste: "General",
  maritalStatus: "Married",
  bloodGroup: "B+",
  joiningDate: "01 Jan 2010",
  retirementDate: "31 Mar 2042",
  reportingTo: "Deputy Commissioner",
  qualification: "MBA",
  mobile: "+91 98540 00011",
  altMobile: "+91 94010 00011",
  email: "rajib.borah@gmc.gov.in",
  personalEmail: "rajib.borah@gmail.com",
  address: "42 Rajgarh Road, Ulubari, Guwahati, Assam — 781007",
  localAddress: "14 GNB Road, Ambari, Guwahati, Assam — 781001",
  emergencyName: "Mina Borah",
  emergencyPhone: "+91 94010 88811",
  aadhar: "XXXX-XXXX-[Aadhaar Redacted]",
  pan: "ABCDE1234F",
  voterId: "ASD1234567",
  drivingLicense: "AS01-2010-0001234",
  passport: "P1234567",
  passportExpiry: "12 Aug 2028",
  pfAccount: "AS/GHY/001/0011",
  esiNumber: "3101234560000011",
  bankName: "State Bank of India",
  accountNumber: "XXXX XXXX 4532",
  ifscCode: "SBIN0001234",
  accountType: "Savings",
};

const leaveHistory = [
  { id: 1, type: "Casual Leave", from: "10 Jan 2026", to: "12 Jan 2026", days: 3, status: "Approved" },
  { id: 2, type: "Medical Leave", from: "05 Mar 2026", to: "07 Mar 2026", days: 3, status: "Approved" },
  { id: 3, type: "Earned Leave", from: "20 Apr 2026", to: "25 Apr 2026", days: 6, status: "Pending" },
  { id: 4, type: "Casual Leave", from: "01 Feb 2025", to: "01 Feb 2025", days: 1, status: "Approved" },
  { id: 5, type: "Half-Day Leave", from: "14 Mar 2025", to: "14 Mar 2025", days: 0.5, status: "Approved" },
];

const payslips = [
  { id: 1, month: "March 2026", gross: "₹52,400", deduction: "₹8,200", net: "₹44,200", status: "Paid" },
  { id: 2, month: "February 2026", gross: "₹52,400", deduction: "₹8,200", net: "₹44,200", status: "Paid" },
  { id: 3, month: "January 2026", gross: "₹52,400", deduction: "₹8,400", net: "₹44,000", status: "Paid" },
  { id: 4, month: "December 2025", gross: "₹54,000", deduction: "₹8,200", net: "₹45,800", status: "Paid" },
];

const documents = [
  { id: 1, name: "Appointment Letter", date: "01 Jan 2010", type: "Official" },
  { id: 2, name: "Aadhaar Card Copy", date: "15 Mar 2020", type: "Identity" },
  { id: 3, name: "PAN Card Copy", date: "15 Mar 2020", type: "Identity" },
  { id: 4, name: "Educational Certificate", date: "20 Jun 2010", type: "Academic" },
  { id: 5, name: "Service Agreement", date: "01 Jan 2010", type: "Official" },
  { id: 6, name: "Medical Fitness Certificate", date: "10 Jan 2024", type: "Medical" },
];

const timeline = [
  { date: "28 Apr 2026", action: "Leave Request submitted for 20–25 Apr", type: "amber" },
  { date: "07 Mar 2026", action: "Medical Leave approved (3 days)", type: "emerald" },
  { date: "01 Mar 2026", action: "Payslip generated — Feb 2026", type: "indigo" },
  { date: "12 Jan 2026", action: "Casual Leave approved (3 days)", type: "emerald" },
  { date: "01 Jan 2026", action: "Annual appraisal completed — Grade A", type: "indigo" },
  { date: "01 Dec 2025", action: "Salary revised — GP-6 effective", type: "amber" },
];

const leaveBalance = [
  { type: "Casual Leave", used: 4, total: 12, color: "bg-indigo-600", text: "text-indigo-600" },
  { type: "Medical Leave", used: 3, total: 12, color: "bg-emerald-600", text: "text-emerald-600" },
  { type: "Earned Leave", used: 6, total: 30, color: "bg-sky-600", text: "text-sky-600" },
  { type: "Half-Day", used: 1, total: 6, color: "bg-amber-600", text: "text-amber-600" },
];

function InfoField({ label, value, fullWidth = false, icon: Icon }) {
  return (
    <div className={`space-y-1 ${fullWidth ? "col-span-full" : ""}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
        {Icon && <Icon size={14} className="text-slate-400 shrink-0" />}
        <span>{value || "—"}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Inactive: "bg-slate-100 text-slate-600 border-slate-200",
  }[status] || "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles}`}>
      {status}
    </span>
  );
}

export default function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const tabs = [
    { key: "personal", label: "Personal Info" },
    { key: "identity", label: "Identity & Bank" },
    { key: "employment", label: "Employment" },
    { key: "contact", label: "Contact" },
    { key: "leave", label: "Leave Ledger" },
    { key: "payroll", label: "Payroll History" },
    { key: "documents", label: "Documents" },
    { key: "activity", label: "Activity Log" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Employee Master Dossier
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Cadre Service Record & Profile Registry
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Dossier</span>
          </button>
          <button
            onClick={() => setEditOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-sm shadow-indigo-200 flex items-center gap-1.5"
          >
            <Edit size={14} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Identity Snapshot & Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main ID Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-center">
            {/* Geometric Top Accent Strip */}
            <div className="h-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative flex items-center justify-end px-4">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white/80 text-[10px] font-mono tracking-wider backdrop-blur-sm">
                {employee.empCode}
              </span>
            </div>

            {/* Profile Avatar Canvas */}
            <div className="px-6 pb-6 relative">
              <div className="relative inline-block -mt-12 mb-3">
                <div className="w-24 h-24 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-3xl ring-4 ring-white shadow-md overflow-hidden">
                  {photoUrl ? (
                    <img src={photoUrl} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-white/80" />
                  )}
                </div>

                {/* Upload Action */}
                <label className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-indigo-600 text-white rounded-xl shadow cursor-pointer hover:bg-indigo-700 transition">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => setPhotoUrl(event.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {employee.name}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                {employee.designation}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {employee.department} Wing
              </p>

              <div className="flex items-center justify-center gap-2 mt-3">
                <StatusBadge status={employee.status} />
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {employee.type} Cadre
                </span>
              </div>

              <hr className="my-5 border-slate-100" />

              {/* Contact Snapshot list */}
              <div className="space-y-2.5 text-left text-xs">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{employee.mobile}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">Guwahati, Assam</span>
                </div>
              </div>

              <hr className="my-5 border-slate-100" />

              <button className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                <KeyRound size={14} className="text-slate-400" />
                <span>Reset Portal Password</span>
              </button>
            </div>
          </div>

          {/* Quick Cadre Record Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cadre & Establishment Summary
            </h4>
            <div className="space-y-2 text-xs divide-y divide-slate-100">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Pay Scale</span>
                <span className="font-bold text-slate-800 font-mono">{employee.payGrade}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Date of Entry</span>
                <span className="font-semibold text-slate-700">{employee.joiningDate}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Superannuation</span>
                <span className="font-semibold text-slate-700">{employee.retirementDate}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Reporting Officer</span>
                <span className="font-semibold text-indigo-600">{employee.reportingTo}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Academic Credential</span>
                <span className="font-semibold text-slate-700">{employee.qualification}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tab Panels */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Tab Navigation Ribbon */}
          <div className="flex items-center overflow-x-auto border-b border-slate-200 bg-slate-50/50 px-4 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3.5 px-3.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-px select-none ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-600 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {/* 1. Personal Info */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoField label="Full Legal Name" value={employee.name} />
                  <InfoField label="Employee Code" value={employee.empCode} />
                  <InfoField label="Date of Birth" value={employee.dob} />
                  <InfoField label="Gender" value={employee.gender} />
                  <InfoField label="Blood Group" value={employee.bloodGroup} />
                  <InfoField label="Religious Faith" value={employee.religion} />
                  <InfoField label="Caste Category" value={employee.caste} />
                  <InfoField label="Marital Status" value={employee.maritalStatus} />
                  <InfoField label="Permanent Home Address" value={employee.address} fullWidth />
                  <InfoField label="Current Residential Address" value={employee.localAddress} fullWidth />
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Emergency Contact Reference
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoField label="Contact Person" value={employee.emergencyName} />
                    <InfoField label="Emergency Contact Phone" value={employee.emergencyPhone} />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Identity & Bank Details */}
            {activeTab === "identity" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoField label="Aadhaar Identifier" value={employee.aadhar} />
                  <InfoField label="Permanent Account Number (PAN)" value={employee.pan} />
                  <InfoField label="Voter Identity Card" value={employee.voterId} />
                  <InfoField label="Driving License" value={employee.drivingLicense} />
                  <InfoField label="Passport Number" value={employee.passport} />
                  <InfoField label="Passport Expiration" value={employee.passportExpiry} />
                  <InfoField label="PF Universal Account Number" value={employee.pfAccount} />
                  <InfoField label="State Insurance (ESI) No." value={employee.esiNumber} />
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Disbursement Bank Account
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoField label="Bank Institution" value={employee.bankName} />
                    <InfoField label="Bank Account Number" value={employee.accountNumber} />
                    <InfoField label="IFSC Code" value={employee.ifscCode} />
                    <InfoField label="Account Category" value={employee.accountType} />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Employment & Cadre Duration */}
            {activeTab === "employment" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoField label="Cadre Type" value={employee.type} />
                  <InfoField label="Allocated Department" value={employee.department} />
                  <InfoField label="Current Designation" value={employee.designation} />
                  <InfoField label="Pay Grade / Band" value={employee.payGrade} />
                  <InfoField label="Appointment Date" value={employee.joiningDate} />
                  <InfoField label="Projected Superannuation" value={employee.retirementDate} />
                  <InfoField label="Reporting Authority" value={employee.reportingTo} />
                  <InfoField label="Service Qualification" value={employee.qualification} />
                </div>

                <hr className="border-slate-100" />

                {/* Service Progress Metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">Tenure Milestone (16 of 32 years served)</span>
                    <span className="text-indigo-600 font-mono">50% Complete</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-1/2" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Appointed: Jan 2010</span>
                    <span>Retirement: Mar 2042</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Contact Details */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoField label="Official Phone" value={employee.mobile} icon={Phone} />
                <InfoField label="Alternate Mobile" value={employee.altMobile} icon={Phone} />
                <InfoField label="Corporate Government Email" value={employee.email} icon={Mail} />
                <InfoField label="Personal Email" value={employee.personalEmail} icon={Mail} />
              </div>
            )}

            {/* 5. Leave Management & Ledger */}
            {activeTab === "leave" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {leaveBalance.map((item) => (
                    <div key={item.type} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {item.type}
                      </span>
                      <p className={`text-xl font-extrabold mt-1 ${item.text}`}>
                        {item.total - item.used}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        of {item.total} days remaining
                      </p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-2.5 px-4">Leave Type</th>
                        <th className="py-2.5 px-4">From</th>
                        <th className="py-2.5 px-4">To</th>
                        <th className="py-2.5 px-4">Days</th>
                        <th className="py-2.5 px-4">Approval Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {leaveHistory.map((leave) => (
                        <tr key={leave.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-800">{leave.type}</td>
                          <td className="py-2.5 px-4">{leave.from}</td>
                          <td className="py-2.5 px-4">{leave.to}</td>
                          <td className="py-2.5 px-4 font-bold text-slate-700">{leave.days}</td>
                          <td className="py-2.5 px-4">
                            <StatusBadge status={leave.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. Payroll History */}
            {activeTab === "payroll" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Basic Pay</span>
                    <p className="text-base font-bold text-slate-800 mt-1">₹32,500</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">HRA Allowance</span>
                    <p className="text-base font-bold text-slate-800 mt-1">₹8,500</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">DA Allowance</span>
                    <p className="text-base font-bold text-slate-800 mt-1">₹7,400</p>
                  </div>
                  <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Net Disbursement</span>
                    <p className="text-base font-bold text-indigo-700 mt-1">₹44,200</p>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-2.5 px-4">Disbursement Cycle</th>
                        <th className="py-2.5 px-4">Gross Total</th>
                        <th className="py-2.5 px-4">Deductions</th>
                        <th className="py-2.5 px-4">Net Paid</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Slip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {payslips.map((slip) => (
                        <tr key={slip.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-800">{slip.month}</td>
                          <td className="py-2.5 px-4 text-emerald-600 font-semibold">{slip.gross}</td>
                          <td className="py-2.5 px-4 text-rose-600 font-semibold">{slip.deduction}</td>
                          <td className="py-2.5 px-4 font-bold text-slate-900">{slip.net}</td>
                          <td className="py-2.5 px-4">
                            <StatusBadge status={slip.status} />
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <button className="p-1 hover:bg-slate-100 rounded text-indigo-600 transition">
                              <Download size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. Documents Vault */}
            {activeTab === "documents" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Uploaded Service Enclosures
                  </span>
                  <button className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition flex items-center gap-1.5">
                    <span>Upload Document</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-2.5 px-4">Record Title</th>
                        <th className="py-2.5 px-4">Classification</th>
                        <th className="py-2.5 px-4">Verification Date</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-800 flex items-center gap-2">
                            <FileText size={14} className="text-indigo-600 shrink-0" />
                            <span>{doc.name}</span>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                              {doc.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-500">{doc.date}</td>
                          <td className="py-2.5 px-4 text-right">
                            <button className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1">
                              <Download size={13} />
                              <span>Download</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. Activity Timeline */}
            {activeTab === "activity" && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Establishment Audit Log
                </span>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      <span
                        className={`absolute -left-[23px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${
                          item.type === "emerald"
                            ? "bg-emerald-500"
                            : item.type === "amber"
                            ? "bg-amber-500"
                            : "bg-indigo-600"
                        }`}
                      />
                      <p className="text-xs font-semibold text-slate-800">{item.action}</p>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12} />
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Update Personnel Records
              </h3>
              <button
                onClick={() => setEditOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditOpen(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-slate-600 text-[10px]">
                    Mobile Contact
                  </label>
                  <input
                    type="text"
                    defaultValue={employee.mobile}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 font-medium text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-slate-600 text-[10px]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={employee.email}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-600 text-[10px]">
                  Local Residential Address
                </label>
                <textarea
                  rows={2}
                  defaultValue={employee.localAddress}
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-slate-600 text-[10px]">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    defaultValue={employee.emergencyName}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 font-medium text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-slate-600 text-[10px]">
                    Emergency Contact Number
                  </label>
                  <input
                    type="text"
                    defaultValue={employee.emergencyPhone}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}