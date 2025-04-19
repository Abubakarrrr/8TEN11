import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Revolutionizing Education with AI
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Learn Without{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Limits
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              An AI-powered platform where teachers create, students engage, and
              learning happens in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Explore Courses
              </button>
            </div>

            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-200">
                <span className="font-bold">2,000+</span> students already
                enrolled
              </p>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md p-4 shadow-lg">
                  <div className="h-1/2 rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30 mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded-full w-full"></div>
                    <div className="h-3 bg-white/20 rounded-full w-3/4"></div>
                    <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
                    <div className="h-3 bg-white/20 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-purple-500/30 backdrop-blur-sm"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-indigo-500/30 backdrop-blur-sm"></div>
              <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-pink-500/30 backdrop-blur-sm"></div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-gray-800">
                <div className="text-xs font-semibold">Real-time</div>
                <div className="text-xs">Interaction</div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-12 bg-white rounded-lg shadow-lg p-3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div className="text-gray-800">
                <div className="text-xs font-semibold">AI Transcripts</div>
                <div className="text-xs">Automatic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
