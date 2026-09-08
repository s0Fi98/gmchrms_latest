import React, { useState } from "react";
import {
  CalendarDays,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  Printer,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  CalendarOff,
} from "lucide-react";

// Reusable UI Component Imports
import SelectField from "../../../components/common/select/SelectField";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function AttendanceStatement() {
  const [selectedMonth, setSelectedMonth] = useState("08"); // August
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Executive Monthly Aggregation
  const summaryMetrics = [
    {
      title: "Total Working Days",
      value: "22",
      subText: "Excluding gazetted holidays & Sundays",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Overall Cadre Present %",
      value: "91.8%",
      subText: "+1.2% higher than previous month",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Approved Leaves",
      value: "148",
      subText: "CL, EL & Medical verified",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Unexplained Absences",
      value: "19",
      subText: "Pending show-cause / pay-cut notices",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  // Mock Employee Statement Data
  const statementRecords = [
    {
      id: 1,
      empCode: "GMC-0011",
      name: "Rajib Borah",
      department: "Administration",
      designation: "HR Manager",
      totalDays: 22,
      presentDays: 21,
      leaveDays: 1,
      absentDays: 0,
      halfDays: 0,
      payableDays: 22,
      complianceRate: "95.5%",
      status: "Approved",
    },
    {
      id: 2,
      empCode: "GMC-0104",
      name: "Priya Sharma",
      department: "Engineering & Works",
      designation: "Executive Engineer",
      totalDays: 22,
      presentDays: 20,
      leaveDays: 2,
      absentDays: 0,
      halfDays: 0,
      payableDays: 22,
      complianceRate: "90.9%",
      status: "Approved",
    },
    {
      id: 3,
      empCode: "GMC-0210",
      name: "Deepak Kalita",
      department: "Finance & Accounts",
      designation: "Accountant",
      totalDays: 22,
      presentDays: 19,
      leaveDays: 1,
      absentDays: 1,
      halfDays: 2,
      payableDays: 20,
      complianceRate: "86.3%",
      status: "Review",
    },
    {
      id: 4,
      empCode: "GMC-0315",
      name: "Anupam Gogoi",
      department: "Public Works",
      designation: "Junior Engineer",
      totalDays: 22,
      presentDays: 16,
      leaveDays: 0,
      absentDays: 6,
      halfDays: 0,
      payableDays: 16,
      complianceRate: "72.7%",
      status: "Review",
    },
    {
      id: 5,
      empCode: "GMC-0412",
      name: "Bhaskar Barman",
      department: "Engineering & Works",
      designation: "Section Officer",
      totalDays: 22,
      presentDays: 22,
      leaveDays: 0,
      absentDays: 0,
      halfDays: 0,
      payableDays: 22,
      complianceRate: "100%",
      status: "Approved",
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
      key: "presentDays",
      label: "Present",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-emerald-600 font-mono">
          {row.presentDays}
        </span>
      ),
    },
    {
      key: "leaveDays",
      label: "Leave",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-amber-600 font-mono">
          {row.leaveDays}
        </span>
      ),
    },
    {
      key: "absentDays",
      label: "Absent",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-rose-600 font-mono">
          {row.absentDays}
        </span>
      ),
    },
    {
      key: "payableDays",
      label: "Payable Days",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
          {row.payableDays} / {row.totalDays}
        </span>
      ),
    },
    {
      key: "complianceRate",
      label: "Attendance Rate",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">
            {row.complianceRate}
          </span>
          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                parseFloat(row.complianceRate) >= 90
                  ? "bg-emerald-500"
                  : parseFloat(row.complianceRate) >= 75
                  ? "bg-amber-500"
                  : "bg-rose-500"
              }`}
              style={{ width: row.complianceRate }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Audit Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Statement",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={() => alert(`Opening full breakdown for ${row.name}`)}
          className="text-indigo-600 hover:text-indigo-700 font-semibold text-[11px] hover:underline"
        >
          View Ledger
        </button>
      ),
    },
  ];

  const filteredData = statementRecords.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "All" || rec.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Header & Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Monthly Attendance Statement & Pay-Audit
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Monthly reconciliation for payroll disbursement
          </p>
        </div>

        <div className="flex items-center gap-2.5">
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
            onClick={() => alert("Exporting monthly statement to spreadsheet format.")}
          >
            Export Sheet
          </Button>
        </div>
      </div>

      {/* ── 1. Executive Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((item) => (
          <div
            key={item.title}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {item.title}
            </span>
            <div className="my-2 flex items-baseline gap-2">
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
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <SelectField
            label="Statement Month"
            id="monthSelect"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="!mb-0"
            options={[
              { value: "01", label: "January" },
              { value: "02", label: "February" },
              { value: "03", label: "March" },
              { value: "04", label: "April" },
              { value: "05", label: "May" },
              { value: "06", label: "June" },
              { value: "07", label: "July" },
              { value: "08", label: "August" },
              { value: "09", label: "September" },
              { value: "10", label: "October" },
              { value: "11", label: "November" },
              { value: "12", label: "December" },
            ]}
          />

          <SelectField
            label="Calendar Year"
            id="yearSelect"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="!mb-0"
            options={[
              { value: "2026", label: "2026" },
              { value: "2025", label: "2025" },
            ]}
          />

          <SelectField
            label="Department / Wing"
            id="deptFilter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Departments" },
              { value: "Administration", label: "Administration" },
              { value: "Engineering & Works", label: "Engineering & Works" },
              { value: "Finance & Accounts", label: "Finance & Accounts" },
              { value: "Public Works", label: "Public Works" },
            ]}
          />

          {/* Search input with matching header label to preserve baseline alignment */}
          <div className="w-full mb-0">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
              Filter Statement
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search officer or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Statement Register Table ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Showing Statement for August 2026 • ({filteredData.length} Officers)
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Payable days feed directly into the Payroll Processing module
          </span>
        </div>
        <Table columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
