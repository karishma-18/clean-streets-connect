
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  MapPin, 
  Calendar, 
  User,
  Mail as MailIcon, 
  ArrowUpDown, 
  Eye
} from "lucide-react";
import OfficialLayout from "@/components/layouts/OfficialLayout";
import { format, isAfter, isBefore, isToday, subDays } from "date-fns";

// Mock complaints data
const mockComplaints = [
  {
    id: "comp-123",
    title: "Garbage Overflow",
    description: "Large pile of garbage on the street corner that hasn't been collected for over a week",
    location: "123 Main Street, Downtown",
    dateSubmitted: new Date(2023, 3, 15),
    status: "inProgress",
    priority: "medium",
    imageUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4fd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYmFnZXxlbnwwfHwwfHx8MA%3D%3D",
    userId: "user-123",
    userName: "John Citizen",
    userContact: "john@example.com",
    category: "waste"
  },
  {
    id: "comp-124",
    title: "Pothole Damage",
    description: "Large pothole causing damage to vehicles",
    location: "456 Oak Avenue, Uptown",
    dateSubmitted: new Date(2023, 3, 10),
    status: "pending",
    priority: "high",
    imageUrl: "https://images.unsplash.com/photo-1598368185298-0025252273da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG90aG9sZXxlbnwwfHwwfHx8MA%3D%3D",
    userId: "user-124",
    userName: "Sarah Johnson",
    userContact: "sarah@example.com",
    category: "roads"
  },
  {
    id: "comp-125",
    title: "Street Light Outage",
    description: "Several street lights not working on residential block",
    location: "789 Elm Street, Midtown",
    dateSubmitted: new Date(2023, 3, 12),
    status: "resolved",
    priority: "medium",
    imageUrl: "https://images.unsplash.com/photo-1595683363301-1e42d9d404be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0JTIwbGlnaHR8ZW58MHx8MHx8fDA%3D",
    userId: "user-125",
    userName: "Michael Brown",
    userContact: "michael@example.com",
    category: "lighting"
  },
  {
    id: "comp-126",
    title: "Graffiti on Public Building",
    description: "Offensive graffiti on the wall of public library",
    location: "101 Library Lane, Downtown",
    dateSubmitted: new Date(2023, 3, 5),
    status: "rejected",
    priority: "low",
    imageUrl: "https://images.unsplash.com/photo-1583396060233-3d13dbadf242?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZmZpdGl8ZW58MHx8MHx8fDA%3D",
    userId: "user-126",
    userName: "Emily Davis",
    userContact: "emily@example.com",
    category: "vandalism"
  },
  {
    id: "comp-127",
    title: "Broken Park Bench",
    description: "Wooden bench in city park is broken and unsafe",
    location: "Central Park, North Entrance",
    dateSubmitted: new Date(),
    status: "pending",
    priority: "low",
    imageUrl: "https://images.unsplash.com/photo-1573551565922-aec98de55fe2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJva2VuJTIwYmVuY2h8ZW58MHx8MHx8fDA%3D",
    userId: "user-127",
    userName: "Robert Wilson",
    userContact: "robert@example.com",
    category: "parks"
  },
  {
    id: "comp-128",
    title: "Water Main Break",
    description: "Water flooding the street from broken main",
    location: "222 River Road, Riverside",
    dateSubmitted: new Date(),
    status: "inProgress",
    priority: "high",
    imageUrl: "https://images.unsplash.com/photo-1626179733873-4296cbdad4c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBtYWlufGVufDB8fDB8fHww",
    userId: "user-128",
    userName: "Amanda Martinez",
    userContact: "amanda@example.com",
    category: "water"
  }
];

// Status options with colors and icons
const statusMap = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: <Clock className="h-4 w-4" /> },
  inProgress: { label: "In Progress", color: "bg-blue-100 text-blue-700", icon: <Clock className="h-4 w-4" /> },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-700", icon: <CheckCircle className="h-4 w-4" /> },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: <AlertTriangle className="h-4 w-4" /> }
};

// Category options
const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "waste", label: "Waste Management" },
  { value: "roads", label: "Roads & Sidewalks" },
  { value: "lighting", label: "Street Lighting" },
  { value: "parks", label: "Parks & Recreation" },
  { value: "water", label: "Water & Sewage" },
  { value: "vandalism", label: "Vandalism" },
  { value: "other", label: "Other" }
];

// Priority badges
const priorityBadges = {
  low: <Badge variant="outline" className="bg-gray-100">Low</Badge>,
  medium: <Badge variant="outline" className="bg-amber-100">Medium</Badge>,
  high: <Badge variant="outline" className="bg-red-100">High</Badge>
};

