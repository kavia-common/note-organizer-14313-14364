# Notes Frontend - Features

- Create note
- Edit note (title, content)
- Delete note
- List notes
- View note details (read-only mode)
- Organize notes with tags
- Search by title/content/tag
- Sort by last updated or title (A→Z/Z→A)
- Minimal light theme with primary #2563eb, secondary #64748b, accent #fbbf24

Implementation details:
- State management via React context in `src/lib/notes-context.tsx`
- Local storage persistence via `src/lib/storage.ts` (mocked backend)
- Components:
  - `TopBar`: search, sort, editor/view toggle, new note
  - `Sidebar`: note list, create button, tag filter
  - `NoteEditor`: edit title, content, tags, save/delete
  - `NoteViewer`: read-only view, tags, edit/delete
