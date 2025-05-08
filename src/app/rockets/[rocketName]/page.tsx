// src/app/rockets/[rocketName]/page.tsx
'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import rocketData from '@/app/rockets/rocketData.json';
import {Badge} from '@/components/ui/badge';
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import { ExternalLink, CalendarDays, Tag, Flag, Power, Gauge, Building, CheckCircle, Info } from 'lucide-react';

interface Rocket {
  id: number;
  name: string;
  country: string;
  owner: string;
  type: string;
  status: string;
  launchYear: number;
  thrust: string;
  capacity: string;
  agencyType: string;
  successfulLaunches: number;
  description: string;
  wikiLink: string;
}

const RocketDetailPage = () => {
  const params = useParams();
  const rocketName = params.rocketName;

  const rocket: Rocket | undefined = rocketData.find(
    rocket => rocket.name.replace(/[^a-zA-Z0-9]/g, '-') === rocketName
  );

  if (!rocket) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="dark:bg-gray-800 bg-white shadow-lg border dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-destructive">
              Rocket Not Found
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Sorry, the rocket you are looking for could not be found. Please check the URL or navigate back to the rockets list.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const detailItems = [
    { label: "Country", value: rocket.country, icon: Flag },
    { label: "Owner", value: rocket.owner, icon: Building },
    { label: "Type", value: rocket.type, icon: Tag, badge: true },
    { label: "Status", value: rocket.status, icon: CheckCircle, badge: true,
      badgeVariant: rocket.status === 'Active' ? 'default' : rocket.status === 'Retired' ? 'secondary' : 'outline',
      badgeClass: `${rocket.status === 'Active' ? 'bg-green-600/70 text-green-100 border-green-500/50' : rocket.status === 'Retired' ? 'bg-red-600/70 text-red-100 border-red-500/50' : 'bg-gray-600/70 text-gray-100 border-gray-500/50' }`
    },
    { label: "Launch Year", value: rocket.launchYear.toString(), icon: CalendarDays },
    { label: "Thrust", value: rocket.thrust, icon: Power },
    { label: "Capacity", value: rocket.capacity, icon: Gauge },
    { label: "Agency Type", value: rocket.agencyType, icon: Building },
    { label: "Successful Launches", value: rocket.successfulLaunches.toString(), icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="dark:bg-gray-800/70 bg-white/90 shadow-2xl border dark:border-gray-700/50 rounded-xl overflow-hidden transform-style-3d perspective">
          <CardHeader className="bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-600/20 p-8 border-b dark:border-gray-700/50">
            <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-center tracking-tight">
              {rocket.name}
            </CardTitle>
            <CardDescription className="text-center text-orange-200/80 dark:text-red-300/80 mt-2 text-lg italic">
              A detailed look into one of humanity's powerful launch vehicles.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {detailItems.map(item => (
                <div key={item.label} className="bg-gray-700/30 dark:bg-black/40 p-4 rounded-lg shadow-md flex items-start space-x-3">
                  <item.icon className="h-6 w-6 text-orange-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-orange-300">{item.label}:</p>
                    {item.badge ? (
                      <Badge variant={(item.badgeVariant as any) || 'outline'} className={item.badgeClass || 'border-orange-500/50 text-orange-200 bg-orange-900/30 mt-1'}>
                        {item.value}
                      </Badge>
                    ) : (
                      <p className="text-gray-200 dark:text-gray-100">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6 bg-gray-700/50 dark:bg-gray-600/50" />

            <div>
              <h3 className="text-2xl font-semibold text-orange-400 mb-3 flex items-center"><Info className="mr-2 h-6 w-6"/>Description</h3>
              <p className="text-gray-300 dark:text-gray-200 leading-relaxed text-justify bg-gray-700/20 dark:bg-black/30 p-4 rounded-md">
                {rocket.description}
              </p>
            </div>

            <Separator className="my-6 bg-gray-700/50 dark:bg-gray-600/50" />
            
            <div className="text-center mt-8">
            <Button
              size="lg"
              asChild
              className="
                bg-gradient-to-r from-orange-500 to-red-600 text-white 
                hover:from-orange-600 hover:to-red-700 
                shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:scale-105 active:scale-95
                px-10 py-3 text-base rounded-lg group
              "
            >
              <a href={rocket.wikiLink} target="_blank" rel="noopener noreferrer">
                Explore on Wikipedia <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RocketDetailPage;
