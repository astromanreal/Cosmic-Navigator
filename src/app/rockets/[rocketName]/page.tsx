'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import rocketData from '@/app/rockets/rocketData.json';
import {Badge} from '@/components/ui/badge';
import {Button} from "@/components/ui/button"; // Import Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

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

  // Find the rocket in the data
  const rocket: Rocket | undefined = rocketData.find(
    rocket => rocket.name.replace(/[^a-zA-Z0-9]/g, '-') === rocketName
  );

  if (!rocket) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold dark:text-white text-gray-900">
              Rocket Not Found
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sorry, the rocket you are looking for could not be found.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold dark:text-white text-gray-900">
              {rocket.name}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Overview
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <div>
              <b>Country:</b> {rocket.country}
            </div>
            <div>
              <b>Owner:</b> {rocket.owner}
            </div>
            <div>
              <b>Type:</b> <Badge>{rocket.type}</Badge>
            </div>
            <div>
              <b>Status:</b> {rocket.status}
            </div>
            <div>
              <b>Launch Year:</b> {rocket.launchYear}
            </div>
            <div>
              <b>Thrust:</b> {rocket.thrust}
            </div>
            <div>
              <b>Capacity:</b> {rocket.capacity}
            </div>
             <div>
              <b>Agency Type:</b> {rocket.agencyType}
            </div>
             <div>
              <b>Successful Launches:</b> {rocket.successfulLaunches}
            </div>
            <Separator className="my-4" />
            <div>
              <b>Description:</b> {rocket.description}
            </div>
          </CardContent>
          <Separator className="my-4" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
           <Button
              size="sm"
              className="bg-blue-500 text-white hover:bg-blue-700"
              onClick={() => window.open(rocket.wikiLink, '_blank')}
            >
              Explore Wiki
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RocketDetailPage;
