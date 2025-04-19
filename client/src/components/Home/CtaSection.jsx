import { ArrowRight } from "lucide-react"

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Teaching or Learning Experience?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join our community of educators and learners today and discover a new way to share knowledge and grow
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Schedule a Demo
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,000+</div>
              <p className="text-indigo-200">Active Students</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-indigo-200">Expert Tutors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <p className="text-indigo-200">Courses Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute left-0 right-0 h-20 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
      ></div>
    </section>
  )
}

export default CtaSection
