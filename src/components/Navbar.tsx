
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Menu, LogOut, User, Wheat, Truck, Package, Leaf, ScrollText, HelpCircle } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from '@/components/SearchBar';
import IotSensors from '@/components/IotSensors';

const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const NavItems = () => (
    <>
      <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
        <Home size={20} />
        <span className="font-medium">Home</span>
      </Link>
      
      <Link to="/crop-prediction" className="flex items-center gap-2 hover:text-primary">
        <Wheat size={20} />
        <span>Crop Prediction</span>
      </Link>
      
      <Link to="/storage" className="flex items-center gap-2 hover:text-primary">
        <Package size={20} />
        <span>Storage</span>
      </Link>
      
      <Link to="/transportation" className="flex items-center gap-2 hover:text-primary">
        <Truck size={20} />
        <span>Transportation</span>
      </Link>
      
      <Link to="/crop-processing" className="flex items-center gap-2 hover:text-primary">
        <Leaf size={20} />
        <span>Processing</span>
      </Link>
      
      <Link to="/government-schemes" className="flex items-center gap-2 hover:text-primary">
        <ScrollText size={20} />
        <span>Schemes</span>
      </Link>

      <div className="flex items-center gap-2 hover:text-primary">
        <IotSensors />
      </div>
    </>
  );

  return (
    <header className="border-b fixed top-0 left-0 right-0 bg-background z-50">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu size={24} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-6 py-6">
              <div className="space-y-4">
                <NavItems />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m8 17 4 4 4-4" />
          </svg>
          <span className="font-bold text-xl">AgriConnect</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 mx-6">
          <NavItems />
        </nav>

        <div className="flex-1 flex justify-end items-center space-x-4">
          <SearchBar />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>{getInitials(user.user_metadata?.full_name || user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
