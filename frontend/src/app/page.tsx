"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Lectra</h1>
        <p className="text-lg text-gray-600 mb-8">
          Create, manage, and explore quizzes with a warm and friendly experience.
        </p>
        <Link href="/dashboard">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            Let’s Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
