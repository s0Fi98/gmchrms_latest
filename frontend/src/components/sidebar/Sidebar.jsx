import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CalendarCheck2,
    CalendarOff,
    Network,
    AlertOctagon,
    ReceiptIndianRupee,
    PiggyBank,
    HandCoins,
    Building2,
    CircleDollarSign,
    Settings,
    LogOut,
    ShieldCheck,
    ChevronDown,
    Briefcase
} from 'lucide-react';

import GMC_LOGO from '../../assets/images/gmc_logo.png';

export default function Sidebar() {
    const location = useLocation();

    // Track state of open collapsible sub-menus
    const [openMenus, setOpenMenus] = useState({
        employees: false,
        attendance: false,
        leaves: false,
        hierarchy: false,
        suspension: false,
        arrears: false,
        epf: false,
        loans: false,
        departments: false,
        payroll: false,
        settings: false,
        pension: false,
    });

    const toggleMenu = (key) => {
        setOpenMenus((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const navigationItems = [
        // 1. Standalone Direct Link
        {
            name: 'Dashboard',
            path: '/home',
            icon: LayoutDashboard,
            isDirect: true,
            end: true,
        },

        // 2. Navigation Modules with Sub-Tabs
        {
            key: 'employees',
            name: 'Employees',
            icon: Users,
            subItems: [
                { name: 'Employee Directory', path: '/home/employees/data' },
                { name: 'Employee Profiles', path: '/home/employees/profile' },
            ],
        },
        {
            key: 'attendance',
            name: 'Attendance',
            icon: CalendarCheck2,
            subItems: [
                { name: 'Mark Attendance', path: '/home/attendance/marking' },
                { name: 'Attendance Statement', path: '/home/attendance/statement' },
                { name: 'Daily Attendance Report', path: '/home/attendance/report' },
            ],
        },
        {
            key: 'leaves',
            name: 'Leave Management',
            icon: CalendarOff,
            // badge: '4',
            subItems: [
                { name: 'Apply Leave', path: '/home/leave/apply' },
                { name: 'Leave Approval Registry', path: '/home/leave/approvals' },
                { name: 'Leave Balance Ledger', path: '/home/leave/records' },
            ],
        },
        {
            key: 'payroll',
            name: 'Payroll Processing',
            icon: CircleDollarSign,
            subItems: [
                { name: 'Monthly Salary Generation', path: '/home/payroll/generation' },
                { name: 'Salary Slips & Registers', path: '/home/payroll/payslips' },
                { name: 'Bank Export Statements / Bill', path: '/home/payroll/statements' },
                { name: 'Abstract', path: '/home/payroll/abstract' },
            ],
        },
        {
            key: 'departments',
            name: 'Departments',
            icon: Building2,
            subItems: [
                { name: 'Branch Directory', path: '/home/departments/details' },
                { name: 'Section Allocation', path: '/home/departments/sections' },
            ],
        },
        {
            key: 'suspension',
            name: 'Suspension / Disciplinary',
            icon: AlertOctagon,
            subItems: [
                { name: 'Suspension Registry', path: '/home/suspension/add' },
                { name: 'Subsistence Allowance', path: '/home/suspension/allowance' },
                { name: 'Reinstatement Order', path: '/home/suspension/reinstatement' },
            ],
        },
        {
            key: 'arrears',
            name: 'Arrear Master',
            icon: ReceiptIndianRupee,
            subItems: [
                { name: 'Add Increment', path: '/home/arrears/add-increment' },
                { name: 'Pay Revision Arrears', path: '/home/arrears/pay-revision' },
                { name: 'DA %', path: '/home/arrears/da%' },
                { name: 'Arrear Statements', path: '/home/arrears/arrear-statements' },
                { name: 'Leave Bill', path: '/home/arrears/leave-bill' },
            ],
        },
        {
            key: 'epf',
            name: 'EPF Master',
            icon: PiggyBank,
            subItems: [
                { name: 'Add EPF', path: '/home/epf/add-epf' },
                { name: 'EPF Statement', path: '/home/epf/generate-statement' },
                { name: 'Form 3A / 6A Summary', path: '/home/epf/returns' },
            ],
        },
        {
            key: 'loans',
            name: 'Loans & Advances',
            icon: HandCoins,
            subItems: [
                { name: 'Loan Sanction Register', path: '/home/loans/sanction' },
                { name: 'EMI Deduction Ledger', path: '/home/loans/emi-deductions' },
                { name: 'Festival / House Advance', path: '/home/loans/advances' },
            ],
        },
        {
            key: 'hierarchy',
            name: 'Hierarchy Master',
            icon: Network,
            subItems: [
                { name: 'Designation Hierarchy', path: '/home/hierarchy/designations' },
                { name: 'Reporting Authority Mapping', path: '/home/hierarchy/reporting' },
                { name: 'Organogram View', path: '/home/hierarchy/organogram' },
            ],
        },
        {
            key: 'pension',
            name: 'Pension Master',
            icon: Briefcase,
            subItems: [
                { name: 'Designation Hierarchy', path: '/home/hierarchy/designations' },
                { name: 'Reporting Authority Mapping', path: '/home/hierarchy/reporting' },
                { name: 'Organogram View', path: '/home/hierarchy/organogram' },
            ],
        }
    ];

    const settingsModule = {
        key: 'settings',
        name: 'Settings',
        icon: Settings,
        subItems: [
            { name: 'Manage Holidays', path: '/home/settings/manage-holidays' },
            { name: 'Manage Leaves', path: '/home/settings/manage-leaves' },
            { name: 'Manage Allowances', path: '/home/settings/manage-allowances' },
            { name: 'Manage Designations', path: '/home/settings/manage-designations' },
            { name: 'Manage Branches & Zones', path: '/home/settings/manage-branches' },
        ],
    };

    const isSettingsActive = settingsModule.subItems.some((sub) =>
        location.pathname.startsWith(sub.path)
    );
    const isSettingsOpen = openMenus.settings || isSettingsActive;

    return (
        <aside className="w-full h-full flex flex-col justify-between bg-slate-900 text-slate-300 select-none">
            {/* 1. Brand Bar */}
            <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800 shrink-0">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center shadow-md shrink-0">
                    {/* <ShieldCheck size={20} className="text-white" /> */}
                    <img src={GMC_LOGO} alt="GMC Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-wide text-white leading-none">
                        GMC HRMS
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium mt-1">
                        Admin Portal
                    </span>
                </div>
            </div>

            {/* 2. Scrollable Middle Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                <p className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Core Operations
                </p>

                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    if (item.isDirect) {
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    }

                    const isSubRouteActive = item.subItems.some((sub) =>
                        location.pathname.startsWith(sub.path)
                    );
                    const isOpen = openMenus[item.key] || isSubRouteActive;

                    return (
                        <div key={item.name} className="space-y-1">
                            <button
                                type="button"
                                onClick={() => toggleMenu(item.key)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                    isSubRouteActive
                                        ? 'bg-slate-800/90 text-white'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        className={isSubRouteActive ? 'text-indigo-400' : 'text-slate-400'}
                                    />
                                    <span>{item.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {item.badge && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                            {item.badge}
                                        </span>
                                    )}
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-200 text-slate-500 ${
                                            isOpen ? 'rotate-180 text-slate-300' : ''
                                        }`}
                                    />
                                </div>
                            </button>

                            {isOpen && (
                                <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-800 ml-4">
                                    {item.subItems.map((sub) => (
                                        <NavLink
                                            key={sub.name}
                                            to={sub.path}
                                            className={({ isActive }) =>
                                                `block px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                                    isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                                }`
                                            }
                                        >
                                            {sub.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 3. Pinned Bottom Section (Collapsible Settings + Sign Out) */}
            <div className="p-3 border-t border-slate-800 space-y-1 shrink-0">
                <div className="space-y-1">
                    <button
                        type="button"
                        onClick={() => toggleMenu('settings')}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            isSettingsActive
                                ? 'bg-slate-800/90 text-white'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <Settings
                                size={18}
                                className={isSettingsActive ? 'text-indigo-400' : 'text-slate-400'}
                            />
                            <span>Settings</span>
                        </div>
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 text-slate-500 ${
                                isSettingsOpen ? 'rotate-180 text-slate-300' : ''
                            }`}
                        />
                    </button>

                    {isSettingsOpen && (
                        <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-800 ml-4">
                            {settingsModule.subItems.map((sub) => (
                                <NavLink
                                    key={sub.name}
                                    to={sub.path}
                                    className={({ isActive }) =>
                                        `block px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                            isActive
                                                ? 'bg-indigo-600 text-white font-semibold'
                                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                        }`
                                    }
                                >
                                    {sub.name}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

                <NavLink
                    to="/login"
                    className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </NavLink>
            </div>
        </aside>
    );
}