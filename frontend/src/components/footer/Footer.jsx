import * as React from 'react';

export default function Footer({ 
    version = "v2.4.1", 
    systemStatus = "All systems operational" 
}) {
    const currentYear = 2026;

    return (
        <footer className="w-full h-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium">
            {/* Left Section: Legal & Platform Brand */}
            <div className="flex items-center gap-1.5 order-2 sm:order-1 mt-2 sm:mt-0">
                <span>&copy; {currentYear}</span>
                <span className="text-slate-700 font-semibold">GMC HRMS</span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px]">Guwahati Municipal Corporation Portal</span>
            </div>

            {/* Right Section: Core DevOps Data & Links */}
            <div className="flex items-center gap-4 order-1 sm:order-2">
                {/* Live Server Status Indicator */}
                <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200/60">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] text-slate-600 font-semibold tracking-wide">
                        {systemStatus}
                    </span>
                </div>

                {/* Build Version Tag */}
                <div className="text-slate-400 text-[11px] border-l border-slate-200 pl-4">
                    Build: <span className="text-slate-600 font-mono font-semibold">{version}</span>
                </div>
            </div>
        </footer>
    );
}