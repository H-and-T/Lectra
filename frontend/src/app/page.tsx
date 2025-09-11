"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Define the possible upload statuses
type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function Home() {
  // State to track the selected file
  const [file, setFile] = useState<File | null>(null);
  // State to track upload status and messages
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting normally (which would refresh the page)
    e.preventDefault();
    
    // Check if a file is selected
    if (!file) {
      setUploadStatus("error");
      setStatusMessage("Please select a PDF file first.");
      return;
    }

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      setUploadStatus("error");
      setStatusMessage("Please select a PDF file only.");
      return;
    }

    // Set uploading status
    setUploadStatus("uploading");
    setStatusMessage("Uploading your lecture...");

    try {
      // Create FormData object to send the file
      // FormData is a special object that can hold files and other data
      const formData = new FormData();
      formData.append("file", file); // "file" matches what the backend expects

      console.log(formData);
      // Send the file to the backend using fetch
      const response = await fetch("http://localhost:8000/process", {
        method: "POST", // Use POST method for file uploads
        body: formData, // Send the FormData as the request body
        // Don't set Content-Type header - let the browser set it automatically
        // This is important for file uploads with FormData
      });
      console.log(response);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response from the backend
      const result = await response.json();

      // Check if the backend returned an error
      if (result.status === "error") {
        throw new Error(result.error || "Upload failed");
      }

      // Success! Update the status
      setUploadStatus("success");
      setStatusMessage(`Success! Your lecture "${result.filename}" has been uploaded.`);
      setJobId(result.jobId);
      
      // Clear the file input
      setFile(null);
      
    } catch (error) {
      // Handle any errors that occurred during upload
      setUploadStatus("error");
      setStatusMessage(`Error: ${error instanceof Error ? error.message : "Upload failed"}`);
      console.error("Upload error:", error);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submit Lecture</CardTitle>
          <CardDescription>Upload a PDF file to process your lecture.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* File input for PDF files only */}
            <div className="space-y-2">
              <label htmlFor="file-input" className="text-sm font-medium">
                Select PDF File
              </label>
              <Input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null);
                  // Reset status when a new file is selected
                  setUploadStatus("idle");
                  setStatusMessage("");
                }}
                disabled={uploadStatus === "uploading"}
              />
              {file && (
                <p className="text-sm text-gray-600">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Status message display */}
            {statusMessage && (
              <div className={`p-3 rounded-md text-sm ${
                uploadStatus === "success" 
                  ? "bg-green-100 text-green-800 border border-green-200" 
                  : uploadStatus === "error"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : uploadStatus === "uploading"
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}>
                {uploadStatus === "uploading" && "⏳ "}
                {uploadStatus === "success" && "✅ "}
                {uploadStatus === "error" && "❌ "}
                {statusMessage}
                {jobId && uploadStatus === "success" && (
                  <div className="mt-2 text-xs">
                    Job ID: {jobId}
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button 
              type="submit" 
              disabled={!file || uploadStatus === "uploading"}
              className="min-w-[100px]"
            >
              {uploadStatus === "uploading" ? "Uploading..." : "Submit Lecture"}
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
