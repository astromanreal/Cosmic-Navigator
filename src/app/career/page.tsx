// src/app/career/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Rocket as RocketIcon, BookOpen as BookOpenIcon, GraduationCap, UserRoundCog, Cog, Atom, Telescope, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconComponents: { [key: string]: React.ElementType } = {
  UserRoundCog,
  Cog,
  Atom,
  Telescope,
  Rocket: RocketIcon,
  BookOpen: BookOpenIcon,
  GraduationCap,
};

const careerData = [
  {
    "role": "Astronaut",
    "icon": "UserRoundCog",
    "steps": [
      "Get a STEM degree (Physics, Engineering, Biology)",
      "Gain physical training and military or flight experience",
      "Apply through space agency programs",
      "Undergo astronaut selection & simulation training"
    ],
    "skills": ["STEM", "Fitness", "Piloting", "Problem Solving"],
    "resources": ["NASA Astronaut Selection", "ESA Career Portal"]
  },
  {
     "role": "Aerospace Engineer",
     "icon": "Cog",
     "steps": [
       "Obtain a degree in Aerospace Engineering or related field.",
       "Develop skills in CAD, FEA, and CFD software.",
       "Gain experience through internships and co-op programs.",
       "Work on design, testing, and analysis of spacecraft and aircraft."
     ],
     "skills": ["Engineering Design", "Mathematics", "Computer Programming", "Teamwork"],
     "resources": ["AIAA", "SAE International"]
   },
   {
     "role": "Astrophysicist",
     "icon": "Atom",
     "steps": [
       "Earn a Bachelor's degree in Physics or Astronomy.",
       "Pursue graduate studies (Master's and/or Ph.D.) in Astrophysics.",
       "Conduct research in universities or observatories.",
       "Publish findings in scientific journals."
     ],
     "skills": ["Physics", "Data Analysis", "Research", "Problem Solving"],
     "resources": ["American Astronomical Society", "National Optical Astronomy Observatory"]
   }
];

const courseData = [
    {
      "name": "Introduction to Astronomy",
      "provider": "Coursera (e.g., Caltech)",
      "icon": "Telescope",
      "url": "https://www.coursera.org/learn/astro"
    },
    {
      "name": "Space Mission Design and Operations",
      "provider": "edX (e.g., MIT)",
      "icon": "Rocket",
      "url": "https://www.edx.org/learn/aerospace-engineering/massachusetts-institute-of-technology-mitx-introduction-to-aerospace-engineering-astronautics-and-human-spaceflight"
    },
    {
      "name": "Fundamentals of Rocket Propulsion",
      "provider": "Udemy",
      "icon": "Rocket",
      "url": "https://www.udemy.com/course/fundamentals-of-rocket-propulsion/"
    },
    {
      "name": "Astrophysics: Exploring Exoplanets",
      "provider": "Coursera (e.g., ANU)",
      "icon": "BookOpen",
      "url": "https://www.coursera.org/learn/astrophysics-exploring-exoplanets"
    }
];

const SpaceCareerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <GraduationCap className="w-16 h-16 text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
            🚀 Dream. Learn. Launch Your Space Career
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            Explore career paths, courses, and real opportunities in the space sector.
          </p>
        </section>

        {/* Career Roadmaps Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">
            Chart Your Course: Career Roadmaps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerData.map((career, index) => {
              const CareerIcon = iconComponents[career.icon] || RocketIcon;
              return (
                <div
                  key={index}
                  className="group perspective block h-full"
                  style={{ perspective: '1000px' }}
                >
                  <Card className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    border border-transparent dark:border-gray-700/50 dark:hover:border-cyan-500/60
                    shadow-lg dark:shadow-cyan-900/30
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-cyan-500/50
                    group-hover:-rotate-y-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  ">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <CareerIcon className="h-7 w-7 text-teal-400" />
                        <CardTitle className="text-xl font-bold text-gray-100">{career.role}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="text-lg font-semibold text-teal-300 mb-2">Key Steps:</h3>
                      <ul className="list-disc list-inside text-sm text-gray-300 dark:text-gray-400 space-y-1">
                        {career.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-4 pt-0 mt-auto">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-teal-500/70 to-cyan-600/70 text-white hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30 rounded-md px-4 py-2.5 text-sm font-medium"
                      >
                        <Link href="#" className="flex items-center justify-center">
                          Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        {/* Courses & Certifications Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Knowledge is Your Launchpad: Courses & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.map((course, i) => {
              const CourseIcon = iconComponents[course.icon] || BookOpenIcon;
              return (
                <div
                  key={i}
                  className="group perspective block h-full"
                  style={{ perspective: '1000px' }}
                >
                  <Card className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    border border-transparent dark:border-gray-700/50 dark:hover:border-yellow-500/60
                    shadow-lg dark:shadow-yellow-900/30
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-yellow-500/50
                    group-hover:rotate-y-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  ">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <CourseIcon className="h-7 w-7 text-yellow-400" />
                        <CardTitle className="text-xl font-bold text-gray-100">{course.name}</CardTitle>
                      </div>
                      <CardDescription className="text-orange-400 text-sm">Offered by: {course.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <p className="text-gray-300 dark:text-gray-400 text-sm mb-4">
                       Explore this comprehensive course to enhance your space career.
                      </p>
                    </CardContent>
                    <div className="p-4 pt-0 mt-auto">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-yellow-500/70 to-orange-600/70 text-white hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/30 rounded-md px-4 py-2.5 text-sm font-medium"
                      >
                        <Link href={course.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View Course <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        {/* Add more sections like Citizen Science, etc. */}

      </div>
    </div>
  );
};

export default SpaceCareerPage;
