
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, User, UserCog } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-8 w-8" />
                <h1 className="text-4xl font-bold">
                  Smart Road Cleanliness Tracker
                </h1>
              </div>
              <p className="text-xl text-blue-100">
                Connecting citizens with municipal authorities to build cleaner, healthier communities together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Link to="/login">
                    <User className="mr-2 h-5 w-5" />
                    Citizen Login
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Link to="/login">
                    <UserCog className="mr-2 h-5 w-5" />
                    Official Login
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Smart Road Cleanliness" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Report Issues</h3>
              <p className="text-gray-600">
                Citizens can easily report cleanliness issues by uploading photos and location details through the platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Stay informed about the status of your reported issues with real-time updates from municipal authorities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Get recognized for your contribution to community cleanliness through our rewards and leaderboard system.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-civic-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement for Cleaner Streets</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Together, we can make a significant impact on the cleanliness and livability of our communities. Sign up today to start reporting issues.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link to="/register">
              Register Now
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-white" />
                <h3 className="text-xl font-bold text-white">Smart Road Cleanliness</h3>
              </div>
              <p className="mb-4">
                A platform connecting citizens with municipal authorities for cleaner communities.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/user/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <p className="mb-2">Email: info@smartroadcleanliness.org</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Smart Road Cleanliness Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
