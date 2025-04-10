
import { useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertTriangle, Search, Filter, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock data for complaints
const mockComplaints = [
  {
    id: "c1",
    title: "Garbage Pile Near Bus Stop",
    location: "Main Street, Bus Stop #5",
    description: "Large pile of garbage accumulating near the bus stop. It's been there for at least 3 days.",
    status: "in-progress",
    date: "2023-04-05",
    updatedDate: "2023-04-06",
    officialNote: "Cleanup crew scheduled for tomorrow morning.",
    images: ["/placeholder.svg"]
  },
  {
    id: "c2",
    title: "Broken Street Light",
    location: "Park Avenue, Near City Mall",
    description: "Street light is broken causing darkness in the area at night. Creating safety issues.",
    status: "pending",
    date: "2023-04-03",
    updatedDate: null,
    officialNote: null,
    images: ["/placeholder.svg"]
  },
  {
    id: "c3",
    title: "Pothole in Road",
    location: "Oak Street, Near School",
    description: "Large pothole in the middle of the road causing traffic problems and potential vehicle damage.",
    status: "resolved",
    date: "2023-03-28",
    updatedDate: "2023-04-01",
    officialNote: "Pothole has been filled and road surface repaired.",
    images: ["/placeholder.svg"]
  },
  {
    id: "c4",
    title: "Graffiti on Public Wall",
    location: "River Walk, Near Bridge",
    description: "Inappropriate graffiti on the public wall. Needs to be cleaned.",
    status: "in-progress",
    date: "2023-03-25",
    updatedDate: "2023-03-26",
    officialNote: "Cleanup crew has been notified.",
    images: ["/placeholder.svg"]
  },
  {
    id: "c5",
    title: "Overgrown Vegetation Blocking Sidewalk",
    location: "Maple Street, Near Park",
    description: "Vegetation from empty lot has overgrown and is blocking the sidewalk.",
    status: "resolved",
    date: "2023-03-15",
    updatedDate: "2023-03-20",
    officialNote: "Area has been cleared and vegetation trimmed back.",
    images: ["/placeholder.svg"]
  }
];

type ComplaintStatus = "all" | "pending" | "in-progress" | "resolved";

const TrackComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus>("all");
  const [selectedComplaint, setSelectedComplaint] = useState<typeof mockComplaints[0] | null>(null);
  
  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Track Your Complaints</h1>
          <p className="text-gray-600">Monitor the status of your submitted cleanliness issues</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title or location"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filter: {statusFilter === "all" ? "All Status" : (
                  statusFilter === "in-progress" ? "In Progress" : 
                  statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
                  Resolved
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Complaints</CardTitle>
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
                        className="p-4 border rounded-lg hover:border-civic-blue cursor-pointer transition-colors"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{complaint.title}</h3>
                          {getStatusBadge(complaint.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{complaint.location}</p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{complaint.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                          <span>Submitted: {formatDate(complaint.date)}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-civic-blue hover:text-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedComplaint(complaint);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
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
                  Select a complaint to view details
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
                      <div className="text-sm text-gray-500 mb-2">
                        {selectedComplaint.location}
                      </div>
                      <p className="text-sm">{selectedComplaint.description}</p>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-medium mb-1">Status Updates</h4>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <span className="text-gray-500">Submitted:</span>{" "}
                          <span>{formatDate(selectedComplaint.date)}</span>
                        </div>
                        
                        {selectedComplaint.updatedDate && (
                          <div className="text-xs">
                            <span className="text-gray-500">Last Updated:</span>{" "}
                            <span>{formatDate(selectedComplaint.updatedDate)}</span>
                          </div>
                        )}
                        
                        {selectedComplaint.officialNote && (
                          <div className="mt-2">
                            <div className="text-xs font-medium mb-1">Official Note:</div>
                            <div className="text-sm bg-gray-50 p-2 rounded border">
                              {selectedComplaint.officialNote}
                            </div>
                          </div>
                        )}
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
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a complaint to view its details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default TrackComplaints;
