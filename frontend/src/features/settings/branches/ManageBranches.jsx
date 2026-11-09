import React, { useState } from "react";
import {
  MapPin,
  Building2,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Users,
  Compass,
  Layers,
  Phone,
  Mail,
  Navigation,
  Globe,
  Printer,
  Download,
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

export default function ManageBranches() {
  const [activeTab, setActiveTab] = useState("zones"); // "zones" | "branches" | "addZone" | "addBranch"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZoneFilter, setSelectedZoneFilter] = useState("All");
  const [editingZoneId, setEditingZoneId] = useState(null);
  const [editingBranchId, setEditingBranchId] = useState(null);

  // 1. Zonal Master Dataset (GMC Zonal Jurisdictions)
  const [zones, setZones] = useState([
    {
      id: 1,
      zoneCode: "ZN-CEN-01",
      name: "Central Zone (Panbazar)",
      headquarter: "GMC Main Building, Panbazar",
      zeoName: "Pranab Bordoloi",
      zeoDesignation: "Zonal Executive Officer & Joint Commissioner",
      contactPhone: "+91 361 2540521",
      contactEmail: "centralzone@gmc.gov.in",
      wardCoverage: "Wards 14, 15, 16, 28, 29, 30",
      totalWards: 6,
      attachedBranchesCount: 5,
      staffDeployed: 210,
      status: "Active",
    },
    {
      id: 2,
      zoneCode: "ZN-DSP-02",
      name: "Dispur Zone",
      headquarter: "GMC Complex, Ganeshguri / Dispur",
      zeoName: "Dr. B. K. Sarma",
      zeoDesignation: "Zonal Executive Officer (Health)",
      contactPhone: "+91 361 2260114",
      contactEmail: "dispurzone@gmc.gov.in",
      wardCoverage: "Wards 31 to 42",
      totalWards: 12,
      attachedBranchesCount: 8,
      staffDeployed: 480,
      status: "Active",
    },
    {
      id: 3,
      zoneCode: "ZN-SOU-03",
      name: "South Zone (Ulubari)",
      headquarter: "Ulubari Municipal Complex, B.K. Kakati Road",
      zeoName: "J. K. Mahanta",
      zeoDesignation: "Zonal Executive Officer & Tax Collector",
      contactPhone: "+91 361 2521190",
      contactEmail: "southzone@gmc.gov.in",
      wardCoverage: "Wards 17 to 27",
      totalWards: 11,
      attachedBranchesCount: 6,
      staffDeployed: 260,
      status: "Active",
    },
    {
      id: 4,
      zoneCode: "ZN-EST-04",
      name: "East Zone (Noonmati)",
      headquarter: "Noonmati Municipal Sector Office",
      zeoName: "M. N. Goswami",
      zeoDesignation: "Assistant Commissioner & ZEO",
      contactPhone: "+91 361 2550182",
      contactEmail: "eastzone@gmc.gov.in",
      wardCoverage: "Wards 43 to 52",
      totalWards: 10,
      attachedBranchesCount: 4,
      staffDeployed: 195,
      status: "Active",
    },
    {
      id: 5,
      zoneCode: "ZN-WST-05",
      name: "West Zone (Bharalumukh)",
      headquarter: "Bharalumukh Riverside Municipal Building",
      zeoName: "D. K. Hazarika",
      zeoDesignation: "Assistant Commissioner & ZEO",
      contactPhone: "+91 361 2548819",
      contactEmail: "westzone@gmc.gov.in",
      wardCoverage: "Wards 1 to 13",
      totalWards: 13,
      attachedBranchesCount: 7,
      staffDeployed: 240,
      status: "Active",
    },
    {
      id: 6,
      zoneCode: "ZN-LOK-06",
      name: "Lokhra / South-West Zone",
      headquarter: "Lokhra Chariali Municipal Center",
      zeoName: "R. C. Barua",
      zeoDesignation: "Executive Officer",
      contactPhone: "+91 361 2470120",
      contactEmail: "lokhrazone@gmc.gov.in",
      wardCoverage: "Wards 53 to 60",
      totalWards: 8,
      attachedBranchesCount: 3,
      staffDeployed: 160,
      status: "Active",
    },
  ]);

  // 2. Branch Offices / Civic Centers Dataset
  const [branches, setBranches] = useState([
    {
      id: 101,
      branchCode: "BR-PAN-01",
      branchName: "Janxala Central Civic Centre",
      parentZone: "Central Zone (Panbazar)",
      facilityType: "Zonal Headquarter & Cash Counter",
      manager: "Rajib Borah",
      address: "Janxala, Panbazar, Guwahati — 781001",
      contactPhone: "+91 361 2540521",
      staffCount: 42,
      hasBiometricTerminal: true,
      status: "Active",
    },
    {
      id: 102,
      branchCode: "BR-ULB-02",
      branchName: "Ulubari Citizen Seva Kendra",
      parentZone: "South Zone (Ulubari)",
      facilityType: "Citizen Facilitation Counter",
      manager: "Kabita Nath",
      address: "Ward 29 Office, Ulubari, Guwahati — 781007",
      contactPhone: "+91 361 2521191",
      staffCount: 18,
      hasBiometricTerminal: true,
      status: "Active",
    },
    {
      id: 103,
      branchCode: "BR-CHB-03",
      branchName: "Christian Basti Ward 42 Seva Branch",
      parentZone: "Dispur Zone",
      facilityType: "Ward Revenue Counter",
      manager: "Bipul Das",
      address: "Christian Basti, G.S. Road, Guwahati — 781005",
      contactPhone: "+91 361 2268841",
      staffCount: 14,
      hasBiometricTerminal: true,
      status: "Active",
    },
    {
      id: 104,
      branchCode: "BR-DSP-04",
      branchName: "Ganeshguri Solid Waste Depot",
      parentZone: "Dispur Zone",
      facilityType: "Conservancy & Conservancy Garage",
      manager: "Ritu Devi",
      address: "Ganeshguri Flyover Base Complex — 781006",
      contactPhone: "+91 361 2269910",
      staffCount: 88,
      hasBiometricTerminal: true,
      status: "Active",
    },
  ]);

  // Form State for Add / Edit Zone
  const initialZoneForm = {
    zoneCode: "",
    name: "",
    headquarter: "",
    zeoName: "",
    zeoDesignation: "Zonal Executive Officer",
    contactPhone: "",
    contactEmail: "",
    wardCoverage: "",
    totalWards: "",
    status: "Active",
  };
  const [zoneFormData, setZoneFormData] = useState(initialZoneForm);

  // Form State for Add / Edit Branch
  const initialBranchForm = {
    branchCode: "",
    branchName: "",
    parentZone: "Central Zone (Panbazar)",
    facilityType: "Citizen Facilitation Counter",
    manager: "",
    address: "",
    contactPhone: "",
    staffCount: "",
    hasBiometricTerminal: true,
    status: "Active",
  };
  const [branchFormData, setBranchFormData] = useState(initialBranchForm);

  // KPI Metrics
  const totalZoneCount = zones.length;
  const totalBranchCount = branches.length;
  const totalCoveredWards = zones.reduce((acc, z) => acc + z.totalWards, 0);
  const totalDeployedPersonnel = zones.reduce((acc, z) => acc + z.staffDeployed, 0);

  // Zone Handlers
  const handleEditZone = (zone) => {
    setEditingZoneId(zone.id);
    setZoneFormData({
      zoneCode: zone.zoneCode,
      name: zone.name,
      headquarter: zone.headquarter,
      zeoName: zone.zeoName,
      zeoDesignation: zone.zeoDesignation,
      contactPhone: zone.contactPhone,
      contactEmail: zone.contactEmail,
      wardCoverage: zone.wardCoverage,
      totalWards: zone.totalWards.toString(),
      status: zone.status,
    });
    setActiveTab("addZone");
  };

  const handleZoneFormSubmit = (e) => {
    e.preventDefault();
    const wardNum = Number(zoneFormData.totalWards) || 0;

    if (editingZoneId) {
      setZones((prev) =>
        prev.map((z) =>
          z.id === editingZoneId
            ? {
                ...z,
                zoneCode: zoneFormData.zoneCode,
                name: zoneFormData.name,
                headquarter: zoneFormData.headquarter,
                zeoName: zoneFormData.zeoName,
                zeoDesignation: zoneFormData.zeoDesignation,
                contactPhone: zoneFormData.contactPhone,
                contactEmail: zoneFormData.contactEmail,
                wardCoverage: zoneFormData.wardCoverage,
                totalWards: wardNum,
                status: zoneFormData.status,
              }
            : z
        )
      );
      setEditingZoneId(null);
    } else {
      const newZone = {
        id: Date.now(),
        zoneCode: zoneFormData.zoneCode || `ZN-${zones.length + 1}`,
        name: zoneFormData.name,
        headquarter: zoneFormData.headquarter,
        zeoName: zoneFormData.zeoName || "In-Charge ZEO",
        zeoDesignation: zoneFormData.zeoDesignation || "ZEO",
        contactPhone: zoneFormData.contactPhone || "—",
        contactEmail: zoneFormData.contactEmail || "zone@gmc.gov.in",
        wardCoverage: zoneFormData.wardCoverage || "Specific Wards",
        totalWards: wardNum,
        attachedBranchesCount: 1,
        staffDeployed: 20,
        status: zoneFormData.status,
      };
      setZones([...zones, newZone]);
    }
    setZoneFormData(initialZoneForm);
    setActiveTab("zones");
  };

  // Branch Handlers
  const handleEditBranch = (br) => {
    setEditingBranchId(br.id);
    setBranchFormData({
      branchCode: br.branchCode,
      branchName: br.branchName,
      parentZone: br.parentZone,
      facilityType: br.facilityType,
      manager: br.manager,
      address: br.address,
      contactPhone: br.contactPhone,
      staffCount: br.staffCount.toString(),
      hasBiometricTerminal: br.hasBiometricTerminal,
      status: br.status,
    });
    setActiveTab("addBranch");
  };

  const handleBranchFormSubmit = (e) => {
    e.preventDefault();
    const staff = Number(branchFormData.staffCount) || 0;

    if (editingBranchId) {
      setBranches((prev) =>
        prev.map((b) =>
          b.id === editingBranchId
            ? {
                ...b,
                branchCode: branchFormData.branchCode,
                branchName: branchFormData.branchName,
                parentZone: branchFormData.parentZone,
                facilityType: branchFormData.facilityType,
                manager: branchFormData.manager,
                address: branchFormData.address,
                contactPhone: branchFormData.contactPhone,
                staffCount: staff,
                hasBiometricTerminal: branchFormData.hasBiometricTerminal,
                status: branchFormData.status,
              }
            : b
        )
      );
      setEditingBranchId(null);
    } else {
      const newBranch = {
        id: Date.now(),
        branchCode: branchFormData.branchCode || `BR-${branches.length + 10}`,
        branchName: branchFormData.branchName,
        parentZone: branchFormData.parentZone,
        facilityType: branchFormData.facilityType,
        manager: branchFormData.manager || "Branch Supervisor",
        address: branchFormData.address || "Guwahati",
        contactPhone: branchFormData.contactPhone || "—",
        staffCount: staff,
        hasBiometricTerminal: branchFormData.hasBiometricTerminal,
        status: branchFormData.status,
      };
      setBranches([...branches, newBranch]);
    }
    setBranchFormData(initialBranchForm);
    setActiveTab("branches");
  };

  // Table Columns Definition: Zones
  const zoneColumns = [
    {
      key: "zoneCode",
      label: "Zone Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
          {row.zoneCode}
        </span>
      ),
    },
    {
      key: "name",
      label: "Zonal Jurisdiction & Headquarter",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
            <Building2 size={12} className="text-slate-400 shrink-0" />
            {row.headquarter}
          </span>
        </div>
      ),
    },
    {
      key: "zeo",
      label: "Zonal Executive Officer (ZEO)",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 leading-tight">{row.zeoName}</p>
          <span className="text-[11px] text-indigo-600 font-medium">
            {row.zeoDesignation}
          </span>
        </div>
      ),
    },
    {
      key: "wards",
      label: "Jurisdictional Wards",
      render: (row) => (
        <div>
          <p className="text-xs font-semibold text-slate-800">{row.wardCoverage}</p>
          <span className="text-[10px] font-mono font-bold text-slate-500">
            {row.totalWards} Municipal Wards
          </span>
        </div>
      ),
    },
    {
      key: "strength",
      label: "Deployment",
      render: (row) => (
        <div className="font-mono text-xs">
          <span className="font-bold text-slate-900">{row.staffDeployed} Personnel</span>
          <p className="text-[10px] text-slate-400">{row.attachedBranchesCount} Facilities Attached</p>
        </div>
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
            title="Edit Zone Details"
            onClick={() => handleEditZone(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            title="Deactivate Zone"
            onClick={() => {
              if (window.confirm(`Deactivate ${row.name}?`)) {
                setZones(zones.filter((z) => z.id !== row.id));
              }
            }}
          />
        </div>
      ),
    },
  ];

  // Table Columns Definition: Branches
  const branchColumns = [
    {
      key: "branchCode",
      label: "Branch Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
          {row.branchCode}
        </span>
      ),
    },
    {
      key: "branchName",
      label: "Facility Name & Address",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.branchName}</p>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="text-slate-400 shrink-0" />
            {row.address}
          </span>
        </div>
      ),
    },
    {
      key: "parentZone",
      label: "Governing Zone",
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          {row.parentZone}
        </span>
      ),
    },
    {
      key: "facilityType",
      label: "Facility Classification",
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700">
          {row.facilityType}
        </span>
      ),
    },
    {
      key: "manager",
      label: "In-Charge Supervisor",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 leading-tight">{row.manager}</p>
          <span className="text-[11px] text-slate-400 font-mono">{row.contactPhone}</span>
        </div>
      ),
    },
    {
      key: "staffCount",
      label: "Staff Roster",
      render: (row) => (
        <span className="font-mono font-bold text-slate-800 text-xs">
          {row.staffCount} Staff
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
            title="Edit Branch Counter"
            onClick={() => handleEditBranch(row)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Trash2 size={14} className="text-rose-500" />}
            title="Remove Branch"
            onClick={() => {
              if (window.confirm(`Decommission ${row.branchName}?`)) {
                setBranches(branches.filter((b) => b.id !== row.id));
              }
            }}
          />
        </div>
      ),
    },
  ];

  // Filtering
  const filteredZones = zones.filter((z) => {
    const q = searchQuery.toLowerCase();
    return (
      z.name.toLowerCase().includes(q) ||
      z.zoneCode.toLowerCase().includes(q) ||
      z.zeoName.toLowerCase().includes(q) ||
      z.wardCoverage.toLowerCase().includes(q)
    );
  });

  const filteredBranches = branches.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.branchName.toLowerCase().includes(q) ||
      b.branchCode.toLowerCase().includes(q) ||
      b.manager.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q);

    const matchesZone = selectedZoneFilter === "All" || b.parentZone === selectedZoneFilter;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="space-y-6 select-none">
      {/* ── Top Header & Tab Ribbon ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Municipal Zones & Branch Facility Master
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Guwahati Municipal Corporation • 6 Zonal jurisdictions, 60 wards, and citizen service centers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="md"
            variant={activeTab === "zones" ? "primary" : "secondary"}
            icon={Compass}
            onClick={() => {
              setActiveTab("zones");
              setEditingZoneId(null);
            }}
          >
            Zonal Jurisdictions ({zones.length})
          </Button>

          <Button
            size="md"
            variant={activeTab === "branches" ? "primary" : "secondary"}
            icon={Building2}
            onClick={() => {
              setActiveTab("branches");
              setEditingBranchId(null);
            }}
          >
            Ward Counters & Branches ({branches.length})
          </Button>

          <Button
            size="md"
            variant={activeTab === "addZone" || activeTab === "addBranch" ? "primary" : "secondary"}
            icon={Plus}
            onClick={() => {
              if (activeTab === "branches") {
                setEditingBranchId(null);
                setBranchFormData(initialBranchForm);
                setActiveTab("addBranch");
              } else {
                setEditingZoneId(null);
                setZoneFormData(initialZoneForm);
                setActiveTab("addZone");
              }
            }}
          >
            {activeTab === "branches" ? "Add Branch Counter" : "Establish New Zone"}
          </Button>
        </div>
      </div>

      {/* ── 1. KPI Badges Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Constitutional Zones
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalZoneCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Panbazar, Dispur, Ulubari & East/West</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <Compass size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Municipal Wards Bound
            </span>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">
              {totalCoveredWards} Wards
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">100% Geographic coverage</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <MapPin size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Field Staff Deployed
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {totalDeployedPersonnel}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all zonal rosters</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Users size={22} />
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Operational Facilities
            </span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {totalBranchCount} Centers
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Citizen Seva & Garage depots</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Building2 size={22} />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 1: ZONAL JURISDICTIONS REGISTRY                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "zones" && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="w-full mb-0">
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
                  Search Zonal Offices
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by zone title, ZEO officer, ward list or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  size="md"
                  variant="secondary"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print Schedule
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  icon={Plus}
                  onClick={() => {
                    setEditingZoneId(null);
                    setZoneFormData(initialZoneForm);
                    setActiveTab("addZone");
                  }}
                >
                  Create New Zone
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered Municipal Zones ({filteredZones.length} Divisions)
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Determines biometrics muster routing and zonal attendance audit
              </span>
            </div>
            <Table columns={zoneColumns} data={filteredZones} />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 2: WARD COUNTERS & CIVIC BRANCHES                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "branches" && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <SelectField
                label="Governing Zone Filter"
                id="zoneSelect"
                value={selectedZoneFilter}
                onChange={(e) => setSelectedZoneFilter(e.target.value)}
                className="!mb-0"
                options={[
                  { value: "All", label: "All Governing Zones" },
                  ...zones.map((z) => ({ value: z.name, label: z.name })),
                ]}
              />

              <div className="w-full mb-0 sm:col-span-2">
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 select-none">
                  Search Facilities & Counters
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by facility name, address, supervisor, or code..."
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
                Operating Citizen Counters & Depots ({filteredBranches.length} Facilities)
              </span>
              <Button
                size="sm"
                variant="primary"
                icon={Plus}
                onClick={() => {
                  setEditingBranchId(null);
                  setBranchFormData(initialBranchForm);
                  setActiveTab("addBranch");
                }}
              >
                Add Facility Branch
              </Button>
            </div>
            <Table columns={branchColumns} data={filteredBranches} />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 3: ESTABLISH / EDIT ZONE FORM                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "addZone" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Compass size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingZoneId ? "Update Zonal Jurisdiction Details" : "Establish New Municipal Zone"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Define supervisory headquarter, Zonal Executive Officer mandate, and Ward mapping
                </p>
              </div>
            </div>

            {editingZoneId && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Editing Zone #{editingZoneId}
              </span>
            )}
          </div>

          <form onSubmit={handleZoneFormSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                1. Zonal Code & Identity
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Zone Identifier Code"
                  id="zoneCode"
                  placeholder="e.g. ZN-CEN-01"
                  value={zoneFormData.zoneCode}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, zoneCode: e.target.value.toUpperCase() })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Official Zone Title"
                  id="name"
                  placeholder="e.g. Central Zone (Panbazar)"
                  value={zoneFormData.name}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, name: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                2. Executive Leadership & Headquarters
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Zonal Headquarter Office Address"
                  id="headquarter"
                  placeholder="e.g. GMC Main Complex, Panbazar"
                  value={zoneFormData.headquarter}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, headquarter: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Zonal Executive Officer (ZEO) Name"
                  id="zeoName"
                  placeholder="e.g. Pranab Bordoloi"
                  value={zoneFormData.zeoName}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, zeoName: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="ZEO Official Designation"
                  id="zeoDesignation"
                  placeholder="e.g. Joint Commissioner"
                  value={zoneFormData.zeoDesignation}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, zeoDesignation: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <InputField
                  label="Zonal Hotline / Phone"
                  id="contactPhone"
                  placeholder="+91 361 254XXXX"
                  value={zoneFormData.contactPhone}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, contactPhone: e.target.value })}
                  className="!mb-0"
                  required
                />
                <InputField
                  label="Zonal Corporate Email"
                  id="contactEmail"
                  type="email"
                  placeholder="zone@gmc.gov.in"
                  value={zoneFormData.contactEmail}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, contactEmail: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                3. Ward Coverage & Operational Scope
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <InputField
                    label="Governed Municipal Wards Description"
                    id="wardCoverage"
                    placeholder="e.g. Wards 14, 15, 16, 28, 29, 30"
                    value={zoneFormData.wardCoverage}
                    onChange={(e) => setZoneFormData({ ...zoneFormData, wardCoverage: e.target.value })}
                    className="!mb-0"
                    required
                  />
                </div>
                <InputField
                  label="Total Wards in Zone"
                  id="totalWards"
                  type="number"
                  placeholder="e.g. 6 or 12"
                  value={zoneFormData.totalWards}
                  onChange={(e) => setZoneFormData({ ...zoneFormData, totalWards: e.target.value })}
                  className="!mb-0"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setZoneFormData(initialZoneForm);
                  setEditingZoneId(null);
                  setActiveTab("zones");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={CheckCircle2}>
                {editingZoneId ? "Save Zonal Changes" : "Establish Zone"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TAB 4: ADD / EDIT BRANCH FACILITY FORM                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      {activeTab === "addBranch" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingBranchId ? "Modify Facility Counter" : "Register Facility Branch / Seva Counter"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Attach physical collection counter or ward office to governing zonal headquarters
                </p>
              </div>
            </div>

            {editingBranchId && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Editing Facility #{editingBranchId}
              </span>
            )}
          </div>

          <form onSubmit={handleBranchFormSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Branch Code"
                id="branchCode"
                placeholder="e.g. BR-ULB-02"
                value={branchFormData.branchCode}
                onChange={(e) => setBranchFormData({ ...branchFormData, branchCode: e.target.value.toUpperCase() })}
                className="!mb-0"
                required
              />
              <InputField
                label="Facility / Branch Name"
                id="branchName"
                placeholder="e.g. Ulubari Citizen Seva Kendra"
                value={branchFormData.branchName}
                onChange={(e) => setBranchFormData({ ...branchFormData, branchName: e.target.value })}
                className="!mb-0"
                required
              />
              <SelectField
                label="Governing Zonal Headquarter"
                id="parentZone"
                value={branchFormData.parentZone}
                onChange={(e) => setBranchFormData({ ...branchFormData, parentZone: e.target.value })}
                className="!mb-0"
                options={zones.map((z) => ({ value: z.name, label: z.name }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField
                label="Facility Classification"
                id="facilityType"
                value={branchFormData.facilityType}
                onChange={(e) => setBranchFormData({ ...branchFormData, facilityType: e.target.value })}
                className="!mb-0"
                options={[
                  { value: "Citizen Facilitation Counter", label: "Citizen Facilitation Counter (Seva Kendra)" },
                  { value: "Zonal Headquarter & Cash Counter", label: "Zonal Headquarter & Cash Counter" },
                  { value: "Ward Revenue Counter", label: "Ward Revenue Counter" },
                  { value: "Conservancy & Conservancy Garage", label: "Conservancy Fleet & Garage Depot" },
                  { value: "Water Works Pump Station", label: "Water Works Treatment / Pump Station" },
                ]}
                required
              />
              <InputField
                label="Facility In-Charge"
                id="manager"
                placeholder="e.g. Kabita Nath"
                value={branchFormData.manager}
                onChange={(e) => setBranchFormData({ ...branchFormData, manager: e.target.value })}
                className="!mb-0"
                required
              />
              <InputField
                label="Deployed Personnel Count"
                id="staffCount"
                type="number"
                placeholder="e.g. 18"
                value={branchFormData.staffCount}
                onChange={(e) => setBranchFormData({ ...branchFormData, staffCount: e.target.value })}
                className="!mb-0"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Physical Address & Ward Pin"
                id="address"
                placeholder="e.g. Ward 29 Office, Ulubari — 781007"
                value={branchFormData.address}
                onChange={(e) => setBranchFormData({ ...branchFormData, address: e.target.value })}
                className="!mb-0"
                required
              />
              <InputField
                label="Contact Intercom / Phone"
                id="contactPhone"
                placeholder="+91 361 2521191"
                value={branchFormData.contactPhone}
                onChange={(e) => setBranchFormData({ ...branchFormData, contactPhone: e.target.value })}
                className="!mb-0"
                required
              />
            </div>

            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <Checkbox
                id="hasBiometricTerminal"
                checked={branchFormData.hasBiometricTerminal}
                onChange={(e) => setBranchFormData({ ...branchFormData, hasBiometricTerminal: e.target.checked })}
                label="Integrated Biometric Face/Fingerprint Terminal Installed"
                description="Staff check-ins at this location will automatically route directly into GMC daily muster synchronization."
                className="!mb-0"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setBranchFormData(initialBranchForm);
                  setEditingBranchId(null);
                  setActiveTab("branches");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={CheckCircle2}>
                {editingBranchId ? "Save Facility Changes" : "Register Facility"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}