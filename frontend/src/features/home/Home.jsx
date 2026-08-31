import React from 'react';
import { 
    Users, 
    UserCheck, 
    FileText, 
    AlertOctagon, 
    Hourglass, 
    Building2, 
    CheckCircle2, 
    CalendarClock,
    ArrowUpRight,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    // 1. Primary Government HRMS Metrics
    const kpiMetrics = [
        {
            title: 'Active Regular Employees',
            count: '1,428',
            subText: 'Permanent cadre strength',
            icon: Users,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-100',
        },
        {
            title: 'Deputation / Attachment',
            count: '42',
            subText: 'Inward & Outward postings',
            icon: Building2,
            color: 'text-sky-600',
            bgColor: 'bg-sky-50',
            borderColor: 'border-sky-100',
        },
        {
            title: 'Contractual / Fixed Pay',
            count: '315',
            subText: 'Tenure & muster roll staff',
            icon: FileText,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100',
        },
        {
            title: 'Under Suspension',
            count: '06',
            subText: 'Disciplinary proceedings active',
            icon: AlertOctagon,
            color: 'text-rose-600',
            bgColor: 'bg-rose-50',
            borderColor: 'border-rose-100',
        },
        {
            title: 'Retiring in 6 Months',
            count: '18',
            subText: 'Superannuation processing',
            icon: Hourglass,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100',
        },
    ];

    // 2. Upcoming Superannuation / Retirement List
    const upcomingRetirements = [
        {
            id: 'GMC-EMP-1042',
            name: 'Bhaskar Sharma',
            designation: 'Executive Engineer (Civil)',
            department: 'Engineering & Works',
            date: '30 Sep 2026',
            pensionStatus: 'Docs Verified',
            statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
            id: 'GMC-EMP-0891',
            name: 'Hemanta Kalita',
            designation: 'Senior Accounts Officer',
            department: 'Finance & Accounts',
            date: '31 Oct 2026',
            pensionStatus: 'NOC Pending',
            statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
        },
        {
            id: 'GMC-EMP-1205',
            name: 'Pranab Bordoloi',
            designation: 'Superintendent',
            department: 'General Administration',
            date: '30 Nov 2026',
            pensionStatus: 'Form-7 Initiated',
            statusColor: 'text-sky-700 bg-sky-50 border-sky-200',
        },
        {
            id: 'GMC-EMP-0763',
            name: 'Dipali Das',
            designation: 'Tax Collector Grade-I',
            department: 'Revenue & Assessment',
            date: '31 Jan 2027',
            pensionStatus: 'Service Book Audit',
            statusColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        },
    ];

    // 3. Pending Critical Action Alerts
    const pendingActions = [
        {
            title: 'DA Arrear Q2 Notification',
            desc: 'Awaiting rate revision approval from Finance Dept.',
            tag: 'Arrears',
            urgency: 'High',
        },
        {
            title: '4 Disciplinary Subsistence Reviews',
            desc: 'Review 50% to 75% subsistence allowance rate changes.',
            tag: 'Suspension',
            urgency: 'Action Required',
        },
        {
            title: 'EPF Monthly ECR Draft',
            desc: 'Reconciliation pending for 14 outsourced daily-wagers.',
            tag: 'EPF Master',
            urgency: 'Due in 3 days',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Top Bar / Overview Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        Administrative Executive Dashboard
                    </h2>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                        Guwahati Municipal Corporation • Cadre strength & statutory ledger
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm">
                        Export Cadre Summary
                    </button>
                    <Link
                        to="/app/employees/list"
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm shadow-indigo-100 flex items-center gap-1.5"
                    >
                        <span>Add New Entry</span>
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>

            {/* 1. Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {kpiMetrics.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500 line-clamp-1">
                                    {item.title}
                                </span>
                                <div className={`p-2 rounded-lg ${item.bgColor} ${item.color}`}>
                                    <Icon size={18} />
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="text-2xl font-extrabold text-slate-900">
                                    {item.count}
                                </div>
                                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                                    {item.subText}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 2. Middle Section: Attendance & Quick Action Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Daily Attendance Pulse */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900">
                                Today's Attendance Pulse
                            </h3>
                            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                Live Biometric
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center my-4">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-lg font-bold text-emerald-600">92.4%</p>
                                <p className="text-[10px] font-medium text-slate-500 uppercase">Present</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-lg font-bold text-amber-600">48</p>
                                <p className="text-[10px] font-medium text-slate-500 uppercase">On Leave</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-lg font-bold text-rose-600">12</p>
                                <p className="text-[10px] font-medium text-slate-500 uppercase">Unexplained</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">
                            Total muster roll reporting across all 6 GMC zonal divisions logged as of 10:30 AM today.
                        </p>
                    </div>

                    <Link
                        to="/app/attendance/statement"
                        className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center justify-between"
                    >
                        <span>View Zonal Attendance Statement</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Statutory Actions / Administrative Queue */}
                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900">
                                Statutory & Disciplinary Actions
                            </h3>
                            <span className="text-[11px] font-medium text-slate-400">
                                3 items requiring review
                            </span>
                        </div>

                        <div className="space-y-3 mt-3">
                            {pendingActions.map((action) => (
                                <div
                                    key={action.title}
                                    className="p-3 bg-slate-50/60 rounded-lg border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                                >
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-800">
                                                {action.title}
                                            </span>
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-600">
                                                {action.tag}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500">
                                            {action.desc}
                                        </p>
                                    </div>
                                    <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100 whitespace-nowrap">
                                        {action.urgency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>Last synchronized with Establishment Branch at 11:30 AM</span>
                        <Link to="/app/suspension/registry" className="font-semibold text-indigo-600 hover:text-indigo-700">
                            Open Master Review
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Table: Superannuation / Next 6 Months Retirement Pipeline */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">
                            Superannuation Pipeline (Next 6 Months)
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Employees approaching retirement age — track pension papers, gratuity, and NOC processing.
                        </p>
                    </div>
                    <Link
                        to="/app/employees/list"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                        <span>View All 18 Officers</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-5">Emp Code & Name</th>
                                <th className="py-3 px-5">Designation</th>
                                <th className="py-3 px-5">Department / Wing</th>
                                <th className="py-3 px-5">Retirement Date</th>
                                <th className="py-3 px-5">Pension Paperwork</th>
                                <th className="py-3 px-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {upcomingRetirements.map((emp) => (
                                <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="py-3.5 px-5">
                                        <p className="font-bold text-slate-800">{emp.name}</p>
                                        <p className="text-[11px] font-mono text-slate-400">{emp.id}</p>
                                    </td>
                                    <td className="py-3.5 px-5 font-medium text-slate-700">
                                        {emp.designation}
                                    </td>
                                    <td className="py-3.5 px-5">
                                        {emp.department}
                                    </td>
                                    <td className="py-3.5 px-5 font-semibold text-slate-800">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarClock size={14} className="text-amber-500" />
                                            <span>{emp.date}</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-5">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${emp.statusColor}`}>
                                            {emp.pensionStatus}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-5 text-right">
                                        <button className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100 transition">
                                            Audit File
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}