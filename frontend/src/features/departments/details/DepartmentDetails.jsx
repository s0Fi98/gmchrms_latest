import React, { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Users,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Trash2,
  Briefcase,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FolderTree,
  Filter,
  Download,
  Printer,
  ChevronRight,
  UserCheck,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";

// Reusable Components Suite
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import TextArea from "../../../components/common/textarea/TextArea";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";
import Checkbox from "../../../components/common/checkbox/Checkbox";
import RadioButton from "../../../components/common/radio/RadioButton";

export default function DepartmentDetails() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "add" | "sections"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [viewDetailsDept, setViewDetailsDept] = useState(null);

  // Form State for Add / Edit Department
  const initialFormState = {
    code: "",
    name: "",
    shortName: "",
    zone: "Central Zone (Panbazar)",
    hod: "",
    hodEmpCode: "",
    hodDesignation: "Chief Engineer",
    reportingOfficer: "Municipal Commissioner",
    contactEmail: "",
    contactPhone: "",
    location: "",
    sanctionedPosts: "",
    workingStrength: "",
    budgetCode: "",
    parentDepartment: "None (Autonomous)",
    status: "Active",
    description: "",
    sections: "",
    isGazettedCadre: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Department Master Registry Dataset
  const [departments, setDepartments] = useState([
    {
      id: 1,
      code: "ENG-01",
      name: "Engineering & Public Works",
      shortName: "EPW",
      zone: "Central Zone (Panbazar)",
      hod: "Bhaskar Sharma",
      hodEmpCode: "GMC-1042",
      hodDesignation: "Superintending Engineer",
      reportingOfficer: "Municipal Commissioner",
      sanctioned: 180,
      working: 142,
      vacant: 38,
      email: "engineering@gmc.gov.in",
      phone: "+91 361 2540521",
      location: "GMC HQ, 3rd Floor, Panbazar",
      budgetCode: "BUD-ENG-2026",
      status: "Active",
      sections: ["Roads & Bridges", "Storm Water Drainage", "Street Lighting", "Civic Infrastructure"],
    },
    {
      id: 2,
      code: "ADM-02",
      name: "General Administration & Personnel",
      shortName: "GAPD",
      zone: "Central Zone (Panbazar)",
      hod: "Pranab Bordoloi",
      hodEmpCode: "GMC-1205",
      hodDesignation: "Joint Commissioner",
      reportingOfficer: "Municipal Commissioner",
      sanctioned: 95,
      working: 86,
      vacant: 9,
      email: "establishment@gmc.gov.in",
      phone: "+91 361 2540522",
      location: "GMC HQ, 2nd Floor, Panbazar",
      budgetCode: "BUD-ADM-2026",
      status: "Active",
      sections: ["Establishment Branch", "Council Secretariat", "Confidential Cell", "Public Grievances"],
    },
    {
      id: 3,
      code: "PHC-03",
      name: "Public Health & Conservancy",
      shortName: "PHCD",
      zone: "Dispur Zone",
      hod: "Dr. B. K. Sarma",
      hodEmpCode: "GMC-0914",
      hodDesignation: "Chief Medical Officer",
      reportingOfficer: "Deputy Commissioner (Health)",
      sanctioned: 750,
      working: 620,
      vacant: 130,
      email: "health.conservancy@gmc.gov.in",
      phone: "+91 361 2260114",
      location: "GMC Zonal Complex, Dispur",
      budgetCode: "BUD-HLT-2026",
      status: "Active",
      sections: ["Solid Waste Management", "Vector Borne Disease Control", "Slaughterhouse & Meat Cell", "Vital Statistics & Birth/Death"],
    },
    {
      id: 4,
      code: "FIN-04",
      name: "Finance, Accounts & Audit Branch",
      shortName: "FAAB",
      zone: "Central Zone (Panbazar)",
      hod: "Hemanta Kalita",
      hodEmpCode: "GMC-0891",
      hodDesignation: "Financial Advisor & CAO",
      reportingOfficer: "Municipal Commissioner",
      sanctioned: 60,
      working: 54,
      vacant: 6,
      email: "accounts@gmc.gov.in",
      phone: "+91 361 2540525",
      location: "GMC HQ, 1st Floor, Panbazar",
      budgetCode: "BUD-FIN-2026",
      status: "Active",
      sections: ["Salary & Pension Audit", "Expenditure Control", "Internal Audit Cell", "Fund Management"],
    },
    {
      id: 5,
      code: "REV-05",
      name: "Revenue, Assessment & Licenses",
      shortName: "RALD",
      zone: "South Zone (Ulubari)",
      hod: "J. K. Mahanta",
      hodEmpCode: "GMC-0763",
      hodDesignation: "Collector of Taxes",
      reportingOfficer: "Additional Commissioner",
      sanctioned: 110,
      working: 92,
      vacant: 18,
      email: "revenue@gmc.gov.in",
      phone: "+91 361 2521190",
      location: "Ulubari Municipal Complex",
      budgetCode: "BUD-REV-2026",
      status: "Active",
      sections: ["Property Tax Assessment", "Trade License Section", "Hoardings & Advertisements", "Municipal Markets"],
    },
  ]);

  // Aggregate Metrics
  const totalSanctioned = departments.reduce((acc, d) => acc + d.sanctioned, 0);
  const totalWorking = departments.reduce((acc, d) => acc + d.working, 0);
  const totalVacant = departments.reduce((acc, d) => acc + d.vacant, 0);
  const totalSections = departments.reduce((acc, d) => acc + d.sections.length, 0);

  // Form Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (dept) => {
    setEditingId(dept.id);
    setFormData({
      code: dept.code,
      name: dept.name,
      shortName: dept.shortName,
      zone: dept.zone,
      hod: dept.hod,
      hodEmpCode: dept.hodEmpCode,
      hodDesignation: dept.hodDesignation,
      reportingOfficer: dept.reportingOfficer,
      contactEmail: dept.email,
      contactPhone: dept.phone,
      location: dept.location,
      sanctionedPosts: dept.sanctioned.toString(),
      workingStrength: dept.working.toString(),
      budgetCode: dept.budgetCode,
      parentDepartment: "None (Autonomous)",
      status: dept.status,
      description: "",
      sections: dept.sections.join(", "),
      isGazettedCadre: true,
    });
    setActiveTab("add");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const sanctioned = Number(formData.sanctionedPosts) || 0;
    const working = Number(formData.workingStrength) || 0;
    const sectionList = formData.sections
      ? formData.sections.split(",").map((s) => s.trim()).filter(Boolean)
      : ["General Section"];

    if (editingId) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingId
            ? {
                ...dept,
                code: formData.code,
                name: formData.name,
                shortName: formData.shortName || formData.code,
                zone: formData.zone,
                hod: formData.hod,
                hodEmpCode: formData.hodEmpCode || "GMC-EMP",
                hodDesignation: formData.hodDesignation,
                reportingOfficer: formData.reportingOfficer,
                sanctioned,
                working,
                vacant: Math.max(0, sanctioned - working),
                email: formData.contactEmail,
                phone: formData.contactPhone,
                location: formData.location,
                budgetCode: formData.budgetCode,
                status: formData.status,
                sections: sectionList,
              }
            : dept
        )
      );
      setEditingId(null);
    } else {
      const newDepartment = {
        id: Date.now(),
        code: formData.code || `DEPT-${departments.length + 1}`,
        name: formData.name,
        shortName: formData.shortName || formData.code,
        zone: formData.zone,
        hod: formData.hod || "In-Charge Officer",
        hodEmpCode: formData.hodEmpCode || "GMC-NEW",
        hodDesignation: formData.hodDesignation || "Department Head",
        reportingOfficer: formData.reportingOfficer || "Commissioner",
        sanctioned,
        working,
        vacant: Math.max(0, sanctioned - working),
        email: formData.contactEmail || "dept@gmc.gov.in",
        phone: formData.contactPhone || "—",
        location: formData.location || "Central HQ",
        budgetCode: formData.budgetCode || "BUD-GEN",
        status: formData.status || "Active",
        sections: sectionList,
      };
      setDepartments([newDepartment, ...departments]);
    }

    setFormData(initialFormState);
    setActiveTab("all");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to deactivate and remove ${name} from active master?`)) {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Table Column Definitions
  const columns = [
    {
      key: "code",
      label: "Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-[11px]">
          {row.code}
        </span>
      ),
    },
    {
      key: "name",
      label: "Department & Location",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="text-slate-400 shrink-0" />
            {row.location}
          </span>
        </div>
      ),
    },
    {
      key: "zone",
      label: "Zonal Jurisdiction",
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
          {row.zone}
        </span>
      ),
    },
    {
      key: "hod",
      label: "Head of Wing (HOD)",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.hod}</p>
          <span className="text-[11px] text-indigo-600 font-medium">
            {row.hodDesignation}
          </span>
        </div>
      ),
    },
    {
      key: "capacity",
      label: "Cadre Capacity",
      render: (row) => {
        const percentage = Math.round((row.working / (row.sanctioned || 1)) * 100);
        return (
          <div className="space-y-1 min-w-[125px]">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="font-bold text-slate-800">{row.working} Active</span>
              <span className="text-slate-400">/ {row.sanctioned}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  percentage >= 90
                    ? "bg-emerald-500"
                    : percentage >= 70
                    ? "bg-indigo-600"
                    : "bg-amber-500"
                }`}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-rose-600">
              {row.vacant} Vacancies
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
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
            icon={ArrowUpRight}
            onClick={() => setViewDetailsDept(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={Edit3}
            onClick={() => handleEditClick(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            onClick={() => handleDelete(row.id, row.name)}
          />
        </div>
      ),
    },
  ];

  // Filtering Logic
  const filteredDepartments = departments.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone = selectedZone === "All" || d.zone === selectedZone;
    const matchesStatus = selectedStatus === "All" || d.status === selectedStatus;

    return matchesSearch && matchesZone && matchesStatus;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── Top Header & Tab Ribbon ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Department Master Registry
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Cadre allocations, functional wings, and branch hierarchy
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant={activeTab === "all" ? "primary" : "secondary"}
            icon={Building2}
            onClick={() => {
              setActiveTab("all");
              setEditingId(null);
            }}
          >
            All Departments
          </Button>

          <Button
            size="md"
            variant={activeTab === "sections" ? "primary" : "secondary"}
            icon={FolderTree}
            onClick={() => setActiveTab("sections")}
          >
            Section Allocation
          </Button>

          <Button
            size="md"
            variant={activeTab === "add" ? "primary" : "secondary"}
            icon={editingId ? Edit3 : Plus}
            onClick={() => {
              if (activeTab !== "add") {
                setEditingId(null);
                setFormData(initialFormState);
              }
              setActiveTab("add");
            }}
          >
            {editingId ? "Edit Department" : "Add Department"}
          </Button>
        </div>
      </div>

      {/* ── 1. Statistical Cadre KPI Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Operational Departments
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {departments.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 6 zonal divisions</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <Building2 size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sanctioned Cadre Posts
            </span>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">
              {totalSanctioned}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Approved municipal budget strength</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Staff In Position
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {totalWorking}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {((totalWorking / (totalSanctioned || 1)) * 100).toFixed(1)}% Cadre fulfillment
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Users size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sub-Sections & Cells
            </span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {totalSections}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Functional operational units</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Layers size={22} />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 1: ALL DEPARTMENTS DIRECTORY                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "all" && (
        <div className="space-y-4">
          {/* Filters Bar with Aligned Baselines */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <SelectField
                label="Zonal Jurisdiction"
                id="zoneFilter"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Zones & Headquarters" },
                  { value: "Central Zone (Panbazar)", label: "Central Zone (Panbazar)" },
                  { value: "Dispur Zone", label: "Dispur Zone" },
                  { value: "South Zone (Ulubari)", label: "South Zone (Ulubari)" },
                  { value: "East Zone", label: "East Zone" },
                  { value: "West Zone", label: "West Zone" },
                ]}
              />

              <SelectField
                label="Operational Status"
                id="statusFilter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Statuses" },
                  { value: "Active", label: "Active Wings" },
                  { value: "Inactive", label: "Inactive / Merged" },
                ]}
              />

              <div className="w-full mb-0">
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
                  Search Master Directory
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by name, code, short code, or HOD..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered Cadre Branches ({filteredDepartments.length} Departments)
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Master data referenced by Employee Master and Payroll Processing
              </span>
            </div>
            <Table columns={columns} data={filteredDepartments} />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 2: ADD / EDIT DEPARTMENT FORM                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "add" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingId ? "Update Department Record" : "Establish New Department Branch"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Define establishment cadre, HOD accountability, and administrative jurisdiction
                </p>
              </div>
            </div>

            {editingId && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Editing ID: #{editingId}
              </span>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 md:p-8 space-y-6">
            {/* Section 1: Core Identification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                1. Core Department Identification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Department Code"
                  id="code"
                  placeholder="e.g. ENG-01"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Official Wing Name"
                  id="name"
                  placeholder="e.g. Engineering & Public Works"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Short Name / Acronym"
                  id="shortName"
                  placeholder="e.g. EPW"
                  value={formData.shortName}
                  onChange={(e) => handleInputChange("shortName", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>
            </div>

            {/* Section 2: Leadership & Reporting Structure */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                2. Executive Leadership & Authority
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Head of Department (HOD) Name"
                  id="hod"
                  placeholder="e.g. Bhaskar Sharma"
                  value={formData.hod}
                  onChange={(e) => handleInputChange("hod", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="HOD Employee Code"
                  id="hodEmpCode"
                  placeholder="e.g. GMC-1042"
                  value={formData.hodEmpCode}
                  onChange={(e) => handleInputChange("hodEmpCode", e.target.value)}
                  className="!mb-0"
                />
                <InputField
                  label="HOD Official Designation"
                  id="hodDesignation"
                  placeholder="e.g. Superintending Engineer"
                  value={formData.hodDesignation}
                  onChange={(e) => handleInputChange("hodDesignation", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <SelectField
                  label="Reporting Authority"
                  id="reportingOfficer"
                  value={formData.reportingOfficer}
                  onChange={(e) => handleInputChange("reportingOfficer", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Municipal Commissioner", label: "Municipal Commissioner" },
                    { value: "Joint Commissioner", label: "Joint Commissioner" },
                    { value: "Additional Commissioner", label: "Additional Commissioner" },
                    { value: "Chief Executive Officer", label: "Chief Executive Officer" },
                  ]}
                />

                <SelectField
                  label="Zonal Jurisdiction"
                  id="zone"
                  value={formData.zone}
                  onChange={(e) => handleInputChange("zone", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Central Zone (Panbazar)", label: "Central Zone (Panbazar)" },
                    { value: "Dispur Zone", label: "Dispur Zone" },
                    { value: "South Zone (Ulubari)", label: "South Zone (Ulubari)" },
                    { value: "East Zone", label: "East Zone" },
                    { value: "West Zone", label: "West Zone" },
                  ]}
                />
              </div>
            </div>

            {/* Section 3: Cadre Capacity & Financial Ledger */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                3. Cadre Strength & Financial Allocation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Sanctioned Posts Capacity"
                  id="sanctionedPosts"
                  type="number"
                  placeholder="Total sanctioned strength"
                  value={formData.sanctionedPosts}
                  onChange={(e) => handleInputChange("sanctionedPosts", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Current In-Position Staff"
                  id="workingStrength"
                  type="number"
                  placeholder="Active staff count"
                  value={formData.workingStrength}
                  onChange={(e) => handleInputChange("workingStrength", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Budget Head Code"
                  id="budgetCode"
                  placeholder="e.g. BUD-ENG-2026"
                  value={formData.budgetCode}
                  onChange={(e) => handleInputChange("budgetCode", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>
            </div>

            {/* Section 4: Contact & Sections Allocation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                4. Location, Sections & Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Official Email"
                  id="contactEmail"
                  type="email"
                  placeholder="department@gmc.gov.in"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Official Contact / Intercom"
                  id="contactPhone"
                  placeholder="+91 361 254XXXX"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  className="!mb-0"
                />
                <InputField
                  label="Location / Office Suite"
                  id="location"
                  placeholder="e.g. GMC HQ, 3rd Floor"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>

              <div className="mt-4">
                <TextArea
                  label="Operational Sections / Cells (Comma Separated)"
                  id="sections"
                  rows={2}
                  placeholder="e.g. Roads & Bridges, Storm Water Drainage, Street Lighting"
                  value={formData.sections}
                  onChange={(e) => handleInputChange("sections", e.target.value)}
                  className="!mb-0"
                />
              </div>
            </div>

            {/* Status & Options */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50/70 border border-slate-200 rounded-xl">
              <div className="w-64">
                <SelectField
                  label="Operational Status"
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Active", label: "Active Operational Wing" },
                    { value: "Inactive", label: "Decommissioned / Merged" },
                  ]}
                />
              </div>

              <Checkbox
                id="isGazettedCadre"
                checked={formData.isGazettedCadre}
                onChange={(e) => handleInputChange("isGazettedCadre", e.target.checked)}
                label="Gazetted Officer Cadre Wing"
                description="Eligible to issue administrative sanctions & financial vouchers"
                className="!mb-0"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFormData(initialFormState);
                  setEditingId(null);
                  setActiveTab("all");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={CheckCircle2}>
                {editingId ? "Save Department Changes" : "Register Department"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 3: SECTIONS & CELLS ALLOCATION BREAKDOWN                */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "sections" && (
        <div className="space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">
              Municipal Wing Organogram & Section Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review nested sub-sections, branch cells, and specialized divisions under each department
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-sm">
                      {dept.shortName}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {dept.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        HOD: {dept.hod} ({dept.hodDesignation})
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {dept.sections.length} Sections
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Active Operational Sections
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dept.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700"
                      >
                        <ChevronRight size={14} className="text-indigo-600 shrink-0" />
                        <span className="truncate">{sec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>Sanctioned: <strong>{dept.sanctioned}</strong></span>
                  <span>Active: <strong className="text-emerald-600">{dept.working}</strong></span>
                  <span>Vacant: <strong className="text-rose-600">{dept.vacant}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Department Full Details Modal ── */}
      {viewDetailsDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Department Dossier • {viewDetailsDept.code}
                </h3>
              </div>
              <button
                onClick={() => setViewDetailsDept(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{viewDetailsDept.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{viewDetailsDept.zone}</p>
                </div>
                <StatusBadge status={viewDetailsDept.status} />
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Head of Department</span>
                  <p className="font-semibold text-slate-800">{viewDetailsDept.hod}</p>
                  <p className="text-[11px] text-slate-500">{viewDetailsDept.hodDesignation}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Reporting Officer</span>
                  <p className="font-semibold text-slate-800">{viewDetailsDept.reportingOfficer}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Budget Head Code</span>
                  <p className="font-mono font-bold text-indigo-600">{viewDetailsDept.budgetCode}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Cadre Strength</span>
                  <p className="font-semibold text-slate-800">
                    {viewDetailsDept.working} / {viewDetailsDept.sanctioned} ({viewDetailsDept.vacant} Vacant)
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Location & Contact</span>
                  <p className="font-medium text-slate-700">{viewDetailsDept.location}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{viewDetailsDept.email} • {viewDetailsDept.phone}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Sections Attached</span>
                <div className="flex flex-wrap gap-1.5">
                  {viewDetailsDept.sections.map((sec, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <Button size="sm" variant="ghost" onClick={() => setViewDetailsDept(null)}>
                Close
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon={Edit3}
                onClick={() => {
                  const target = viewDetailsDept;
                  setViewDetailsDept(null);
                  handleEditClick(target);
                }}
              >
                Edit Wing Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}