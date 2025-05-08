// src/components/SearchFilter.tsx
'use client';

import React, {useEffect, useState, useMemo} from 'react';
import Fuse from 'fuse.js';
import {Input} from '@/components/ui/input';
import {Search, X} from 'lucide-react';
import SearchResults from './SearchResults';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import data sources
import spaceMissionsData from '@/app/missions/spaceMissions.json';
import activeTelescopesData from '@/app/telescopes/activeTelescopesData.json';
import futureTelescopesData from '@/app/telescopes/futureTelescopesData.json';
import rocketData from '@/app/rockets/rocketData.json';
import objectData from '@/app/objects/objectData.json';
import spaceAgenciesData from '@/app/space-agencies/space_agencies.json';
import topicData from '@/app/topics/topicData.json';
import breakthroughData from '@/app/science-discoveries/breakthroughData.json';

// Define interfaces for consistent typing
interface SearchableItem {
  type: string;
  title: string;
  description?: string;
  link: string;
}

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialogCategory, setCurrentDialogCategory] = useState<string | null>(null);
  const [dialogResults, setDialogResults] = useState<SearchableItem[]>([]);

  // Prepare the combined dataset and Fuse instance only once
  const allData = useMemo(() => {
    const missions = spaceMissionsData.map(item => ({ type: 'Mission', title: item.name, description: item.goals, link: item.link }));
    const activeTelescopes = activeTelescopesData.map(item => ({ type: 'Telescope', title: item.name, description: item.goals, link: `/telescopes/${item.name.replace(/[^a-zA-Z0-9]/g, '-')}` }));
    const futureTelescopes = futureTelescopesData.map(item => ({ type: 'Telescope (Future)', title: item.name, description: item.goals, link: `/telescopes/${item.name.replace(/[^a-zA-Z0-9]/g, '-')}` }));
    const rockets = rocketData.map(item => ({ type: 'Rocket', title: item.name, description: item.description, link: `/rockets/${item.name.replace(/[^a-zA-Z0-9]/g, '-')}` }));
    const objects = objectData.map(item => ({ type: 'Object', title: item.name, description: item.description, link: `/objects/${item.id}` }));
    const agencies = spaceAgenciesData.map(item => ({ type: 'Agency', title: item.name, description: item.details, link: item.url }));
    const topics = topicData.map(item => ({ type: 'Topic', title: item.name, description: item.description, link: `/topics/${item.id}` }));
    const breakthroughs = breakthroughData.map(item => ({ type: 'Discovery', title: item.title, description: item.description, link: `/science-discoveries#${item.title.toLowerCase().replace(/\s+/g, '-')}` }));


    const combinedData = [
        ...missions,
        ...activeTelescopes,
        ...futureTelescopes,
        ...rockets,
        ...objects,
        ...agencies,
        ...topics,
        ...breakthroughs,
    ].filter(item => item.title); // Ensure items have a title

    // Deduplicate based on title and link.
    const uniqueData = Array.from(new Map(combinedData.map(item => [`${item.title.toLowerCase()}-${item.link.toLowerCase()}`, item])).values());
    return uniqueData;

  }, []);

  const fuse = useMemo(() => {
    const options = {
      keys: ['title', 'description', 'type'],
      includeScore: true,
      threshold: 0.3, // Stricter threshold for better accuracy
    };
    return new Fuse(allData, options);
  }, [allData]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      setIsSearching(false);
      setCurrentDialogCategory(null);
      setIsDialogOpen(false);
      return;
    }

    setIsSearching(true);
    const searchResults = fuse.search(searchTerm).map(result => result.item);
    setResults(searchResults);
    
    const timer = setTimeout(() => setIsSearching(false), 200); // Shorter debounce
    return () => clearTimeout(timer);

  }, [searchTerm, fuse]);

  // Group results by type for display
  const groupedResults = useMemo(() => {
    return results.reduce((acc: { [type: string]: SearchableItem[] }, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [results]);

  const categoryCounts = useMemo(() => {
    const counts: { [type: string]: number } = {};
    Object.keys(groupedResults).forEach(type => {
      counts[type] = groupedResults[type].length;
    });
    return counts;
  }, [groupedResults]);

  const hasResults = Object.keys(groupedResults).length > 0;

  const handleCategoryClick = (category: string) => {
    setCurrentDialogCategory(category);
    setDialogResults(groupedResults[category] || []);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search missions, rockets, topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            pl-12 pr-10 py-3.5 w-full 
            bg-background/60 backdrop-blur-sm 
            border border-border/70 rounded-full
            text-foreground placeholder-muted-foreground
            focus:ring-2 focus:ring-primary focus:border-transparent
            shadow-lg hover:shadow-xl focus:shadow-xl
            transition-all duration-300
            text-base
          "
        />
        {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                 <div className="w-5 h-5 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
            </div>
        )}
        {!isSearching && searchTerm.trim() !== '' && (
           <Button
             variant="ghost"
             size="icon"
             className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground h-9 w-9 rounded-full"
             onClick={() => setSearchTerm('')}
           >
             <X className="h-5 w-5" />
             <span className="sr-only">Clear search</span>
           </Button>
        )}
      </div>

      {searchTerm.trim() !== '' && !isSearching && hasResults && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {Object.entries(categoryCounts)
            .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
            .map(([type, count]) => (
            <Button
              key={type}
              variant={currentDialogCategory === type && isDialogOpen ? "default" : "secondary"}
              size="sm"
              className={`
                text-sm rounded-full px-4 py-1.5
                transition-all duration-200 ease-in-out transform hover:scale-105
                shadow-md hover:shadow-lg
                ${currentDialogCategory === type && isDialogOpen
                  ? 'bg-primary text-primary-foreground ring-2 ring-primary/70 ring-offset-2 ring-offset-background'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                }
              `}
              onClick={() => handleCategoryClick(type)}
            >
              {type} <span className="ml-1.5 opacity-75">({count})</span>
            </Button>
          ))}
        </div>
      )}
      
      {searchTerm.trim() !== '' && !isSearching && !hasResults && (
        <div className="text-center text-muted-foreground mt-8 py-6">
          <p className="text-lg">No results found for "{searchTerm}".</p>
          <p className="mt-2 text-sm italic">Perhaps the universe is not obliged to make sense to us.</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl md:max-w-2xl bg-card/95 backdrop-blur-md border-border/50 text-card-foreground rounded-xl shadow-2xl">
          <DialogHeader className="pb-3 pt-4 px-4 border-b border-border/50">
            <DialogTitle className="text-xl font-semibold text-primary">
              Results for: {currentDialogCategory}
            </DialogTitle>
            {currentDialogCategory && groupedResults[currentDialogCategory] && (
            <DialogDescription className="text-muted-foreground text-sm">
              Showing {groupedResults[currentDialogCategory].length} items.
            </DialogDescription>
            )}
             <DialogClose asChild>
                <Button variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded-full p-1.5 h-8 w-8">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </DialogClose>
          </DialogHeader>
          <ScrollArea className="h-[60vh] max-h-[450px] md:max-h-[550px] pr-2 -mr-2 mt-1"> 
            {currentDialogCategory && groupedResults[currentDialogCategory] && (
              <SearchResults results={groupedResults[currentDialogCategory]} />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchFilter;
