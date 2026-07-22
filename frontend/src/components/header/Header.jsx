import React from 'react';
import { Bell, Search, ChevronDown } from "lucide-react";

export default function Header({ 
    organizationName = "Guwahati Municipal Corporation", 
    userName = "Admin", 
    userRole = "System Administrator" 
}) {
    // Current date format matching your timeline (May 2026)
    const currentDate = "30 May 2026";
    const currentTime = "11:56 AM";

    return (
        <header className="w-full h-full flex items-center justify-between bg-white px-6">
            {/* Left Section: Org Brand Hierarchy */}
            <div className="flex flex-col justify-center">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {organizationName}
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                    Human Resource Management System
                </p>
            </div>

            {/* Center Section: Sleek Omnisearch Bar */}
            <div className="flex-1 max-w-md mx-8 hidden lg:block">
                <div className="relative group">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600"
                    />
                    <input
                        type="text"
                        placeholder="Search employees, files, departments..."
                        className="w-full h-10 pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
            </div>

            {/* Right Section: System Metadata & Profile Management */}
            <div className="flex items-center gap-6">
                {/* Real-time System Stamp */}
                <div className="text-right hidden sm:block border-r border-slate-100 pr-4">
                    <p className="text-xs font-semibold text-slate-700">
                        {currentDate}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                        {currentTime}
                    </p>
                </div>

                {/* Notification Bell with High-Contrast Status Dot */}
                <button className="relative p-2.5 rounded-lg text-slate-500 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 hover:text-slate-700 transition-all group">
                    <Bell size={18} className="transition-transform group-hover:scale-105" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>

                {/* Profile Widget Dropdown */}
                <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                    {/* Indigo Initial Avatar */}
                    <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm shadow-indigo-200">
                        {userName.charAt(0)}
                    </div>

                    {/* Meta Info */}
                    <div className="hidden md:block text-left">
                        <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                            {userName}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                            {userRole}
                        </p>
                    </div>

                    <ChevronDown
                        size={14}
                        className="text-slate-400 transition-transform group-hover:translate-y-0.5"
                    />
                </div>
            </div>
        </header>
    );
}