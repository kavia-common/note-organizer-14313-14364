export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-4">Notes App — Help</h1>
        <p className="text-slate-600 mb-6">
          This lightweight notes app lets you create, edit, delete, search, sort, and organize notes
          using tags. Data is stored locally in your browser (localStorage) and can be replaced later
          with an API-backed storage.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Quick tips</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Use the New button in the top bar or sidebar to create a note.</li>
            <li>Click a note in the sidebar to select it.</li>
            <li>Use the Edit/View toggle in the top bar to switch modes.</li>
            <li>Type in the search box and press Enter to filter by title, content, or tags.</li>
            <li>Use the tag filter section in the sidebar to show notes for a specific tag.</li>
            <li>Sorting options are available in the top bar.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">About storage</h2>
          <p className="text-slate-600">
            Notes are persisted to your browser&apos;s localStorage under the key{" "}
            <code className="px-1 py-0.5 rounded bg-slate-100">notes-app.v1</code>. To integrate a
            backend later, replace the storage repository implementation in{" "}
            <code className="px-1 py-0.5 rounded bg-slate-100">src/lib/storage.ts</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
