"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Define the structure of a quiz
interface Quiz {
  id: string;
  title: string;
  dateCreated: string;
  questionCount: number;
  status: "draft" | "published" | "completed";
  description?: string;
}

export default function DashboardPage() {
  // State to store the list of quizzes
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  // State to track if the page has loaded (for animations)
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample quiz data - in a real app, this would come from an API
  const sampleQuizzes: Quiz[] = [
    {
      id: "1",
      title: "Introduction to Machine Learning",
      dateCreated: "2024-01-15",
      questionCount: 12,
      status: "published",
      description: "Basic concepts and algorithms in machine learning"
    },
    {
      id: "2", 
      title: "Web Development Fundamentals",
      dateCreated: "2024-01-12",
      questionCount: 8,
      status: "draft",
      description: "HTML, CSS, and JavaScript basics"
    },
    {
      id: "3",
      title: "Database Design Principles",
      dateCreated: "2024-01-10",
      questionCount: 15,
      status: "completed",
      description: "Relational database concepts and normalization"
    },
    {
      id: "4",
      title: "React Component Lifecycle",
      dateCreated: "2024-01-08",
      questionCount: 6,
      status: "published",
      description: "Understanding React hooks and component states"
    }
  ];

  // Simulate loading data when component mounts
  useEffect(() => {
    // Add a small delay to show the loading animation
    const timer = setTimeout(() => {
      setQuizzes(sampleQuizzes);
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Function to format the date in a user-friendly way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get status badge styling
  const getStatusBadge = (status: Quiz['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case "published":
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      case "draft":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case "completed":
        return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Bar */}
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
              <Link 
                href="/about" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
              >
                About Us
              </Link>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, manage, and track your quizzes all in one place. 
            Build engaging learning experiences for your students.
          </p>
        </div>

        {/* Create Quiz Button */}
        <div className="text-center mb-12">
          <Link href="/create-quiz">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <span className="mr-2">✨</span>
              Create New Quiz
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>

        {/* Quizzes Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Quizzes
          </h2>
          
          {/* Loading State */}
          {!isLoaded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {/* Quizzes Grid */}
          {isLoaded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz, index) => (
                <Card 
                  key={quiz.id}
                  className="bg-white/70 backdrop-blur-sm border border-blue-100 hover:border-blue-200 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isLoaded ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {quiz.title}
                      </CardTitle>
                      <span className={getStatusBadge(quiz.status)}>
                        {quiz.status}
                      </span>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Quiz Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <span className="mr-1">📅</span>
                          {formatDate(quiz.dateCreated)}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-1">❓</span>
                          {quiz.questionCount} questions
                        </span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {isLoaded && quizzes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No quizzes yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first quiz to get started with Lectra
              </p>
              <Link href="/create-quiz">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Create Your First Quiz
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}


