
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/App";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "official">("user");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Simulating an API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login - in real app this would validate credentials with backend
      if (email && password) {
        const mockUser = {
          id: "user-123",
          name: role === "user" ? "John Citizen" : "Officer Johnson",
          email,
          role
        };
        
        login(mockUser);
        toast.success(`Welcome back, ${mockUser.name}!`);
        
        // Redirect based on role
        if (role === "user") {
          navigate("/user/dashboard");
        } else {
          navigate("/official/dashboard");
        }
      } else {
        toast.error("Please provide both email and password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-2">
            <MapPin className="h-8 w-8 text-civic-blue mr-2" />
            <h1 className="text-3xl font-bold text-civic-blue">
              Smart Road
            </h1>
          </div>
          <h2 className="text-xl font-bold text-civic-green">Cleanliness Tracker</h2>
          <p className="text-gray-600 mt-2">Connecting citizens with municipal authorities</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="user" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="user" 
                    onClick={() => setRole("user")}
                  >
                    Citizen
                  </TabsTrigger>
                  <TabsTrigger 
                    value="official" 
                    onClick={() => setRole("official")}
                  >
                    Municipal Official
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-sm text-civic-blue hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-civic-blue hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-civic-blue hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
