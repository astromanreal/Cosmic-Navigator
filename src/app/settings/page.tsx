
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sun, Moon, Palette, Settings as SettingsIcon, Text, Eye } from 'lucide-react'; // Changed TextSize to Text
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

    const storedTheme = localStorage.getItem('theme');
    const themeToApply = storedTheme && themes.some(t => t.value === storedTheme) ? storedTheme : 'theme-space-blue';
    setSelectedTheme(themeToApply);
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
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.value);
    });
    document.documentElement.classList.add(value);
  };

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <SettingsIcon className="w-16 h-16 text-teal-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-6">
            Customize Your Cosmos
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
            Tailor your Cosmic Navigator experience. Adjust appearance, accessibility, and more to make your journey through space uniquely yours.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Appearance Settings Card */}
          <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                <Eye className="mr-2 h-6 w-6 text-cyan-400" />
                Appearance
              </CardTitle>
              <CardDescription className="text-gray-400 dark:text-gray-300">Adjust the visual theme and mode.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg">
                <Label htmlFor="theme-switch" className="flex items-center gap-3 text-gray-200 dark:text-gray-100 text-base">
                  <Sun className={`h-6 w-6 transition-all duration-300 ${!isDarkMode ? 'text-yellow-400 scale-110' : 'text-gray-500'}`} />
                  <span>Light / Dark Mode</span>
                  <Moon className={`h-6 w-6 transition-all duration-300 ${isDarkMode ? 'text-blue-400 scale-110' : 'text-gray-500'}`} />
                </Label>
                <Switch
                  id="theme-switch"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-600"
                />
              </div>

              <Separator className="bg-gray-700/50 dark:bg-gray-600/50" />

              {/* Theme Selection */}
              <div className="space-y-4 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg">
                 <Label className="flex items-center gap-2 text-gray-200 dark:text-gray-100 text-base mb-3">
                   <Palette className="h-6 w-6 text-purple-400" />
                   <span>Color Theme</span>
                 </Label>
                <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} className="space-y-3">
                  {themes.map((theme) => (
                    <Label 
                      key={theme.value} 
                      htmlFor={theme.value} 
                      className="flex items-center justify-between p-3 rounded-md bg-gray-600/50 dark:bg-gray-700/50 hover:bg-gray-500/50 dark:hover:bg-gray-600/50 cursor-pointer transition-colors border-2 border-transparent data-[state=checked]:border-teal-500"
                      data-state={selectedTheme === theme.value ? 'checked' : 'unchecked'}
                    >
                      <span className="flex items-center gap-3 text-gray-200 dark:text-gray-100">
                         <span className={`inline-block w-5 h-5 rounded-full ${theme.color} border-2 border-white/20`}></span>
                        {theme.label}
                      </span>
                      <RadioGroupItem value={theme.value} id={theme.value} className="border-teal-400 text-teal-500 focus:ring-teal-500" />
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Settings Card */}
          <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                <Text className="mr-2 h-6 w-6 text-cyan-400" /> {/* Changed TextSize to Text */}
                Accessibility
              </CardTitle>
              <CardDescription className="text-gray-400 dark:text-gray-300">Customize for better readability.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Font Size Adjustment */}
              <div className="space-y-4 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg">
                <Label htmlFor="font-size-slider" className="text-gray-200 dark:text-gray-100 text-base">
                  Font Size: <span className="font-semibold text-teal-300">{fontSize}px</span>
                </Label>
                <Slider
                  id="font-size-slider"
                  min={12}
                  max={20}
                  step={1}
                  value={[fontSize]}
                  onValueChange={handleFontSizeChange}
                  aria-label="Adjust font size"
                  className="[&>span:first-child>span]:bg-teal-500 [&>span:last-child]:bg-teal-500 [&>span:last-child]:border-teal-300"
                />
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                  <span>Smaller</span>
                  <span>Larger</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
