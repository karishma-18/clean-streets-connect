
import { useState } from "react";
import OfficialLayout from "@/components/layouts/OfficialLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/App";
import { User, Mail, Phone, Building, Camera, Loader2, Briefcase, MapPin } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  // Mock official profile data
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 456-7890",
    department: "Sanitation Department",
    jobTitle: "Sanitation Officer",
    employeeId: "EMP-5432",
    officeAddress: "City Hall, 123 Government Ave",
    avatar: "/placeholder.svg"
  });
  
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // In a real app, this would update the user profile in the backend
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.new !== password.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (password.new.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // In a real app, this would update the password in the backend
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password changed successfully");
      
      // Reset form
      setPassword({
        current: "",
        new: "",
        confirm: ""
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  return (
    <OfficialLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600">Manage your account and department information</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <form onSubmit={handleProfileUpdate}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal and professional information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <img
                        src={profileData.avatar}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                      />
                      <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1 bg-civic-green rounded-full cursor-pointer">
                        <Camera className="h-4 w-4 text-white" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">
                        Click the camera icon to upload a new profile picture
                      </p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Official Account
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-500" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 mr-1 text-gray-500" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-500" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employeeId" className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                          Employee ID
                        </Label>
                        <Input
                          id="employeeId"
                          value={profileData.employeeId}
                          onChange={(e) => setProfileData({ ...profileData, employeeId: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department" className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-gray-500" />
                          Department
                        </Label>
                        <Input
                          id="department"
                          value={profileData.department}
                          onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle" className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          value={profileData.jobTitle}
                          onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="officeAddress" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        Office Address
                      </Label>
                      <Input
                        id="officeAddress"
                        value={profileData.officeAddress}
                        onChange={(e) => setProfileData({ ...profileData, officeAddress: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button 
                    type="submit" 
                    className="bg-civic-green hover:bg-green-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <form onSubmit={handlePasswordChange}>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to maintain account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword({ ...password, current: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button 
                    type="submit" 
                    className="bg-civic-green hover:bg-green-600"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Actions in this section can't be undone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  className="w-full sm:w-auto"
                  onClick={() => toast.error("This feature is not available in the demo")}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OfficialLayout>
  );
};

export default Profile;
