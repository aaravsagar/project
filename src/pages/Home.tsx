import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Target, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://www.sal.edu.in/storage/site-data/logo-1.png" 
                  alt="SAL Institute Logo" 
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto filter brightness-0 invert"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Smart India Hackathon
                <span className="block text-yellow-400">2025</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-2">
                SAL Institute of Diploma Studies
              </p>
              <p className="text-sm sm:text-base md:text-lg text-blue-200 mb-6 md:mb-8">
                Innovation • Technology • Excellence
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-6 md:mb-8">
              <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed px-2 sm:px-4">
                Join India's biggest hackathon and showcase your innovative solutions 
                to real-world problems. Register your team now and be part of the 
                technological revolution.
              </p>
            </div>

            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
              >
                Register Your Team Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              About Smart India Hackathon 2025
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto px-2 sm:px-4 leading-relaxed">
              Smart India Hackathon is a nationwide initiative to provide students 
              a platform to solve pressing problems we face in our daily lives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Team Collaboration</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  Form teams of 6 members and work together to create innovative 
                  solutions for complex real-world problems.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <Target className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Problem Solving</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  Choose from various problem statements across different domains 
                  and create impactful technology solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Timeline</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  36-hour hackathon with mentorship, resources, and the opportunity 
                  to compete at the national level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Ready to Change the World?
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-blue-100 mb-6 md:mb-8">
            Register your team today and join thousands of innovators across India
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-900 hover:bg-gray-100 font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto"
            >
              Start Registration
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}