import React from "react";
import { useState } from "react";

const Table = ({ columns, data, onRowClick }) => {
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
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <>
      {/* <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500
                    ${col.sortable ? "cursor-pointer select-none hover:text-gray-700" : ""}`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        <span className="flex flex-col leading-none">
                          <svg
                            className={`h-2.5 w-2.5 ${sortKey === col.key && sortDir === "asc" ? "text-blue-600" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 3l6 8H4l6-8z" />
                          </svg>
                          <svg
                            className={`h-2.5 w-2.5 ${sortKey === col.key && sortDir === "desc" ? "text-blue-600" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 17l-6-8h12l-6 8z" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sortedData.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors hover:bg-gray-50 ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}

              {sortedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default Table;

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-50 text-green-700 ring-green-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    inactive: "bg-gray-50 text-gray-600 ring-gray-500/20",
    rejected: "bg-red-50 text-red-700 ring-red-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status] || styles.inactive}`}
    >
      {status}
    </span>
  );
};

export { StatusBadge };
