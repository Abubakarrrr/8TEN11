"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import VideoPlayer from "./VideoPlayer"
import TranscriptSummary from "./TranscriptSummary"
import { ArrowLeft, BookOpen, Clock, Users, Star, Award, ChevronRight, FileText } from "lucide-react"

// Mock course data
const mockCourseDetails = {
  id: 1,
  title: "Introduction to Machine Learning",
  description:
    "Learn the fundamentals of machine learning algorithms and their applications in real-world scenarios. This comprehensive course covers supervised and unsupervised learning, neural networks, and practical implementation using Python libraries.",
  thumbnail: "/placeholder.svg?height=400&width=800",
  price: 49.99,
  tutorName: "Dr. Sarah Johnson",
  tutorAvatar: "/placeholder.svg?height=80&width=80",
  tutorBio: "PhD in Computer Science with 10+ years of experience in machine learning research and education.",
  rating: 4.8,
  totalStudents: 2543,
  totalHours: 24,
  lastUpdated: "2023-10-15",
  featured: true,
  category: "Data Science",
  videos: [
    {
      id: 1,
      title: "Introduction to Machine Learning Concepts",
      duration: "15:30",
      url: "https://www.youtube.com/watch?v=aircAruvnKk",
      thumbnail: "/placeholder.svg?height=200&width=400",
      transcript:
        "Welcome to the Introduction to Machine Learning course. In this lecture, we'll cover the basic concepts of machine learning and how it differs from traditional programming. Machine learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. Unlike traditional programming where we explicitly program rules, in machine learning, we train models on data to recognize patterns and make predictions. There are several types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. In supervised learning, the model is trained on labeled data, meaning we provide both the input and the expected output. In unsupervised learning, the model works with unlabeled data and tries to find patterns or structures on its own. Reinforcement learning involves an agent learning to make decisions by taking actions in an environment to maximize some notion of cumulative reward.",
      summary:
        "This introductory lecture explains the fundamental concepts of machine learning, distinguishing it from traditional programming. It covers the main types of machine learning: supervised learning (using labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through environment interaction and rewards).",
    },
    {
      id: 2,
      title: "Supervised Learning Algorithms",
      duration: "22:15",
      url: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
      thumbnail: "/placeholder.svg?height=200&width=400",
      transcript:
        "In this lecture, we'll dive deeper into supervised learning algorithms. Supervised learning is a type of machine learning where the model learns from labeled training data. The goal is to learn a mapping function from input variables to output variables. Some common supervised learning algorithms include linear regression, logistic regression, decision trees, random forests, support vector machines, and neural networks. Linear regression is used for predicting continuous values, while logistic regression is used for binary classification problems. Decision trees are versatile algorithms that can be used for both regression and classification tasks. They work by recursively splitting the data based on feature values. Random forests are an ensemble learning method that combines multiple decision trees to improve performance and reduce overfitting. Support vector machines find the hyperplane that best separates different classes in the feature space. Neural networks, inspired by the human brain, consist of interconnected nodes or neurons organized in layers. They can learn complex patterns and are particularly effective for tasks like image and speech recognition.",
      summary:
        "This lecture explores supervised learning algorithms in detail. It covers linear regression for continuous value prediction, logistic regression for binary classification, decision trees and random forests for various tasks, support vector machines for class separation, and neural networks for complex pattern recognition. The lecture explains how each algorithm works and their appropriate applications.",
    },
    {
      id: 3,
      title: "Unsupervised Learning Techniques",
      duration: "18:45",
      url: "https://www.youtube.com/watch?v=FD8XtpzZCNI",
      thumbnail: "/placeholder.svg?height=200&width=400",
      transcript:
        "Today we'll explore unsupervised learning techniques. Unsupervised learning is a type of machine learning where the model works with unlabeled data. The goal is to find patterns, structures, or relationships in the data without explicit guidance. Common unsupervised learning techniques include clustering, dimensionality reduction, and association rule learning. Clustering algorithms group similar data points together based on certain features. K-means is a popular clustering algorithm that partitions data into K distinct clusters. Hierarchical clustering builds a tree of clusters, allowing for different levels of granularity. DBSCAN is density-based clustering that can find clusters of arbitrary shapes. Dimensionality reduction techniques aim to reduce the number of features while preserving the important information. Principal Component Analysis (PCA) is a widely used technique that transforms the data into a new coordinate system. t-SNE is particularly effective for visualizing high-dimensional data in 2D or 3D space. Association rule learning discovers interesting relationships between variables in large databases. The Apriori algorithm is commonly used for market basket analysis to find items that are frequently purchased together.",
      summary:
        "This lecture covers unsupervised learning techniques that work with unlabeled data. It explains clustering algorithms (K-means, hierarchical clustering, DBSCAN) that group similar data points, dimensionality reduction methods (PCA, t-SNE) that preserve information while reducing features, and association rule learning (Apriori algorithm) that finds relationships between variables in datasets.",
    },
  ],
}

const CourseDetailsPage = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch course details from an API
    // For now, we'll use mock data
    setTimeout(() => {
      setCourse(mockCourseDetails)
      setSelectedVideo(mockCourseDetails.videos[0])
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-indigo-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Courses</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>

          <p className="text-indigo-100 mb-6 max-w-3xl">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{course.rating} Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1" />
              <span>{course.totalStudents.toLocaleString()} Students</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{course.totalHours} Hours</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-1" />
              <span>{course.videos.length} Lessons</span>
            </div>
          </div>

          <div className="flex items-center">
            <img
              src={course.tutorAvatar || "/placeholder.svg"}
              alt={course.tutorName}
              className="w-12 h-12 rounded-full mr-3 border-2 border-white"
            />
            <div>
              <p className="font-medium">Created by</p>
              <p className="text-lg font-bold">{course.tutorName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-8">
              <VideoPlayer videoUrl={selectedVideo.url} thumbnail={selectedVideo.thumbnail} />
            </div>

            {/* Video Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600">
                <span className="font-medium">Duration:</span> {selectedVideo.duration}
              </p>
            </div>

            {/* Transcript and Summary */}
            <div className="mb-8">
              <TranscriptSummary transcript={selectedVideo.transcript} summary={selectedVideo.summary} />
            </div>

            {/* Tutor Info */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Instructor</h3>
              <div className="flex items-start">
                <img
                  src={course.tutorAvatar || "/placeholder.svg"}
                  alt={course.tutorName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{course.tutorName}</h4>
                  <p className="text-gray-700">{course.tutorBio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Course Price Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-8">
              <div className="text-3xl font-bold text-gray-900 mb-4">${course.price}</div>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-4">
                Enroll Now
              </button>
              <p className="text-gray-600 text-sm text-center mb-6">30-Day Money-Back Guarantee</p>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-900 mb-2">This course includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>{course.videos.length} video lessons</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>{course.totalHours} hours of content</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>AI-generated transcripts</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Course Content</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {course.videos.map((video) => (
                  <button
                    key={video.id}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center ${
                      selectedVideo.id === video.id ? "bg-indigo-50" : ""
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="mr-3">
                      {selectedVideo.id === video.id ? (
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-700">{video.id}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${selectedVideo.id === video.id ? "text-indigo-600" : "text-gray-900"}`}
                      >
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-600">{video.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsPage
