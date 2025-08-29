"use client";

import { NoteFilter, SortOrder } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

type Props = {
  onNew: () => void;
  onToggleView: () => void;
  isEditing: boolean;
  sortOrder: SortOrder;
  setSortOrder: (o: SortOrder) => void;
  filter: NoteFilter;
  setFilter: (f: NoteFilter) => void;
  accent: string;
  primary: string;
  secondary: string;
};

export default function TopBar({
  onNew,
  onToggleView,
  isEditing,
  sortOrder,
  setSortOrder,
  filter,
  setFilter,
}: Props) {
  const [q, setQ] = useState(filter.query ?? "");

  return (
    <header className="h-14 border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto h-full px-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold text-slate-800">Notes</span>
        </div>

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/help"
            className="h-9 px-3 rounded-md border border-slate-200 text-sm hover:bg-slate-50"
          >
            Help
          </Link>
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setFilter({ ...filter, query: q });
                if (e.key === "Escape") {
                  setQ("");
                  setFilter({ ...filter, query: "" });
                }
              }}
              placeholder="Search"
              className="h-9 w-56 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              aria-label="Apply search"
              onClick={() => setFilter({ ...filter, query: q })}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-700"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.5 15.5L20 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            aria-label="Sort notes"
          >
            <option value="updated-desc">Recently updated</option>
            <option value="updated-asc">Least recently updated</option>
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
          </select>

          <button
            onClick={onToggleView}
            className="h-9 px-3 rounded-md border border-slate-200 text-sm hover:bg-slate-50"
            aria-pressed={!isEditing}
            aria-label="Toggle edit/view"
            title="Toggle editor/reader"
          >
            {isEditing ? "View" : "Edit"}
          </button>

          <button
            onClick={onNew}
            className="h-9 px-3 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            New
          </button>
        </div>

        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={onNew}
            className="h-9 px-3 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            New
          </button>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="w-7 h-7 rounded-md bg-yellow-400 flex items-center justify-center text-slate-900">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z" />
      </svg>
    </div>
  );
}
