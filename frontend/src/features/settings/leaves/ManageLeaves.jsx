import React, { useState } from "react";
import {
  CalendarOff,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Settings2,
  Clock,
  Layers,
  ShieldCheck,
  FileText,
  AlertCircle,
  HelpCircle,
  X,
  RotateCcw,
} from "lucide-react";

// Reusable Components Suite
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import TextArea from "../../../components/common/textarea/TextArea";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";
import Checkbox from "../../../components/common/checkbox/Checkbox";
import RadioButton from "../../../components/common/radio/RadioButton";

export default function ManageLeaves() {
  const [activeTab, setActiveTab] = useState("rules"); // "rules" | "add" | "encashment"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCadre, setSelectedCadre] = useState("All");
  const [editingLeaveId, setEditingLeaveId] = useState(null);

  // Leave Rule Form State
  const initialFormState = {
    code: "",
    name: "",
    category: "Paid Leave",
    annualQuota: "",
    accrualFrequency: "Annually (Advance Credit)",
    carryForwardLimit: "",
    encashmentAllowed: false,
    maxEncashmentDays: "0",
    requiresMedicalCert: false,
    medicalCertThresholdDays: "2",
    allowHalfDay: true,
    applicableCadres: ["Permanent"],
    description: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Master Leave Types Dataset
  const [leaveTypes, setLeaveTypes] = useState([
    {
      id: 1,
      code: "CL",
      name: "Casual Leave",
      category: "Paid Leave",
      annualQuota: 12,
      accrualFrequency: "Annually (Advance Credit)",
      carryForwardLimit: 0,
      encashmentAllowed: false,
      maxEncashmentDays: 0,
      requiresMedicalCert: false,
      medicalCertThresholdDays: 0,
      allowHalfDay: true,
      applicableCadres: ["Permanent", "Contractual", "Deputation"],
      status: "Active",
      description: "Short unplanned absences for urgent personal/family affairs. Lapses on December 31.",
    },
    {
      id: 2,
      code: "EL",
      name: "Earned Leave (Privilege)",
      category: "Accumulative Leave",
      annualQuota: 30,
      accrualFrequency: "Bi-Annually (15d Jan / 15d Jul)",
      carryForwardLimit: 300,
      encashmentAllowed: true,
      maxEncashmentDays: 300,
      requiresMedicalCert: false,
      medicalCertThresholdDays: 0,
      allowHalfDay: false,
      applicableCadres: ["Permanent", "Deputation"],
      status: "Active",
      description: "Statutory earned privilege leave. Accrues up to 300 days ceiling for retirement encashment.",
    },
    {
      id: 3,
      code: "HPL",
      name: "Half Pay Leave (Medical)",
      category: "Accumulative Leave",
      annualQuota: 20,
      accrualFrequency: "Bi-Annually (10d Jan / 10d Jul)",
      carryForwardLimit: 120,
      encashmentAllowed: false,
      maxEncashmentDays: 0,
      requiresMedicalCert: true,
      medicalCertThresholdDays: 2,
      allowHalfDay: false,
      applicableCadres: ["Permanent"],
      status: "Active",
      description: "Medical convalescence leave. Can be commuted into full-pay leave upon submission of Medical Board certificate.",
    },
    {
      id: 4,
      code: "RH",
      name: "Restricted Holiday",
      category: "Special Leave",
      annualQuota: 2,
      accrualFrequency: "Annually (Advance Credit)",
      carryForwardLimit: 0,
      encashmentAllowed: false,
      maxEncashmentDays: 0,
      requiresMedicalCert: false,
      medicalCertThresholdDays: 0,
      allowHalfDay: false,
      applicableCadres: ["Permanent", "Contractual", "Deputation"],
      status: "Active",
      description: "Optional gazetted festival/faith holidays chosen from GMC approved festival notification.",
    },
    {
      id: 5,
      code: "ML",
      name: "Maternity Leave",
      category: "Statutory Protection",
      annualQuota: 180,
      accrualFrequency: "Event-based (Per Confinement)",
      carryForwardLimit: 0,
      encashmentAllowed: false,
      maxEncashmentDays: 0,
      requiresMedicalCert: true,
      medicalCertThresholdDays: 1,
      allowHalfDay: false,
      applicableCadres: ["Permanent", "Contractual"],
      status: "Active",
      description: "Paid statutory leave up to 180 days for female personnel with less than two surviving children.",
    },
    {
      id: 6,
      code: "PL",
      name: "Paternity Leave",
      category: "Statutory Protection",
      annualQuota: 15,
      accrualFrequency: "Event-based (Per Confinement)",
      carryForwardLimit: 0,
      encashmentAllowed: false,
      maxEncashmentDays: 0,
      requiresMedicalCert: true,
      medicalCertThresholdDays: 1,
      allowHalfDay: false,
      applicableCadres: ["Permanent"],
      status: "Active",
      description: "Paid leave of 15 days granted to male staff within 6 months of delivery/adoption.",
    },
  ]);

  // Form Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCadreToggle = (cadre) => {
    setFormData((prev) => {
      const exists = prev.applicableCadres.includes(cadre);
      return {
        ...prev,
        applicableCadres: exists
          ? prev.applicableCadres.filter((c) => c !== cadre)
          : [...prev.applicableCadres, cadre],
      };
    });
  };

  const handleEditClick = (leave) => {
    setEditingLeaveId(leave.id);
    setFormData({
      code: leave.code,
      name: leave.name,
      category: leave.category,
      annualQuota: leave.annualQuota.toString(),
      accrualFrequency: leave.accrualFrequency,
      carryForwardLimit: leave.carryForwardLimit.toString(),
      encashmentAllowed: leave.encashmentAllowed,
      maxEncashmentDays: leave.maxEncashmentDays.toString(),
      requiresMedicalCert: leave.requiresMedicalCert,
      medicalCertThresholdDays: leave.medicalCertThresholdDays.toString(),
      allowHalfDay: leave.allowHalfDay,
      applicableCadres: leave.applicableCadres,
      description: leave.description,
      status: leave.status,
    });
    setActiveTab("add");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const annualQuota = Number(formData.annualQuota) || 0;
    const carryForwardLimit = Number(formData.carryForwardLimit) || 0;
    const maxEncashmentDays = formData.encashmentAllowed
      ? Number(formData.maxEncashmentDays) || 0
      : 0;
    const medicalCertThresholdDays = formData.requiresMedicalCert
      ? Number(formData.medicalCertThresholdDays) || 1
      : 0;

    if (editingLeaveId) {
      setLeaveTypes((prev) =>
        prev.map((lt) =>
          lt.id === editingLeaveId
            ? {
                ...lt,
                code: formData.code,
                name: formData.name,
                category: formData.category,
                annualQuota,
                accrualFrequency: formData.accrualFrequency,
                carryForwardLimit,
                encashmentAllowed: formData.encashmentAllowed,
                maxEncashmentDays,
                requiresMedicalCert: formData.requiresMedicalCert,
                medicalCertThresholdDays,
                allowHalfDay: formData.allowHalfDay,
                applicableCadres: formData.applicableCadres,
                description: formData.description,
                status: formData.status,
              }
            : lt
        )
      );
      setEditingLeaveId(null);
    } else {
      const newLeave = {
        id: Date.now(),
        code: formData.code.toUpperCase(),
        name: formData.name,
        category: formData.category,
        annualQuota,
        accrualFrequency: formData.accrualFrequency,
        carryForwardLimit,
        encashmentAllowed: formData.encashmentAllowed,
        maxEncashmentDays,
        requiresMedicalCert: formData.requiresMedicalCert,
        medicalCertThresholdDays,
        allowHalfDay: formData.allowHalfDay,
        applicableCadres: formData.applicableCadres.length > 0 ? formData.applicableCadres : ["Permanent"],
        description: formData.description || "General leave rule",
        status: formData.status,
      };
      setLeaveTypes([...leaveTypes, newLeave]);
    }

    setFormData(initialFormState);
    setActiveTab("rules");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to retire leave rule: "${name}"? Existing balances in service books will be locked.`)) {
      setLeaveTypes((prev) => prev.filter((lt) => lt.id !== id));
    }
  };

  // Table Columns Definition
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
      key: "name",
      label: "Leave Rule & Category",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium">
            {row.category} • {row.accrualFrequency}
          </span>
        </div>
      ),
    },
    {
      key: "annualQuota",
      label: "Annual Entitlement",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-xs">
          {row.annualQuota} {row.annualQuota === 1 ? "day" : "days"} / yr
        </span>
      ),
    },
    {
      key: "carryForward",
      label: "Carry Forward & Encashment",
      render: (row) => (
        <div className="space-y-0.5 text-[11px]">
          <p className="text-slate-700 font-medium">
            Accumulation:{" "}
            <strong className="text-slate-900 font-mono">
              {row.carryForwardLimit > 0 ? `Max ${row.carryForwardLimit}d` : "None (Lapses)"}
            </strong>
          </p>
          <p className={row.encashmentAllowed ? "text-emerald-600 font-semibold" : "text-slate-400"}>
            {row.encashmentAllowed ? `Encashable: Up to ${row.maxEncashmentDays}d` : "Non-Encashable"}
          </p>
        </div>
      ),
    },
    {
      key: "cadres",
      label: "Applicable Cadre",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.applicableCadres.map((cadre, i) => (
            <span
              key={i}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                cadre === "Permanent"
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                  : cadre === "Contractual"
                  ? "bg-purple-50 text-purple-700 border border-purple-100"
                  : "bg-sky-50 text-sky-700 border border-sky-100"
              }`}
            >
              {cadre}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      label: "Rule Status",
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
            title="Edit Rule Policy"
            onClick={() => handleEditClick(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            title="Retire Rule"
            onClick={() => handleDelete(row.id, row.name)}
          />
        </div>
      ),
    },
  ];

  // Filtering
  const filteredLeaveTypes = leaveTypes.filter((lt) => {
    const matchesSearch =
      lt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lt.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lt.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCadre =
      selectedCadre === "All" || lt.applicableCadres.includes(selectedCadre);

    return matchesSearch && matchesCadre;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── Top Header & Tab Ribbon ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Leave Policy & Rule Master
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Entitlement quotas, encashment parameters, and Assam Service Rules
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant={activeTab === "rules" ? "primary" : "secondary"}
            icon={CalendarOff}
            onClick={() => {
              setActiveTab("rules");
              setEditingLeaveId(null);
            }}
          >
            Leave Rules Catalog
          </Button>

          <Button
            size="md"
            variant={activeTab === "encashment" ? "primary" : "secondary"}
            icon={Settings2}
            onClick={() => setActiveTab("encashment")}
          >
            Encashment Ceilings
          </Button>

          <Button
            size="md"
            variant={activeTab === "add" ? "primary" : "secondary"}
            icon={editingLeaveId ? Edit3 : Plus}
            onClick={() => {
              if (activeTab !== "add") {
                setEditingLeaveId(null);
                setFormData(initialFormState);
              }
              setActiveTab("add");
            }}
          >
            {editingLeaveId ? "Edit Rule Policy" : "Define New Leave Type"}
          </Button>
        </div>
      </div>

      {/* ── 1. KPI Metric Badges ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Configured Leave Rules
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {leaveTypes.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Active cadre classifications</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <CalendarOff size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Encashable Categories
            </span>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">
              {leaveTypes.filter((l) => l.encashmentAllowed).length}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Earned Leave (EL) sanctioned</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <ShieldCheck size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Statutory Carry Forward
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              300 Days
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Assam FR 1954 maximum ceiling</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Clock size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Medical Board Verification
            </span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {leaveTypes.filter((l) => l.requiresMedicalCert).length} Rules
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Mandatory doctor endorsement</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <FileText size={22} />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 1: RULES CATALOG TABLE                                  */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <SelectField
                label="Applicable Cadre Filter"
                id="cadreFilter"
                value={selectedCadre}
                onChange={(e) => setSelectedCadre(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Establishment Cadres" },
                  { value: "Permanent", label: "Permanent Cadre" },
                  { value: "Contractual", label: "Contractual / Fixed Pay" },
                  { value: "Deputation", label: "Deputation / Attached" },
                ]}
              />

              <div className="w-full mb-0">
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
                  Search Leave Types
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by code (CL, EL), leave title, or category..."
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
                Registered Leave Types ({filteredLeaveTypes.length} Policies)
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Referenced dynamically by Apply Leave, Attendance Statement, and Encashment modules
              </span>
            </div>
            <Table columns={columns} data={filteredLeaveTypes} />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 2: DEFINE / MODIFY LEAVE RULE FORM                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "add" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <CalendarOff size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingLeaveId ? "Update Leave Policy Parameters" : "Configure New Leave Classification"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Establish statutory entitlement quotas, carry-forward parameters, and medical board triggers
                </p>
              </div>
            </div>

            {editingLeaveId && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Editing Rule #{editingLeaveId}
              </span>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 md:p-8 space-y-6">
            {/* 1. Identification & Classification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                1. Rule Identification & Classification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Rule Code (Symbolic)"
                  id="code"
                  placeholder="e.g. CL, EL, HPL"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Official Leave Name"
                  id="name"
                  placeholder="e.g. Earned Leave (Privilege)"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="!mb-0"
                  required
                />
                <SelectField
                  label="Leave Classification Category"
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Paid Leave", label: "Paid Leave (Standard)" },
                    { value: "Accumulative Leave", label: "Accumulative / Encashable" },
                    { value: "Special Leave", label: "Special Sanctioned Leave" },
                    { value: "Statutory Protection", label: "Statutory Maternity / Paternity" },
                    { value: "Without Pay (LWP)", label: "Extraordinary Leave (Without Pay)" },
                  ]}
                  required
                />
              </div>
            </div>

            {/* 2. Quota & Accrual Frequency */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                2. Entitlement Quota & Credit Frequency
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Annual Entitlement Quota (Days)"
                  id="annualQuota"
                  type="number"
                  placeholder="e.g. 12 or 30"
                  value={formData.annualQuota}
                  onChange={(e) => handleInputChange("annualQuota", e.target.value)}
                  className="!mb-0"
                  required
                />
                <SelectField
                  label="Accrual & Credit Frequency"
                  id="accrualFrequency"
                  value={formData.accrualFrequency}
                  onChange={(e) => handleInputChange("accrualFrequency", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Annually (Advance Credit)", label: "Annually (Advance credit on Jan 1)" },
                    { value: "Bi-Annually (15d Jan / 15d Jul)", label: "Bi-Annually (15d Jan / 15d Jul)" },
                    { value: "Monthly (Pro-rata)", label: "Monthly (Pro-rata accumulation)" },
                    { value: "Event-based (Per Confinement)", label: "Event-based (Per Confinement/Instance)" },
                  ]}
                />
                <InputField
                  label="Maximum Carry Forward Accumulation"
                  id="carryForwardLimit"
                  type="number"
                  placeholder="0 for none, or 300 for EL"
                  value={formData.carryForwardLimit}
                  onChange={(e) => handleInputChange("carryForwardLimit", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>
            </div>

            {/* 3. Encashment & Half-Day Parameters */}
            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Encashment Eligibility & Half-Day Options
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <Checkbox
                  id="encashmentAllowed"
                  checked={formData.encashmentAllowed}
                  onChange={(e) => handleInputChange("encashmentAllowed", e.target.checked)}
                  label="Permit Cash Encashment upon Retirement / Superannuation"
                  description="Applicable for accumulated Earned Leave under Assam Fundamental Rules"
                  className="!mb-0"
                />

                {formData.encashmentAllowed && (
                  <InputField
                    label="Maximum Encashment Days Permitted"
                    id="maxEncashmentDays"
                    type="number"
                    placeholder="Standard ceiling is 300 days"
                    value={formData.maxEncashmentDays}
                    onChange={(e) => handleInputChange("maxEncashmentDays", e.target.value)}
                    className="!mb-0"
                    required={formData.encashmentAllowed}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-slate-200/60">
                <Checkbox
                  id="allowHalfDay"
                  checked={formData.allowHalfDay}
                  onChange={(e) => handleInputChange("allowHalfDay", e.target.checked)}
                  label="Allow Half-Day Requisitions (FN / AN Shifts)"
                  description="Enables 0.5 day booking on forenoon or afternoon shifts (usually for CL)"
                  className="!mb-0"
                />

                <Checkbox
                  id="requiresMedicalCert"
                  checked={formData.requiresMedicalCert}
                  onChange={(e) => handleInputChange("requiresMedicalCert", e.target.checked)}
                  label="Require Registered Medical Practitioner Certificate"
                  description="Mandatory certificate proof if leave duration exceeds threshold"
                  className="!mb-0"
                />
              </div>

              {formData.requiresMedicalCert && (
                <div className="w-full sm:w-1/2 pt-1 animate-in fade-in duration-200">
                  <InputField
                    label="Medical Certificate Mandatory If Exceeding (Days)"
                    id="medicalCertThresholdDays"
                    type="number"
                    placeholder="e.g. 2 days"
                    value={formData.medicalCertThresholdDays}
                    onChange={(e) => handleInputChange("medicalCertThresholdDays", e.target.value)}
                    className="!mb-0"
                    required={formData.requiresMedicalCert}
                  />
                </div>
              )}
            </div>

            {/* 4. Cadre Applicability Multi-Select */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                4. Applicable Establishment Cadres
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">
                Select which municipal personnel categories are eligible to book this leave:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Permanent", "Contractual", "Deputation"].map((cadre) => (
                  <label
                    key={cadre}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.applicableCadres.includes(cadre)
                        ? "bg-indigo-50/30 border-indigo-600 text-indigo-900"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.applicableCadres.includes(cadre)}
                      onChange={() => handleCadreToggle(cadre)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                    />
                    <div className="text-xs">
                      <span className="font-bold block">{cadre} Staff</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {cadre === "Permanent"
                          ? "Full cadre benefits"
                          : cadre === "Contractual"
                          ? "Tenure agreements"
                          : "State government attachment"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Policy Remarks & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              <div className="sm:col-span-2">
                <TextArea
                  label="Statutory Rule Description / Gazetted Reference"
                  id="description"
                  rows={2}
                  placeholder="Reference Assam Fundamental Rule, Subsidiary Rule or GMC Council Resolution..."
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
                  { value: "Active", label: "Active Policy Rule" },
                  { value: "Inactive", label: "Inactive / Suspended" },
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
                  setEditingLeaveId(null);
                  setActiveTab("rules");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={CheckCircle2}>
                {editingLeaveId ? "Update Leave Rule" : "Publish Leave Policy"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 3: ENCASHMENT CEILINGS & STATUTORY LIMITS               */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "encashment" && (
        <div className="space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              Assam Fundamental Rules: Leave Encashment & Accumulation Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Statutory ceilings governing cash settlement of unutilized leaves during superannuation, invalidation, or voluntary retirement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Earned Leave (EL) Encashment Rules
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  300 Days Limit
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                <li>
                  Maximum cumulative credit permitted on service books is <strong>300 days</strong>.
                </li>
                <li>
                  Cash equivalent is computed based on:{" "}
                  <code className="text-indigo-600 font-mono font-semibold bg-slate-50 px-1 py-0.5 rounded">
                    (Basic Pay + DA) × (Unutilized EL / 30)
                  </code>.
                </li>
                <li>
                  No deductions (such as HRA, EPF, or Professional Tax) are applied against encashment disbursements.
                </li>
                <li>
                  Half Pay Leave (HPL) shortfall can be combined with EL encashment subject to an overall ceiling of 300 days.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Casual Leave (CL) Restrictions
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Non-Accumulative
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                <li>
                  Unspent Casual Leave balances automatically lapse on the midnight of <strong>31st December</strong>.
                </li>
                <li>
                  Casual Leave cannot be combined with any other leave category (such as EL, HPL, or Medical).
                </li>
                <li>
                  Sundays and gazetted holidays falling within a CL period are not counted against the officer's leave balance.
                </li>
                <li>
                  Cannot be converted to cash under any circumstance.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}