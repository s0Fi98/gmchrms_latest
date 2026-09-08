import React, { useState } from "react";
import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  FileText,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  CheckCheck,
  Ban,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";

// Reusable UI Component Imports
import SelectField from "../../../components/common/select/SelectField";
import TextAreaField from "../../../components/common/textarea/TextArea";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function LeaveApproval() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReviewItem, setActiveReviewItem] = useState(null);
  const [rejectionRemark, setRejectionRemark] = useState("");

  // Leave approval requests dataset
  const [requests, setRequests] = useState([
    {
      id: "LV-2026-192",
      empCode: "GMC-0104",
      name: "Priya Sharma",
      department: "Engineering & Works",
      designation: "Executive Engineer",
      leaveType: "Earned Leave",
      duration: "20 Apr 2026 – 25 Apr 2026",
      days: 6,
      appliedOn: "12 Apr 2026",
      reason: "Daughter's higher education counseling in New Delhi",
      stationLeave: true,
      stationAddress: "Assam House, Chanakyapuri, New Delhi",
      reliever: "Deepak Kalita (Accountant)",
      emergencyContact: "+91 98540 00012",
      balanceLeft: 24,
      status: "Pending",
    },
    {
      id: "LV-2026-204",
      empCode: "GMC-0315",
      name: "Anupam Gogoi",
      department: "Public Works",
      designation: "Junior Engineer",
      leaveType: "Medical Leave",
      duration: "10 Sep 2026 – 15 Sep 2026",
      days: 6,
      appliedOn: "08 Sep 2026",
      reason: "Scheduled eye surgical procedure & prescribed convalescence",
      stationLeave: false,
      stationAddress: "—",
      reliever: "Bhaskar Barman (Section Officer)",
      emergencyContact: "+91 98540 00014",
      balanceLeft: 16,
      status: "Pending",
    },
    {
      id: "LV-2026-189",
      empCode: "GMC-0011",
      name: "Rajib Borah",
      department: "Administration",
      designation: "HR Manager",
      leaveType: "Casual Leave",
      duration: "14 Sep 2026",
      days: 1,
      appliedOn: "07 Sep 2026",
      reason: "Family personal matters",
      stationLeave: false,
      stationAddress: "—",
      reliever: "Mina Borah (Superintendent)",
      emergencyContact: "+91 98540 00011",
      balanceLeft: 8,
      status: "Approved",
    },
    {
      id: "LV-2026-160",
      empCode: "GMC-0412",
      name: "Bhaskar Barman",
      department: "Engineering & Works",
      designation: "Section Officer",
      leaveType: "Restricted Holiday",
      duration: "04 Sep 2026",
      days: 1,
      appliedOn: "01 Sep 2026",
      reason: "Tithi of Sri Madhabdev observation",
      stationLeave: false,
      stationAddress: "—",
      reliever: "Self Managed",
      emergencyContact: "+91 94010 00018",
      balanceLeft: 2,
      status: "Approved",
    },
  ]);

  // Handle Sanctions
  const handleDecision = (id, newStatus, remarks = "") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: newStatus,
              remarks: remarks || req.remarks,
            }
          : req
      )
    );
    setActiveReviewItem(null);
    setRejectionRemark("");
  };

  // Bulk Approvals for Pending entries
  const handleBatchApprove = () => {
    setRequests((prev) =>
      prev.map((req) =>
        req.status === "Pending" ? { ...req, status: "Approved" } : req
      )
    );
  };

  const columns = [
    {
      key: "id",
      label: "Req #",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800">{row.id}</span>
      ),
    },
    {
      key: "name",
      label: "Applicant Officer",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium">
            {row.empCode} • {row.department}
          </span>
        </div>
      ),
    },
    {
      key: "leaveType",
      label: "Leave Nature",
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          {row.leaveType}
        </span>
      ),
    },
    {
      key: "duration",
      label: "Leave Duration",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 text-xs">{row.duration}</p>
          <span className="text-[11px] font-mono text-indigo-600 font-semibold">
            {row.days} {row.days === 1 ? "day" : "days"} (Balance: {row.balanceLeft})
          </span>
        </div>
      ),
    },
    {
      key: "stationLeave",
      label: "Station Permission",
      render: (row) =>
        row.stationLeave ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Outstation Permitted
          </span>
        ) : (
          <span className="text-[11px] text-slate-400 font-medium">
            Headquarters Only
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
      label: "Administrative Action",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="secondary"
            icon={Eye}
            onClick={() => setActiveReviewItem(row)}
          >
            Review File
          </Button>

          {row.status === "Pending" && (
            <>
              <Button
                size="sm"
                variant="success"
                icon={CheckCircle2}
                onClick={() => handleDecision(row.id, "Approved")}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                icon={XCircle}
                onClick={() => setActiveReviewItem(row)}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "All" || req.department === selectedDept;
    const matchesStatus =
      selectedStatus === "All" || req.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Leave Approval & Sanction Registry
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Competent Authority Sanction Portal
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="md"
            variant="secondary"
            icon={CheckCheck}
            disabled={pendingCount === 0}
            onClick={handleBatchApprove}
          >
            Batch Approve ({pendingCount})
          </Button>
        </div>
      </div>

      {/* ── 1. Pipeline Summary Badges ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Pending Adjudication
            </span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {pendingCount}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Clock size={20} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sanctioned This Month
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {requests.filter((r) => r.status === "Approved").length}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Disallowed / Rejected
            </span>
            <p className="text-2xl font-extrabold text-rose-600 mt-1">
              {requests.filter((r) => r.status === "Rejected").length}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <Ban size={20} />
          </div>
        </div>
      </div>

      {/* ── 2. Filter Bar with Baseline Alignment ── */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <SelectField
            label="Department / Branch"
            id="dept"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Departments" },
              { value: "Engineering & Works", label: "Engineering & Works" },
              { value: "Administration", label: "Administration" },
              { value: "Public Works", label: "Public Works" },
              { value: "Finance & Accounts", label: "Finance & Accounts" },
            ]}
          />

          <SelectField
            label="Registry Status"
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="!mb-0"
            options={[
              { value: "All", label: "All Applications" },
              { value: "Pending", label: "Pending Review" },
              { value: "Approved", label: "Approved / Sanctioned" },
              { value: "Rejected", label: "Rejected" },
            ]}
          />

          <div className="w-full mb-0">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
              Search Applications
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search officer, code or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Requests Table ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Adjudication Register ({filteredRequests.length} applications matched)
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Statutory sanction is irreversible once committed to service book
          </span>
        </div>
        <Table columns={columns} data={filteredRequests} />
      </div>

      {/* ── 4. Dossier Review Modal Dialog ── */}
      {activeReviewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Leave Dossier Review • {activeReviewItem.id}
                </h3>
              </div>
              <button
                onClick={() => setActiveReviewItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-xs">
              {/* Applicant Summary */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {activeReviewItem.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {activeReviewItem.empCode} • {activeReviewItem.designation} (
                    {activeReviewItem.department})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Available Entitlement
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600 font-mono">
                    {activeReviewItem.balanceLeft} Days Remaining
                  </span>
                </div>
              </div>

              {/* Leave Specifics Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Leave Category
                  </span>
                  <p className="font-semibold text-slate-800">
                    {activeReviewItem.leaveType}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Duration & Quantum
                  </span>
                  <p className="font-semibold text-slate-800">
                    {activeReviewItem.duration} ({activeReviewItem.days} Days)
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Relieving Officer (Duty Handover)
                  </span>
                  <p className="font-semibold text-slate-800">
                    {activeReviewItem.reliever}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Emergency Contact
                  </span>
                  <p className="font-semibold text-slate-800">
                    {activeReviewItem.emergencyContact}
                  </p>
                </div>
              </div>

              {/* Grounds / Reason */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Grounds Stated by Officer
                </span>
                <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 italic">
                  "{activeReviewItem.reason}"
                </p>
              </div>

              {/* Outstation permission detail */}
              {activeReviewItem.stationLeave && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1">
                    <AlertTriangle size={12} /> Outstation Station Leave Address
                  </span>
                  <p className="text-slate-800 font-medium">
                    {activeReviewItem.stationAddress}
                  </p>
                </div>
              )}

              {/* Rejection Remarks Form */}
              {activeReviewItem.status === "Pending" && (
                <div className="pt-2">
                  <TextAreaField
                    label="Sanctioning Authority Endorsement / Rejection Remarks"
                    id="rejectNotes"
                    rows={2}
                    value={rejectionRemark}
                    onChange={(e) => setRejectionRemark(e.target.value)}
                    placeholder="Enter reason if rejecting, or official note for approval..."
                    className="!mb-0"
                  />
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveReviewItem(null)}
              >
                Close
              </Button>

              {activeReviewItem.status === "Pending" ? (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="danger"
                    icon={XCircle}
                    onClick={() =>
                      handleDecision(
                        activeReviewItem.id,
                        "Rejected",
                        rejectionRemark
                      )
                    }
                  >
                    Reject Application
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    icon={CheckCircle2}
                    onClick={() =>
                      handleDecision(
                        activeReviewItem.id,
                        "Approved",
                        rejectionRemark
                      )
                    }
                  >
                    Sanction Leave
                  </Button>
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  Record Status: <StatusBadge status={activeReviewItem.status} />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
