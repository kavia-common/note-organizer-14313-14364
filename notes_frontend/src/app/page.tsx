"use client";

import { useEffect, useMemo, useState } from "react";
import { NotesProvider, useNotes } from "@/lib/notes-context";
import { Note } from "@/lib/types";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import NoteEditor from "@/components/NoteEditor";
import NoteViewer from "@/components/NoteViewer";

export default function Home() {
  return (
    <NotesProvider>
      <HomeContent />
    </NotesProvider>
  );
}

function HomeContent() {
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    selectedId,
    selectNote,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    tags,
    addTagToNote,
    removeTagFromNote,
  } = useNotes();

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const [isEditing, setIsEditing] = useState<boolean>(true);

  // Ensure there is always a selected note if notes exist
  useEffect(() => {
    if (!selectedId && notes.length > 0) {
      selectNote(notes[0].id);
    }
  }, [notes, selectedId, selectNote]);

  const handleCreate = () => {
    const newNote = createNote();
    selectNote(newNote.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const nextId = deleteNote(id);
    if (nextId) selectNote(nextId);
  };

  const handleSave = (note: Note) => {
    updateNote(note.id, { title: note.title, content: note.content });
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar
        onNew={handleCreate}
        onToggleView={() => setIsEditing((v) => !v)}
        isEditing={isEditing}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filter={filter}
        setFilter={setFilter}
        accent="#fbbf24"
        primary="#2563eb"
        secondary="#64748b"
      />
      <div className="h-[calc(100vh-56px)] flex">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={selectNote}
          onDelete={handleDelete}
          onCreate={handleCreate}
          filter={filter}
          tags={tags}
          accent="#fbbf24"
          primary="#2563eb"
          secondary="#64748b"
        />
        <section className="flex-1 border-l border-slate-200 overflow-hidden">
          {!selectedNote ? (
            <EmptyState onCreate={handleCreate} />
          ) : isEditing ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onChange={(n) => updateNote(selectedNote.id, n)}
              onSave={() => handleSave(selectedNote)}
              onDelete={() => handleDelete(selectedNote.id)}
              onAddTag={(tag) => addTagToNote(selectedNote.id, tag)}
              onRemoveTag={(tag) => removeTagFromNote(selectedNote.id, tag)}
              accent="#fbbf24"
              primary="#2563eb"
              secondary="#64748b"
            />
          ) : (
            <NoteViewer
              note={selectedNote}
              onEdit={() => setIsEditing(true)}
              onDelete={() => handleDelete(selectedNote.id)}
              accent="#fbbf24"
              primary="#2563eb"
              secondary="#64748b"
            />
          )}
        </section>
      </div>
    </main>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">No note selected</h2>
        <p className="text-slate-500 mb-4">
          Create a new note to get started or select one from the sidebar.
        </p>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" />
          </svg>
          New note
        </button>
      </div>
    </div>
  );
}
