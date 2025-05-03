
import { useState, useEffect, createContext, useContext } from "react";
import { parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  message: string;
  category: "market" | "farm";
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

// Initial mock notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    message: "Corn prices have increased by 5% today",
    category: "market",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: false,
    action: {
      label: "View Markets",
      url: "/marketview"
    }
  },
  {
    id: "2",
    message: "Your field #3 may need irrigation today based on soil moisture readings",
    category: "farm",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    read: false
  },
  {
    id: "3",
    message: "New inquiry received for your tomato listing",
    category: "market",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    read: true,
    action: {
      label: "View Inquiry",
      url: "/marketview?tab=mylistings"
    }
  },
  {
    id: "4",
    message: "Weather alert: Heavy rainfall expected tomorrow in your region",
    category: "farm",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: true
  },
  {
    id: "5",
    message: "Reminder: Time to apply fertilizer to your maize crops",
    category: "farm",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true
  }
];

// Create notification context
type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Create provider component
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const { toast } = useToast();

  // Simulate receiving a new notification every 5 minutes
  useEffect(() => {
    // Only for demo purposes
    const intervalId = setInterval(() => {
      const isMarket = Math.random() > 0.5;
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: isMarket 
          ? `${getRandomCommodity()} prices have ${getRandomPriceChange()}` 
          : `${getRandomFarmUpdate()}`,
        category: isMarket ? "market" : "farm",
        timestamp: new Date().toISOString(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show toast for new notification
      toast({
        title: isMarket ? "Market Update" : "Farm Alert",
        description: newNotification.message,
      });
    }, 300000); // 5 minutes
    
    return () => clearInterval(intervalId);
  }, [toast]);

  // Add notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.category === "market" ? "Market Update" : "Farm Alert",
      description: notification.message,
    });
  };
  
  // Mark as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  // Helper functions for random notification generation
  const getRandomCommodity = () => {
    const commodities = ["Corn", "Wheat", "Soybeans", "Rice", "Potatoes", "Tomatoes"];
    return commodities[Math.floor(Math.random() * commodities.length)];
  };
  
  const getRandomPriceChange = () => {
    const direction = Math.random() > 0.5 ? "increased" : "decreased";
    const percentage = (Math.random() * 5 + 0.5).toFixed(1);
    return `${direction} by ${percentage}% in the last hour`;
  };
  
  const getRandomFarmUpdate = () => {
    const updates = [
      "Time to check soil moisture in Field #2",
      "Weather alert: Temperature will drop tonight",
      "Equipment maintenance reminder: Check tractor oil levels",
      "Scheduled harvest date approaching for your tomato crop",
      "Pest alert: Aphids detected in your kale field"
    ];
    return updates[Math.floor(Math.random() * updates.length)];
  };
  
  // Sort notifications by date (newest first)
  const sortedNotifications = [...notifications].sort((a, b) => 
    parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()
  );
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications: sortedNotifications, 
        addNotification, 
        markAsRead, 
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
