import React, { useState } from "react";
import {
  FolderTree,
  Building2,
  Plus,
  Search,
  Users,
  UserCheck,
  Edit3,
  Trash2,
  ArrowRightLeft,
  CheckCircle2,
  ShieldCheck,
  Layers,
  MapPin,
  X,
  Eye,
  AlertCircle,
} from "lucide-react";

// Reusable UI Components Suite
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import TextArea from "../../../components/common/textarea/TextArea";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";
import Checkbox from "../../../components/common/checkbox/Checkbox";

export default function SectionAllocation() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "reallocate"
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedSectionForReassign, setSelectedSectionForReassign] = useState(null);

  // Departments List for Selectors
  const departmentOptions = [
    { value: "Engineering & Public Works", label: "Engineering & Public Works (EPW)" },
    { value: "General Administration & Personnel", label: "General Administration & Personnel (GAPD)" },
    { value: "Public Health & Conservancy", label: "Public Health & Conservancy (PHCD)" },
    { value: "Finance, Accounts & Audit Branch", label: "Finance, Accounts & Audit Branch (FAAB)" },
    { value: "Revenue, Assessment & Licenses", label: "Revenue, Assessment & Licenses (RALD)" },
  ];

  // Section Registry Dataset
  const [sections, setSections] = useState([
    {
      id: 1,
      sectionCode: "SEC-ENG-01",
      sectionName: "Roads & Bridges Division",
      department: "Engineering & Public Works",
      inCharge: "Anupam Gogoi",
      inChargeEmpCode: "GMC-0315",
      inChargeDesignation: "Assistant Executive Engineer",
      sanctionedStrength: 45,
      allocatedStaff: 38,
      vacantSlots: 7,
      roomLocation: "Room 304, 3rd Floor, GMC HQ",
      status: "Active",
      coreResponsibilities: "Metropolitan road maintenance, flyover expansion, repair tenders",
    },
    {
      id: 2,
      sectionCode: "SEC-ENG-02",
      sectionName: "Storm Water Drainage Cell",
      department: "Engineering & Public Works",
      inCharge: "Bhaskar Barman",
      inChargeEmpCode: "GMC-0412",
      inChargeDesignation: "Section Officer (Civil)",
      sanctionedStrength: 40,
      allocatedStaff: 34,
      vacantSlots: 6,
      roomLocation: "Room 308, 3rd Floor, GMC HQ",
      status: "Active",
      coreResponsibilities: "Monsoon de-siltation, primary channel monitoring, waterlogging redressal",
    },
    {
      id: 3,
      sectionCode: "SEC-ADM-01",
      sectionName: "Establishment & Service Book Branch",
      department: "General Administration & Personnel",
      inCharge: "Rajib Borah",
      inChargeEmpCode: "GMC-0011",
      inChargeDesignation: "HR Manager",
      sanctionedStrength: 30,
      allocatedStaff: 28,
      vacantSlots: 2,
      roomLocation: "Room 201, 2nd Floor, GMC HQ",
      status: "Active",
      coreResponsibilities: "Gazetted/Non-gazetted cadre service books, verification, promotions, leaves",
    },
    {
      id: 4,
      sectionCode: "SEC-PHC-01",
      sectionName: "Solid Waste Management Wing",
      department: "Public Health & Conservancy",
      inCharge: "Priya Sharma",
      inChargeEmpCode: "GMC-0104",
      inChargeDesignation: "Divisional Engineer",
      sanctionedStrength: 520,
      allocatedStaff: 440,
      vacantSlots: 80,
      roomLocation: "Dispur Zonal Office, Ground Floor",
      status: "Active",
      coreResponsibilities: "Daily door-to-door collection, dumping ground logistics, compactor trucks",
    },
    {
      id: 5,
      sectionCode: "SEC-FIN-01",
      sectionName: "Salary & Pension Disbursement Cell",
      department: "Finance, Accounts & Audit Branch",
      inCharge: "Deepak Kalita",
      inChargeEmpCode: "GMC-0210",
      inChargeDesignation: "Senior Accountant",
      sanctionedStrength: 25,
      allocatedStaff: 22,
      vacantSlots: 3,
      roomLocation: "Room 105, 1st Floor, GMC HQ",
      status: "Active",
      coreResponsibilities: "Monthly payroll generation, pension papers, GPF/EPF deduction statements",
    },
    {
      id: 6,
      sectionCode: "SEC-REV-01",
      sectionName: "Property Tax Assessment Cell",
      department: "Revenue, Assessment & Licenses",
      inCharge: "J. K. Mahanta",
      inChargeEmpCode: "GMC-0763",
      inChargeDesignation: "Superintendent of Taxes",
      sanctionedStrength: 50,
      allocatedStaff: 42,
      vacantSlots: 8,
      roomLocation: "Ulubari Zonal Complex, Room 12",
      status: "Active",
      coreResponsibilities: "Digital property mapping, zonal assessment notices, arrear recoveries",
    },
  ]);

  // Form State for Add / Edit Section
  const initialFormState = {
    sectionCode: "",
    sectionName: "",
    department: "Engineering & Public Works",
    inCharge: "",
    inChargeEmpCode: "",
    inChargeDesignation: "",
    sanctionedStrength: "",
    allocatedStaff: "",
    roomLocation: "",
    coreResponsibilities: "",
    status: "Active",
  };
  const [formData, setFormData] = useState(initialFormState);

  // Reallocation Form State
  const [reassignData, setReassignData] = useState({
    empCode: "",
    empName: "",
    currentSection: "",
    targetSection: "",
    transferOrderNo: "",
    effectiveDate: "2026-11-05",
    remarks: "",
  });

  // KPI Calculations
  const totalSections = sections.length;
  const totalSanctionedStaff = sections.reduce((acc, s) => acc + s.sanctionedStrength, 0);
  const totalAllocatedStaff = sections.reduce((acc, s) => acc + s.allocatedStaff, 0);
  const totalVacancies = sections.reduce((acc, s) => acc + s.vacantSlots, 0);

  const handleOpenModal = (sec = null) => {
    if (sec) {
      setEditingSection(sec);
      setFormData({
        sectionCode: sec.sectionCode,
        sectionName: sec.sectionName,
        department: sec.department,
        inCharge: sec.inCharge,
        inChargeEmpCode: sec.inChargeEmpCode,
        inChargeDesignation: sec.inChargeDesignation,
        sanctionedStrength: sec.sanctionedStrength.toString(),
        allocatedStaff: sec.allocatedStaff.toString(),
        roomLocation: sec.roomLocation,
        coreResponsibilities: sec.coreResponsibilities,
        status: sec.status,
      });
    } else {
      setEditingSection(null);
      setFormData(initialFormState);
    }
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const sanctioned = Number(formData.sanctionedStrength) || 0;
    const allocated = Number(formData.allocatedStaff) || 0;
    const vacant = Math.max(0, sanctioned - allocated);

    if (editingSection) {
      setSections((prev) =>
        prev.map((s) =>
          s.id === editingSection.id
            ? {
                ...s,
                sectionCode: formData.sectionCode,
                sectionName: formData.sectionName,
                department: formData.department,
                inCharge: formData.inCharge,
                inChargeEmpCode: formData.inChargeEmpCode,
                inChargeDesignation: formData.inChargeDesignation,
                sanctionedStrength: sanctioned,
                allocatedStaff: allocated,
                vacantSlots: vacant,
                roomLocation: formData.roomLocation,
                coreResponsibilities: formData.coreResponsibilities,
                status: formData.status,
              }
            : s
        )
      );
    } else {
      const newSec = {
        id: Date.now(),
        sectionCode: formData.sectionCode || `SEC-${sections.length + 10}`,
        sectionName: formData.sectionName,
        department: formData.department,
        inCharge: formData.inCharge || "TBD",
        inChargeEmpCode: formData.inChargeEmpCode || "GMC-TBD",
        inChargeDesignation: formData.inChargeDesignation || "In-Charge Officer",
        sanctionedStrength: sanctioned,
        allocatedStaff: allocated,
        vacantSlots: vacant,
        roomLocation: formData.roomLocation || "HQ",
        coreResponsibilities: formData.coreResponsibilities || "General divisional duties",
        status: formData.status || "Active",
      };
      setSections([newSec, ...sections]);
    }
    setModalOpen(false);
  };

  const handleDeleteSection = (id, name) => {
    if (window.confirm(`Are you sure you want to decommission section: "${name}"?`)) {
      setSections((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleOpenReassignModal = (sec) => {
    setSelectedSectionForReassign(sec);
    setReassignData({
      empCode: "",
      empName: "",
      currentSection: sec.sectionName,
      targetSection: sections.find((s) => s.id !== sec.id)?.sectionName || "",
      transferOrderNo: `GMC/EST/TR/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      effectiveDate: "2026-11-10",
      remarks: "Administrative realignment per Order of Commissioner",
    });
    setReassignModalOpen(true);
  };

  const handleReassignSubmit = (e) => {
    e.preventDefault();
    alert(`Transfer Order ${reassignData.transferOrderNo} processed. Staff reallocated from "${reassignData.currentSection}" to "${reassignData.targetSection}".`);
    setReassignModalOpen(false);
  };

  // Table Columns
  const columns = [
    {
      key: "sectionCode",
      label: "Section Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-[11px]">
          {row.sectionCode}
        </span>
      ),
    },
    {
      key: "sectionName",
      label: "Section Name & Wing",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.sectionName}</p>
          <span className="text-[11px] text-slate-400 font-medium">
            {row.department}
          </span>
        </div>
      ),
    },
    {
      key: "inCharge",
      label: "Section Officer / In-Charge",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 leading-tight">{row.inCharge}</p>
          <span className="text-[11px] text-indigo-600 font-medium">
            {row.inChargeDesignation} ({row.inChargeEmpCode})
          </span>
        </div>
      ),
    },
    {
      key: "staffing",
      label: "Staff Allocation Ratio",
      sortable: true,
      render: (row) => {
        const pct = Math.round((row.allocatedStaff / (row.sanctionedStrength || 1)) * 100);
        return (
          <div className="space-y-1 min-w-[130px]">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="font-bold text-slate-800">{row.allocatedStaff} Deployed</span>
              <span className="text-slate-400">/ {row.sanctionedStrength}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  pct >= 85
                    ? "bg-emerald-500"
                    : pct >= 65
                    ? "bg-indigo-600"
                    : "bg-amber-500"
                }`}
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-rose-600">
              {row.vacantSlots} Vacant Slots
            </span>
          </div>
        );
      },
    },
    {
      key: "roomLocation",
      label: "Office Suite",
      render: (row) => (
        <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
          <MapPin size={12} className="text-slate-400 shrink-0" />
          {row.roomLocation}
        </span>
      ),
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
            icon={ArrowRightLeft}
            title="Reallocate Personnel"
            onClick={() => handleOpenReassignModal(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={Edit3}
            title="Edit Section Details"
            onClick={() => handleOpenModal(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            title="Decommission Section"
            onClick={() => handleDeleteSection(row.id, row.sectionName)}
          />
        </div>
      ),
    },
  ];

  // Filter logic
  const filteredSections = sections.filter((s) => {
    const matchesSearch =
      s.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sectionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.inCharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "All" || s.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── Top Bar Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Section & Branch Allocation Registry
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Functional sub-cells, officer deployment, and internal personnel mapping
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant="primary"
            icon={Plus}
            onClick={() => handleOpenModal()}
          >
            Create New Section
          </Button>
        </div>
      </div>

      {/* ── 1. Cadre Capacity Metrics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Sections / Cells
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalSections}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Operating units</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <FolderTree size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sanctioned Strength
            </span>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">
              {totalSanctionedStaff}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Approved sectional posts</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Layers size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Personnel Deployed
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {totalAllocatedStaff}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {((totalAllocatedStaff / (totalSanctionedStaff || 1)) * 100).toFixed(1)}% Fill rate
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Section Vacancies
            </span>
            <p className="text-2xl font-extrabold text-rose-600 mt-1">
              {totalVacancies}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Open reallocations</p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* ── 2. Filters & Search Bar with Baseline Alignment ── */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <SelectField
            label="Filter by Parent Department"
            id="deptFilter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Municipal Departments" },
              ...departmentOptions,
            ]}
          />

          <div className="w-full mb-0">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
              Filter Section / Officer In-Charge
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search section name, code, officer in-charge, or wing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Table of Active Sections ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Sections & Cells ({filteredSections.length} Divisions)
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Staff allocation feeds directly into Daily Muster and Zonal Attendance Statement
          </span>
        </div>
        <Table columns={columns} data={filteredSections} />
      </div>

      {/* ── 4. Add / Edit Section Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <FolderTree size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingSection ? "Modify Section Allocation" : "Create New Departmental Section"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Section Code"
                  id="sectionCode"
                  placeholder="e.g. SEC-ENG-03"
                  value={formData.sectionCode}
                  onChange={(e) => setFormData({ ...formData, sectionCode: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Section / Cell Name"
                  id="sectionName"
                  placeholder="e.g. Street Lighting & Electricals"
                  value={formData.sectionName}
                  onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>

              <SelectField
                label="Parent Municipal Department"
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="!mb-0"
                options={departmentOptions}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="In-Charge Officer"
                  id="inCharge"
                  placeholder="e.g. Rintu Das"
                  value={formData.inCharge}
                  onChange={(e) => setFormData({ ...formData, inCharge: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Officer Emp Code"
                  id="inChargeEmpCode"
                  placeholder="e.g. GMC-0881"
                  value={formData.inChargeEmpCode}
                  onChange={(e) => setFormData({ ...formData, inChargeEmpCode: e.target.value })}
                  className="!mb-0"
                />
                <InputField
                  label="Official Designation"
                  id="inChargeDesignation"
                  placeholder="e.g. Assistant Engineer"
                  value={formData.inChargeDesignation}
                  onChange={(e) => setFormData({ ...formData, inChargeDesignation: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Sanctioned Posts"
                  id="sanctionedStrength"
                  type="number"
                  placeholder="e.g. 35"
                  value={formData.sanctionedStrength}
                  onChange={(e) => setFormData({ ...formData, sanctionedStrength: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Allocated Staff Count"
                  id="allocatedStaff"
                  type="number"
                  placeholder="e.g. 30"
                  value={formData.allocatedStaff}
                  onChange={(e) => setFormData({ ...formData, allocatedStaff: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Room / Office Suite"
                  id="roomLocation"
                  placeholder="e.g. Room 310, 3rd Floor"
                  value={formData.roomLocation}
                  onChange={(e) => setFormData({ ...formData, roomLocation: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>

              <TextArea
                label="Core Mandate & Functional Responsibilities"
                id="coreResponsibilities"
                rows={2}
                placeholder="Briefly state primary public civic functions managed by this cell..."
                value={formData.coreResponsibilities}
                onChange={(e) => setFormData({ ...formData, coreResponsibilities: e.target.value })}
                className="!mb-0"
              />

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={CheckCircle2}>
                  {editingSection ? "Save Changes" : "Create Section"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 5. Staff Reallocation Modal ── */}
      {reassignModalOpen && selectedSectionForReassign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <ArrowRightLeft size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Staff Inter-Section Transfer Order
                </h3>
              </div>
              <button
                onClick={() => setReassignModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleReassignSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Originating Section
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {selectedSectionForReassign.sectionName}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {selectedSectionForReassign.department} • In-Charge: {selectedSectionForReassign.inCharge}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Employee Code to Transfer"
                  id="reassignEmpCode"
                  placeholder="e.g. GMC-0104"
                  value={reassignData.empCode}
                  onChange={(e) => setReassignData({ ...reassignData, empCode: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Employee Full Name"
                  id="reassignEmpName"
                  placeholder="e.g. Priya Sharma"
                  value={reassignData.empName}
                  onChange={(e) => setReassignData({ ...reassignData, empName: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>

              <SelectField
                label="Destination Target Section"
                id="targetSection"
                value={reassignData.targetSection}
                onChange={(e) => setReassignData({ ...reassignData, targetSection: e.target.value })}
                className="!mb-0"
                options={sections
                  .filter((s) => s.id !== selectedSectionForReassign.id)
                  .map((s) => ({ value: s.sectionName, label: `${s.sectionName} (${s.sectionCode})` }))}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Transfer Order Number"
                  id="transferOrderNo"
                  value={reassignData.transferOrderNo}
                  onChange={(e) => setReassignData({ ...reassignData, transferOrderNo: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Effective Joining Date"
                  id="effectiveDate"
                  type="date"
                  value={reassignData.effectiveDate}
                  onChange={(e) => setReassignData({ ...reassignData, effectiveDate: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>

              <TextArea
                label="Reason / Administrative Remark"
                id="transferRemarks"
                rows={2}
                value={reassignData.remarks}
                onChange={(e) => setReassignData({ ...reassignData, remarks: e.target.value })}
                placeholder="e.g. Workload balancing or rotational posting..."
                className="!mb-0"
              />

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setReassignModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={CheckCircle2}>
                  Execute Transfer Order
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}