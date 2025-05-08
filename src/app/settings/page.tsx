'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sun, Moon, Palette } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';

const themes = [
  { value: 'theme-space-blue', label: 'Space Blue', color: 'bg-blue-700' },
  { value: 'theme-nebula-purple', label: 'Nebula Purple', color: 'bg-purple-700' },
  { value: 'theme-starlight-gold', label: 'Starlight Gold', color: 'bg-yellow-600' },
];

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16); // Default font size in px
  const [selectedTheme, setSelectedTheme] = useState('theme-space-blue'); // Default theme

  useEffect(() => {
    // Apply appearance mode (dark/light)
    const storedAppearanceMode = localStorage.getItem('appearanceMode');
    if (storedAppearanceMode === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      // If no mode is stored, default to dark and save it
      if (!storedAppearanceMode) {
        localStorage.setItem('appearanceMode', 'dark');
      }
    }

    // Apply theme
    const storedTheme = localStorage.getItem('theme');
    const themeToApply = storedTheme && themes.some(t => t.value === storedTheme) ? storedTheme : 'theme-space-blue';
    setSelectedTheme(themeToApply);

    // Clear previous theme classes before applying the new one
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.value);
    });
    document.documentElement.classList.add(themeToApply);
    if (!storedTheme || !themes.some(t => t.value === storedTheme)) {
      localStorage.setItem('theme', themeToApply);
    }


    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) {
      const size = parseInt(storedFontSize, 10);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}px`;
    }
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('appearanceMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('appearanceMode', 'light');
    }
  };

   const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    localStorage.setItem('theme', value);

    // Clear previous theme classes
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.value);
    });
    // Apply new theme class
    document.documentElement.classList.add(value);
  };

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
  };


  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your application preferences here.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Appearance Settings Card */}
        <Card className="dark:bg-gray-800 bg-white shadow-lg border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">Appearance</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Customize the look and feel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-switch" className="flex items-center gap-2 dark:text-gray-200 text-gray-700">
                <Sun className={`h-5 w-5 transition-colors ${!isDarkMode ? 'text-yellow-500' : 'text-gray-500'}`} />
                <span>Light / Dark Mode</span>
                <Moon className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-blue-400' : 'text-gray-500'}`} />
              </Label>
              <Switch
                id="theme-switch"
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
            </div>

            <Separator />

            {/* Theme Selection */}
            <div className="space-y-3">
               <Label className="flex items-center gap-2 dark:text-gray-200 text-gray-700 mb-3">
                 <Palette className="h-5 w-5 text-gray-500" />
                 <span>Color Theme</span>
               </Label>
              <RadioGroup value={selectedTheme} onValueChange={handleThemeChange}>
                {themes.map((theme) => (
                  <div key={theme.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={theme.value} id={theme.value} />
                    <Label htmlFor={theme.value} className="flex items-center gap-2 cursor-pointer">
                       <span className={`inline-block w-4 h-4 rounded-full ${theme.color}`}></span>
                      {theme.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings Card */}
        <Card className="dark:bg-gray-800 bg-white shadow-lg border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">Accessibility</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Adjust for better readability.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Font Size Adjustment */}
            <div className="space-y-3">
              <Label htmlFor="font-size-slider" className="dark:text-gray-200 text-gray-700">
                Font Size: <span className="font-semibold">{fontSize}px</span>
              </Label>
              <Slider
                id="font-size-slider"
                min={12}
                max={20}
                step={1}
                value={[fontSize]}
                onValueChange={handleFontSizeChange}
                aria-label="Adjust font size"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller</span>
                <span>Larger</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;