
import { useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, MapPin, Camera, Loader2 } from "lucide-react";

const GiveComplaint = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
      
      // Create previews
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  
  const getLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would do reverse geocoding to get a human-readable address
        setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
        setIsGettingLocation(false);
        toast.success("Location detected successfully");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Could not get your location. Please enter it manually.");
        setIsGettingLocation(false);
      }
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would upload the images and send the complaint data
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Complaint submitted successfully");
      
      // Reset the form
      setTitle("");
      setDescription("");
      setLocation("");
      
      // Clean up image previews
      previews.forEach(URL.revokeObjectURL);
      setImages([]);
      setPreviews([]);
      
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Cleanliness Issue</h1>
          <p className="text-gray-600">Submit details about the issue you've noticed</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>
                Fill in the details about the cleanliness issue. Be as specific as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  placeholder="Briefly describe the issue (e.g., Garbage pile on Main Street)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about the issue (size, severity, how long it's been there, etc.)"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Street address or description of the location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-shrink-0"
                    onClick={getLocation}
                    disabled={isGettingLocation}
                  >
                    {isGettingLocation ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2" />
                    )}
                    {isGettingLocation ? "Detecting..." : "Detect Location"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Enter the address or nearby landmark where the issue is located</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images <span className="text-red-500">*</span></Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">
                      Upload images of the cleanliness issue
                    </p>
                    <label htmlFor="images-upload" className="cursor-pointer">
                      <div className="bg-civic-blue text-white px-4 py-2 rounded-md flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        Select Files
                      </div>
                      <input
                        id="images-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                
                {previews.length > 0 && (
                  <div className="mt-4">
                    <Label>Selected Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-md flex items-center justify-center">
                            <button
                              type="button"
                              className="opacity-0 group-hover:opacity-100 text-white bg-red-500 hover:bg-red-600 rounded-full p-1"
                              onClick={() => removeImage(index)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button 
                type="submit" 
                className="bg-civic-blue hover:bg-blue-600 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Complaint"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </UserLayout>
  );
};

export default GiveComplaint;
