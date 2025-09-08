export default function DashboardPage() {
  const uploads = [
    { id: "1", name: "lecture-notes.pdf", status: "processing..." },
    { id: "2", name: "diagram.png", status: "queued" },
  ];

  return (
    <main className="min-h-screen w-full p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-2">
        {uploads.map((u) => (
          <div key={u.id} className="flex items-center justify-between rounded-md border p-3">
            <span className="font-medium">{u.name}</span>
            <span className="text-sm text-muted-foreground">{u.status}</span>
          </div>
        ))}
      </div>
    </main>
  );
}


