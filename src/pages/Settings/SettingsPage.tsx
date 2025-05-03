
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

const SettingsPage = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <PageLayout 
      title="Settings" 
      subtitle="Manage your account preferences and application settings"
    >
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your basic account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <select 
                      id="timezone" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option>Pacific Time (US & Canada)</option>
                      <option>Mountain Time (US & Canada)</option>
                      <option>Central Time (US & Canada)</option>
                      <option>Eastern Time (US & Canada)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input id="farmName" defaultValue="Green Meadows Farm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Farm Address</Label>
                  <Input id="address" defaultValue="123 Farm Road, Fresno, CA 93706" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="theme" />
                  <Label htmlFor="theme">Dark Mode</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="units" defaultChecked />
                  <Label htmlFor="units">Use Metric Units</Label>
                </div>
              </div>

              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how and when you get notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive email notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Preferences</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weather" defaultChecked />
                      <Label htmlFor="weather">Weather alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="market" defaultChecked />
                      <Label htmlFor="market">Market price changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tasks" defaultChecked />
                      <Label htmlFor="tasks">Task reminders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="news" />
                      <Label htmlFor="news">Agricultural news</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="updates" defaultChecked />
                      <Label htmlFor="updates">Application updates</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Data Sharing</h4>
                    <p className="text-sm text-muted-foreground">Share anonymous usage data to improve our services</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-muted-foreground">Receive marketing emails and offers</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Farm Data Privacy</h4>
                    <p className="text-sm text-muted-foreground">Allow sharing aggregated farm data with research partners</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h4 className="font-medium">Security</h4>
                
                <div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div>
                  <Button variant="outline">Two-Factor Authentication</Button>
                </div>

                <div className="pt-4">
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>

              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default SettingsPage;
