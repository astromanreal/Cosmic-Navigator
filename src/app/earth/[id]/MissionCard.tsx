// src/app/earth/[id]/MissionCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Rocket, Calendar, Users, CheckCircle, AlertTriangle } from 'lucide-react'; // Added more icons

interface MissionEntry {
  name: string;
  url: string;
  launchDate?: string;
  owner?: string;
  rocket?: string;
  description?: string;
  status?: string;
}

interface MissionCardProps {
  mission: MissionEntry;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const getStatusBadgeVariant = (status?: string) => {
    if (!status) return "outline";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("active") || lowerStatus.includes("extended")) return "default"; // Green for active
    if (lowerStatus.includes("decommissioned") || lowerStatus.includes("completed") || lowerStatus.includes("failure")) return "destructive"; // Red for ended/failed
    return "secondary"; // Gray for others
  };
  
  const getStatusIcon = (status?: string) => {
    if (!status) return <CheckCircle className="h-3 w-3" />; // Default
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("active") || lowerStatus.includes("extended")) return <CheckCircle className="h-3 w-3 text-green-400" />;
    if (lowerStatus.includes("decommissioned") || lowerStatus.includes("completed")) return <CheckCircle className="h-3 w-3 text-red-400" />;
    if (lowerStatus.includes("failure")) return <AlertTriangle className="h-3 w-3 text-red-400" />;
    return <CheckCircle className="h-3 w-3 text-gray-400" />;
  };


  return (
    <div
      className="group perspective block"
      style={{ perspective: '1000px' }}
    >
      <Card
        className="
          bg-gray-700/40 dark:bg-black/50 hover:bg-gray-800/60 dark:hover:bg-gray-900/70
          border border-gray-600/50 dark:border-gray-700/60
          shadow-lg hover:shadow-teal-500/30 
          transition-all duration-300 transform-style-3d 
          group-hover:scale-105 group-hover:-rotate-y-1 group-hover:-translate-z-1
          overflow-hidden h-full flex flex-col
        "
      >
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-lg font-semibold text-teal-300 group-hover:text-teal-200 transition-colors line-clamp-2">
            {mission.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-4 flex-grow space-y-2 text-xs">
          {mission.description && (
            <p className="text-gray-300 dark:text-gray-400 line-clamp-3 mb-2">
              {mission.description}
            </p>
          )}
          {mission.owner && (
            <p className="flex items-center text-gray-400">
              <Users className="h-3.5 w-3.5 mr-1.5 text-teal-400/80" /> Owner: {mission.owner}
            </p>
          )}
          {mission.launchDate && (
            <p className="flex items-center text-gray-400">
              <Calendar className="h-3.5 w-3.5 mr-1.5 text-teal-400/80" /> Launch: {mission.launchDate}
            </p>
          )}
          {mission.rocket && (
            <p className="flex items-center text-gray-400">
              <Rocket className="h-3.5 w-3.5 mr-1.5 text-teal-400/80" /> Rocket: {mission.rocket}
            </p>
          )}
          {mission.status && (
            <div className="flex items-center text-gray-400">
              {getStatusIcon(mission.status)}
              <span className="ml-1.5">Status:</span>
              <Badge
                variant={getStatusBadgeVariant(mission.status) as any}
                className={`ml-1.5 text-xs py-0.5 px-1.5 
                  ${mission.status.toLowerCase().includes('active') || mission.status.toLowerCase().includes('extended') ? 'bg-green-600/30 text-green-200 border-green-500/50' : 
                    mission.status.toLowerCase().includes('decommissioned') || mission.status.toLowerCase().includes('completed') || mission.status.toLowerCase().includes('failure') ? 'bg-red-600/30 text-red-200 border-red-500/50' : 
                    'bg-gray-600/30 text-gray-200 border-gray-500/50'}`}
              >
                {mission.status}
              </Badge>
            </div>
          )}
        </CardContent>
        <div className="px-5 pb-4 pt-2 mt-auto">
          <Button
            asChild
            variant="link"
            size="sm"
            className="text-orange-400 hover:text-orange-300 p-0 h-auto text-xs font-medium group-hover:underline"
          >
            <a href={mission.url} target="_blank" rel="noopener noreferrer">
              Explore Mission <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MissionCard;
