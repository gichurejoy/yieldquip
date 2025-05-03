
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, parseISO } from "date-fns";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="h-5 w-5 absolute -top-1 -right-1 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <Card className="border-0">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto py-1 px-2 text-xs"
                  onClick={() => markAllAsRead()}
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </CardHeader>
          <Tabs defaultValue="all" className="w-full">
            <div className="px-4">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="farm">Farm</TabsTrigger>
              </TabsList>
            </div>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <TabsContent value="all" className="m-0">
                  <div className="flex flex-col divide-y">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-muted/20' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={notification.category === "market" ? "outline" : "secondary"} className="px-1.5 py-0 text-xs h-5">
                              {notification.category === "market" ? "Market" : "Farm"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(parseISO(notification.timestamp), 'MMM d, h:mm a')}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-auto"></div>
                            )}
                          </div>
                          <p className="text-sm">{notification.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="market" className="m-0">
                  <div className="flex flex-col divide-y">
                    {notifications.filter(n => n.category === "market").length > 0 ? (
                      notifications
                        .filter(n => n.category === "market")
                        .map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-muted/20' : ''}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="px-1.5 py-0 text-xs h-5">
                                Market
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(parseISO(notification.timestamp), 'MMM d, h:mm a')}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full ml-auto"></div>
                              )}
                            </div>
                            <p className="text-sm">{notification.message}</p>
                          </div>
                        ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <p>No market notifications</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="farm" className="m-0">
                  <div className="flex flex-col divide-y">
                    {notifications.filter(n => n.category === "farm").length > 0 ? (
                      notifications
                        .filter(n => n.category === "farm")
                        .map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-muted/20' : ''}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="px-1.5 py-0 text-xs h-5">
                                Farm
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(parseISO(notification.timestamp), 'MMM d, h:mm a')}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full ml-auto"></div>
                              )}
                            </div>
                            <p className="text-sm">{notification.message}</p>
                          </div>
                        ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <p>No farm notifications</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-2 flex justify-center border-t">
              <Button variant="link" size="sm" className="text-xs" onClick={() => setOpen(false)}>
                View all notifications
              </Button>
            </CardFooter>
          </Tabs>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
