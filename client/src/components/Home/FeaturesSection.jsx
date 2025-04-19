import { Video, MessageSquare, FileText, CreditCard, Users, Zap } from "lucide-react"

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "AI-Enhanced Videos",
      description:
        "Upload videos that are automatically transcribed and enhanced with AI for better learning experiences.",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Interaction",
      description: "Connect with tutors and peers through real-time chat rooms for immediate feedback and discussions.",
    },
    {
      icon: FileText,
      title: "Smart Transcripts",
      description: "Access AI-generated transcripts that sync with video content for easier note-taking and review.",
    },
    {
      icon: CreditCard,
      title: "Secure Enrollment",
      description: "Simple and secure payment system for course enrollment with multiple payment options.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Join a vibrant community of learners and educators sharing knowledge and insights.",
    },
    {
      icon: Zap,
      title: "Personalized Learning",
      description: "AI-powered recommendations to help you find the right courses based on your interests and goals.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Powerful Features for Modern Learning</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with thoughtful design to create the ultimate learning
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
