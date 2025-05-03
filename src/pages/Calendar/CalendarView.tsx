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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar as CalendarIcon, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Define allowed event types
type EventType = "planting" | "spraying" | "harvest" | "purchase" | "payment" | "other";

// Mock calendar events
const calendarEvents = [
  { 
    id: "1", 
    title: "Spray Tomatoes", 
    date: new Date(2025, 4, 2), 
    type: "spraying" as EventType,
    description: "Apply pesticides to tomato plants in Field 1",
    completed: false
  },
  { 
    id: "2", 
    title: "Harvest Maize", 
    date: new Date(2025, 4, 15), 
    type: "harvest" as EventType,
    description: "Harvest maize from Field 2, prepare storage",
    completed: false
  },
  { 
    id: "3", 
    title: "Buy Seeds", 
    date: new Date(2025, 4, 10), 
    type: "purchase" as EventType,
    description: "Purchase kale seeds from agro dealer",
    completed: true
  },
  { 
    id: "4", 
    title: "Pay Workers", 
    date: new Date(2025, 4, 5), 
    type: "payment" as EventType,
    description: "Pay farm workers for the week",
    completed: true
  }
];

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  description: string;
  completed: boolean;
}

export default function CalendarView() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "day" | "year">("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setViewMode("day");
    }
  };

  const getDayEvents = (date: Date) => {
    return calendarEvents.filter(
      (event) => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const dayHasEvent = (date: Date) => {
    return calendarEvents.some(
      (event) => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const eventTypeColors: Record<string, string> = {
    planting: "bg-green-100 text-green-800 border-green-200",
    spraying: "bg-blue-100 text-blue-800 border-blue-200",
    harvest: "bg-yellow-100 text-yellow-800 border-yellow-200",
    purchase: "bg-purple-100 text-purple-800 border-purple-200",
    payment: "bg-red-100 text-red-800 border-red-200",
    other: "bg-gray-100 text-gray-800 border-gray-200"
  };

  const addEvent = () => {
    toast({
      title: "Event Added",
      description: "Your farming task has been scheduled",
    });
    setIsAddEventOpen(false);
  };

  const markAsComplete = (event: CalendarEvent) => {
    toast({
      title: "Task Completed",
      description: `"${event.title}" marked as complete`,
    });
    setSelectedEvent(null);
  };

  const getMonthsInYear = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, i, 1);
      months.push(monthDate);
    }
    return months;
  };

  const getMonthEvents = (month: number) => {
    return calendarEvents.filter(
      event => event.date.getMonth() === month && event.date.getFullYear() === currentYear
    ).length;
  };

  return (
    <PageLayout title="Farm Calendar" subtitle="Schedule and manage your farm activities">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <Select 
                    value={viewMode} 
                    onValueChange={(value) => setViewMode(value as "month" | "day" | "year")}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month View</SelectItem>
                      <SelectItem value="day">Day View</SelectItem>
                      <SelectItem value="year">Year View</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-1 h-4 w-4" /> Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Farm Task</DialogTitle>
                        <DialogDescription>
                          Schedule a new farm activity
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Task Title</Label>
                          <Input id="title" placeholder="What do you need to do?" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="task-date">Date</Label>
                            <Input
                              id="task-date"
                              type="date"
                              defaultValue={format(date, "yyyy-MM-dd")}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-type">Task Type</Label>
                            <Select defaultValue="other">
                              <SelectTrigger id="task-type">
                                <SelectValue placeholder="Task Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planting">Planting</SelectItem>
                                <SelectItem value="spraying">Spraying</SelectItem>
                                <SelectItem value="harvest">Harvesting</SelectItem>
                                <SelectItem value="purchase">Purchase</SelectItem>
                                <SelectItem value="payment">Payment</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Add details about this task..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>Cancel</Button>
                        <Button onClick={addEvent}>Save Task</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "month" && (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="mx-auto p-3 pointer-events-auto"
                  modifiers={{
                    hasEvent: (date) => dayHasEvent(date),
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-primary-light text-primary font-bold",
                  }}
                />
              )}

              {viewMode === "year" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Button variant="outline" size="icon" onClick={() => setCurrentYear(prev => prev - 1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-bold">{currentYear}</h2>
                    <Button variant="outline" size="icon" onClick={() => setCurrentYear(prev => prev + 1)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {getMonthsInYear().map((monthDate, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-gray-50" 
                        onClick={() => {
                          setDate(monthDate);
                          setViewMode("month");
                        }}>
                        <CardHeader className="py-2 px-3">
                          <CardTitle className="text-base">{format(monthDate, "MMMM")}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{getMonthEvents(index)} events</span>
                            {getMonthEvents(index) > 0 && (
                              <Badge variant="outline" className="bg-primary/10">
                                {getMonthEvents(index)}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === "day" && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium">{format(date, "MMMM d, yyyy")}</h3>
                      <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Side-by-side layout for the day view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={date => date && setDate(date)}
                        className="mx-auto p-3 pointer-events-auto"
                        modifiers={{
                          hasEvent: (date) => dayHasEvent(date),
                        }}
                        modifiersClassNames={{
                          hasEvent: "bg-primary-light text-primary font-bold",
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Events for {format(date, "MMMM d")}</h3>
                      {getDayEvents(date).length > 0 ? (
                        getDayEvents(date).map((event) => (
                          <div 
                            key={event.id}
                            className={`border rounded-lg p-4 ${event.completed ? 'opacity-60' : ''}`}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge variant="outline" className={eventTypeColors[event.type]}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-xs text-gray-500">
                                {format(event.date, "h:mm a")}
                              </span>
                              {event.completed ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Completed
                                </Badge>
                              ) : (
                                <Button size="sm" variant="outline" onClick={() => markAsComplete(event)}>
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 border rounded-lg bg-gray-50">
                          <CalendarIcon className="h-10 w-10 text-gray-400 mx-auto" />
                          <p className="text-gray-500 mt-2">No events scheduled for this day</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => setIsAddEventOpen(true)}
                          >
                            <Plus className="mr-1 h-4 w-4" /> Add Event
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Your next 5 scheduled farm activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {calendarEvents
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .filter(event => !event.completed && event.date >= new Date())
                  .slice(0, 5)
                  .map(event => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant="outline" className={eventTypeColors[event.type]}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(event.date, "MMM d, yyyy")}
                      </p>
                    </div>
                  ))}
                {calendarEvents.filter(event => !event.completed && event.date >= new Date()).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No upcoming tasks. Add a new task to get started!
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setIsAddEventOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" /> Add New Task
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Smart Tips</CardTitle>
              <CardDescription>
                Recommendations based on your farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-primary-light bg-opacity-10">
                  <h4 className="font-medium text-primary">Time to Fertilize</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Your maize is 4 weeks old. Apply NPK fertilizer this week for optimal growth.
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-yellow-50">
                  <h4 className="font-medium text-yellow-800">Weather Alert</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Heavy rains expected this weekend. Consider protecting seedlings.
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-800">Harvest Season</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Your tomatoes should be ready to harvest in approximately 2 weeks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                Scheduled for {format(selectedEvent.date, "MMMM d, yyyy")}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Badge variant="outline" className={eventTypeColors[selectedEvent.type]}>
                {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
              </Badge>
              <p className="mt-4">{selectedEvent.description}</p>
              {selectedEvent.completed ? (
                <div className="mt-6 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">Task Completed</p>
                    <p className="text-sm text-green-700">This task has been marked as done</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </div>
              ) : (
                <Button className="w-full mt-6" onClick={() => markAsComplete(selectedEvent)}>
                  Mark as Complete
                </Button>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button variant="destructive" onClick={() => {
                toast({ title: "Task Deleted", description: `"${selectedEvent.title}" has been removed` });
                setSelectedEvent(null);
              }}>
                Delete Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}
