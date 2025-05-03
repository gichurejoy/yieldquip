
import React from "react";
import { Link } from "react-router-dom";
import { Menu, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileMenu } from "./MobileMenu";
import { NotificationsPopover } from "./NotificationsPopover";
import { useIsMobile } from "@/hooks/use-mobile";
import YieldQuipLogo from "../YieldQuipLogo";

export function Navbar() {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(true)}
              className="mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <YieldQuipLogo className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-primary">YieldQuip</span>
          </Link>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex space-x-6">
            <Link to="/agritrack" className="text-gray-600 hover:text-primary font-medium">
              AgriTrack
            </Link>
            <Link to="/calendar" className="text-gray-600 hover:text-primary font-medium">
              Calendar
            </Link>
            <Link to="/agricoach" className="text-gray-600 hover:text-primary font-medium">
              AgriCoach
            </Link>
            <Link to="/marketview" className="text-gray-600 hover:text-primary font-medium">
              MarketView
            </Link>
            <Link to="/invoice" className="text-gray-600 hover:text-primary font-medium">
              QuickInvoice
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <NotificationsPopover />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/subscription">Subscription</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showMobileMenu && <MobileMenu onClose={() => setShowMobileMenu(false)} />}
    </header>
  );
}
