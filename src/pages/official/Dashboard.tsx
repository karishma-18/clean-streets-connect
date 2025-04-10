
import OfficialLayout from "@/components/layouts/OfficialLayout";
import { useAuth } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  BarChart, 
  MapPin,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data for dashboard
const complaintsByStatus = [
  { name: "Pending", value: 14, color: "#EF4444" },
  { name: "In Progress", value: 8, color: "#FBBF24" },
  { name: "Resolved", value: 23, color: "#10B981" },
];

const complaintTrends = [
  { name: "Jan", pending: 4, inProgress: 2, resolved: 8 },
  { name: "Feb", pending: 3, inProgress: 3, resolved: 10 },
  { name: "Mar", pending: 5, inProgress: 2, resolved: 12 },
  { name: "Apr", pending: 7, inProgress: 4, resolved: 5 },
  { name: "May", pending: 2, inProgress: 3, resolved: 15 },
  { name: "Jun", pending: 4, inProgress: 2, resolved: 10 },
];

const topLocations = [
  { name: "Main Street", count: 12 },
  { name: "City Park Area", count: 8 },
  { name: "Downtown", count: 7 },
  { name: "North End", count: 5 },
];

const recentComplaints = [
  {
    id: "c1",
    title: "Garbage Pile Near Bus Stop",
    location: "Main Street, Bus Stop #5",
    status: "pending",
    date: "2023-04-05",
    reportedBy: "John Smith"
  },
  {
    id: "c2",
    title: "Broken Street Light",
    location: "Park Avenue, Near City Mall",
    status: "pending",
    date: "2023-04-03",
    reportedBy: "Sarah Johnson"
  },
  {
    id: "c3",
    title: "Pothole in Road",
    location: "Oak Street, Near School",
    status: "in-progress",
    date: "2023-03-28",
    reportedBy: "David Miller"
  }
];

const OfficialDashboard = () => {
  const { user } = useAuth();
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "resolved":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const totalComplaints = complaintsByStatus.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <OfficialLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Official Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}. Here's an overview of the cleanliness reports.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Complaints</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalComplaints}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ClipboardList className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Pending</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{complaintsByStatus[0].value}</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">In Progress</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{complaintsByStatus[1].value}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Resolved</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{complaintsByStatus[2].value}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FileCheck className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-gray-500" />
                Complaint Trends
              </CardTitle>
              <CardDescription>
                Monthly overview of complaints by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={complaintTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pending"
                      stroke="#EF4444"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="inProgress"
                      stroke="#FBBF24"
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke="#10B981"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-gray-500" />
                Complaints by Status
              </CardTitle>
              <CardDescription>
                Distribution of current complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complaintsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {complaintsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Complaints</CardTitle>
                <CardDescription>Latest issues reported by residents</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link to="/official/view-complaints">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 border rounded-lg flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(complaint.status)}
                        <h3 className="font-medium text-gray-800">{complaint.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{complaint.location}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-2">
                        <span>Reported by: {complaint.reportedBy}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(complaint.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                    >
                      <Link to={`/official/update-complaint/${complaint.id}`}>
                        Update Status
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                Top Complaint Locations
              </CardTitle>
              <CardDescription>
                Areas with the highest number of reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 
                          ? "bg-amber-100 text-amber-800" 
                          : index === 1 
                          ? "bg-gray-100 text-gray-800" 
                          : index === 2 
                          ? "bg-amber-50 text-amber-700" 
                          : "bg-blue-50 text-blue-800"
                      }`}>
                        {index + 1}
                      </div>
                      <span className="ml-3 font-medium">{location.name}</span>
                    </div>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {location.count} reports
                    </span>
                  </div>
                ))}
              </div>
              
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/official/view-complaints">
                  View All Locations
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </OfficialLayout>
  );
};

export default OfficialDashboard;
