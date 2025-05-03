
import React, { useState, useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar as CalendarIcon, Video, Headphones, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ExpertSession {
  id: string;
  expertName: string;
  expertTitle: string;
  date: Date;
  time: string;
  type: "audio" | "video";
  status: "upcoming" | "completed" | "cancelled";
}

const AgriCoach = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AgriCoach assistant. How can I help you with your farming today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Expert booking states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedExpert, setSelectedExpert] = useState("");
  const [sessionType, setSessionType] = useState<"audio" | "video">("audio");
  const [topic, setTopic] = useState("");
  
  // Upcoming sessions
  const [sessions, setSessions] = useState<ExpertSession[]>([
    {
      id: "1",
      expertName: "Dr. Sarah Kimani",
      expertTitle: "Crop Disease Specialist",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "10:00 AM",
      type: "video",
      status: "upcoming",
    },
    {
      id: "2",
      expertName: "James Mwangi",
      expertTitle: "Irrigation Expert",
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      time: "2:30 PM",
      type: "audio",
      status: "completed",
    },
  ]);

  // Scroll to bottom of messages
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage("");
    
    // Simulate bot response (would be replaced with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Simulate AI responses - would be replaced with actual API integration
  const getAIResponse = (message: string): string => {
    const responses = [
      "Based on your climate zone, I'd recommend planting maize in the next two weeks to align with expected rainfall patterns.",
      "To address those yellow leaves on your tomato plants, check the soil pH first. Tomatoes prefer slightly acidic soil with a pH between 6.0 and 6.8.",
      "For natural pest control, consider introducing ladybugs or using neem oil spray on your crops.",
      "Crop rotation is important to prevent soil depletion. Based on your previous season with legumes, root vegetables would be a good choice now.",
      "The brown spots you described might indicate fungal infection. Try improving air circulation around your plants and avoid overhead watering.",
    ];
    
    // Simple keyword matching
    if (message.toLowerCase().includes("fertilizer") || message.toLowerCase().includes("nutrient")) {
      return "For organic fertilization, compost mixed with manure can provide excellent results. Apply it 2-3 weeks before planting.";
    }
    
    if (message.toLowerCase().includes("pest") || message.toLowerCase().includes("insect")) {
      return "Natural pest control options include neem oil spray, introducing beneficial insects like ladybugs, or using diatomaceous earth around plants.";
    }
    
    if (message.toLowerCase().includes("water") || message.toLowerCase().includes("irrigation")) {
      return "Most crops need about 1 inch of water per week. Morning watering is best to reduce evaporation and fungal disease risk.";
    }
    
    // Default random response
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime || !selectedExpert || !topic) {
      alert("Please fill in all the required fields");
      return;
    }
    
    // Add new session
    const newSession: ExpertSession = {
      id: Date.now().toString(),
      expertName: selectedExpert === "sarah" ? "Dr. Sarah Kimani" : "James Mwangi",
      expertTitle: selectedExpert === "sarah" ? "Crop Disease Specialist" : "Irrigation Expert",
      date: selectedDate,
      time: selectedTime,
      type: sessionType,
      status: "upcoming",
    };
    
    setSessions([newSession, ...sessions]);
    
    // Reset form
    setSelectedDate(new Date());
    setSelectedTime("");
    setSelectedExpert("");
    setSessionType("audio");
    setTopic("");
    
    // Switch to sessions tab to show the new booking
    setActiveTab("sessions");
  };

  const formatMessageTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  return (
    <PageLayout 
      title="AgriCoach" 
      subtitle="Get expert advice and support for your farm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="sessions" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Expert Sessions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-0">
              <Card className="border-none">
                <CardHeader className="px-4 py-3 bg-muted/50 rounded-t-lg">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="AI" />
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                    AgriCoach Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask any farming questions or seek advice
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4 pb-2">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "user" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70 text-right">
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-3 border-t">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="Type your farming question here..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="sessions" className="mt-0">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Book an Expert Session</CardTitle>
                  <CardDescription>
                    Schedule a one-on-one consultation with an agricultural expert
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Expert</label>
                      <Select value={selectedExpert} onValueChange={setSelectedExpert}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an expert" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Dr. Sarah Kimani (Crop Disease Specialist)</SelectItem>
                          <SelectItem value="james">James Mwangi (Irrigation Expert)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Date</label>
                        <div className="border rounded-md p-3">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-2 block">Select Time</label>
                          <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                              <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                              <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                              <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                              <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                              <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Session Type</label>
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant={sessionType === "audio" ? "default" : "outline"}
                              className="flex-1 gap-2"
                              onClick={() => setSessionType("audio")}
                            >
                              <Headphones className="h-4 w-4" />
                              Audio
                            </Button>
                            <Button
                              type="button"
                              variant={sessionType === "video" ? "default" : "outline"}
                              className="flex-1 gap-2"
                              onClick={() => setSessionType("video")}
                            >
                              <Video className="h-4 w-4" />
                              Video
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Topic/Questions</label>
                      <Textarea 
                        placeholder="Describe what you want to discuss with the expert..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <Button onClick={handleBookSession} className="w-full">
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Your Sessions</h3>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{session.expertName}</CardTitle>
                            <CardDescription>{session.expertTitle}</CardDescription>
                          </div>
                          <Badge 
                            variant={session.status === "upcoming" ? "default" : 
                                   session.status === "completed" ? "secondary" : "destructive"}
                          >
                            {session.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 opacity-70" />
                            <span>{format(session.date, "MMM d, yyyy")}</span>
                          </div>
                          <div>
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {session.type === "video" ? 
                              <Video className="h-4 w-4 opacity-70" /> : 
                              <Headphones className="h-4 w-4 opacity-70" />
                            }
                            <span>{session.type === "video" ? "Video Call" : "Audio Call"}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {session.status === "upcoming" && (
                          <div className="flex gap-2 w-full">
                            <Button variant="outline" className="flex-1">Reschedule</Button>
                            <Button variant="default" className="flex-1">Join Session</Button>
                          </div>
                        )}
                        {session.status === "completed" && (
                          <Button variant="outline" className="w-full">View Summary</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {sessions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No sessions booked yet</p>
                      <p className="text-sm">Schedule your first expert consultation above</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Expert Tips</CardTitle>
              <CardDescription>Today's farming advice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-1">Pest Management</h4>
                <p className="text-sm text-muted-foreground">
                  May is the peak season for armyworm. Check your maize for small holes and apply
                  recommended pesticides early morning or late evening.
                </p>
              </div>
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-1">Weather Advisory</h4>
                <p className="text-sm text-muted-foreground">
                  Expected rainfall in the next week. Prepare your drainage systems to prevent waterlogging.
                </p>
              </div>
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-1">Planting Calendar</h4>
                <p className="text-sm text-muted-foreground">
                  It's a good time to plant kale, spinach, and onions in most regions.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Tips</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Expand your farming knowledge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-start text-left h-auto py-3">
                  <div>
                    <p className="font-medium">Soil Health Basics</p>
                    <p className="text-sm text-muted-foreground">10 min read</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start text-left h-auto py-3">
                  <div>
                    <p className="font-medium">Water Conservation Techniques</p>
                    <p className="text-sm text-muted-foreground">Video - 15 mins</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start text-left h-auto py-3">
                  <div>
                    <p className="font-medium">Organic Pest Control</p>
                    <p className="text-sm text-muted-foreground">8 min read</p>
                  </div>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Explore Library</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AgriCoach;
