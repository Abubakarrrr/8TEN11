
import { BookOpen, Star, PlayCircle, Award, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"


const CourseProgressCard = ({ course, compact = false }) => {
  const navigate = useNavigate()

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`

    return date.toLocaleDateString()
  }

  const handleCourseClick = () => {
    navigate(`/course/${course.id}`)
  }

  const handleContinueLearning = (e) => {
    e.stopPropagation()
    if (course.nextLesson) {
      navigate(`/course/${course.id}/lesson/${course.nextLesson.id}`)
    } else {
      navigate(`/course/${course.id}`)
    }
  }

  if (compact) {
    return (
      <div
        className="flex items-center bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleCourseClick}
      >
        {/* Thumbnail */}
        <div className="w-20 h-20 flex-shrink-0">
          <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{course.title}</h3>

          {/* Progress */}
          <div className="mt-1 mb-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${course.progress === 100 ? "bg-green-500" : "bg-indigo-600"}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{course.progress}% complete</span>
            {course.progress === 100 ? (
              <span className="flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </span>
            ) : (
              <span>
                {course.completedLessons}/{course.totalLessons} lessons
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCourseClick}
    >
      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img src={course?.thumbnail || "/placeholder.svg"} alt={course?.title} className="w-full h-full object-cover" />
        {course?.progress === 100 && (
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1">COMPLETED</div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{course?.title}</h3>
        <div className="flex items-center mb-3">
          <img
            src={course.instructorAvatar || "/placeholder.svg"}
            alt={course.instructor}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{course?.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${course?.progress === 100 ? "bg-green-500" : "bg-indigo-600"}`}
              style={{ width: `${course?.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>
              {course.completedLessons}/{course.totalLessons} lessons
            </span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Continue Learning or View Certificate */}
        {course.progress === 100 ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/certificate/${course.id}`)
            }}
            className={`w-full py-2 rounded-lg font-medium flex items-center justify-center ${
              course.certificate
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Award className="h-4 w-4 mr-2" />
            {course.certificate ? "View Certificate" : "Certificate Processing"}
          </button>
        ) : (
          <button
            onClick={handleContinueLearning}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Continue Learning
          </button>
        )}
      </div>

      {/* Last Accessed */}
      <div className="px-5 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
        Last accessed {formatRelativeTime(course.lastAccessed)}
      </div>
    </div>
  )
}

export default CourseProgressCard
