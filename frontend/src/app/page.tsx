"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!file || loading) return;
  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);
  // Optional extra fields (server receives via Form(...)):
  formData.append("filename", file.name);
  formData.append("contentType", file.type);
  formData.append("size", String(file.size));

  try {
    const resp = await fetch("http://localhost:8000/process", {
      method: "POST",
      body: formData, // DO NOT set Content-Type; the browser sets the boundary
    });
    if (!resp.ok) throw new Error(`Upload failed (${resp.status})`);

    const data = await resp.json();
    alert(`Uploaded: ${data.filename}\nJob ID: ${data.jobId}`);

    // Redirect after success
    window.location.href = "/dashboard";
  } catch (err) {
    console.error(err);
    alert("Something went wrong uploading the file");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button type="submit">Upload</button>
    </form>
  );


  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload a file</CardTitle>
          <CardDescription>PDF or image files are supported.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button type="submit" disabled={!file}>
              Upload
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
