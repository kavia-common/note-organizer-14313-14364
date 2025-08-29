# Notes Frontend

A modern, minimalistic, light-themed Next.js app for creating, editing, and organizing notes.

## Quick Start

Install dependencies and run:

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Features

- Create, edit, delete notes
- List and view notes
- Organize with tags
- Search across title, content, and tags
- Sort by last updated or title
- Local storage persistence (mocked backend)
- Responsive layout:
  - Top bar with search, sort, view toggle, and new
  - Sidebar with notes list and tag filter
  - Main editor/viewer area

See FEATURES.md for more details.

## Tech

- Next.js App Router
- TypeScript + React
- Tailwind CSS (v4)
- LocalStorage (can be replaced by API)

## Backend integration (optional)

Replace the repository in `src/lib/storage.ts` with API calls (e.g., fetch) and read a base URL from `NEXT_PUBLIC_API_BASE_URL`. An `.env.example` file is provided.

## License

MIT
