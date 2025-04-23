'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import solarSystemData from '../solarSystemData.json';
import solarSystemMissionsData from '../solarSystemMissions.json';
import {Button} from "@/components/ui/button";

interface SolarBody {
  id: string;
  name: string;
  description: string;
}

interface Mission {
  name: string;
  url: string;
  launchDate: string;
  owner: string;
  rocket: string;
}

interface SolarSystemMissions {
  target: string;
  missions: Mission[];
}

const SolarSystemDetailPage = () => {
  const params = useParams();
  const solarBodyId = params.id;

  const solarBody: SolarBody | undefined = solarSystemData.find(
    body => body.id === solarBodyId
  );

  const relevantMissions: Mission[] | undefined = solarSystemMissionsData.find(
    (item: SolarSystemMissions) => item.target.toLowerCase() === solarBodyId
  )?.missions;

  if (!solarBody) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold dark:text-white text-gray-900">
              Solar Body Not Found
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sorry, the solar body you are looking for could not be found.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">
          {solarBody.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {solarBody.description}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Overview</h2>
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">
              {solarBody.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <p>More details about {solarBody.name} will be added soon...</p>
          </CardContent>
        </Card>
      </section>

      {relevantMissions && relevantMissions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">
            Missions to {solarBody.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relevantMissions.map((mission) => (
              <Card key={mission.name} className="dark:bg-gray-800 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">
                    {mission.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  <div className="mb-2">
                    <span className="font-semibold">Launch Date:</span> {mission.launchDate}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Owner:</span> {mission.owner}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Rocket:</span> {mission.rocket}
                  </div>
                  <div className="mt-4">
                  <Button asChild variant="secondary" size="sm">
                    <a
                      href={mission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200"
                    >
                      Explore More...
                    </a>
                  </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SolarSystemDetailPage;
