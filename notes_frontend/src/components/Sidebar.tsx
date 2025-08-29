"use client";

import { Note, NoteFilter } from "@/lib/types";
import { useMemo, useState } from "react";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  filter: NoteFilter;
  tags: string[];
  accent: string;
  primary: string;
  secondary: string;
};

export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onCreate,
  filter,
  tags,
}: Props) {
  const [tagFilter, setTagFilter] = useState<string | null>(filter.tag ?? null);

  const grouped = useMemo(() => {
    const out: Record<string, Note[]> = {};
    const key = tagFilter || "All notes";
    out[key] = notes.filter((n) => (tagFilter ? n.tags.includes(tagFilter) : true));
    return out;
  }, [notes, tagFilter]);

  return (
    <aside className="w-[300px] shrink-0 border-r border-slate-200 bg-white h-full flex flex-col">
      <div className="p-3 border-b border-slate-200">
        <button
          onClick={onCreate}
          className="w-full h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-medium transition"
        >
          + New note
        </button>
      </div>

      <TagFilter tags={tags} value={tagFilter} onChange={setTagFilter} />

      <div className="flex-1 overflow-auto">
        {Object.entries(grouped).map(([group, list]) => (
          <div key={group} className="px-2 py-3">
            <div className="px-2 text-xs uppercase tracking-wide text-slate-500">{group}</div>
            <ul className="mt-2 space-y-1">
              {list.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => onSelect(n.id)}
                    className={`group w-full text-left px-2 py-2 rounded-md border border-transparent hover:bg-slate-50 ${
                      selectedId === n.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium text-slate-800">{n.title || "Untitled"}</div>
                        <div className="truncate text-xs text-slate-500">{n.content || "No content"}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(n.id);
                        }}
                        className="ml-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition"
                        aria-label="Delete note"
                        title="Delete note"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M6 7h12m-9 4v6m6-6v6M9 4h6l1 2H8l1-2Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </button>
                    </div>
                    {n.tags.length > 0 && (
                      <div className="mt-1 flex gap-1 flex-wrap">
                        {n.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </li>
              ))}
              {list.length === 0 && (
                <li className="px-2 py-6 text-center text-sm text-slate-500">No notes</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

function TagFilter({
  tags,
  value,
  onChange,
}: {
  tags: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="px-3 py-2 border-b border-slate-200">
      <div className="text-xs text-slate-500 mb-1">Filter by tag</div>
      <div className="flex gap-1 flex-wrap">
        <button
          onClick={() => onChange(null)}
          className={`px-2 py-1 rounded-md text-xs border ${
            value === null ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-2 py-1 rounded-md text-xs border ${
              value === t ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
