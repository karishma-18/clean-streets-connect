
import UserLayout from "@/components/layouts/UserLayout";
import { useAuth } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Award, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  
  // Mock complaints data
  const recentComplaints = [
    {
      id: "c1",
      title: "Garbage Pile Near Bus Stop",
      location: "Main Street, Bus Stop #5",
      status: "in-progress",
      date: "2023-04-05"
    },
    {
      id: "c2",
      title: "Dry Waste",
      location: "Park Avenue, Near City Mall",
      status: "pending",
      date: "2023-04-03"
    },
    {
      id: "c3",
      title: "Unclean Road",
      location: "Oak Street, Near School",
      status: "resolved",
      date: "2023-03-28"
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "resolved":
        return <Check className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case "resolved":
        return "Resolved";
      case "in-progress":
        return "In Progress";
      default:
        return "Pending";
    }
  };
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Let's keep our streets clean together</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Report Issue</CardTitle>
              <CardDescription>Submit a new cleanliness complaint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-8 w-8 text-civic-blue" />
                </div>
              </div>
              <Button asChild className="w-full bg-civic-blue hover:bg-blue-600">
                <Link to="/user/give-complaint">
                  Report Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Track Issues</CardTitle>
              <CardDescription>Follow up on your reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="h-8 w-8 text-civic-green" />
                </div>
              </div>
              <Button asChild className="w-full bg-civic-green hover:bg-green-600">
                <Link to="/user/track-complaints">
                  View Status
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rewards</CardTitle>
              <CardDescription>Check your points and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Award className="h-8 w-8 text-civic-indigo" />
                </div>
              </div>
              <Button asChild className="w-full bg-civic-indigo hover:bg-indigo-600">
                <Link to="/user/rewards">
                  View Rewards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Your recently submitted issues</CardDescription>
          </CardHeader>
          <CardContent>
            {recentComplaints.length > 0 ? (
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">{complaint.title}</h3>
                      <p className="text-sm text-gray-500">{complaint.location}</p>
                      <p className="text-xs text-gray-400 mt-1">Reported on: {new Date(complaint.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(complaint.status)}
                      <span className="ml-2 text-sm font-medium">
                        {getStatusText(complaint.status)}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link to="/user/track-complaints">
                    View All Complaints
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No complaints submitted yet</p>
                <Button asChild className="mt-4">
                  <Link to="/user/give-complaint">
                    Submit Your First Complaint
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
