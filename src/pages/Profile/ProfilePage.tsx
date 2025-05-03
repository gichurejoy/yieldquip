
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Award,
  Star,
  ShieldCheck,
  BarChart3,
  Upload
} from "lucide-react";

interface FarmerProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
  farmName: string;
  farmSize: string;
  farmType: string;
  mainCrops: string[];
  yearsExperience: string;
  skills: string[];
  image: string;
}

const defaultProfile: FarmerProfile = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+254 712 345 678",
  location: "Central Province, Kenya",
  joinDate: "January 2025",
  bio: "Experienced farmer specializing in sustainable agriculture and crop rotation techniques. I manage a mid-sized farm focused on maize, potatoes, and vegetables.",
  farmName: "Green Valley Farm",
  farmSize: "15 acres",
  farmType: "Mixed Crop",
  mainCrops: ["Maize", "Potatoes", "Tomatoes", "Kale"],
  yearsExperience: "8 years",
  skills: ["Crop Rotation", "Irrigation Systems", "Organic Farming", "Pest Management"],
  image: "/placeholder.svg"
};

// Farm performance metrics
const performanceMetrics = [
  { name: "Yield Efficiency", value: 92, unit: "%", change: "+5%", trend: "up" },
  { name: "Resource Usage", value: 78, unit: "%", change: "-3%", trend: "up" },
  { name: "Cost Efficiency", value: 84, unit: "%", change: "+2%", trend: "up" },
  { name: "Sustainability Score", value: 88, unit: "", change: "+4%", trend: "up" }
];

// Activity history
const activityHistory = [
  { 
    action: "Added harvest record", 
    details: "Recorded 450 kg of tomatoes harvested from Field #2", 
    date: "May 1, 2025" 
  },
  { 
    action: "Updated crop plan", 
    details: "Modified crop rotation schedule for the next season", 
    date: "April 28, 2025" 
  },
  { 
    action: "Created marketplace listing", 
    details: "Listed 200 kg of potatoes for sale", 
    date: "April 25, 2025" 
  },
  { 
    action: "Scheduled expert session", 
    details: "Booked consultation with irrigation specialist", 
    date: "April 22, 2025" 
  },
  { 
    action: "Completed farm task", 
    details: "Applied fertilizer to maize field", 
    date: "April 20, 2025" 
  },
];

// Certifications
const certifications = [
  {
    name: "Organic Farming Certification",
    issuer: "National Organic Farming Council",
    date: "2024-03-15",
    expires: "2026-03-15",
  },
  {
    name: "Sustainable Agriculture Practices",
    issuer: "Agricultural Training Institute",
    date: "2023-10-05",
    expires: "2025-10-05",
  }
];

const ProfilePage = () => {
  const [profile, setProfile] = useState<FarmerProfile>(defaultProfile);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<FarmerProfile>(defaultProfile);

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setProfile(editedProfile);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  return (
    <PageLayout title="Profile" subtitle="View and manage your farming profile">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.image} alt={profile.name} />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{profile.name}</CardTitle>
                <CardDescription>{profile.farmName}</CardDescription>
                <div className="mt-2 flex gap-1 items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{profile.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{profile.yearsExperience}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleEditToggle}>
                {editMode ? "Save Changes" : "Edit Profile"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Certifications</CardTitle>
              <CardDescription>Your farming qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs mt-1">
                        <span className="text-muted-foreground">Issued: </span>
                        {new Date(cert.date).toLocaleDateString()}
                        <span className="mx-2">•</span>
                        <span className="text-muted-foreground">Expires: </span>
                        {new Date(cert.expires).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="farm">Farm Stats</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <Card>
                {editMode ? (
                  // Edit Mode
                  <>
                    <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                      <CardDescription>Update your personal and farm information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              name="name"
                              value={editedProfile.name} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              value={editedProfile.email} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              value={editedProfile.phone} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location" 
                              name="location"
                              value={editedProfile.location} 
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            name="bio"
                            value={editedProfile.bio} 
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Farm Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="farmName">Farm Name</Label>
                            <Input 
                              id="farmName" 
                              name="farmName"
                              value={editedProfile.farmName} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="farmSize">Farm Size</Label>
                            <Input 
                              id="farmSize" 
                              name="farmSize"
                              value={editedProfile.farmSize} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="farmType">Farm Type</Label>
                            <Select 
                              value={editedProfile.farmType} 
                              onValueChange={(value) => handleSelectChange("farmType", value)}
                            >
                              <SelectTrigger id="farmType">
                                <SelectValue placeholder="Select farm type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Mixed Crop">Mixed Crop</SelectItem>
                                <SelectItem value="Livestock">Livestock</SelectItem>
                                <SelectItem value="Poultry">Poultry</SelectItem>
                                <SelectItem value="Dairy">Dairy</SelectItem>
                                <SelectItem value="Mixed Farming">Mixed Farming</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="yearsExperience">Years of Experience</Label>
                            <Input 
                              id="yearsExperience" 
                              name="yearsExperience"
                              value={editedProfile.yearsExperience} 
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profile-photo">Profile Photo</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={profile.image} alt={profile.name} />
                            <AvatarFallback className="text-xl">JD</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New Photo
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                      <Button onClick={handleEditToggle}>Save Changes</Button>
                    </CardFooter>
                  </>
                ) : (
                  // View Mode
                  <>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                      <CardDescription>Personal and farm information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Bio</h3>
                        <p className="text-muted-foreground">{profile.bio}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-4">Farm Information</h3>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Farm Name</p>
                            <p className="font-medium">{profile.farmName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Farm Size</p>
                            <p className="font-medium">{profile.farmSize}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Farm Type</p>
                            <p className="font-medium">{profile.farmType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Years Experience</p>
                            <p className="font-medium">{profile.yearsExperience}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Main Crops</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.mainCrops.map((crop, index) => (
                            <Badge key={index} variant="secondary">{crop}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={handleEditToggle}>
                        Edit Profile
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="farm">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Performance</CardTitle>
                  <CardDescription>
                    Key metrics and statistics about your farming operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                        <p className="text-2xl font-bold">
                          {metric.value}{metric.unit}
                        </p>
                        <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Growing Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Maize</span>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Tomatoes</span>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Potatoes</span>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Kale</span>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: '67%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">67%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">YieldQuip Ranking</h3>
                      <p className="text-sm text-muted-foreground">Based on farm productivity and sustainability metrics</p>
                    </div>
                    <div className="text-center">
                      <div className="p-3 bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">#42</span>
                      </div>
                      <p className="text-sm mt-1">Top 5%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Detailed Analytics
                  </Button>
                  <Button>Generate Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions and system activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {activityHistory.map((activity, index) => (
                      <div key={index} className="flex gap-4 pb-6 border-b last:border-0">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
