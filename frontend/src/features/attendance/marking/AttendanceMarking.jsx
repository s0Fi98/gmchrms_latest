import React, { useState } from "react";
import {
  CalendarCheck2,
  Users,
  UserCheck,
  Building2,
  Clock,
  CheckCircle2,
  Search,
  Save,
  RotateCcw,
} from "lucide-react";

// Reusable UI Imports
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function AttendanceMarking() {
  const [mode, setMode] = useState("department"); // "department" | "individual"
  const [selectedDept, setSelectedDept] = useState("Engineering & Works");
  const [selectedDate, setSelectedDate] = useState("2026-09-08");
  const [searchQuery, setSearchQuery] = useState("");

  // Single Employee State
  const [singleRecord, setSingleRecord] = useState({
    empId: "",
    status: "Present",
    checkIn: "09:30",
    checkOut: "17:30",
    remarks: "",
  });

  // Department Muster Roll State
  const [musterRoll, setMusterRoll] = useState([
    {
      id: 1,
      empCode: "GMC-0104",
      name: "Priya Sharma",
      designation: "Executive Engineer",
      status: "Present",
      checkIn: "09:20",
      checkOut: "17:30",
      remarks: "",
    },
    {
      id: 2,
      empCode: "GMC-0315",
      name: "Anupam Gogoi",
      designation: "Junior Engineer",
      status: "Present",
      checkIn: "09:40",
      checkOut: "17:30",
      remarks: "",
    },
    {
      id: 3,
      empCode: "GMC-0412",
      name: "Bhaskar Barman",
      designation: "Section Officer",
      status: "On Leave",
      checkIn: "—",
      checkOut: "—",
      remarks: "Casual Leave Approved",
    },
    {
      id: 4,
      empCode: "GMC-0520",
      name: "Rantu Deka",
      designation: "Site Supervisor",
      status: "Absent",
      checkIn: "—",
      checkOut: "—",
      remarks: "Uninformed",
    },
  ]);

  // Bulk Actions
  const handleBulkStatusChange = (status) => {
    setMusterRoll((prev) =>
      prev.map((emp) => ({
        ...emp,
        status,
        checkIn: status === "Present" ? "09:30" : "—",
        checkOut: status === "Present" ? "17:30" : "—",
      }))
    );
  };

  const handleRowStatusChange = (id, newStatus) => {
    setMusterRoll((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: newStatus,
              checkIn: newStatus === "Present" || newStatus === "Half Day" ? "09:30" : "—",
              checkOut: newStatus === "Present" || newStatus === "Half Day" ? "17:30" : "—",
            }
          : emp
      )
    );
  };

  const handleRowRemarkChange = (id, remarks) => {
    setMusterRoll((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, remarks } : emp))
    );
  };

  // Department Table Columns
  const columns = [
    {
      key: "empCode",
      label: "Emp Code",
      render: (row) => (
        <span className="font-mono font-bold text-slate-800">{row.empCode}</span>
      ),
    },
    {
      key: "name",
      label: "Employee & Designation",
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium">{row.designation}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Daily Status",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {["Present", "Absent", "On Leave", "Half Day"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => handleRowStatusChange(row.id, st)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                row.status === st
                  ? st === "Present"
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                    : st === "Absent"
                    ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                    : st === "On Leave"
                    ? "bg-amber-600 text-white shadow-sm shadow-amber-200"
                    : "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "timings",
      label: "In / Out Time",
      render: (row) => (
        <span className="text-[11px] font-mono text-slate-600">
          {row.checkIn} - {row.checkOut}
        </span>
      ),
    },
    {
      key: "remarks",
      label: "Remarks / Duty Post",
      render: (row) => (
        <input
          type="text"
          value={row.remarks}
          placeholder="Add remark..."
          onChange={(e) => handleRowRemarkChange(row.id, e.target.value)}
          className="w-full h-8 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 text-slate-700"
        />
      ),
    },
  ];

  const filteredMuster = musterRoll.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title & Operational Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Daily Muster Roll & Biometric Entry
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Log, verify, and override municipal personnel attendance records
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setMode("department")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === "department"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Building2 size={14} />
            <span>Department Muster</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("individual")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === "individual"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <UserCheck size={14} />
            <span>Single Officer</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* MODE 1: DEPARTMENTAL MUSTER ROLL                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      {mode === "department" && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField
                label="Select Department / Wing"
                id="dept"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                options={[
                  { value: "Engineering & Works", label: "Engineering & Works" },
                  { value: "Public Health & Conservancy", label: "Public Health & Conservancy" },
                  { value: "General Administration", label: "General Administration" },
                  { value: "Finance & Accounts", label: "Finance & Accounts" },
                  { value: "Revenue & Assessment", label: "Revenue & Assessment" },
                ]}
              />
              <InputField
                label="Attendance Date"
                id="attDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="flex flex-col justify-end">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search muster roll..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Quick Bulk Marking Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Quick Batch:
                </span>
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() => handleBulkStatusChange("Present")}
                >
                  Mark All Present
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleBulkStatusChange("Absent")}
                >
                  Clear to Absent
                </Button>
              </div>

              <Button
                size="md"
                variant="primary"
                icon={Save}
                onClick={() => alert("Muster roll saved successfully.")}
              >
                Commit Muster Roll
              </Button>
            </div>
          </div>

          {/* Muster Table */}
          <Table columns={columns} data={filteredMuster} />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* MODE 2: SINGLE EMPLOYEE OVERRIDE / ENTRY                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      {mode === "individual" && (
        <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Individual Attendance & Movement Slip
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Record manual attendance, site visit on-duty slip, or biometric dispute resolution.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Attendance saved for ${singleRecord.empId}`);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Employee Code"
                id="empId"
                placeholder="e.g. GMC-0104"
                value={singleRecord.empId}
                onChange={(e) =>
                  setSingleRecord({ ...singleRecord, empId: e.target.value })
                }
                required
              />
              <InputField
                label="Date of Record"
                id="singleDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            <SelectField
              label="Attendance Status"
              id="singleStatus"
              value={singleRecord.status}
              onChange={(e) =>
                setSingleRecord({ ...singleRecord, status: e.target.value })
              }
              options={[
                { value: "Present", label: "Present (In Office)" },
                { value: "On Tour", label: "On Tour / Field Inspection" },
                { value: "Half Day", label: "Half Day" },
                { value: "Casual Leave", label: "Casual Leave" },
                { value: "Absent", label: "Absent" },
              ]}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="In Time"
                id="checkIn"
                type="time"
                value={singleRecord.checkIn}
                onChange={(e) =>
                  setSingleRecord({ ...singleRecord, checkIn: e.target.value })
                }
              />
              <InputField
                label="Out Time"
                id="checkOut"
                type="time"
                value={singleRecord.checkOut}
                onChange={(e) =>
                  setSingleRecord({ ...singleRecord, checkOut: e.target.value })
                }
              />
            </div>

            <InputField
              label="Official Movement / Remarks"
              id="remarks"
              placeholder="e.g. Authorized by Executive Engineer for Ward 4 drain inspection"
              value={singleRecord.remarks}
              onChange={(e) =>
                setSingleRecord({ ...singleRecord, remarks: e.target.value })
              }
            />

            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setSingleRecord({
                    empId: "",
                    status: "Present",
                    checkIn: "09:30",
                    checkOut: "17:30",
                    remarks: "",
                  })
                }
              >
                Reset
              </Button>
              <Button type="submit" variant="primary" icon={CheckCircle2}>
                Save Officer Record
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}