"use client"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ course }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/course/${course.id}`)
  }

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=400"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.featured && (
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
          <div className="bg-indigo-100 text-indigo-800 font-bold rounded-lg px-3 py-1 text-sm">${course.price}</div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

        {/* Course Meta */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <img
              src={course.tutorAvatar || "/placeholder.svg?height=40&width=40"}
              alt={course.tutorName}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">{course.tutorName}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm text-gray-700">{course.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
