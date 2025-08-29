"use client";

import { Note } from "@/lib/types";

type Props = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  accent: string;
  primary: string;
  secondary: string;
};

export default function NoteViewer({ note, onEdit, onDelete }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <h1 className="flex-1 text-xl font-semibold truncate">{note.title || "Untitled"}</h1>
        <button
          onClick={onEdit}
          className="h-9 px-3 rounded-md border border-slate-200 text-sm hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="h-9 px-3 rounded-md border border-slate-200 text-sm hover:bg-red-50 hover:border-red-200 text-red-700"
        >
          Delete
        </button>
      </div>

      <div className="px-4 py-2 border-b border-slate-200 flex gap-2 flex-wrap">
        {note.tags.map((t) => (
          <span key={t} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">
            {t}
          </span>
        ))}
      </div>

      <article className="flex-1 overflow-auto p-4">
        <pre className="whitespace-pre-wrap text-slate-800 leading-7">{note.content || "No content"}</pre>
      </article>
    </div>
  );
}
