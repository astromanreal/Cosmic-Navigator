'use client';

import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu, Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {SheetTitle} from "@/components/ui/sheet";
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // On mount, check local storage for theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

    const handleNavigation = () => {
        setIsMenuOpen(false);
    };

  return (
    <nav className="bg-background border-b shadow-sm dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-semibold dark:text-white text-gray-900">
              Cosmic Navigator
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/rockets" className="hover:text-accent dark:text-white">
              Rockets
            </Link>
            <Link href="/telescopes" className="hover:text-accent dark:text-white">
              Telescopes
            </Link>
            <Link href="/missions" className="hover:text-accent dark:text-white">
              Missions
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="dark:text-white">
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                 <DropdownMenuItem>
                  <Link href="/topics" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                    Topics
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                  <Link href="/objects" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                    Objects
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="dark:text-white">
              {isDarkMode ? <Sun/> : <Moon/>}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className="px-3 py-2 rounded-md text-foreground focus:outline-none focus:ring-2 dark:text-white">
                  <Menu className="h-6 w-6"/>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background dark:bg-gray-800">
                <SheetTitle>
                 <VisuallyHidden>Navigation</VisuallyHidden>
                </SheetTitle>
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/rockets" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                    Rockets
                  </Link>
                  <Link href="/telescopes" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                    Telescopes
                  </Link>
                  <Link href="/missions" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                    Missions
                  </Link>
                   <Link href="/topics" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                   Topics
                  </Link>
                  <Link href="/objects" onClick={handleNavigation} className="hover:text-accent dark:text-white">
                   Objects
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="dark:text-white">
                    {isDarkMode ? <Sun/> : <Moon/>}
                    <span className="sr-only">Toggle dark mode</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
