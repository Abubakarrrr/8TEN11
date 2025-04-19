import { Star } from "lucide-react"



const TestimonialCard= ({ quote, name, role, rating, image }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col h-full">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>

      <p className="text-gray-700 mb-6 flex-grow">{quote}</p>

      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  )
}

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "This platform transformed how I teach my computer science courses. The AI transcription saves me hours of work, and the real-time chat keeps my students engaged even after class.",
      name: "Dr. Sarah Johnson",
      role: "Computer Science Professor",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a working professional, I needed flexible learning options. The video transcripts make it easy to review content during my commute, and I can always get questions answered in the chat.",
      name: "Michael Chen",
      role: "Software Engineer & Student",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I've tried many online learning platforms, but this one stands out with its community feel. The real-time interaction with both teachers and other students creates a truly engaging experience.",
      name: "Aisha Patel",
      role: "Graduate Student",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The AI transcription feature is a game-changer for accessibility. As someone with hearing difficulties, having accurate transcripts synchronized with videos has made learning so much easier.",
      name: "James Rodriguez",
      role: "Undergraduate Student",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I've been able to reach students globally through this platform. The tools make it easy to create professional content, and the payment system is seamless for both me and my students.",
      name: "Prof. Emily Wong",
      role: "Independent Educator",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The platform's AI features help me find exactly what I need in long lectures. I can search the transcript and jump right to that part of the video - it's revolutionized my study habits.",
      name: "David Okafor",
      role: "MBA Student",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Community Says</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied tutors and students who are transforming education together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
