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
    if (!file) return;
    alert(`Uploaded: ${file.name}. Redirecting to dashboard...`);
    window.location.href = "/dashboard";
  };

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
