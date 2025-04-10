
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Award, Phone } from "lucide-react";

const AboutUs = () => {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-600">Learn more about the Smart Road Cleanliness Tracker initiative</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Working together for cleaner communities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-civic-blue rounded-lg p-4 flex items-center justify-center md:w-1/3">
                <MapPin className="text-white w-20 h-20" />
              </div>
              
              <div className="md:w-2/3">
                <p className="text-gray-600 mb-4">
                  At Smart Road Cleanliness Tracker, our mission is to empower communities to take an active role in maintaining clean and healthy environments. We believe that by connecting citizens directly with municipal authorities, we can address cleanliness issues more efficiently and effectively.
                </p>
                <p className="text-gray-600">
                  Our platform serves as a bridge between residents who spot cleanliness issues and the officials responsible for resolving them. Through collaborative effort and transparent communication, we aim to create cleaner, more beautiful communities for everyone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-civic-blue" />
                For Citizens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-civic-blue mr-2">•</span>
                  Easily report cleanliness issues in your area
                </li>
                <li className="flex items-start">
                  <span className="text-civic-blue mr-2">•</span>
                  Track the status of your complaints in real-time
                </li>
                <li className="flex items-start">
                  <span className="text-civic-blue mr-2">•</span>
                  Receive updates when issues are addressed
                </li>
                <li className="flex items-start">
                  <span className="text-civic-blue mr-2">•</span>
                  Earn rewards for being an active community member
                </li>
                <li className="flex items-start">
                  <span className="text-civic-blue mr-2">•</span>
                  Contribute to making your community cleaner
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-civic-green" />
                For Officials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-civic-green mr-2">•</span>
                  Receive organized, detailed complaints
                </li>
                <li className="flex items-start">
                  <span className="text-civic-green mr-2">•</span>
                  Prioritize issues based on severity and location
                </li>
                <li className="flex items-start">
                  <span className="text-civic-green mr-2">•</span>
                  Update citizens on resolution progress
                </li>
                <li className="flex items-start">
                  <span className="text-civic-green mr-2">•</span>
                  Analyze patterns to improve resource allocation
                </li>
                <li className="flex items-start">
                  <span className="text-civic-green mr-2">•</span>
                  Build trust with community through transparency
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-civic-indigo" />
                Rewards Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-civic-indigo mr-2">•</span>
                  Earn points for submitting valid complaints
                </li>
                <li className="flex items-start">
                  <span className="text-civic-indigo mr-2">•</span>
                  Gain recognition on our community leaderboard
                </li>
                <li className="flex items-start">
                  <span className="text-civic-indigo mr-2">•</span>
                  Receive badges for different types of contributions
                </li>
                <li className="flex items-start">
                  <span className="text-civic-indigo mr-2">•</span>
                  Qualify for monthly community service awards
                </li>
                <li className="flex items-start">
                  <span className="text-civic-indigo mr-2">•</span>
                  Help build a culture of civic responsibility
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-lg font-medium mb-2">Have questions?</h3>
                <p className="text-gray-600 mb-4">
                  Our team is here to help with any questions you might have about using the Smart Road Cleanliness Tracker platform.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-civic-blue mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-civic-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span>support@smartroadcleanliness.org</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:border-l md:pl-6">
                <h3 className="text-lg font-medium mb-2">Office Hours</h3>
                <p className="text-gray-600 mb-4">
                  Our support team is available during the following hours:
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default AboutUs;
