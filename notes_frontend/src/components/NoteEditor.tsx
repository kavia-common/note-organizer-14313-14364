"use client";

import { Note } from "@/lib/types";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  note: Note;
  onChange: (n: Partial<Note>) => void;
  onSave: () => void;
  onDelete: () => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  accent: string;
  primary: string;
  secondary: string;
};

export default function NoteEditor({
  note,
  onChange,
  onSave,
  onDelete,
  onAddTag,
  onRemoveTag,
}: Props) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tagInput, setTagInput] = useState("");

  const debounced = useDebounce({ title, content }, 250);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]);

  const timeInfo = useMemo(() => {
    const updated = new Date(note.updatedAt).toLocaleString();
    return `Last updated ${updated}`;
  }, [note.updatedAt]);

  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    onAddTag(t);
    setTagInput("");
    tagInputRef.current?.focus();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 text-xl font-semibold outline-none bg-transparent"
        />
        <div className="hidden sm:block text-xs text-slate-500">{timeInfo}</div>
        <button
          onClick={onSave}
          className="h-9 px-3 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Save
        </button>
        <button
          onClick={onDelete}
          className="h-9 px-3 rounded-md border border-slate-200 text-sm hover:bg-red-50 hover:border-red-200 text-red-700"
          title="Delete"
        >
          Delete
        </button>
      </div>

      <div className="px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <input
            ref={tagInputRef}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTag();
            }}
            placeholder="Add tag"
            className="h-9 w-48 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={addTag}
            className="h-9 px-3 rounded-md border border-slate-200 text-sm hover:bg-slate-50"
          >
            Add
          </button>

          <div className="flex gap-1 flex-wrap ml-2">
            {note.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">
                {t}
                <button
                  onClick={() => onRemoveTag(t)}
                  className="text-slate-500 hover:text-red-600"
                  title="Remove tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        className="flex-1 w-full p-4 outline-none resize-none"
      />
    </div>
  );
}

function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
