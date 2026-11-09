import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Layers,
  Users,
  ShieldCheck,
  Award,
  Building2,
  TrendingUp,
  Download,
  Printer,
  ChevronRight,
  RotateCcw,
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

export default function ManageDesignation() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "add" | "cadres"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedClassification, setSelectedClassification] = useState("All");
  const [editingId, setEditingId] = useState(null);

  // Departments List for Binding
  const departmentOptions = [
    { value: "All Departments", label: "All Departments (Common Cadre)" },
    { value: "Engineering & Public Works", label: "Engineering & Public Works" },
    { value: "General Administration & Personnel", label: "General Administration & Personnel" },
    { value: "Public Health & Conservancy", label: "Public Health & Conservancy" },
    { value: "Finance, Accounts & Audit Branch", label: "Finance, Accounts & Audit Branch" },
    { value: "Revenue, Assessment & Licenses", label: "Revenue, Assessment & Licenses" },
    { value: "Information Technology Cell", label: "Information Technology Cell" },
  ];

  // Pay Grade Ladder (Assam ROP Rules)
  const payGradeOptions = [
    { value: "GP-12 (₹8700)", label: "Pay Band 4 • GP-12 (₹8,700 Grade Pay)" },
    { value: "GP-11 (₹7600)", label: "Pay Band 4 • GP-11 (₹7,600 Grade Pay)" },
    { value: "GP-10 (₹6600)", label: "Pay Band 4 • GP-10 (₹6,600 Grade Pay)" },
    { value: "GP-8 (₹4800)", label: "Pay Band 3 • GP-8 (₹4,800 Grade Pay)" },
    { value: "GP-6 (₹4200)", label: "Pay Band 3 • GP-6 (₹4,200 Grade Pay)" },
    { value: "GP-5 (₹2800)", label: "Pay Band 2 • GP-5 (₹2,800 Grade Pay)" },
    { value: "GP-4 (₹2400)", label: "Pay Band 2 • GP-4 (₹2,400 Grade Pay)" },
    { value: "GP-2 (₹1900)", label: "Pay Band 1 • GP-2 (₹1,900 Grade Pay)" },
    { value: "GP-1 (₹1800)", label: "Pay Band 1 • GP-1 (₹1,800 Grade Pay)" },
    { value: "Fixed Consolidated", label: "Fixed Pay / Contractual Package" },
  ];

  // Form State for Add / Edit Designation
  const initialFormState = {
    code: "",
    title: "",
    department: "Engineering & Public Works",
    classification: "Gazetted (Class-I)",
    payGrade: "GP-6 (₹4200)",
    sanctionedPosts: "",
    inPositionCount: "",
    reportingTo: "",
    minQualification: "B.Tech / B.E. (Civil)",
    isDDOAuthority: false,
    description: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Master Designations Dataset
  const [designations, setDesignations] = useState([
    {
      id: 1,
      code: "DES-ENG-01",
      title: "Superintending Engineer",
      department: "Engineering & Public Works",
      classification: "Gazetted (Class-I)",
      payGrade: "GP-11 (₹7600)",
      sanctioned: 4,
      working: 3,
      vacant: 1,
      reportingTo: "Chief Engineer / Commissioner",
      minQualification: "M.Tech / B.Tech (Civil) + 12 yrs exp",
      isDDOAuthority: true,
      status: "Active",
      description: "Circle administrative head responsible for capital projects and technical estimates.",
    },
    {
      id: 2,
      code: "DES-ENG-02",
      title: "Executive Engineer",
      department: "Engineering & Public Works",
      classification: "Gazetted (Class-I)",
      payGrade: "GP-8 (₹4800)",
      sanctioned: 12,
      working: 10,
      vacant: 2,
      reportingTo: "Superintending Engineer",
      minQualification: "B.Tech (Civil) + 7 yrs exp",
      isDDOAuthority: true,
      status: "Active",
      description: "Division in-charge managing ward infrastructure, contract tendering and measurement bills.",
    },
    {
      id: 3,
      code: "DES-ADM-01",
      title: "HR Manager",
      department: "General Administration & Personnel",
      classification: "Gazetted (Class-II)",
      payGrade: "GP-6 (₹4200)",
      sanctioned: 6,
      working: 5,
      vacant: 1,
      reportingTo: "Joint Commissioner (Admin)",
      minQualification: "MBA (HR) / Post Graduate Degree",
      isDDOAuthority: false,
      status: "Active",
      description: "Manages personnel dossiers, establishment rosters, service books and promotions.",
    },
    {
      id: 4,
      code: "DES-FIN-01",
      title: "Senior Accounts Officer",
      department: "Finance, Accounts & Audit Branch",
      classification: "Gazetted (Class-I)",
      payGrade: "GP-8 (₹4800)",
      sanctioned: 5,
      working: 4,
      vacant: 1,
      reportingTo: "Financial Advisor & CAO",
      minQualification: "M.Com / CA Inter / MBA (Finance)",
      isDDOAuthority: true,
      status: "Active",
      description: "Draws and disburses monthly salaries, audits treasury bills, and reconciles state grants.",
    },
    {
      id: 5,
      code: "DES-ENG-03",
      title: "Junior Engineer (Civil)",
      department: "Engineering & Public Works",
      classification: "Non-Gazetted (Class-III)",
      payGrade: "GP-5 (₹2800)",
      sanctioned: 48,
      working: 40,
      vacant: 8,
      reportingTo: "Assistant Executive Engineer",
      minQualification: "Diploma / Degree in Civil Engineering",
      isDDOAuthority: false,
      status: "Active",
      description: "Ward-level field site supervision, day-to-day muster marks, and road maintenance inspection.",
    },
    {
      id: 6,
      code: "DES-PHC-01",
      title: "Conservancy Sanitary Inspector",
      department: "Public Health & Conservancy",
      classification: "Non-Gazetted (Class-III)",
      payGrade: "GP-4 (₹2400)",
      sanctioned: 35,
      working: 28,
      vacant: 7,
      reportingTo: "Chief Medical Officer",
      minQualification: "Higher Secondary + Diploma in Sanitary Inspection",
      isDDOAuthority: false,
      status: "Active",
      description: "Field sanitation supervisor overseeing solid waste collection vehicles and dumping stations.",
    },
    {
      id: 7,
      code: "DES-ADM-02",
      title: "Junior Administrative Assistant",
      department: "General Administration & Personnel",
      classification: "Non-Gazetted (Class-III)",
      payGrade: "GP-2 (₹1900)",
      sanctioned: 80,
      working: 68,
      vacant: 12,
      reportingTo: "Branch Superintendent",
      minQualification: "Graduate in any discipline + Computer Diploma",
      isDDOAuthority: false,
      status: "Active",
      description: "Receipt and despatch clerk, file noting, digital citizen application entries.",
    },
  ]);

  // Aggregate Metrics
  const totalDesignations = designations.length;
  const totalSanctionedCadre = designations.reduce((acc, d) => acc + d.sanctioned, 0);
  const totalInPosition = designations.reduce((acc, d) => acc + d.working, 0);
  const totalVacantSlots = designations.reduce((acc, d) => acc + d.vacant, 0);

  // Form Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (desig) => {
    setEditingId(desig.id);
    setFormData({
      code: desig.code,
      title: desig.title,
      department: desig.department,
      classification: desig.classification,
      payGrade: desig.payGrade,
      sanctionedPosts: desig.sanctioned.toString(),
      inPositionCount: desig.working.toString(),
      reportingTo: desig.reportingTo,
      minQualification: desig.minQualification,
      isDDOAuthority: desig.isDDOAuthority,
      description: desig.description,
      status: desig.status,
    });
    setActiveTab("add");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const sanctioned = Number(formData.sanctionedPosts) || 0;
    const working = Number(formData.inPositionCount) || 0;
    const vacant = Math.max(0, sanctioned - working);

    if (editingId) {
      setDesignations((prev) =>
        prev.map((d) =>
          d.id === editingId
            ? {
                ...d,
                code: formData.code,
                title: formData.title,
                department: formData.department,
                classification: formData.classification,
                payGrade: formData.payGrade,
                sanctioned,
                working,
                vacant,
                reportingTo: formData.reportingTo,
                minQualification: formData.minQualification,
                isDDOAuthority: formData.isDDOAuthority,
                description: formData.description,
                status: formData.status,
              }
            : d
        )
      );
      setEditingId(null);
    } else {
      const newDesignation = {
        id: Date.now(),
        code: formData.code.toUpperCase() || `DES-${designations.length + 10}`,
        title: formData.title,
        department: formData.department,
        classification: formData.classification,
        payGrade: formData.payGrade,
        sanctioned,
        working,
        vacant,
        reportingTo: formData.reportingTo || "Branch Head",
        minQualification: formData.minQualification || "Graduate",
        isDDOAuthority: formData.isDDOAuthority,
        description: formData.description || "General administrative cadre role",
        status: formData.status,
      };
      setDesignations([newDesignation, ...designations]);
    }

    setFormData(initialFormState);
    setActiveTab("all");
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to deactivate and remove designation: "${title}"?`)) {
      setDesignations((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Table Columns
  const columns = [
    {
      key: "code",
      label: "Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
          {row.code}
        </span>
      ),
    },
    {
      key: "title",
      label: "Designation Title & Department",
      sortable: true,
      render: (row) => (
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-slate-900 leading-tight">{row.title}</p>
            {row.isDDOAuthority && (
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                DDO
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {row.department}
          </span>
        </div>
      ),
    },
    {
      key: "classification",
      label: "Cadre Classification",
      sortable: true,
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
            row.classification.includes("Class-I")
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
              : row.classification.includes("Class-II")
              ? "bg-purple-50 text-purple-700 border border-purple-200"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          {row.classification}
        </span>
      ),
    },
    {
      key: "payGrade",
      label: "Pay Scale Band",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-indigo-600 text-xs">
          {row.payGrade}
        </span>
      ),
    },
    {
      key: "strength",
      label: "Cadre Allocation",
      render: (row) => {
        const pct = Math.round((row.working / (row.sanctioned || 1)) * 100);
        return (
          <div className="space-y-1 min-w-[125px]">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="font-bold text-slate-800">{row.working} Active</span>
              <span className="text-slate-400">/ {row.sanctioned}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  pct >= 90
                    ? "bg-emerald-500"
                    : pct >= 70
                    ? "bg-indigo-600"
                    : "bg-amber-500"
                }`}
                style={{ width: `${Math.min(100, pct)}%` }}
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
            icon={Edit3}
            title="Edit Designation"
            onClick={() => handleEditClick(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            title="Remove Designation"
            onClick={() => handleDelete(row.id, row.title)}
          />
        </div>
      ),
    },
  ];

  // Filtering Logic
  const filteredDesignations = designations.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.payGrade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "All" || d.department === selectedDept;
    const matchesClass =
      selectedClassification === "All" || d.classification.includes(selectedClassification);

    return matchesSearch && matchesDept && matchesClass;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── Top Header & Tab Ribbon ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Designation & Cadre Master
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Pay scales, Grade Pay ladders, and sanctioned strength allocations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant={activeTab === "all" ? "primary" : "secondary"}
            icon={Briefcase}
            onClick={() => {
              setActiveTab("all");
              setEditingId(null);
            }}
          >
            Designations Roster
          </Button>

          <Button
            size="md"
            variant={activeTab === "cadres" ? "primary" : "secondary"}
            icon={Layers}
            onClick={() => setActiveTab("cadres")}
          >
            Pay Scale Hierarchy
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
            {editingId ? "Edit Designation" : "Add Designation"}
          </Button>
        </div>
      </div>

      {/* ── 1. KPI Badges Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Designations
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalDesignations}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all municipal wings</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sanctioned Strength
            </span>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">
              {totalSanctionedCadre}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Total approved post allocations</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Award size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Officers In-Position
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {totalInPosition}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {((totalInPosition / (totalSanctionedCadre || 1)) * 100).toFixed(1)}% Deployment rate
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Users size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Disbursing Officers (DDO)
            </span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {designations.filter((d) => d.isDDOAuthority).length}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Financial voucher sanction authority</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <ShieldCheck size={22} />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 1: ALL DESIGNATIONS ROSTER                              */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "all" && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <SelectField
                label="Filter by Department"
                id="deptFilter"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Municipal Departments" },
                  ...departmentOptions,
                ]}
              />

              <SelectField
                label="Cadre Classification"
                id="classFilter"
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Classifications" },
                  { value: "Class-I", label: "Class-I (Gazetted / Apex)" },
                  { value: "Class-II", label: "Class-II (Gazetted / Mid)" },
                  { value: "Class-III", label: "Class-III (Non-Gazetted Staff)" },
                  { value: "Class-IV", label: "Class-IV (Subordinate Staff)" },
                ]}
              />

              <div className="w-full mb-0">
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
                  Search Designations
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by title, code, pay grade or dept..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Configured Designations ({filteredDesignations.length} Active Posts)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print Roster
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={Download}
                  onClick={() => alert("Downloading Cadre Schedule PDF...")}
                >
                  Export PDF
                </Button>
              </div>
            </div>
            <Table columns={columns} data={filteredDesignations} />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 2: ADD / EDIT DESIGNATION FORM                          */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "add" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingId ? "Update Designation Parameters" : "Establish New Post / Designation"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Define official title, scale classification, pay band, and financial sanction limits
                </p>
              </div>
            </div>

            {editingId && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Editing Record #{editingId}
              </span>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 md:p-8 space-y-6">
            {/* 1. Identification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                1. Official Post Identification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Designation Code"
                  id="code"
                  placeholder="e.g. DES-ENG-04"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Official Designation Title"
                  id="title"
                  placeholder="e.g. Assistant Executive Engineer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="!mb-0"
                  required
                />
                <SelectField
                  label="Allocated Municipal Department"
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  className="!mb-0"
                  options={departmentOptions.filter((d) => d.value !== "All")}
                  required
                />
              </div>
            </div>

            {/* 2. Scale & Classification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                2. Cadre Classification & Pay Scale
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Service Cadre Classification"
                  id="classification"
                  value={formData.classification}
                  onChange={(e) => handleInputChange("classification", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Gazetted (Class-I)", label: "Class-I (Senior Gazetted / Group A)" },
                    { value: "Gazetted (Class-II)", label: "Class-II (Junior Gazetted / Group B)" },
                    { value: "Non-Gazetted (Class-III)", label: "Class-III (Non-Gazetted Executive / Group C)" },
                    { value: "Non-Gazetted (Class-IV)", label: "Class-IV (Subordinate Staff / Group D)" },
                  ]}
                  required
                />

                <SelectField
                  label="Assam ROP Grade Pay Band"
                  id="payGrade"
                  value={formData.payGrade}
                  onChange={(e) => handleInputChange("payGrade", e.target.value)}
                  className="!mb-0"
                  options={payGradeOptions}
                  required
                />
              </div>
            </div>

            {/* 3. Strength & Reporting */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                3. Post Capacity & Reporting Hierarchy
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Sanctioned Strength (Posts)"
                  id="sanctionedPosts"
                  type="number"
                  placeholder="e.g. 15"
                  value={formData.sanctionedPosts}
                  onChange={(e) => handleInputChange("sanctionedPosts", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="In-Position Personnel"
                  id="inPositionCount"
                  type="number"
                  placeholder="e.g. 12"
                  value={formData.inPositionCount}
                  onChange={(e) => handleInputChange("inPositionCount", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Immediate Reporting Authority"
                  id="reportingTo"
                  placeholder="e.g. Executive Engineer"
                  value={formData.reportingTo}
                  onChange={(e) => handleInputChange("reportingTo", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>

              <div className="mt-4">
                <InputField
                  label="Minimum Service Eligibility / Qualifications"
                  id="minQualification"
                  placeholder="e.g. B.Tech / Diploma in Civil Engineering + 5 yrs service"
                  value={formData.minQualification}
                  onChange={(e) => handleInputChange("minQualification", e.target.value)}
                  className="!mb-0"
                />
              </div>
            </div>

            {/* 4. DDO Authorization Checkbox */}
            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <Checkbox
                id="isDDOAuthority"
                checked={formData.isDDOAuthority}
                onChange={(e) => handleInputChange("isDDOAuthority", e.target.checked)}
                label="Drawing and Disbursing Officer (DDO) Authorization"
                description="Check if officers in this designation hold statutory authority to verify attendance, approve muster leaves, and sign financial salary vouchers."
                className="!mb-0"
              />
            </div>

            {/* 5. Role Description & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              <div className="sm:col-span-2">
                <TextArea
                  label="Key Responsibilities & Administrative Mandate"
                  id="description"
                  rows={2}
                  placeholder="Outline core job duties and delegation powers..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="!mb-0"
                />
              </div>

              <SelectField
                label="Operational Status"
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="!mb-0"
                options={[
                  { value: "Active", label: "Active Operational Post" },
                  { value: "Inactive", label: "Abolished / Redundant Post" },
                ]}
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
                {editingId ? "Save Designation Changes" : "Create Designation"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 3: PAY SCALE HIERARCHY REFERENCE                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "cadres" && (
        <div className="space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              Assam Services (ROP) Rules: Municipal Grade Pay Structure
            </h3>
            <p className="text-xs text-slate-400">
              Standard pay matrix binding basic salary calculations, allowances, and annual appraisal increments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Pay Band 4 (Gazetted & Senior Leadership)
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  GP ₹6,600 – ₹8,700
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                <li>
                  <strong>GP-12 (₹8,700):</strong> Chief Engineer, Financial Advisor, Joint Commissioners.
                </li>
                <li>
                  <strong>GP-11 (₹7,600):</strong> Superintending Engineers, Chief Medical Officers.
                </li>
                <li>
                  <strong>GP-10 (₹6,600):</strong> Additional Directors, Deputy Commissioners.
                </li>
                <li>
                  Eligible for official municipal conveyance and full medical reimbursements.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Pay Band 3 & 2 (Technical & Executive Cadre)
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  GP ₹1,900 – ₹4,800
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                <li>
                  <strong>GP-8 (₹4,800):</strong> Executive Engineers, Senior Accounts Officers.
                </li>
                <li>
                  <strong>GP-6 (₹4,200):</strong> Assistant Executive Engineers, HR Managers.
                </li>
                <li>
                  <strong>GP-5 (₹2,800):</strong> Junior Engineers, Accountants, Section Officers.
                </li>
                <li>
                  <strong>GP-2 (₹1,900):</strong> Junior Administrative Assistants, Tax Collectors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}