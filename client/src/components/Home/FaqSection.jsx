import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"



const FaqItem= ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-indigo-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pr-12">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

const FaqSection = () => {
  const faqs = [
    {
      question: "How does the AI transcription work?",
      answer:
        "Our platform uses advanced AI to automatically generate accurate transcripts from uploaded video content. The system analyzes the audio, converts speech to text, and synchronizes it with the video timeline for easy navigation.",
    },
    {
      question: "Can I use the platform as both a student and a tutor?",
      answer:
        "Yes! You can create separate student and tutor profiles under the same account. This allows you to both teach courses and enroll in others' courses seamlessly.",
    },
    {
      question: "How do payments work for tutors?",
      answer:
        "Tutors receive payment when students enroll in their courses. We handle the payment processing and security, and tutors receive payouts on a regular schedule after deducting a small platform fee.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, our platform is optimized for web browsers on both desktop and mobile devices. A dedicated mobile app is in development and will be released soon.",
    },
    {
      question: "Can I download videos and transcripts for offline viewing?",
      answer:
        "Yes, enrolled students can download course materials for offline viewing, subject to the permissions set by the course tutor.",
    },
    {
      question: "How do the real-time chat rooms work?",
      answer:
        "Each course has a dedicated chat room where enrolled students and the tutor can interact in real-time. The chat supports text, images, and file sharing to facilitate comprehensive discussions.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions about our platform.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
          <button className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
