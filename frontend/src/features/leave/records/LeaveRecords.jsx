import React, { useState } from "react";
import {
  CalendarDays,
  Building2,
  User,
  Download,
  Printer,
  Search,
  RotateCcw,
  Clock,
  ShieldCheck,
  CalendarCheck2,
  CalendarOff,
} from "lucide-react";

// Reusable UI Component Imports
import SelectField from "../../../components/common/select/SelectField";
import InputField from "../../../components/common/input/InputField";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function LeaveRecords() {
  const [viewMode, setViewMode] = useState("department"); // "department" | "employee"
  const [selectedYear, setSelectedYear] = useState("2026-2027");
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Department-Wise Summary Mock Data
  const departmentStatements = [
    {
      id: 1,
      department: "Engineering & Works",
      cadreStrength: 142,
      totalCLUsed: 312,
      totalELUsed: 624,
      totalHPLUsed: 118,
      totalRHUsed: 45,
      maternityPaternity: 4,
      encashmentPending: 18,
      avgLeavePerEmployee: "7.7 days",
    },
    {
      id: 2,
      department: "Administration",
      cadreStrength: 86,
      totalCLUsed: 210,
      totalELUsed: 402,
      totalHPLUsed: 64,
      totalRHUsed: 31,
      maternityPaternity: 2,
      encashmentPending: 11,
      avgLeavePerEmployee: "8.2 days",
    },
    {
      id: 3,
      department: "Finance & Accounts",
      cadreStrength: 54,
      totalCLUsed: 98,
      totalELUsed: 182,
      totalHPLUsed: 26,
      totalRHUsed: 19,
      maternityPaternity: 0,
      encashmentPending: 6,
      avgLeavePerEmployee: "5.9 days",
    },
    {
      id: 4,
      department: "Public Health & Conservancy",
      cadreStrength: 620,
      totalCLUsed: 1410,
      totalELUsed: 2890,
      totalHPLUsed: 490,
      totalRHUsed: 80,
      maternityPaternity: 12,
      encashmentPending: 84,
      avgLeavePerEmployee: "7.8 days",
    },
  ];

  // 2. Individual Employee Leave Ledger Mock Data
  const employeeStatements = [
    {
      id: 1,
      empCode: "GMC-0011",
      name: "Rajib Borah",
      department: "Administration",
      designation: "HR Manager",
      clBalance: "8 / 12",
      elBalance: "24 / 30",
      hplBalance: "16 / 20",
      rhBalance: "2 / 2",
      totalAvailed: 12,
      serviceBookAudit: "Audited",
      encashableDays: 240,
    },
    {
      id: 2,
      empCode: "GMC-0104",
      name: "Priya Sharma",
      department: "Engineering & Works",
      designation: "Executive Engineer",
      clBalance: "6 / 12",
      elBalance: "20 / 30",
      hplBalance: "18 / 20",
      rhBalance: "1 / 2",
      totalAvailed: 17,
      serviceBookAudit: "Audited",
      encashableDays: 285,
    },
    {
      id: 3,
      empCode: "GMC-0210",
      name: "Deepak Kalita",
      department: "Finance & Accounts",
      designation: "Accountant",
      clBalance: "4 / 12",
      elBalance: "18 / 30",
      hplBalance: "14 / 20",
      rhBalance: "0 / 2",
      totalAvailed: 26,
      serviceBookAudit: "Review",
      encashableDays: 142,
    },
    {
      id: 4,
      empCode: "GMC-0315",
      name: "Anupam Gogoi",
      department: "Public Works",
      designation: "Junior Engineer",
      clBalance: "0 / 12",
      elBalance: "6 / 30",
      hplBalance: "10 / 20",
      rhBalance: "0 / 2",
      totalAvailed: 38,
      serviceBookAudit: "Disallowed",
      encashableDays: 60,
    },
  ];

  // Department-wise Table Columns
  const departmentColumns = [
    {
      key: "department",
      label: "Municipal Wing",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.department}</p>
          <span className="text-[11px] text-slate-400 font-medium">
            Cadre Strength: {row.cadreStrength} Officers
          </span>
        </div>
      ),
    },
    {
      key: "totalCLUsed",
      label: "CL Availed",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-700 font-mono">
          {row.totalCLUsed} d
        </span>
      ),
    },
    {
      key: "totalELUsed",
      label: "Earned Leave",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-indigo-600 font-mono">
          {row.totalELUsed} d
        </span>
      ),
    },
    {
      key: "totalHPLUsed",
      label: "HPL / Medical",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-emerald-600 font-mono">
          {row.totalHPLUsed} d
        </span>
      ),
    },
    {
      key: "maternityPaternity",
      label: "Special Leaves",
      render: (row) => (
        <span className="text-slate-600 font-medium">
          {row.maternityPaternity} cases
        </span>
      ),
    },
    {
      key: "avgLeavePerEmployee",
      label: "Wing Utilization",
      render: (row) => (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          {row.avgLeavePerEmployee}
        </span>
      ),
    },
    {
      key: "encashmentPending",
      label: "Encashment Claims",
      render: (row) => (
        <span className="font-bold text-amber-600 font-mono">
          {row.encashmentPending} Pending
        </span>
      ),
    },
  ];

  // Employee-wise Table Columns
  const employeeColumns = [
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
      label: "Officer Name & Designation",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium">
            {row.designation} • {row.department}
          </span>
        </div>
      ),
    },
    {
      key: "clBalance",
      label: "Casual (CL)",
      render: (row) => (
        <span className="font-semibold text-slate-700 font-mono">
          {row.clBalance}
        </span>
      ),
    },
    {
      key: "elBalance",
      label: "Earned (EL)",
      render: (row) => (
        <span className="font-semibold text-indigo-600 font-mono">
          {row.elBalance}
        </span>
      ),
    },
    {
      key: "hplBalance",
      label: "Medical (HPL)",
      render: (row) => (
        <span className="font-semibold text-emerald-600 font-mono">
          {row.hplBalance}
        </span>
      ),
    },
    {
      key: "totalAvailed",
      label: "Total Days Taken",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-slate-800 font-mono">
          {row.totalAvailed} days
        </span>
      ),
    },
    {
      key: "encashableDays",
      label: "Encashment Credit",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {row.encashableDays} / 300 d
        </span>
      ),
    },
    {
      key: "serviceBookAudit",
      label: "Service Book Status",
      sortable: true,
      render: (row) => (
        <StatusBadge
          status={
            row.serviceBookAudit === "Audited"
              ? "Approved"
              : row.serviceBookAudit === "Review"
              ? "Pending"
              : "Rejected"
          }
        />
      ),
    },
  ];

  // Filtering Logic
  const filteredDeptData = departmentStatements.filter((item) => {
    const matchesDept = selectedDept === "All" || item.department === selectedDept;
    const matchesSearch = item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const filteredEmpData = employeeStatements.filter((item) => {
    const matchesDept = selectedDept === "All" || item.department === selectedDept;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* ── Page Header & View Mode Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Comprehensive Leave Statement & Ledger
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Annual leave quotas, encashment ledger & audit report
          </p>
        </div>

        {/* View Mode Toggle Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("department")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "department"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Building2 size={14} />
              <span>Wing Summary</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("employee")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "employee"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <User size={14} />
              <span>Employee Ledger</span>
            </button>
          </div>

          <Button
            size="md"
            variant="secondary"
            icon={Printer}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            size="md"
            variant="primary"
            icon={Download}
            onClick={() => alert("Downloading Leave Statement Excel File...")}
          >
            Export Sheet
          </Button>
        </div>
      </div>

      {/* ── 1. Top Highlights Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Cadre Staff Strength
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">1,428</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all municipal wings</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Leaves Availed (FY 26-27)
          </span>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">10,980 d</p>
          <p className="text-[11px] text-slate-400 mt-0.5">CL + EL + HPL Combined</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            EL Encashment Liability
          </span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">119 Claims</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Retirement / superannuation queue</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Service Book Audit Rate
          </span>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">96.4%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Authenticated by Audit Branch</p>
        </div>
      </div>

      {/* ── 2. Aligned Baseline Filter Controls ── */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <SelectField
            label="Financial / Leave Year"
            id="yearSelect"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="!mb-0"
            options={[
              { value: "2026-2027", label: "FY 2026 – 2027 (Current)" },
              { value: "2025-2026", label: "FY 2025 – 2026" },
              { value: "2024-2025", label: "FY 2024 – 2025" },
            ]}
          />

          <SelectField
            label="Filter Department"
            id="deptSelect"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Departments" },
              { value: "Engineering & Works", label: "Engineering & Works" },
              { value: "Administration", label: "Administration" },
              { value: "Finance & Accounts", label: "Finance & Accounts" },
              { value: "Public Health & Conservancy", label: "Public Health & Conservancy" },
            ]}
          />

          {/* Label-Matched Search Box */}
          <div className="w-full mb-0">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
              Search Statement
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder={
                  viewMode === "department"
                    ? "Search department..."
                    : "Search officer name, code, or wing..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Table Statement Content ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {viewMode === "department"
              ? `Department-Wise Aggregation (${filteredDeptData.length} Wings)`
              : `Officer Leave Ledgers (${filteredEmpData.length} Personnel)`}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Maximum accumulation ceiling for Earned Leave encashment is 300 days
          </span>
        </div>

        {viewMode === "department" ? (
          <Table columns={departmentColumns} data={filteredDeptData} />
        ) : (
          <Table columns={employeeColumns} data={filteredEmpData} />
        )}
      </div>
    </div>
  );
}