const ViewComplaints = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([]);
  
  // Filter complaints based on search, status, date, and category
  const filterComplaints = () => {
    return mockComplaints.filter(complaint => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.userName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
      
      // Date filter
      let matchesDate = true;
      const today = new Date();
      if (dateFilter === "today") {
        matchesDate = isToday(complaint.dateSubmitted);
      } else if (dateFilter === "week") {
        matchesDate = isAfter(complaint.dateSubmitted, subDays(today, 7));
      } else if (dateFilter === "month") {
        matchesDate = isAfter(complaint.dateSubmitted, new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()));
      }
      
      // Category filter
      const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesDate && matchesCategory;
    }).sort((a, b) => {
      // Sort by selected option
      if (sortBy === "newest") {
        return isBefore(a.dateSubmitted, b.dateSubmitted) ? 1 : -1;
      } else if (sortBy === "oldest") {
        return isAfter(a.dateSubmitted, b.dateSubmitted) ? 1 : -1;
      } else if (sortBy === "priority") {
        const priorityMap = { high: 3, medium: 2, low: 1 };
        return priorityMap[b.priority as keyof typeof priorityMap] - priorityMap[a.priority as keyof typeof priorityMap];
      }
      return 0;
    });
  };
  
  const filteredComplaints = filterComplaints();
  
  // Toggle complaint selection for bulk actions
  const toggleComplaintSelection = (id: string) => {
    setSelectedComplaints(prev => 
      prev.includes(id) 
        ? prev.filter(complaintId => complaintId !== id) 
        : [...prev, id]
    );
  };
  
  // Check if all visible complaints are selected
  const allSelected = filteredComplaints.length > 0 && 
    filteredComplaints.every(complaint => selectedComplaints.includes(complaint.id));
  
  // Toggle selection of all visible complaints
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedComplaints([]);
    } else {
      setSelectedComplaints(filteredComplaints.map(complaint => complaint.id));
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateFilter("all");
    setCategoryFilter("all");
    setSortBy("newest");
  };
  
  // Handle view complaint details
  const handleViewComplaint = (id: string) => {
    navigate(`/official/update-complaint/${id}`);
  };
  
  return (
    <OfficialLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Citizen Complaints</h1>
            <p className="text-gray-600">Manage and respond to citizen-reported issues</p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Date filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Category filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <div className="flex items-center mb-4 sm:mb-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-sm"
                >
                  Reset Filters
                </Button>
                <div className="ml-4 text-sm text-gray-500">
                  {filteredComplaints.length} {filteredComplaints.length === 1 ? "complaint" : "complaints"} found
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="priority">Priority (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={showBulkActions ? "bg-muted" : ""}
                  onClick={() => setShowBulkActions(!showBulkActions)}
                >
                  {showBulkActions ? "Hide Bulk Actions" : "Bulk Actions"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {filteredComplaints.length > 0 ? (
          <div className="grid gap-4">
            {showBulkActions && (
              <Card className="border-dashed border-2 border-blue-200 bg-blue-50">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="select-all" 
                        checked={allSelected}
                        onCheckedChange={toggleSelectAll}
                      />
                      <label 
                        htmlFor="select-all" 
                        className="text-sm font-medium"
                      >
                        {selectedComplaints.length === 0 
                          ? "Select all complaints" 
                          : `${selectedComplaints.length} selected`}
                      </label>
                    </div>
                    
                    {selectedComplaints.length > 0 && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                        <Button variant="outline" size="sm">
                          Export
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image thumbnail (if available) */}
                  {complaint.imageUrl && (
                    <div className="md:w-48 h-48 flex-shrink-0">
                      <img 
                        src={complaint.imageUrl} 
                        alt={complaint.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      {/* Left side: Title and status */}
                      <div>
                        <div className="flex items-center">
                          {showBulkActions && (
                            <Checkbox 
                              className="mr-2" 
                              checked={selectedComplaints.includes(complaint.id)} 
                              onCheckedChange={() => toggleComplaintSelection(complaint.id)}
                            />
                          )}
                          <h3 className="text-lg font-semibold">{complaint.title}</h3>
                          <div className={`ml-3 px-2 py-1 rounded-full text-xs ${statusMap[complaint.status as keyof typeof statusMap].color} flex items-center`}>
                            {statusMap[complaint.status as keyof typeof statusMap].icon}
                            <span className="ml-1">{statusMap[complaint.status as keyof typeof statusMap].label}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                      </div>
                      
                      {/* Right side: priority badge */}
                      <div className="mt-2 md:mt-0">
                        {priorityBadges[complaint.priority as keyof typeof priorityBadges]}
                      </div>
                    </div>
                    
                    {/* Details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{complaint.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{format(complaint.dateSubmitted, "PPP")}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-1" />
                        <span>{complaint.userName}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t">
                      <div className="flex items-center text-gray-600">
                        <MailIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">{complaint.userContact}</span>
                      </div>
                      
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleViewComplaint(complaint.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No complaints found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
                <Button onClick={resetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </OfficialLayout>
  );
};

export default ViewComplaints;
