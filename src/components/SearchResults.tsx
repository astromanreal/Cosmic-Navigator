// src/components/SearchResults.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

interface SearchableItem {
  type: string;
  title: string;
  description?: string;
  link: string;
}

interface SearchResultsProps {
  results: SearchableItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-6">
        <p>No items in this category for your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 py-2 pr-1"> {/* Added padding right to avoid scrollbar overlap */}
      {results.map((item, index) => {
        const isExternalLink = item.link.startsWith('http');
        return (
          <Link
            href={item.link}
            key={`${item.type}-${item.title.replace(/\s+/g, '-')}-${index}`} // More robust key
            passHref 
            legacyBehavior // Required if <a> is direct child
            className="block"
          >
            <a // The <a> tag is the direct child
              target={isExternalLink ? '_blank' : undefined} 
              rel={isExternalLink ? 'noopener noreferrer' : undefined}
              className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg group"
            >
              <Card className="bg-secondary/70 hover:bg-secondary/90 border border-border/30 transition-all duration-200 cursor-pointer w-full group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:border-transparent">
                <CardHeader className="pb-1.5 pt-2.5 px-3 flex flex-row justify-between items-center">
                  <CardTitle className="text-sm font-medium text-foreground line-clamp-1">{item.title}</CardTitle>
                  {isExternalLink && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />}
                </CardHeader>
                {item.description && (
                  <CardContent className="pt-0 px-3 pb-2">
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2">{item.description}</CardDescription>
                  </CardContent>
                )}
              </Card>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
