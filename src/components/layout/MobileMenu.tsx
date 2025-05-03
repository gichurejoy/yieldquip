
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className="bg-white h-full w-4/5 max-w-xs flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold text-primary">YieldQuip</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                to="/agritrack" 
                className="block py-2 text-lg text-gray-600 hover:text-primary"
                onClick={onClose}
              >
                AgriTrack
              </Link>
            </li>
            <li>
              <Link 
                to="/calendar" 
                className="block py-2 text-lg text-gray-600 hover:text-primary"
                onClick={onClose}
              >
                Calendar
              </Link>
            </li>
            <li>
              <Link 
                to="/agricoach" 
                className="block py-2 text-lg text-gray-600 hover:text-primary"
                onClick={onClose}
              >
                AgriCoach
              </Link>
            </li>
            <li>
              <Link 
                to="/marketview" 
                className="block py-2 text-lg text-gray-600 hover:text-primary"
                onClick={onClose}
              >
                MarketView
              </Link>
            </li>
            <li>
              <Link 
                to="/invoice" 
                className="block py-2 text-lg text-gray-600 hover:text-primary"
                onClick={onClose}
              >
                QuickInvoice
              </Link>
            </li>
            <li>
              <Link 
                to="/farmquest" 
                className="block py-2 text-lg text-gray-600 hover:text-primary"
                onClick={onClose}
              >
                FarmQuest
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Link to="/profile" onClick={onClose}>
            <Button 
              variant="outline" 
              className="w-full mb-2"
            >
              Profile
            </Button>
          </Link>
          <Link to="/settings" onClick={onClose}>
            <Button 
              variant="outline" 
              className="w-full mb-2"
            >
              Settings
            </Button>
          </Link>
          <Link to="/subscription" onClick={onClose}>
            <Button 
              variant="outline" 
              className="w-full"
            >
              Subscription
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
