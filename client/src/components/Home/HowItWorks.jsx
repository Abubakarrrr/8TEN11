import { UserPlus, FolderPlus, Play, MessageCircle, Award, Users } from "lucide-react"

const StepCard = ({
  number,
  title,
  description,
  icon: Icon,
  userType,
}) => {
  const bgColor = userType === "tutor" ? "bg-purple-100" : "bg-indigo-100"
  const textColor = userType === "tutor" ? "text-purple-600" : "text-indigo-600"
  const borderColor = userType === "tutor" ? "border-purple-200" : "border-indigo-200"

  return (
    <div className={`relative p-6 rounded-xl border ${borderColor} bg-white shadow-md`}>
      <div
        className={`absolute -top-4 -left-4 w-8 h-8 rounded-full ${bgColor} flex items-center justify-center font-bold ${textColor}`}
      >
        {number}
      </div>
      <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

const HowItWorksSection = () => {
  const tutorSteps = [
    {
      icon: UserPlus,
      title: "Create an Account",
      description: "Sign up as a tutor and set up your professional profile to showcase your expertise.",
    },
    {
      icon: FolderPlus,
      title: "Create Courses",
      description: "Design courses with titles, descriptions, and upload videos that are automatically transcribed.",
    },
    {
      icon: MessageCircle,
      title: "Engage with Students",
      description: "Interact with enrolled students through real-time chat rooms and answer their questions.",
    },
  ]

  const studentSteps = [
    {
      icon: UserPlus,
      title: "Join the Platform",
      description: "Create your student account and set up your learning preferences and goals.",
    },
    {
      icon: Users,
      title: "Browse & Enroll",
      description: "Explore the course catalog, preview content, and enroll in courses that interest you.",
    },
    {
      icon: Play,
      title: "Learn & Interact",
      description: "Watch videos with AI transcripts and participate in real-time discussions with tutors and peers.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy for both tutors and students to connect and create meaningful learning
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tutor Flow */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Tutors</h3>
            </div>

            <div className="space-y-8">
              {tutorSteps.map((step, index) => (
                <StepCard
                  key={index}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  userType="tutor"
                />
              ))}
            </div>
          </div>

          {/* Student Flow */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
            </div>

            <div className="space-y-8">
              {studentSteps.map((step, index) => (
                <StepCard
                  key={index}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  userType="student"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
