
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import OfficialLayout from "@/components/layouts/OfficialLayout";
import { format } from "date-fns";

// Mock complaint data
const getMockComplaint = (id: string) => {
  return {
    id,
    title: "Garbage Overflow",
    description: "Large pile of garbage on the street corner that hasn't been collected for over a week. It's causing bad odor and attracting pests.",
    location: "123 Main Street, Downtown",
    dateSubmitted: new Date(2023, 3, 15),
    status: "inProgress",
    imageUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4fd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYmFnZXxlbnwwfHwwfHx8MA%3D%3D",
    userId: "user-123",
    userName: "John Citizen",
    userContact: "john@example.com",
    updatedAt: new Date(2023, 3, 17),
    notes: [
      {
        id: "note-1",
        text: "Dispatched cleaning crew to assess the situation",
        timestamp: new Date(2023, 3, 16),
        officialName: "Officer Johnson"
      },
      {
        id: "note-2",
        text: "Team arrived at location, garbage volume larger than expected, requesting additional resources",
        timestamp: new Date(2023, 3, 17),
        officialName: "Officer Johnson"
      }
    ]
  };
};

// Status options with colors and icons
const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-700", icon: <Clock className="h-4 w-4" /> },
  { value: "inProgress", label: "In Progress", color: "bg-blue-100 text-blue-700", icon: <Clock className="h-4 w-4" /> },
  { value: "resolved", label: "Resolved", color: "bg-green-100 text-green-700", icon: <CheckCircle className="h-4 w-4" /> },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-700", icon: <AlertTriangle className="h-4 w-4" /> }
];

// Function to get status display info
const getStatusInfo = (status: string) => {
  return statusOptions.find(option => option.value === status) || statusOptions[0];
};

const UpdateComplaintStatus = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  // In a real app, this would fetch from an API
  const [complaint, setComplaint] = useState(getMockComplaint(id || "unknown"));
  const [status, setStatus] = useState(complaint.status);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleStatusUpdate = async () => {
    if (!note.trim()) {
      toast.error("Please add a note explaining the status update");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update complaint in state (in a real app, this would be an API call)
      const updatedComplaint = {
        ...complaint,
        status,
        updatedAt: new Date(),
        notes: [
          ...complaint.notes,
          {
            id: `note-${complaint.notes.length + 1}`,
            text: note,
            timestamp: new Date(),
            officialName: user?.name || "Unknown Official"
          }
        ]
      };
      
      setComplaint(updatedComplaint);
      setNote("");
      
      toast.success("Complaint status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <OfficialLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Link to="/official/view-complaints" className="flex items-center text-civic-blue hover:text-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Complaints</span>
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Complaint Details */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Complaint #{complaint.id.substring(0, 8)}
                  <div className={`px-3 py-1 rounded-full text-sm ${getStatusInfo(complaint.status).color} flex items-center`}>
                    {getStatusInfo(complaint.status).icon}
                    <span className="ml-1">{getStatusInfo(complaint.status).label}</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Submitted on {format(complaint.dateSubmitted, "PPP")} by {complaint.userName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">{complaint.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                  <div className="text-sm font-medium mb-4">Location: {complaint.location}</div>
                  
                  {complaint.imageUrl && (
                    <div className="mt-4">
                      <img 
                        src={complaint.imageUrl} 
                        alt="Complaint" 
                        className="rounded-md max-h-64 w-auto object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Activity Log</h3>
                  <div className="space-y-3">
                    {complaint.notes.map((noteItem) => (
                      <div key={noteItem.id} className="border-l-2 border-gray-200 pl-4 py-1">
                        <div className="text-sm">{noteItem.text}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {format(noteItem.timestamp, "PPp")} by {noteItem.officialName}
                        </div>
                      </div>
                    ))}
                    
                    {complaint.notes.length === 0 && (
                      <p className="text-sm text-gray-500">No activity yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Update Status Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
                <CardDescription>
                  Change the status and add notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={status} 
                    onValueChange={setStatus}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note">Add a Note</Label>
                  <Textarea 
                    id="note" 
                    placeholder="Explain the status change or add relevant information..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={5}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleStatusUpdate} 
                  className="w-full bg-civic-green hover:bg-green-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Status"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-gray-500">Citizen Name</Label>
                      <p className="font-medium">{complaint.userName}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Contact Email</Label>
                      <p className="font-medium">{complaint.userContact}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="#" className="text-civic-blue hover:text-blue-700 text-sm">
                    Contact Citizen
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </OfficialLayout>
  );
};

export default UpdateComplaintStatus;
