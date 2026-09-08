import React, { useState } from "react";
import {
  CalendarOff,
  Clock,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  History,
  PlaneTakeoff,
  Send,
  RotateCcw,
  FileText,
} from "lucide-react";

// Reusable UI Component Imports
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import TextAreaField from "../../../components/common/textarea/TextArea";
import RadioButton from "../../../components/common/radio/RadioButton";
import Checkbox from "../../../components/common/checkbox/Checkbox";
import Button from "../../../components/common/button/Button";
import Table, { StatusBadge } from "../../../components/common/table/Table";

export default function ApplyLeave() {
  const [formData, setFormData] = useState({
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    isHalfDay: false,
    halfDaySession: "First Half (FN)",
    reason: "",
    requiresStationLeave: false,
    stationAddress: "",
    emergencyContact: "",
    chargeHandoverTo: "",
    termsAgreed: false,
  });

  // Current Leave Ledger Balance
  const leaveBalance = [
    { type: "Casual Leave (CL)", available: 8, total: 12, color: "text-indigo-600", bg: "bg-indigo-50" },
    { type: "Earned Leave (EL)", available: 24, total: 30, color: "text-sky-600", bg: "bg-sky-50" },
    { type: "Medical / Half Pay (HPL)", available: 16, total: 20, color: "text-emerald-600", bg: "bg-emerald-50" },
    { type: "Restricted Holiday (RH)", available: 2, total: 2, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  // Recent Leave Applications
  const [recentApplications, setRecentApplications] = useState([
    {
      id: "LV-2026-081",
      leaveType: "Casual Leave",
      duration: "10 Jan 2026 – 12 Jan 2026",
      days: 3,
      appliedOn: "05 Jan 2026",
      approver: "Executive Engineer",
      status: "Approved",
    },
    {
      id: "LV-2026-114",
      leaveType: "Medical Leave",
      duration: "05 Mar 2026 – 07 Mar 2026",
      days: 3,
      appliedOn: "04 Mar 2026",
      approver: "Chief Medical Officer",
      status: "Approved",
    },
    {
      id: "LV-2026-192",
      leaveType: "Earned Leave",
      duration: "20 Apr 2026 – 25 Apr 2026",
      days: 6,
      appliedOn: "12 Apr 2026",
      approver: "Deputy Commissioner",
      status: "Pending",
    },
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateDays = () => {
    if (formData.isHalfDay) return 0.5;
    if (!formData.fromDate || !formData.toDate) return 0;
    const start = new Date(formData.fromDate);
    const end = new Date(formData.toDate);
    const diffTime = end - start;
    if (diffTime < 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const requestedDays = calculateDays();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requestedDays <= 0) {
      alert("Please enter a valid date range.");
      return;
    }

    const newApp = {
      id: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
      leaveType: formData.leaveType,
      duration: `${formData.fromDate} – ${formData.toDate || formData.fromDate}`,
      days: requestedDays,
      appliedOn: "08 Sep 2026",
      approver: "Deputy Commissioner",
      status: "Pending",
    };

    setRecentApplications([newApp, ...recentApplications]);
    alert("Leave application submitted successfully for supervisory sanction.");
    setFormData({
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      isHalfDay: false,
      halfDaySession: "First Half (FN)",
      reason: "",
      requiresStationLeave: false,
      stationAddress: "",
      emergencyContact: "",
      chargeHandoverTo: "",
      termsAgreed: false,
    });
  };

  const columns = [
    {
      key: "id",
      label: "Application No.",
      render: (row) => (
        <span className="font-mono font-bold text-slate-800">{row.id}</span>
      ),
    },
    {
      key: "leaveType",
      label: "Leave Category",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-900">{row.leaveType}</span>
      ),
    },
    {
      key: "duration",
      label: "Leave Span",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-700">{row.duration}</p>
          <span className="text-[11px] text-slate-400 font-medium font-mono">
            {row.days} {row.days === 1 ? "day" : "days"} requested
          </span>
        </div>
      ),
    },
    {
      key: "appliedOn",
      label: "Submission Date",
      sortable: true,
      render: (row) => <span className="text-slate-600">{row.appliedOn}</span>,
    },
    {
      key: "approver",
      label: "Sanctioning Authority",
      render: (row) => (
        <span className="text-indigo-600 font-semibold">{row.approver}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Apply for Leave & Station Permission
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Cadre Leave Rules & Absence Requisition
          </p>
        </div>
      </div>

      {/* ── 1. Live Leave Entitlement Strips ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveBalance.map((item) => (
          <div
            key={item.type}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {item.type}
            </span>
            <div className="my-2 flex items-baseline gap-2">
              <span className={`text-2xl font-extrabold ${item.color}`}>
                {item.available}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                / {item.total} total days
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.bg.replace("bg-", "bg-").replace("-50", "-600")}`}
                style={{ width: `${(item.available / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. Main Leave Application Form ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <CalendarOff size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Statutory Leave Request Form
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Under Assam Fundamental Rules & GMC Service Leave Regulations
              </p>
            </div>
          </div>

          {requestedDays > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Total Duration: {requestedDays} {requestedDays === 1 ? "Day" : "Days"}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Category & Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SelectField
              label="Leave Classification"
              id="leaveType"
              value={formData.leaveType}
              onChange={(e) => handleChange("leaveType", e.target.value)}
              className="!mb-0"
              options={[
                { value: "Casual Leave", label: "Casual Leave (CL)" },
                { value: "Earned Leave", label: "Earned Leave (EL)" },
                { value: "Medical Leave", label: "Half Pay / Medical Leave (HPL)" },
                { value: "Restricted Holiday", label: "Restricted Holiday (RH)" },
                { value: "Maternity / Paternity", label: "Maternity / Paternity Leave" },
                { value: "Special Disability", label: "Special Disability Leave" },
              ]}
              required
            />

            <InputField
              label="Leave Commencing Date"
              id="fromDate"
              type="date"
              value={formData.fromDate}
              onChange={(e) => handleChange("fromDate", e.target.value)}
              className="!mb-0"
              required
            />

            <InputField
              label="Concluding Date"
              id="toDate"
              type="date"
              value={formData.toDate}
              onChange={(e) => handleChange("toDate", e.target.value)}
              disabled={formData.isHalfDay}
              className="!mb-0"
              required={!formData.isHalfDay}
            />
          </div>

          {/* Half Day & Handover Row */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Checkbox
                id="isHalfDay"
                checked={formData.isHalfDay}
                onChange={(e) => {
                  handleChange("isHalfDay", e.target.checked);
                  if (e.target.checked) handleChange("toDate", formData.fromDate);
                }}
                label="Half Day Leave Requisition"
                description="Applicable exclusively for Casual Leave shifts"
                className="!mb-0"
              />

              {formData.isHalfDay && (
                <div className="w-full sm:w-64">
                  <SelectField
                    label="Select Session"
                    id="session"
                    value={formData.halfDaySession}
                    onChange={(e) => handleChange("halfDaySession", e.target.value)}
                    className="!mb-0"
                    options={[
                      { value: "First Half (FN)", label: "First Half (Forenoon)" },
                      { value: "Second Half (AN)", label: "Second Half (Afternoon)" },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Justification & Officer Handover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextAreaField
              label="Ground / Reason for Leave"
              id="reason"
              rows={3}
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="State explicit personal, medical, or family grounds..."
              className="!mb-0"
              required
            />

            <div className="space-y-3.5">
              <InputField
                label="Officer Handed Over Charge (Reliever)"
                id="chargeHandoverTo"
                value={formData.chargeHandoverTo}
                onChange={(e) => handleChange("chargeHandoverTo", e.target.value)}
                placeholder="Name & designation of colleague managing duties"
                className="!mb-0"
                required
              />

              <InputField
                label="Emergency Contact While on Leave"
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleChange("emergencyContact", e.target.value)}
                placeholder="+91 98540 XXXXX"
                className="!mb-0"
                required
              />
            </div>
          </div>

          {/* Station Leave Permission Option (Government HRMS Requirement) */}
          <div className="p-4 border border-slate-200 rounded-xl space-y-3">
            <Checkbox
              id="requiresStationLeave"
              checked={formData.requiresStationLeave}
              onChange={(e) => handleChange("requiresStationLeave", e.target.checked)}
              label="Station Leave Permission Required"
              description="Check this box if leaving Guwahati municipal jurisdiction during the leave period"
              className="!mb-0"
            />

            {formData.requiresStationLeave && (
              <div className="pt-2 animate-in fade-in duration-200">
                <InputField
                  label="Temporary Station / Out-of-Town Address"
                  id="stationAddress"
                  value={formData.stationAddress}
                  onChange={(e) => handleChange("stationAddress", e.target.value)}
                  placeholder="Complete postal address where you can be contacted if recalled"
                  className="!mb-0"
                  required={formData.requiresStationLeave}
                />
              </div>
            )}
          </div>

          {/* Supporting Enclosure Upload Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Paperclip size={16} className="text-slate-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-slate-800">
                  Supporting Medical / Sanction Certificate
                </p>
                <p className="text-[11px] text-slate-400">
                  Mandatory for Medical Leave exceeding 2 days. Formats accepted: PDF, JPG (Max 5MB).
                </p>
              </div>
            </div>
            <label className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer shadow-sm">
              <span>Choose File</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Statutory Undertaking Checkbox */}
          <Checkbox
            id="termsAgreed"
            checked={formData.termsAgreed}
            onChange={(e) => handleChange("termsAgreed", e.target.checked)}
            label="Statutory Declaration"
            description="I declare that the details provided are true and that I will report back to duty immediately upon expiration of the leave, unless an extension is duly sanctioned."
            className="!mb-0"
            required
          />

          {/* Submission Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              icon={RotateCcw}
              onClick={() =>
                setFormData({
                  leaveType: "Casual Leave",
                  fromDate: "",
                  toDate: "",
                  isHalfDay: false,
                  halfDaySession: "First Half (FN)",
                  reason: "",
                  requiresStationLeave: false,
                  stationAddress: "",
                  emergencyContact: "",
                  chargeHandoverTo: "",
                  termsAgreed: false,
                })
              }
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={Send}
              disabled={!formData.termsAgreed}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>

      {/* ── 3. Application History Ledger ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            My Recent Leave Requisitions (FY 2026–27)
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Updates in real-time as reporting authority sanctions requests
          </span>
        </div>
        <Table columns={columns} data={recentApplications} />
      </div>
    </div>
  );
}
