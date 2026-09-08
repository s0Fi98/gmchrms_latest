import React, { useState } from "react";
import {
  CalendarCheck2,
  Clock,
  Printer,
  Download,
  Search,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Radio,
} from "lucide-react";

// Reusable UI Component Imports
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function AttendanceReport() {
  const [reportDate, setReportDate] = useState("2026-09-08");
  const [department, setDepartment] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Aggregate stats for the selected date
  const reportSummary = [
    {
      title: "Total Staff Strength",
      value: "1,428",
      subText: "Across 6 Zonal Offices",
      color: "text-slate-900",
      bgColor: "bg-slate-50",
    },
    {
      title: "Marked Present",
      value: "1,312",
      subText: "91.8% Reporting rate",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Late Entry (> 10:00 AM)",
      value: "42",
      subText: "Recorded via Biometrics",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "On Field Tour / OD",
      value: "38",
      subText: "Approved movement slips",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Unexplained Absent",
      value: "16",
      subText: "No slip or leave application",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  // Daily log dataset
  const reportData = [
    {
      id: 1,
      empCode: "GMC-0011",
      name: "Rajib Borah",
      department: "Administration",
      designation: "HR Manager",
      inTime: "09:18 AM",
      outTime: "05:32 PM",
      totalHours: "8h 14m",
      device: "Main Office Face-ID",
      status: "Present",
      note: "Normal shift",
    },
    {
      id: 2,
      empCode: "GMC-0104",
      name: "Priya Sharma",
      department: "Engineering & Works",
      designation: "Executive Engineer",
      inTime: "10:14 AM",
      outTime: "06:05 PM",
      totalHours: "7h 51m",
      device: "Zonal Biometric-02",
      status: "Review",
      note: "Late Entry (Grace applied)",
    },
    {
      id: 3,
      empCode: "GMC-0210",
      name: "Deepak Kalita",
      department: "Finance & Accounts",
      designation: "Accountant",
      inTime: "09:25 AM",
      outTime: "—",
      totalHours: "Active",
      device: "Main Office Face-ID",
      status: "Present",
      note: "Shift in progress",
    },
    {
      id: 4,
      empCode: "GMC-0315",
      name: "Anupam Gogoi",
      department: "Public Works",
      designation: "Junior Engineer",
      inTime: "—",
      outTime: "—",
      totalHours: "—",
      device: "Manual Entry",
      status: "Deputation",
      note: "Ward 4 Drain Project Inspection",
    },
    {
      id: 5,
      empCode: "GMC-0412",
      name: "Bhaskar Barman",
      department: "Engineering & Works",
      designation: "Section Officer",
      inTime: "—",
      outTime: "—",
      totalHours: "—",
      device: "Portal Sync",
      status: "Approved",
      note: "Casual Leave Sanctioned",
    },
    {
      id: 6,
      empCode: "GMC-0520",
      name: "Rantu Deka",
      department: "Public Works",
      designation: "Site Supervisor",
      inTime: "—",
      outTime: "—",
      totalHours: "—",
      device: "None",
      status: "Suspended",
      note: "Disciplinary Absent",
    },
  ];

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
      key: "punch",
      label: "In / Out Timestamp",
      render: (row) => (
        <div className="font-mono text-xs">
          <span className="text-slate-800 font-semibold">{row.inTime}</span>
          <span className="text-slate-400 mx-1.5">→</span>
          <span className="text-slate-600">{row.outTime}</span>
        </div>
      ),
    },
    {
      key: "totalHours",
      label: "Working Span",
      render: (row) => (
        <span className="font-semibold text-slate-700 text-xs font-mono">
          {row.totalHours}
        </span>
      ),
    },
    {
      key: "device",
      label: "Capture Device",
      render: (row) => (
        <span className="text-[11px] text-slate-500 font-medium">
          {row.device}
        </span>
      ),
    },
    {
      key: "status",
      label: "Attendance Audit",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "note",
      label: "Verification Note",
      render: (row) => (
        <span className="text-[11px] text-slate-600 italic">
          {row.note}
        </span>
      ),
    },
  ];

  const filteredLogs = reportData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = department === "All" || item.department === department;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Daily Attendance & Biometric Report
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Shift punch verification and daily muster audit
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="md"
            variant="secondary"
            icon={Printer}
            onClick={() => window.print()}
          >
            Print Daily Sheet
          </Button>
          <Button
            size="md"
            variant="primary"
            icon={Download}
            onClick={() => alert("Downloading Daily Attendance PDF/Excel...")}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* ── 1. Daily Metrics Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {reportSummary.map((item) => (
          <div
            key={item.title}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
              {item.title}
            </span>
            <div className="my-2">
              <span className={`text-2xl font-extrabold ${item.color}`}>
                {item.value}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {item.subText}
            </p>
          </div>
        ))}
      </div>

      {/* ── 2. Filter Bar with Aligned Baselines ── */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <InputField
            label="Report Date"
            id="reportDate"
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="!mb-0"
          />

          <SelectField
            label="Department / Wing"
            id="deptSelect"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Departments" },
              { value: "Administration", label: "Administration" },
              { value: "Engineering & Works", label: "Engineering & Works" },
              { value: "Finance & Accounts", label: "Finance & Accounts" },
              { value: "Public Works", label: "Public Works" },
            ]}
          />

          <SelectField
            label="Audit Filter"
            id="statusSelect"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Audit Statuses" },
              { value: "Present", label: "Present" },
              { value: "Review", label: "Late / Irregular (Review)" },
              { value: "Approved", label: "Approved Leaves" },
              { value: "Deputation", label: "On Tour (OD)" },
              { value: "Suspended", label: "Disciplinary / Absent" },
            ]}
          />

          {/* Search Box With Matching Header Label */}
          <div className="w-full mb-0">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
              Filter Punch Logs
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search staff, code, or device..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
        </div>

        {/* Biometric Status Indicator Pill */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700">Biometric Sync Active:</span>
            <span>All 8 Municipal Biometric Terminals synchronized as of 5:45 PM today.</span>
          </div>
          <span className="font-mono text-slate-400">Sync Hash: #GMC-BIO-20260908</span>
        </div>
      </div>

      {/* ── 3. Table Log Output ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Daily Muster Punch Log • {filteredLogs.length} Records
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Biometric in-punches after 10:00 AM automatically flagged for review
          </span>
        </div>
        <Table columns={columns} data={filteredLogs} />
      </div>
    </div>
  );
}