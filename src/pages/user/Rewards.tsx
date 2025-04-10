
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Trophy, Users, ThumbsUp } from "lucide-react";
import { useAuth } from "@/App";

// Mock data for leaderboard and rewards
const leaderboardData = [
  { id: 1, name: "John Smith", points: 1250, badge: "Gold" },
  { id: 2, name: "Sarah Johnson", points: 980, badge: "Silver" },
  { id: 3, name: "Michael Brown", points: 850, badge: "Silver" },
  { id: 4, name: "Emily Davis", points: 720, badge: "Bronze" },
  { id: 5, name: "Robert Wilson", points: 690, badge: "Bronze" },
  { id: 6, name: "Jennifer Lee", points: 550, badge: "Bronze" },
  { id: 7, name: "David Miller", points: 490, badge: "Standard" },
  { id: 8, name: "Lisa Anderson", points: 430, badge: "Standard" },
  { id: 9, name: "James Taylor", points: 380, badge: "Standard" },
  { id: 10, name: "Karen Moore", points: 320, badge: "Standard" },
];

const badgesData = [
  { id: 1, name: "First Report", description: "Submit your first complaint", icon: <Star className="h-8 w-8 text-civic-blue" />, acquired: true },
  { id: 2, name: "Consistent Reporter", description: "Submit 5 valid complaints", icon: <ThumbsUp className="h-8 w-8 text-civic-indigo" />, acquired: true },
  { id: 3, name: "Neighborhood Watchdog", description: "Submit 10 valid complaints", icon: <Users className="h-8 w-8 text-civic-green" />, acquired: false },
  { id: 4, name: "Community Champion", description: "Reach the top 5 on the leaderboard", icon: <Trophy className="h-8 w-8 text-amber-500" />, acquired: false },
];

const Rewards = () => {
  const { user } = useAuth();
  
  // Mock user stats
  const userStats = {
    totalPoints: 490,
    rank: 7,
    complaintsSubmitted: 7,
    complaintsResolved: 5,
    nextBadgePoints: 550,
    nextBadge: "Bronze"
  };
  
  // Calculate progress to next badge
  const progressToNextBadge = 
    (userStats.totalPoints / userStats.nextBadgePoints) * 100;
  
  // Find current user in leaderboard
  const currentUserInLeaderboard = leaderboardData.find(
    (entry) => entry.id === userStats.rank
  );
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rewards & Recognition</h1>
          <p className="text-gray-600">Track your contributions and see your impact</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Your current status and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className="rounded-full bg-civic-blue/10 p-6">
                      <Award className="h-16 w-16 text-civic-blue" />
                    </div>
                    
                    {currentUserInLeaderboard && (
                      <div className="absolute -top-2 -right-2 bg-civic-indigo text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center border-2 border-white">
                        #{userStats.rank}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold mt-4">{userStats.totalPoints} Points</h3>
                  <p className="text-sm text-gray-500">{currentUserInLeaderboard?.badge || "Standard"} Level</p>
                </div>
                
                <div className="md:w-2/3">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Progress to {userStats.nextBadge} Badge</span>
                        <span>{userStats.totalPoints}/{userStats.nextBadgePoints} points</span>
                      </div>
                      <Progress value={progressToNextBadge} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-civic-blue">
                          {userStats.complaintsSubmitted}
                        </div>
                        <div className="text-sm text-gray-600">
                          Complaints Submitted
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-civic-green">
                          {userStats.complaintsResolved}
                        </div>
                        <div className="text-sm text-gray-600">
                          Complaints Resolved
                        </div>
                      </div>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-civic-indigo">
                          {userStats.complaintsSubmitted > 0 
                            ? Math.round((userStats.complaintsResolved / userStats.complaintsSubmitted) * 100)
                            : 0}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Resolution Rate
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-amber-500">
                          {badgesData.filter(badge => badge.acquired).length}
                        </div>
                        <div className="text-sm text-gray-600">
                          Badges Earned
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
              <CardDescription>
                Contribute to our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Submit a complaint</span>
                  <span className="font-medium">+50 pts</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span>Complaint verified</span>
                  <span className="font-medium">+30 pts</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-amber-50 rounded">
                  <span>Complaint resolved</span>
                  <span className="font-medium">+20 pts</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-indigo-50 rounded">
                  <span>Earn a badge</span>
                  <span className="font-medium">+100 pts</span>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                Points contribute to your rank on the leaderboard and help you earn special recognition badges.
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
            <CardDescription>
              Achievements you've unlocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {badgesData.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`p-4 rounded-lg border flex flex-col items-center text-center ${
                    badge.acquired 
                      ? "bg-white" 
                      : "bg-gray-50 opacity-60"
                  }`}
                >
                  <div className={`p-3 rounded-full mb-2 ${
                    badge.acquired ? "bg-blue-50" : "bg-gray-100"
                  }`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-medium">{badge.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                  {badge.acquired ? (
                    <span className="mt-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Earned
                    </span>
                  ) : (
                    <span className="mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      Locked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Community Leaderboard</CardTitle>
            <CardDescription>
              Top contributors in your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-center">Badge</th>
                    <th className="px-4 py-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-b ${
                        user.id === userStats.rank 
                          ? "bg-blue-50" 
                          : index < 3 ? "bg-amber-50/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        {index === 0 ? (
                          <div className="flex items-center justify-center bg-amber-400 text-white rounded-full w-6 h-6">
                            1
                          </div>
                        ) : index === 1 ? (
                          <div className="flex items-center justify-center bg-gray-400 text-white rounded-full w-6 h-6">
                            2
                          </div>
                        ) : index === 2 ? (
                          <div className="flex items-center justify-center bg-amber-700 text-white rounded-full w-6 h-6">
                            3
                          </div>
                        ) : (
                          <div className="px-1">{index + 1}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {user.name}
                        {user.id === userStats.rank && " (You)"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.badge === "Gold" 
                            ? "bg-amber-100 text-amber-800" 
                            : user.badge === "Silver" 
                            ? "bg-gray-100 text-gray-800" 
                            : user.badge === "Bronze" 
                            ? "bg-amber-50 text-amber-700" 
                            : "bg-blue-50 text-blue-800"
                        }`}>
                          {user.badge}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {user.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Rewards;
