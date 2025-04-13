
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Camera, 
  MapPin, 
  Upload, 
  AlertCircle,
  X as XIcon
} from "lucide-react";
import UserLayout from "@/components/layouts/UserLayout";

const GiveComplaint = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  
  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would use a geocoding service to get a human-readable address
        // For now, we'll just use the coordinates
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`);
        setIsGettingLocation(false);
        toast.success("Location detected successfully");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Couldn't get your location. Please enter it manually.");
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !description.trim() || !location.trim() || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to submit the form
      // including uploading the image
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Complaint submitted successfully!");
      navigate("/user/track-complaints");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <UserLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Submit a Complaint</h1>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Report an Issue</CardTitle>
            <CardDescription>
              Help us improve your neighborhood by reporting cleanliness or infrastructure issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title describing the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="waste">Waste Management</SelectItem> */}
                    {/* <SelectItem value="roads">Roads & Sidewalks</SelectItem> */}
                    {/* <SelectItem value="lighting">Street Lighting</SelectItem> */}
                    {/* <SelectItem value="parks">Parks & Recreation</SelectItem> */}
                    {/* <SelectItem value="water">Water & Sewage</SelectItem>  */}
                    <SelectItem value="roads">Roads & Sidewalks</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the issue"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex">
                  <Input
                    id="location"
                    placeholder="Address or description of location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="ml-2" 
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    {isGettingLocation ? "Detecting..." : "Current Location"}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-64 mt-2 mx-auto rounded-md object-contain"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 p-2"
                        onClick={removeImage}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Camera className="h-12 w-12 text-gray-400 mb-3" />
                      <div className="text-center">
                        <Label
                          htmlFor="image-upload"
                          className="text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
                        >
                          Click to upload
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-start">
                <AlertCircle className="text-amber-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Important Note:</p>
                  <p>Your complaint will be reviewed by municipal authorities. Please provide accurate information to help us address the issue effectively.</p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => navigate("/user/dashboard")}
            >
              Cancel
            </Button>
            <Button 
              className="bg-civic-blue hover:bg-blue-700 w-full sm:w-auto"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Complaint
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </UserLayout>
  );
};

export default GiveComplaint;
