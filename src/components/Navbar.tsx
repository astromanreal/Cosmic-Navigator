'use client';

import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import {
  Menu,
  Moon,
  Sun,
  Compass,
  Rocket,
  Telescope,
  Atom,
  BookOpen,
  Cloud, 
  Settings,
  Mail,
  Home,
  Globe,
  Ellipsis,
  X, 
  FlaskConical,
  GraduationCap,
  Orbit,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Separator } from '@/components/ui/separator';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedAppearanceMode = localStorage.getItem('appearanceMode');
    if (storedAppearanceMode === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      if (!storedAppearanceMode) {
        localStorage.setItem('appearanceMode', 'dark');
      }
    }
  }, []);


  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('appearanceMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('appearanceMode', 'light');
    }
  };


    const handleNavigation = () => {
        setIsMenuOpen(false);
    };

  // Navigation items structure for cleaner rendering
  const mainNavItems = [
    { href: "/rockets", label: "Rockets", icon: Rocket, color: "text-orange-400" },
    { href: "/telescopes", label: "Telescopes", icon: Telescope, color: "text-purple-400" },
    { href: "/missions", label: "Missions", icon: Compass, color: "text-teal-400" },
    { href: "/objects", label: "Objects", icon: Atom, color: "text-yellow-400" },
    { href: "/topics", label: "Topics", icon: BookOpen, color: "text-green-400" },
  ];

  const secondaryNavItems = [
    { href: "/explore", label: "Explore", icon: Compass, color: "text-blue-400" },
    { href: "/solar-system", label: "Solar System", icon: Sun, color: "text-yellow-400" },
    { href: "/earth", label: "Earth", icon: Globe, color: "text-blue-400" },
    { href: "/science-discoveries", label: "Science", icon: FlaskConical, color: "text-cyan-400" },
    { href: "/space-agencies", label: "Space Agencies", icon: Compass, color: "text-gray-400" },
    { href: "/programmes", label: "Programmes", icon: Rocket, color: "text-orange-400" },
    { href: "/career", label: "Careers", icon: GraduationCap, color: "text-orange-400" },
    { href: "/space-encyclopedia", label: "Encyclopedia", icon: BookOpen, color: "text-green-400" },
    { href: "/contact", label: "Contact", icon: Mail, color: "text-red-400" },
    { href: "/settings", label: "Settings", icon: Settings, color: "text-gray-400" },
  ];


  return (
    <nav className="sticky top-0 z-50 bg-gray-900/50 dark:bg-black/50 backdrop-blur-md border-b border-gray-700/30 dark:border-gray-800/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
              <Orbit className="h-7 w-7 text-teal-400" /> {/* Logo Icon */}
              Cosmic Navigator
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 text-gray-300 hover:${item.color} dark:text-gray-200 dark:hover:${item.color.replace('-400', '-300')} transition-colors text-sm font-medium`}
              >
                <item.icon className={`h-4 w-4 ${item.color}`} /> {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="text-gray-300 hover:text-teal-400 dark:text-gray-200 dark:hover:text-teal-300 data-[state=open]:bg-gray-700/50 dark:data-[state=open]:bg-gray-800/60 h-8 w-8">
                  <Ellipsis className="h-5 w-5"/>
                  <span className="sr-only">More options</span>
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800/90 dark:bg-black/80 border-gray-700 dark:border-gray-700 backdrop-blur-md text-gray-200 dark:text-gray-100">
                 {secondaryNavItems.map((item) => (
                    <React.Fragment key={item.href}>
                      {(item.href === "/contact" || item.href === "/explore") && <DropdownMenuSeparator className="bg-gray-600 dark:bg-gray-700"/>}
                      <DropdownMenuItem className="focus:bg-teal-500/20 focus:text-teal-300">
                        <Link href={item.href} onClick={handleNavigation} className="flex items-center w-full">
                          <item.icon className={`mr-2 h-4 w-4 ${item.color}`}/> {item.label}
                        </Link>
                      </DropdownMenuItem>
                    </React.Fragment>
                 ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="relative text-gray-300 hover:text-teal-400 dark:text-gray-200 dark:hover:text-teal-300 focus:bg-gray-700/50 dark:focus:bg-gray-800/60 h-8 w-8 overflow-hidden"
              aria-label="Toggle Dark Mode"
            >
              <Sun className={`h-5 w-5 transition-all duration-300 ease-in-out ${isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
              <Moon className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
             {/* Dark mode toggle next to hamburger on small screens - already present */}
             <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="relative text-gray-300 hover:text-teal-400 dark:text-gray-200 dark:hover:text-teal-300 mr-2 h-8 w-8 overflow-hidden"
                aria-label="Toggle Dark Mode"
              >
                <Sun className={`h-5 w-5 transition-all duration-300 ease-in-out ${isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                <span className="sr-only">Toggle dark mode</span>
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md text-gray-300 dark:text-gray-200 hover:text-teal-400 dark:hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500" aria-label="Open Menu">
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
               <SheetContent side="right" className="bg-gray-900/95 dark:bg-black/90 backdrop-blur-md border-l border-gray-700/50 dark:border-gray-800/60 p-0 w-[250px] flex flex-col">
                 <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                 </VisuallyHidden>
                 <SheetHeader className="p-4 pb-2 border-b border-gray-700/50 dark:border-gray-800/60 flex flex-row justify-between items-center"> {/* Adjusted padding and flex */}
                     <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-400 to-purple-500">
                       Navigation
                    </div>
                    {/* Dark mode toggle for inside the sheet */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toggleDarkMode();
                      }}
                      className="relative text-gray-300 hover:text-teal-400 dark:text-gray-200 dark:hover:text-teal-300 h-8 w-8 overflow-hidden"
                      aria-label="Toggle Dark Mode in menu"
                    >
                      <Sun className={`h-5 w-5 transition-all duration-300 ease-in-out ${isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                      <Moon className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                      <span className="sr-only">Toggle dark mode</span>
                    </Button>
                 </SheetHeader>
                 <ScrollArea className="flex-grow">
                   <div className="flex flex-col space-y-1 p-4">
                     <Link href="/" onClick={handleNavigation} className="py-3 px-4 rounded-md hover:bg-teal-500/10 text-gray-200 dark:text-gray-100 hover:text-teal-300 transition-colors flex items-center text-base font-medium">
                       <Home className="mr-3 h-5 w-5 text-blue-400"/> Home
                     </Link>
                     <Separator className="my-2 bg-gray-700/50 dark:bg-gray-800/60" />
                     {[...mainNavItems, ...secondaryNavItems].map((item) => (
                       <Link
                         key={item.href}
                         href={item.href}
                         onClick={handleNavigation}
                         className="py-3 px-4 rounded-md hover:bg-teal-500/10 text-gray-200 dark:text-gray-100 hover:text-teal-300 transition-colors flex items-center text-base"
                       >
                         <item.icon className={`mr-3 h-5 w-5 ${item.color}`}/> {item.label}
                       </Link>
                     ))}
                  </div>
                </ScrollArea>
                 <SheetClose asChild>
                   <Button variant="ghost" className="absolute right-4 top-4 text-gray-400 hover:text-gray-200" aria-label="Close Menu">
                     <X className="h-5 w-5" />
                     <span className="sr-only">Close</span>
                   </Button>
                 </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
