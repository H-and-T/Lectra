"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// About Us page: matches the dashboard's warm blue theme and includes
// a shared-style top navigation bar. The main content showcases two
// developers with photo placeholders and descriptive text. The layout
// is responsive: side-by-side on desktop and stacked on mobile, with
// smooth entrance animations for photos and text.

export default function AboutPage() {
  // Track when the page has mounted to trigger animations
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Top Navigation Bar - mirrors dashboard */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Lectra
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are building friendly, modern learning tools to help everyone teach and learn better.
          </p>
        </header>

        {/* Developer Cards Container */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Developer 1 */}
          <article
            className={`bg-white/70 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 ${
              isMounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0ms" }}
          >
            {/* Photo placeholder (replace src later with real photo) */}
            <div
              className={`relative w-40 h-40 rounded-xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0 ${
                isMounted ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              {/* Using a neutral placeholder; replace with actual photo */}
              <Image
                src="/vercel.svg"
                alt="Developer photo placeholder"
                fill
                sizes="160px"
                className="object-contain p-6 opacity-70"
                priority
              />
            </div>

            {/* Text content */}
            <div
              className={`flex-1 ${isMounted ? "animate-fade-in-right" : "opacity-0"}`}
              style={{ animationDelay: "150ms" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900">Your Name</h2>
              <p className="text-blue-700 font-medium mb-2">Co-Founder • Developer</p>
              <p className="text-gray-600">
                Passionate about crafting delightful, accessible tools. Focused on product, UX, and full‑stack development.
              </p>
            </div>
          </article>

          {/* Developer 2 */}
          <article
            className={`bg-white/70 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 ${
              isMounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "150ms" }}
          >
            {/* Photo placeholder (replace src later with real photo) */}
            <div
              className={`relative w-40 h-40 rounded-xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0 ${
                isMounted ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "250ms" }}
            >
              <Image
                src="/vercel.svg"
                alt="Developer photo placeholder"
                fill
                sizes="160px"
                className="object-contain p-6 opacity-70"
              />
            </div>

            {/* Text content */}
            <div
              className={`flex-1 ${isMounted ? "animate-fade-in-right" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900">Teammate Name</h2>
              <p className="text-blue-700 font-medium mb-2">Co-Founder • Developer</p>
              <p className="text-gray-600">
                Loves solving real problems with simple, elegant engineering. Focused on reliability and performance.
              </p>
            </div>
          </article>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          {/* Changed: Updated link to /dashboard and button text to "Back to Dashboard" */}
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Local CSS for lightweight animations and utilities
          Moved animation definitions into CSS classes to avoid mixing the
          `animation` shorthand with `animationDelay` inline, which caused
          warnings during rerenders. We now toggle classes via state. */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Utility classes to apply the animations without inline shorthand */
        .animate-fade-in-up { animation-name: fade-in-up; animation-duration: 0.6s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
        .animate-fade-in-right { animation-name: fade-in-right; animation-duration: 0.7s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
        .animate-fade-in { animation-name: fade-in; animation-duration: 0.8s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
}


