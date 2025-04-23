'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import activeTelescopesData from '@/app/telescopes/activeTelescopesData.json';
import futureTelescopesData from '@/app/telescopes/futureTelescopesData.json';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

interface Telescope {
  name: string;
  owner: string;
  wavelength: string;
  target: string;
  goals: string;
  status?: string;
  launch_date?: string;
  type?: string;
}

const TelescopeDetailPage = () => {
  const params = useParams();
  const telescopeName = params.telescopeName;

  // Attempt to find the telescope in both active and future datasets
  const telescope: Telescope | undefined =
    activeTelescopesData.find(
      telescope => telescope.name.replace(/[^a-zA-Z0-9]/g, '-') === telescopeName
    ) ||
    futureTelescopesData.find(
      telescope => telescope.name.replace(/[^a-zA-Z0-9]/g, '-') === telescopeName
    );

  if (!telescope) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold dark:text-white text-gray-900">
              Telescope Not Found
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sorry, the telescope you are looking for could not be found.
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
              {telescope.name}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Overview
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <div>
              <b>Owner:</b> {telescope.owner}
            </div>
            <div>
              <b>Wavelength:</b> {telescope.wavelength}
            </div>
            <div>
              <b>Target:</b> {telescope.target}
            </div>
            <div>
              <b>Goals:</b> {telescope.goals}
            </div>
            {telescope.status && (
              <div className="text-gray-600 dark:text-gray-300">
                <b>Status:</b> <Badge>{telescope.status}</Badge>
              </div>
            )}
            {telescope.launch_date && (
              <div className="text-gray-600 dark:text-gray-300">
                <b>Launch Date:</b> {telescope.launch_date}
              </div>
            )}
            {telescope.type && (
              <div className="text-gray-600 dark:text-gray-300">
                <b>Type:</b> {telescope.type}
              </div>
            )}
          </CardContent>
          <Separator className="my-4" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            More details about {telescope.name} will be added soon.
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TelescopeDetailPage;
