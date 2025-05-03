
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityCard, Activity } from "@/components/dashboard/ActivityCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clipboard, DollarSign, Calendar, Plus, Users, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data for recent activity
  const recentActivities: Activity[] = [
    {
      id: "1",
      title: "Tomato Pesticide Purchase",
      description: "Purchased pesticide for tomato plants - Ksh 1,200",
      date: "Today, 9:30 AM",
      icon: <DollarSign className="h-4 w-4" />,
      type: "expense"
    },
    {
      id: "2",
      title: "Maize Harvest Scheduled",
      description: "Remember to harvest maize in Field 2",
      date: "Tomorrow",
      icon: <Calendar className="h-4 w-4" />,
      type: "task"
    },
    {
      id: "3",
      title: "Potato Sales",
      description: "Sold 50kg potatoes - Ksh 2,500",
      date: "Yesterday",
      icon: <DollarSign className="h-4 w-4" />,
      type: "income"
    },
    {
      id: "4",
      title: "Weather Alert",
      description: "Heavy rainfall expected this weekend",
      date: "2 days ago",
      icon: <Sprout className="h-4 w-4" />,
      type: "alert"
    }
  ];

  // Mock data for farm stats
  const farmStats = {
    expenses: "Ksh 15,200",
    income: "Ksh 22,500",
    tasks: 7,
    sales: 3
  };

  return (
    <PageLayout title="Dashboard" subtitle="Welcome back, John! Here's your farm overview.">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 border-dashed" asChild>
          <Link to="/agritrack/add">
            <Plus className="h-5 w-5 text-primary" />
            <span>Log Activity</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 border-dashed" asChild>
          <Link to="/marketview">
            <DollarSign className="h-5 w-5 text-accent" />
            <span>Check Prices</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 border-dashed" asChild>
          <Link to="/calendar">
            <Calendar className="h-5 w-5 text-secondary" />
            <span>View Calendar</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 border-dashed" asChild>
          <Link to="/agricoach">
            <Users className="h-5 w-5 text-primary-dark" />
            <span>Get Advice</span>
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Monthly Expenses" 
          value={farmStats.expenses}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard 
          title="Monthly Income" 
          value={farmStats.income}
          icon={<DollarSign className="h-5 w-5 text-secondary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Pending Tasks" 
          value={farmStats.tasks}
          icon={<Clipboard className="h-5 w-5 text-accent" />}
        />
        <StatCard 
          title="Recent Sales" 
          value={farmStats.sales}
          icon={<Users className="h-5 w-5 text-primary-dark" />}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest farming activities and logs</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
              {recentActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks & FarmQuest */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>3 tasks scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center p-2 rounded bg-primary-light bg-opacity-20">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                  <div>
                    <p className="font-medium">Spray tomatoes</p>
                    <p className="text-xs text-gray-500">Field 1 • Morning</p>
                  </div>
                </li>
                <li className="flex items-center p-2 rounded">
                  <span className="w-2 h-2 rounded-full bg-primary-dark mr-3"></span>
                  <div>
                    <p className="font-medium">Check irrigation</p>
                    <p className="text-xs text-gray-500">All fields • Afternoon</p>
                  </div>
                </li>
                <li className="flex items-center p-2 rounded">
                  <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                  <div>
                    <p className="font-medium">Pay workers</p>
                    <p className="text-xs text-gray-500">4 workers • Evening</p>
                  </div>
                </li>
              </ul>
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link to="/calendar">Go to Calendar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
              <CardTitle>FarmQuest</CardTitle>
              <CardDescription className="text-white text-opacity-90">Today's challenge</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center space-y-4">
                <div className="inline-flex rounded-full bg-primary-light bg-opacity-20 p-4">
                  <Clipboard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold">Track All Expenses!</h3>
                <p className="text-sm text-gray-600">
                  Log every expense for the next 7 days and earn 50 points.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "25%" }}></div>
                </div>
                <p className="text-xs text-gray-500">2/8 days completed</p>
                <Button className="w-full">Start Challenge</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
