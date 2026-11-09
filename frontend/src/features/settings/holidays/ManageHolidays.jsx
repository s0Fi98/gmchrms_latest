import React, { useState } from "react";
import {
  CalendarDays,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  FileText,
  CalendarCheck2,
  CalendarOff,
  Download,
  Printer,
  Sparkles,
  MapPin,
  Clock,
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

export default function ManageHolidays() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "add" | "calendar"
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingHolidayId, setEditingHolidayId] = useState(null);

  // Form State for Add / Edit Holiday
  const initialFormState = {
    title: "",
    type: "Gazetted Holiday",
    startDate: "",
    endDate: "",
    totalDays: "1",
    dayOfWeek: "Thursday",
    applicableBranches: "All Zones & Branches",
    govtNotificationNo: "",
    description: "",
    isMandatoryClosure: true,
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Master Holidays Registry Dataset (Assam & GMC Calendar)
  const [holidays, setHolidays] = useState([
    {
      id: 1,
      title: "Magh Bihu & Tusu Puja",
      type: "Gazetted Holiday",
      startDate: "2026-01-14",
      endDate: "2026-01-16",
      totalDays: 3,
      dayOfWeek: "Wednesday – Friday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "State-wide festival holiday for harvest celebration across Assam.",
    },
    {
      id: 2,
      title: "Republic Day",
      type: "National Holiday",
      startDate: "2026-01-26",
      endDate: "2026-01-26",
      totalDays: 1,
      dayOfWeek: "Monday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "National festival of India. Mandatory full closure with ceremonial flag unfurling at GMC HQ.",
    },
    {
      id: 3,
      title: "Me-Dam-Me-Phi",
      type: "Gazetted Holiday",
      startDate: "2026-01-31",
      endDate: "2026-01-31",
      totalDays: 1,
      dayOfWeek: "Saturday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "Ancestor worship day observed by the Ahom community.",
    },
    {
      id: 4,
      title: "Maha Shivaratri",
      type: "Gazetted Holiday",
      startDate: "2026-02-15",
      endDate: "2026-02-15",
      totalDays: 1,
      dayOfWeek: "Sunday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "Observance of Shivaratri. Falls on non-working Sunday.",
    },
    {
      id: 5,
      title: "Rongali Bihu",
      type: "Gazetted Holiday",
      startDate: "2026-04-14",
      endDate: "2026-04-16",
      totalDays: 3,
      dayOfWeek: "Tuesday – Thursday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "Assamese New Year festival. All municipal operational counters closed except conservancy emergency teams.",
    },
    {
      id: 6,
      title: "Tithi of Sri Sri Madhabdev",
      type: "Restricted Holiday",
      startDate: "2026-09-04",
      endDate: "2026-09-04",
      totalDays: 1,
      dayOfWeek: "Friday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "Optional Restricted Holiday (RH) claimable by staff under quota.",
    },
    {
      id: 7,
      title: "Durga Puja & Bijoya Dashami",
      type: "Gazetted Holiday",
      startDate: "2026-10-18",
      endDate: "2026-10-22",
      totalDays: 5,
      dayOfWeek: "Sunday – Thursday",
      applicableBranches: "All Zones & Branches",
      govtNotificationNo: "GAG(A)81/2025/112",
      status: "Active",
      description: "Autumn festival holidays including Saptami, Ashtami, Navami and Dashami.",
    },
    {
      id: 8,
      title: "Ambubachi Mela (Kamakhya Local Holiday)",
      type: "Local / Municipal Holiday",
      startDate: "2026-06-25",
      endDate: "2026-06-25",
      totalDays: 1,
      dayOfWeek: "Thursday",
      applicableBranches: "Kamrup (Metro) / Guwahati Only",
      govtNotificationNo: "DCK/GMC/ORD/2026/41",
      status: "Active",
      description: "Executive local holiday declared for Kamrup Metropolitan district.",
    },
  ]);

  // Aggregate Metrics
  const totalHolidays = holidays.length;
  const totalOffDays = holidays.reduce((acc, h) => acc + h.totalDays, 0);
  const gazettedCount = holidays.filter((h) => h.type === "Gazetted Holiday" || h.type === "National Holiday").length;
  const restrictedCount = holidays.filter((h) => h.type === "Restricted Holiday").length;

  // Form Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (hol) => {
    setEditingHolidayId(hol.id);
    setFormData({
      title: hol.title,
      type: hol.type,
      startDate: hol.startDate,
      endDate: hol.endDate,
      totalDays: hol.totalDays.toString(),
      dayOfWeek: hol.dayOfWeek,
      applicableBranches: hol.applicableBranches,
      govtNotificationNo: hol.govtNotificationNo,
      description: hol.description,
      isMandatoryClosure: true,
      status: hol.status,
    });
    setActiveTab("add");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const daysCount = Number(formData.totalDays) || 1;

    if (editingHolidayId) {
      setHolidays((prev) =>
        prev.map((h) =>
          h.id === editingHolidayId
            ? {
                ...h,
                title: formData.title,
                type: formData.type,
                startDate: formData.startDate,
                endDate: formData.endDate || formData.startDate,
                totalDays: daysCount,
                dayOfWeek: formData.dayOfWeek || "Weekday",
                applicableBranches: formData.applicableBranches,
                govtNotificationNo: formData.govtNotificationNo,
                description: formData.description,
                status: formData.status,
              }
            : h
        )
      );
      setEditingHolidayId(null);
    } else {
      const newHoliday = {
        id: Date.now(),
        title: formData.title,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate || formData.startDate,
        totalDays: daysCount,
        dayOfWeek: formData.dayOfWeek || "Weekday",
        applicableBranches: formData.applicableBranches || "All Zones & Branches",
        govtNotificationNo: formData.govtNotificationNo || "GMC/NOTIF/2026",
        description: formData.description || "General official holiday",
        status: formData.status,
      };
      setHolidays([...holidays, newHoliday]);
    }

    setFormData(initialFormState);
    setActiveTab("all");
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the master calendar?`)) {
      setHolidays((prev) => prev.filter((h) => h.id !== id));
    }
  };

  // Table Columns Definition
  const columns = [
    {
      key: "date",
      label: "Date & Duration",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-mono font-bold text-slate-800 text-xs">
            {row.startDate} {row.endDate !== row.startDate ? `→ ${row.endDate}` : ""}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">
            {row.dayOfWeek} ({row.totalDays} {row.totalDays === 1 ? "day" : "days"})
          </span>
        </div>
      ),
    },
    {
      key: "title",
      label: "Occasion / Festival Name",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.title}</p>
          <span className="text-[11px] text-slate-400 font-medium line-clamp-1">
            {row.description}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Classification",
      sortable: true,
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
            row.type === "National Holiday"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : row.type === "Gazetted Holiday"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
              : row.type === "Restricted Holiday"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-sky-50 text-sky-700 border border-sky-200"
          }`}
        >
          {row.type}
        </span>
      ),
    },
    {
      key: "applicableBranches",
      label: "Jurisdiction Scope",
      render: (row) => (
        <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
          <MapPin size={12} className="text-slate-400 shrink-0" />
          {row.applicableBranches}
        </span>
      ),
    },
    {
      key: "govtNotificationNo",
      label: "Govt Order #",
      render: (row) => (
        <span className="font-mono text-[11px] font-semibold text-slate-500">
          {row.govtNotificationNo}
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
            icon={Edit3}
            title="Edit Holiday Entry"
            onClick={() => handleEditClick(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            title="Remove from Calendar"
            onClick={() => handleDelete(row.id, row.title)}
          />
        </div>
      ),
    },
  ];

  // Filtering Logic
  const filteredHolidays = holidays.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.govtNotificationNo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || h.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── Top Header & Tab Ribbon ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Official Holiday Calendar Master
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • Gazetted holidays, restricted options, and executive orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant={activeTab === "all" ? "primary" : "secondary"}
            icon={CalendarDays}
            onClick={() => {
              setActiveTab("all");
              setEditingHolidayId(null);
            }}
          >
            Holidays Registry
          </Button>

          <Button
            size="md"
            variant={activeTab === "add" ? "primary" : "secondary"}
            icon={editingHolidayId ? Edit3 : Plus}
            onClick={() => {
              if (activeTab !== "add") {
                setEditingHolidayId(null);
                setFormData(initialFormState);
              }
              setActiveTab("add");
            }}
          >
            {editingHolidayId ? "Edit Holiday" : "Declare Holiday"}
          </Button>
        </div>
      </div>

      {/* ── 1. KPI Badges Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Declared Holidays ({selectedYear})
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalHolidays}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">{totalOffDays} non-working days total</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <CalendarDays size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gazetted / General
            </span>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">
              {gazettedCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Mandatory administrative closure</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <CalendarCheck2 size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Restricted (RH) List
            </span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {restrictedCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Max 2 days claimable per staff</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Sparkles size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Biometric Exemption
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              Automated
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Daily muster auto-marks Holiday</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <CalendarOff size={22} />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 1: ALL HOLIDAYS DIRECTORY                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "all" && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <SelectField
                label="Calendar Year"
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "2026", label: "Calendar Year 2026" },
                  { value: "2025", label: "Calendar Year 2025" },
                  { value: "2027", label: "Calendar Year 2027" },
                ]}
              />

              <SelectField
                label="Classification Filter"
                id="typeFilter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Holiday Classifications" },
                  { value: "Gazetted Holiday", label: "Gazetted Holidays" },
                  { value: "National Holiday", label: "National Holidays" },
                  { value: "Restricted Holiday", label: "Restricted Holidays (RH)" },
                  { value: "Local / Municipal Holiday", label: "Local / Municipal Orders" },
                ]}
              />

              <div className="w-full mb-0">
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
                  Search Holidays
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by festival, order number, or date..."
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
                Scheduled Holidays ({filteredHolidays.length} Entries)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print Notification
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={Download}
                  onClick={() => alert("Downloading Holiday Calendar PDF...")}
                >
                  Export PDF
                </Button>
              </div>
            </div>
            <Table columns={columns} data={filteredHolidays} />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 2: DECLARE / EDIT HOLIDAY FORM                          */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "add" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <CalendarDays size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingHolidayId ? "Modify Gazetted Holiday Record" : "Declare Official Municipal Holiday"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Publishes directly to GMC portal, biometric attendance exemptions, and pay-day cycles
                </p>
              </div>
            </div>

            {editingHolidayId && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Editing Record #{editingHolidayId}
              </span>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 md:p-8 space-y-6">
            {/* 1. Occasion Identification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                1. Festival & Occasion Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Occasion / Holiday Title"
                  id="title"
                  placeholder="e.g. Rongali Bihu, Bohag Bihu"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="!mb-0"
                  required
                />
                <SelectField
                  label="Holiday Classification"
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Gazetted Holiday", label: "Gazetted Holiday (State General)" },
                    { value: "National Holiday", label: "National Holiday (Mandatory Flag Hoisting)" },
                    { value: "Restricted Holiday", label: "Restricted Holiday (RH - Optional Choice)" },
                    { value: "Local / Municipal Holiday", label: "Local / District Executive Order" },
                  ]}
                  required
                />
              </div>
            </div>

            {/* 2. Date Span & Total Days */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                2. Calendar Duration & Schedule
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Start Date"
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => {
                    handleInputChange("startDate", e.target.value);
                    if (!formData.endDate) handleInputChange("endDate", e.target.value);
                  }}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="End Date (Inclusive)"
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Duration in Days"
                  id="totalDays"
                  type="number"
                  placeholder="e.g. 1, 2, 3"
                  value={formData.totalDays}
                  onChange={(e) => handleInputChange("totalDays", e.target.value)}
                  className="!mb-0"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <InputField
                  label="Day(s) of Week"
                  id="dayOfWeek"
                  placeholder="e.g. Monday, Tuesday – Thursday"
                  value={formData.dayOfWeek}
                  onChange={(e) => handleInputChange("dayOfWeek", e.target.value)}
                  className="!mb-0"
                />
                <SelectField
                  label="Applicable Zone Jurisdiction"
                  id="applicableBranches"
                  value={formData.applicableBranches}
                  onChange={(e) => handleInputChange("applicableBranches", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "All Zones & Branches", label: "All Zones & Headquarters (Pan-GMC)" },
                    { value: "Central Zone (Panbazar)", label: "Central Zone (Panbazar) Only" },
                    { value: "Dispur Zone", label: "Dispur Zone Only" },
                    { value: "South Zone (Ulubari)", label: "South Zone (Ulubari) Only" },
                    { value: "Kamrup (Metro) / Guwahati Only", label: "Kamrup (Metro) District Jurisdiction" },
                  ]}
                />
              </div>
            </div>

            {/* 3. Statutory Govt Order / Notification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                3. Authority Notification & Orders
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Government Notification Reference #"
                  id="govtNotificationNo"
                  placeholder="e.g. GAG(A)81/2025/112 or GMC/EST/ORD/26"
                  value={formData.govtNotificationNo}
                  onChange={(e) => handleInputChange("govtNotificationNo", e.target.value)}
                  className="!mb-0"
                  required
                />
                <SelectField
                  label="Operational Status"
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="!mb-0"
                  options={[
                    { value: "Active", label: "Active Official Holiday" },
                    { value: "Inactive", label: "Cancelled / Revoked Order" },
                  ]}
                />
              </div>

              <div className="mt-4">
                <TextArea
                  label="Notification Remarks / Public Purpose"
                  id="description"
                  rows={2}
                  placeholder="State official declaration purpose or instructions for emergency civic duties..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="!mb-0"
                />
              </div>
            </div>

            {/* Emergency Conservancy Exemption Disclaimer */}
            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <Checkbox
                id="isMandatoryClosure"
                checked={formData.isMandatoryClosure}
                onChange={(e) => handleInputChange("isMandatoryClosure", e.target.checked)}
                label="Full Office & Revenue Counters Closure"
                description="General administrative operations suspended. Emergency solid waste conservancy and water supply teams remain on rotational duty."
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
                  setEditingHolidayId(null);
                  setActiveTab("all");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={CheckCircle2}>
                {editingHolidayId ? "Save Holiday Updates" : "Publish to Calendar"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}