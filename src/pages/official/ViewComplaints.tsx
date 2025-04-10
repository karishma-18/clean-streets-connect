
import { useState } from "react";
import OfficialLayout from "@/components/layouts/OfficialLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Check, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  FileText,
  Calendar,
  User,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for complaints
const mockComplaints = [
  {
    id: "c1",
    title: "Garbage Pile Near Bus Stop",
    location: "Main Street, Bus Stop #5",
    description: "Large pile of garbage accumulating near the bus stop. It's been there for at least 3 days.",
    status: "pending",
    date: "2023-04-05",
    reportedBy: "John Smith",
    reporterContact: "john.smith@example.com",
    images: ["/placeholder.svg"]
  },
  {
    id: "c2",
    title: "Broken Street Light",
    location: "Park Avenue, Near City Mall",
    description: "Street light is broken causing darkness in the area at night. Creating safety issues.",
    status: "pending",
    date: "2023-04-03",
    reportedBy: "Sarah Johnson",
    reporterContact: "sarah.j@example.com",
    images: ["/placeholder.svg"]
  },
  {
    id: "c3",
    title: "Pothole in Road",
    location: "Oak Street, Near School",
    description: "Large pothole in the middle of the road causing traffic problems and potential vehicle damage.",
    status: "in-progress",
    date: "2023-03-28",
    reportedBy: "David Miller",
    reporterContact: "d.miller@example.com",
    images: ["/placeholder.svg"]
  },
  {
    id: "c4",
    title: "Graffiti on Public Wall",
    location: "River Walk, Near Bridge",
    description: "Inappropriate graffiti on the public wall. Needs to be cleaned.",
    status: "in-progress",
    date: "2023-03-25",
    reportedBy: "Lisa Anderson",
    reporterContact: "lisa.a@example.com",
    images: ["/placeholder.svg"]
  },
  {
    id: "c5",
    title: "Overgrown Vegetation Blocking Sidewalk",
    location: "Maple Street, Near Park",
    description: "Vegetation from empty lot has overgrown and is blocking the sidewalk.",
    status: "resolved",
    date: "2023-03-15",
    reportedBy: "Robert Wilson",
    reporterContact: "r.wilson@example.com",
    images: ["/placeholder.svg"]
  },
  {
    id: "c6",
    title: "Broken Public Bench",
    location: "Central Park, East Entrance",
    description: "Wooden slats on public bench are broken, creating a safety hazard.",
    status: "resolved",
    date: "2023-03-10",
    reportedBy: "Jennifer Lee",
    reporterContact: "jen.lee@example.com",
    images: ["/placeholder.svg"]
  },
  {
    id: "c7",
    title: "Damaged Road Sign",
    location: "Pine Avenue, Corner of 5th",
    description: "Stop sign is bent and difficult to see from approaching vehicles.",
    status: "pending",
    date: "2023-04-01",
    reportedBy: "Michael Brown",
    reporterContact: "m.brown@example.com",
    images: ["/placeholder.svg"]
  }
];

const ViewComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<typeof mockComplaints[0] | null>(null);
  
  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || complaint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
  
  const getStatusBadge = (status: string) => {
    let classes;
    let label;
    
    switch(status) {
      case "resolved":
        classes = "bg-green-100 text-green-800";
        label = "Resolved";
        break;
      case "in-progress":
        classes = "bg-yellow-100 text-yellow-800";
        label = "In Progress";
        break;
      default:
        classes = "bg-red-100 text-red-800";
        label = "Pending";
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes}`}>
        {label}
      </span>
    );
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <OfficialLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">View All Complaints</h1>
          <p className="text-gray-600">Manage and update reported cleanliness issues</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title, location, or reporter"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex-shrink-0 w-full md:w-48">
            <Select
              defaultValue="all"
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Complaints</CardTitle>
                <CardDescription>
                  {filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredComplaints.length > 0 ? (
                  <div className="space-y-4">
                    {filteredComplaints.map((complaint) => (
                      <div 
                        key={complaint.id} 
                        className={`p-4 border rounded-lg hover:border-green-500 cursor-pointer transition-colors ${
                          selectedComplaint?.id === complaint.id ? "border-green-500 bg-green-50" : ""
                        }`}
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{complaint.title}</h3>
                          {getStatusBadge(complaint.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{complaint.location}</p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{complaint.description}</p>
                        <div className="flex flex-wrap gap-2 justify-between items-center text-xs text-gray-400">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(complaint.date)}
                            </span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {complaint.reportedBy}
                            </span>
                          </div>
                          <Button 
                            asChild
                            size="sm" 
                            className="text-civic-green hover:text-white hover:bg-civic-green"
                          >
                            <Link to={`/official/update-complaint/${complaint.id}`}>
                              Update Status
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No complaints matching your filters</p>
                    {searchTerm || statusFilter !== "all" ? (
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    ) : null}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
                <CardDescription>
                  Selected complaint information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedComplaint ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(selectedComplaint.status)}
                        <h3 className="font-medium">{selectedComplaint.title}</h3>
                      </div>
                      <div className="text-sm text-gray-500 mb-2 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedComplaint.location}
                      </div>
                      <p className="text-sm">{selectedComplaint.description}</p>
                    </div>
                    
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Date Reported</div>
                          <div className="text-sm">{formatDate(selectedComplaint.date)}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Reported By</div>
                          <div className="text-sm">{selectedComplaint.reportedBy}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Contact</div>
                          <div className="text-sm">{selectedComplaint.reporterContact}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-medium mb-2">Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedComplaint.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Image for ${selectedComplaint.title}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full bg-civic-green hover:bg-green-600"
                    >
                      <Link to={`/official/update-complaint/${selectedComplaint.id}`}>
                        Update Status
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a complaint to view its details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OfficialLayout>
  );
};

export default ViewComplaints;
