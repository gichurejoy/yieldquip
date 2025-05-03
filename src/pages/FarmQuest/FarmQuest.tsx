
import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Trophy,
  Star,
  Medal,
  Book,
  Plus,
  LucideIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNotifications } from "@/hooks/use-notifications";

interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "crop" | "livestock" | "sustainability" | "business";
  progress: number;
  completed: boolean;
  deadline?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  earnedDate?: string;
  progress: number;
}

const FarmQuest = () => {
  const { addNotification } = useNotifications();
  const [showNewQuestDialog, setShowNewQuestDialog] = useState(false);
  const [newQuestTitle, setNewQuestTitle] = useState("");
  const [newQuestDescription, setNewQuestDescription] = useState("");
  const [activeQuests, setActiveQuests] = useState<Quest[]>([
    {
      id: "q1",
      title: "Sustainable Water Management",
      description: "Implement water conservation techniques in your irrigation system to reduce usage by 20%.",
      points: 150,
      difficulty: "intermediate",
      category: "sustainability",
      progress: 65,
      completed: false,
      deadline: "May 20, 2025"
    },
    {
      id: "q2",
      title: "Organic Pest Control",
      description: "Use natural pest control methods across your farm for an entire growing season.",
      points: 200,
      difficulty: "advanced",
      category: "crop",
      progress: 30,
      completed: false,
      deadline: "June 15, 2025"
    },
    {
      id: "q3",
      title: "Market Diversity",
      description: "Sell your produce through at least three different channels this season.",
      points: 100,
      difficulty: "beginner",
      category: "business",
      progress: 95,
      completed: false
    },
  ]);
  
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([
    {
      id: "q4",
      title: "Crop Rotation Planning",
      description: "Create and implement a three-year crop rotation plan for improved soil health.",
      points: 120,
      difficulty: "intermediate",
      category: "crop",
      progress: 100,
      completed: true
    },
    {
      id: "q5",
      title: "Farm Record System",
      description: "Set up a complete digital record-keeping system for all farm activities.",
      points: 80,
      difficulty: "beginner",
      category: "business",
      progress: 100,
      completed: true
    },
  ]);
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "a1",
      title: "Master Grower",
      description: "Achieve exceptional yields for three consecutive seasons",
      icon: Award,
      earnedDate: "April 10, 2025",
      progress: 100
    },
    {
      id: "a2",
      title: "Sustainability Champion",
      description: "Implement five different eco-friendly practices on your farm",
      icon: Trophy,
      progress: 80
    },
    {
      id: "a3",
      title: "Market Maestro",
      description: "Sell products through six different market channels",
      icon: Star,
      progress: 50
    },
    {
      id: "a4",
      title: "Farming Scholar",
      description: "Complete ten educational modules on modern farming techniques",
      icon: Book,
      earnedDate: "March 5, 2025",
      progress: 100
    },
  ]);

  const handleCreateQuest = () => {
    if (!newQuestTitle || !newQuestDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newQuest: Quest = {
      id: `q${Date.now()}`,
      title: newQuestTitle,
      description: newQuestDescription,
      points: 100,
      difficulty: "beginner",
      category: "crop",
      progress: 0,
      completed: false
    };
    
    setActiveQuests([...activeQuests, newQuest]);
    
    toast({
      title: "Quest Created",
      description: "Your new farming goal has been added to your quests",
    });
    
    // Add notification
    addNotification({
      message: "New farming quest added: " + newQuestTitle,
      category: "farm"
    });
    
    setShowNewQuestDialog(false);
    setNewQuestTitle("");
    setNewQuestDescription("");
  };

  const handleUpdateProgress = (questId: string, newProgress: number) => {
    const updatedQuests = activeQuests.map(quest => {
      if (quest.id === questId) {
        const updated = { ...quest, progress: newProgress };
        
        // If progress is 100%, mark as completed
        if (newProgress === 100) {
          updated.completed = true;
          
          // Add notification
          addNotification({
            message: `Congratulations! You've completed the quest: ${quest.title}`,
            category: "farm"
          });
          
          toast({
            title: "Quest Completed!",
            description: `You've earned ${quest.points} points for completing "${quest.title}"`,
          });
          
          // Move to completed quests
          setCompletedQuests([...completedQuests, updated]);
          return null;
        }
        return updated;
      }
      return quest;
    }).filter(Boolean) as Quest[];
    
    setActiveQuests(updatedQuests);
  };

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800"
  };
  
  const categoryIcons = {
    crop: <Award className="h-4 w-4" />,
    livestock: <Medal className="h-4 w-4" />,
    sustainability: <Trophy className="h-4 w-4" />,
    business: <Book className="h-4 w-4" />
  };
  
  const totalPoints = activeQuests.reduce((sum, quest) => {
    return sum + (quest.progress / 100 * quest.points);
  }, 0) + completedQuests.reduce((sum, quest) => sum + quest.points, 0);
  
  const totalQuestsCompleted = completedQuests.length;
  const farmerLevel = Math.floor(totalPoints / 500) + 1;
  const pointsToNextLevel = 500 - (totalPoints % 500);
  const progressToNextLevel = ((500 - pointsToNextLevel) / 500) * 100;

  return (
    <PageLayout title="FarmQuest" subtitle="Track farming goals and earn rewards">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your farming goals and achievements</CardDescription>
                </div>
                <Dialog open={showNewQuestDialog} onOpenChange={setShowNewQuestDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-1 h-4 w-4" /> New Quest
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Quest</DialogTitle>
                      <DialogDescription>
                        Define a new farming goal to track and accomplish
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Quest Title</Label>
                        <Input 
                          id="title" 
                          value={newQuestTitle}
                          onChange={(e) => setNewQuestTitle(e.target.value)}
                          placeholder="e.g., Implement Crop Rotation" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newQuestDescription}
                          onChange={(e) => setNewQuestDescription(e.target.value)}
                          placeholder="Describe what you need to accomplish"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewQuestDialog(false)}>Cancel</Button>
                      <Button onClick={handleCreateQuest}>Create Quest</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="active">Active Quests</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  <div className="space-y-4">
                    {activeQuests.length > 0 ? (
                      activeQuests.map((quest) => (
                        <Card key={quest.id} className="overflow-hidden">
                          <div className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{quest.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
                              </div>
                              <Badge className={difficultyColors[quest.difficulty]}>
                                {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-3">
                              {categoryIcons[quest.category]}
                              <span className="text-xs text-muted-foreground capitalize">{quest.category}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <Trophy className="h-4 w-4 text-amber-500" />
                              <span className="text-xs font-medium">{quest.points} points</span>
                              
                              {quest.deadline && (
                                <>
                                  <Separator orientation="vertical" className="h-3" />
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">Due: {quest.deadline}</span>
                                </>
                              )}
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-muted-foreground">Progress</span>
                                <span>{quest.progress}%</span>
                              </div>
                              <Progress value={quest.progress} className="h-2" />
                            </div>
                            
                            <div className="flex justify-end mt-3 gap-2">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateProgress(quest.id, Math.min(quest.progress + 10, 100))}
                              >
                                Update Progress
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateProgress(quest.id, 100)}
                              >
                                Mark Complete
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-10 border rounded-lg bg-gray-50">
                        <Trophy className="h-10 w-10 text-gray-400 mx-auto" />
                        <p className="text-gray-500 mt-2">No active quests</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="mt-4" variant="outline">
                              <Plus className="mr-1 h-4 w-4" /> Create Your First Quest
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="space-y-4">
                    {completedQuests.length > 0 ? (
                      completedQuests.map((quest) => (
                        <Card key={quest.id} className="overflow-hidden border-green-100">
                          <div className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                                <div>
                                  <h3 className="font-medium">{quest.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
                                </div>
                              </div>
                              <Badge className={difficultyColors[quest.difficulty]}>
                                {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-3 ml-7">
                              {categoryIcons[quest.category]}
                              <span className="text-xs text-muted-foreground capitalize">{quest.category}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <Trophy className="h-4 w-4 text-amber-500" />
                              <span className="text-xs font-medium">{quest.points} points earned</span>
                            </div>
                            
                            <div className="mt-4 ml-7">
                              <Progress value={100} className="h-2 bg-green-100" />
                              <p className="text-xs text-green-600 mt-1">Completed</p>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-10 border rounded-lg bg-gray-50">
                        <CheckCircle2 className="h-10 w-10 text-gray-400 mx-auto" />
                        <p className="text-gray-500 mt-2">No completed quests yet</p>
                        <p className="text-sm text-gray-400">Complete a quest to see it here</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Special recognitions for your farming excellence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-full ${
                          achievement.progress === 100 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        } flex items-center justify-center`}>
                          <achievement.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{achievement.title}</h3>
                            {achievement.progress === 100 && (
                              <Badge variant="outline" className="bg-green-100 text-green-800">Earned</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                          {achievement.earnedDate && (
                            <p className="text-xs text-muted-foreground mt-1">Earned: {achievement.earnedDate}</p>
                          )}
                          
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Achievements</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader className="pb-2">
              <CardTitle>Farmer Profile</CardTitle>
              <CardDescription>Your farming journey stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary-foreground flex items-center justify-center relative">
                  <span className="text-3xl font-bold text-primary">{farmerLevel}</span>
                  <span className="absolute -right-1 -bottom-1 bg-amber-500 text-white h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold">
                    <Trophy className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="text-xl font-bold mt-3">Master Farmer</h2>
                <p className="text-sm text-muted-foreground">Level {farmerLevel}</p>
                
                <div className="w-full mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Next Level</span>
                    <span>{Math.floor(totalPoints)} / {farmerLevel * 500} points</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    {pointsToNextLevel} points needed for Level {farmerLevel + 1}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">{totalQuestsCompleted}</p>
                    <p className="text-sm text-muted-foreground">Quests Completed</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">{Math.floor(totalPoints)}</p>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">
                      {achievements.filter(a => a.progress === 100).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">{activeQuests.length}</p>
                    <p className="text-sm text-muted-foreground">Active Quests</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Rewards</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">15% Discount</p>
                      <p className="text-xs text-muted-foreground">On next seed purchase</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Claim
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">Free Soil Test</p>
                      <p className="text-xs text-muted-foreground">From AgriLab Partners</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Claim
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium text-muted-foreground">Premium Feature</p>
                      <p className="text-xs text-muted-foreground">Reach level 10 to unlock</p>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Locked
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Trophy className="mr-2 h-4 w-4" />
                Invite Farmer Friends
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default FarmQuest;
