"use client";

import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Search, Filter } from "lucide-react";
import axios from "axios";

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description:
      "Learn the fundamentals of machine learning algorithms and their applications in real-world scenarios.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    price: 49.99,
    tutorName: "Dr. Sarah Johnson",
    tutorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    featured: true,
    category: "Data Science",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    description:
      "A comprehensive course covering HTML, CSS, JavaScript, and modern frameworks for building responsive websites.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    price: 59.99,
    tutorName: "Michael Chen",
    tutorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    featured: false,
    category: "Programming",
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    description:
      "Master the core concepts of digital marketing including SEO, social media, and content strategy.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    price: 39.99,
    tutorName: "Emily Wong",
    tutorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    featured: false,
    category: "Marketing",
  },
  {
    id: 4,
    title: "Financial Accounting Principles",
    description:
      "Understand the fundamentals of financial accounting and learn to analyze financial statements.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    price: 44.99,
    tutorName: "James Rodriguez",
    tutorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    featured: false,
    category: "Finance",
  },
  {
    id: 5,
    title: "Advanced Python Programming",
    description:
      "Take your Python skills to the next level with advanced concepts, data structures, and algorithms.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    price: 54.99,
    tutorName: "Aisha Patel",
    tutorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    featured: true,
    category: "Programming",
  },
  {
    id: 6,
    title: "UX/UI Design Fundamentals",
    description:
      "Learn the principles of user experience and interface design to create intuitive digital products.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    price: 49.99,
    tutorName: "David Okafor",
    tutorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    featured: false,
    category: "Design",
  },
];

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories derived from course data
  const categories = [
    "All",
    ...new Set(mockCourses.map((course) => course.category)),
  ];

  useEffect(() => {
    // In a real app, you would fetch courses from an API
    setCourses(mockCourses);
  }, []);

  // Filter courses based on search term and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explore Courses
        </h1>
        <p className="text-gray-600 mb-8">
          Discover courses from top educators and expand your knowledge
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No courses found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListingPage;
