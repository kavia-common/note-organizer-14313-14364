export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
            <path d="M12 3a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-slate-600">The page you’re looking for doesn’t exist.</p>
      </div>
    </main>
  );
}
