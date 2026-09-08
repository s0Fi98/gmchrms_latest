import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Inbox } from "lucide-react";

export default function Table({
  columns = [],
  data = [],
  onRowClick,
  className = "",
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av == null) return 1;
        if (bv == null) return -1;
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 select-none ${
                    col.sortable
                      ? "cursor-pointer hover:bg-slate-100/70 hover:text-slate-800 transition-colors"
                      : ""
                  } ${col.headerClassName || ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span className="text-slate-400">
                        {sortKey === col.key ? (
                          sortDir === "asc" ? (
                            <ChevronUp size={14} className="text-indigo-600" />
                          ) : (
                            <ChevronDown size={14} className="text-indigo-600" />
                          )
                        ) : (
                          <ChevronsUpDown size={14} className="text-slate-300" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
            {sortedData.map((row, i) => (
              <tr
                key={row.id ?? i}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors duration-150 hover:bg-slate-50/70 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 text-slate-700 ${col.cellClassName || ""}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}

            {/* Empty State */}
            {sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Inbox size={32} className="text-slate-300" />
                    <p className="text-xs font-semibold text-slate-500">
                      No records found
                    </p>
                    <p className="text-[11px] text-slate-400">
                      There is no data available to display at this time.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const StatusBadge = ({ status = "active", label }) => {
  const normalized = status.toLowerCase();

  const styles = {
    // Regular / Approved / Active
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    permanent: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",

    // Pending / Under Review
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    review: "bg-amber-50 text-amber-700 ring-amber-600/20",

    // Suspended / Terminated / Rejected
    suspended: "bg-rose-50 text-rose-700 ring-rose-600/20",
    rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
    inactive: "bg-slate-100 text-slate-600 ring-slate-400/20",

    // Deputation / Attachments / Contract
    deputation: "bg-sky-50 text-sky-700 ring-sky-600/20",
    contractual: "bg-purple-50 text-purple-700 ring-purple-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ring-1 ring-inset ${
        styles[normalized] || styles.inactive
      }`}
    >
      {label || status}
    </span>
  );
};
