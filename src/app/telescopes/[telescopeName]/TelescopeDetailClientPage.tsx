// src/app/telescopes/[telescopeName]/TelescopeDetailClientPage.tsx
"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarCheck, Info, SlidersHorizontal, TrendingUp, Aperture, RadioTower, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface Telescope {
  id?: number;
  name: string;
  owner: string;
  wavelength: string;
  target: string;
  goals: string;
  status?: string;
  launch_date?: string;
  type?: string;
  keyTechnologies?: string; // Added from service, assuming it might be in future JSON
  dataCaptured?: string;   // Added from service
  futureUpgrades?: string; // Added from service
  url?: string; // For official link
  aiHint?: string;
  image?: string;
}

interface TelescopeDetailClientPageProps {
  telescope: Telescope | undefined;
}

const TelescopeDetailClientPage: React.FC<TelescopeDetailClientPageProps> = ({ telescope }) => {
  const router = useRouter();

  if (!telescope) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
        <Card className="dark:bg-gray-800 bg-white shadow-xl border dark:border-gray-700 w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-destructive dark:text-red-500">
              Telescope Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-gray-400 mt-2">
              Sorry, the cosmic observatory you're looking for could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mt-4" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Telescopes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const detailItems = [
    { label: "Owner/Agency", value: telescope.owner, icon: RadioTower },
    { label: "Wavelength Capability", value: telescope.wavelength, icon: Aperture },
    { label: "Primary Target Areas", value: telescope.target, icon: TrendingUp },
    { label: "Operational Status", value: telescope.status, icon: CheckCircle, badge: true, 
      badgeClass: `${telescope.status?.toLowerCase() === 'active' ? 'bg-green-600/70 text-green-100 border-green-500/50' : telescope.status?.toLowerCase() === 'planned' || telescope.status?.toLowerCase() === 'concept' ? 'bg-blue-600/70 text-blue-100 border-blue-500/50' : 'bg-gray-600/70 text-gray-100 border-gray-500/50' }` 
    },
    { label: "Launch Date", value: telescope.launch_date, icon: CalendarCheck },
    { label: "Telescope Type", value: telescope.type, icon: SlidersHorizontal },
    { label: "Key Technologies", value: telescope.keyTechnologies, icon: Info },
    { label: "Data Captured Examples", value: telescope.dataCaptured, icon: Info },
    { label: "Future Upgrades", value: telescope.futureUpgrades, icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 text-purple-300 hover:text-purple-200 hover:bg-gray-700/50">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Telescopes
        </Button>

        <Card className="dark:bg-gray-800/70 bg-white/90 shadow-2xl border dark:border-gray-700/50 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-purple-600/30 via-indigo-600/30 to-blue-600/30 p-8 border-b dark:border-gray-700/50 text-center">
            <CardTitle className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 tracking-tight">
              {telescope.name}
            </CardTitle>
            <CardDescription className="text-purple-200/80 dark:text-indigo-300/80 mt-2 text-md sm:text-lg italic">
              Peering into the Universe's Depths
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detailItems.map(item => {
                if (!item.value) return null;
                return (
                  <div key={item.label} className="bg-gray-700/40 dark:bg-black/50 p-4 rounded-lg shadow-md flex items-start space-x-3">
                    <item.icon className="h-6 w-6 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-purple-300">{item.label}:</p>
                      {item.badge ? (
                        <Badge variant={'outline'} className={`${item.badgeClass || 'border-purple-500/50 text-purple-200 bg-purple-900/30'} mt-1 text-xs`}>
                          {item.value}
                        </Badge>
                      ) : (
                        <p className="text-gray-200 dark:text-gray-100 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-6 bg-gray-700/50 dark:bg-gray-600/50" />

            <div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-3 flex items-center"><Info className="mr-2 h-5 w-5"/>Scientific Goals</h3>
              <div className="text-gray-300 dark:text-gray-200 leading-relaxed text-sm bg-gray-700/20 dark:bg-black/30 p-4 rounded-md prose prose-sm prose-invert max-w-none">
                <p>{telescope.goals}</p>
              </div>
            </div>
            
            {telescope.url && (
              <>
                <Separator className="my-6 bg-gray-700/50 dark:bg-gray-600/50" />
                <div className="text-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                    <a href={telescope.url} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </a>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TelescopeDetailClientPage;
