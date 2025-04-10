
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OfficialLayout from "@/components/layouts/OfficialLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Mail,
  FileText,
  Loader2
} from "lucide-react";

// Mock complaint data
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
    notes: [],
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
    notes: [],
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
    notes: [
      { date: "2023-03-29", note: "Inspection scheduled for tomorrow.", status: "pending" },
      { date: "2023-03-30", note: "Road crew dispatched to fix the pothole.", status: "in-progress" }
    ],
    images: ["/placeholder.svg"]
  }
];

const UpdateComplaintStatus = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState<typeof mockComplaints[0] | null>(null);
  const [status, setStatus] = useState<"pending" | "in-progress" | "resolved">("pending");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call to get the complaint details
    const fetchComplaint = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundComplaint = mockComplaints.find(c => c.id === id);
        
        if (foundComplaint) {
          setComplaint(foundComplaint);
          setStatus(foundComplaint.status as "pending" | "in-progress" | "resolved");
        } else {
          toast.error("Complaint not found");
          navigate("/official/view-complaints");
        }
      } catch (error) {
        console.error("Error fetching complaint:", error);
        toast.error("Failed to load complaint details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComplaint();
  }, [id, navigate]);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!note) {
      toast.error("Please add a note about the status update");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update the complaint status
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update complaint locally (in a real app, this would come from the API response)
      if (complaint) {
        const updatedComplaint = {
          ...complaint,
          status,
          notes: [
            ...complaint.notes,
            {
              date: new Date().toISOString().split('T')[0],
              note,
              status
            }
          ]
        };
        
        setComplaint(updatedComplaint);
        setNote("");
        
        toast.success("Complaint status updated successfully");
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
      toast.error("Failed to update complaint status");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getStatusIcon = (statusValue: string) => {
    switch(statusValue) {
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };
  
  if (isLoading) {
    return (
      <OfficialLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 text-civic-green animate-spin" />
          <span className="ml-2 text-lg">Loading complaint details...</span>
        </div>
      </OfficialLayout>
    );
  }
  
  if (!complaint) {
    return (
      <OfficialLayout>
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Complaint Not Found</h2>
          <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/official/view-complaints">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Complaints
            </Link>
          </Button>
        </div>
      </OfficialLayout>
    );
  }
  
  return (
    <OfficialLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Update Complaint Status</h1>
            <p className="text-gray-600">Update the status and add notes to the complaint</p>
          </div>
          <Button 
            asChild
            variant="outline"
          >
            <Link to="/official/view-complaints">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Complaints
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Update Status</CardTitle>
                  <CardDescription>
                    Change the current status of the complaint and add notes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Current Status</Label>
                    <RadioGroup 
                      value={status} 
                      onValueChange={(value) => setStatus(value as "pending" | "in-progress" | "resolved")}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pending" id="pending" />
                        <Label htmlFor="pending" className="flex items-center cursor-pointer">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                          Pending
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-progress" id="in-progress" />
                        <Label htmlFor="in-progress" className="flex items-center cursor-pointer">
                          <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                          In Progress
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="resolved" id="resolved" />
                        <Label htmlFor="resolved" className="flex items-center cursor-pointer">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Resolved
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="note">Add a Note <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="note"
                      placeholder="Provide an update about the complaint status (e.g., Team dispatched, Issue investigated, etc.)"
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      This note will be visible to the citizen who reported the issue
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button 
                    type="submit" 
                    className="bg-civic-green hover:bg-green-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Update History</CardTitle>
                <CardDescription>
                  Previous updates and status changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {complaint.notes.length > 0 ? (
                  <div className="space-y-4">
                    {complaint.notes.map((note, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 py-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(note.status)}
                          <span className="text-sm font-medium">{
                            note.status === "pending" ? "Pending" :
                            note.status === "in-progress" ? "In Progress" :
                            "Resolved"
                          }</span>
                          <span className="text-xs text-gray-500">
                            on {formatDate(note.date)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No updates yet</p>
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
                  Information about the complaint
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{complaint.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                </div>
                
                <div className="pt-2 border-t space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-sm">{complaint.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Date Reported</div>
                      <div className="text-sm">{formatDate(complaint.date)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Reported By</div>
                      <div className="text-sm">{complaint.reportedBy}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Contact</div>
                      <div className="text-sm">{complaint.reporterContact}</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Submitted Images</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {complaint.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image for ${complaint.title}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OfficialLayout>
  );
};

export default UpdateComplaintStatus;
