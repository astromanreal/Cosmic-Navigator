// src/app/career/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Rocket as RocketIcon, BookOpen as BookOpenIcon, GraduationCap, UserRoundCog, Cog, Atom, Telescope, ArrowRight, Building2, Users, Search, Sparkles, Briefcase, Lightbulb, Wrench, ListChecks, Brain } from 'lucide-react';
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
  Building2,
  Users,
  Search,
  Sparkles,
  Briefcase,
  Lightbulb,
  Wrench, // Note: Lucide's Wrench is named Construction, or use a more generic icon
  ListChecks,
  Brain,
};

const careerData = [
  {
    "role": "Astronaut",
    "icon": "UserRoundCog",
    "steps": [
      "Obtain a STEM degree (e.g., Engineering, Physics, Biology).",
      "Gain relevant professional experience (e.g., piloting, research).",
      "Meet physical and psychological requirements.",
      "Apply to space agency astronaut programs (e.g., NASA, ESA).",
      "Undergo rigorous selection and extensive training."
    ],
    "skills": ["STEM Expertise", "Physical Fitness", "Problem-Solving", "Teamwork", "Adaptability"],
    "resourcesLink": "https://www.nasa.gov/humans-in-space/astronauts/become-an-astronaut/",
    "image": "https://placehold.co/600x400.png",
    "aiHint": "astronaut spacesuit"
  },
  {
     "role": "Aerospace Engineer",
     "icon": "Cog",
     "steps": [
       "Earn a Bachelor's degree in Aerospace or Mechanical Engineering.",
       "Develop proficiency in CAD, simulation (FEA, CFD) software.",
       "Gain experience through internships, co-ops, or projects.",
       "Consider advanced degrees for specialized roles or research.",
       "Obtain professional licensure (e.g., PE) if required."
     ],
     "skills": ["Design & Analysis", "Mathematics", "Physics", "Programming", "Project Management"],
     "resourcesLink": "https://www.aiaa.org/career-resources",
     "image": "https://placehold.co/600x400.png",
     "aiHint": "rocket engine"
   },
   {
     "role": "Astrophysicist",
     "icon": "Atom",
     "steps": [
       "Complete a Bachelor's degree in Physics or Astronomy.",
       "Pursue a Ph.D. in Astrophysics or a related field.",
       "Conduct postdoctoral research to build expertise.",
       "Secure positions at universities, observatories, or research labs.",
       "Publish research and present findings."
     ],
     "skills": ["Data Analysis", "Theoretical Modeling", "Observation", "Coding (Python, etc.)", "Critical Thinking"],
     "resourcesLink": "https://aas.org/careers/career-resources",
     "image": "https://placehold.co/600x400.png",
     "aiHint": "galaxy telescope"
   }
];

const courseData = [
    {
      "name": "Introduction to Astronomy",
      "provider": "Coursera (e.g., Caltech)",
      "icon": "Telescope",
      "url": "https://www.coursera.org/learn/astro",
      "description": "A foundational course covering celestial mechanics, stars, galaxies, and cosmology.",
      "image": "https://placehold.co/600x400.png",
      "aiHint": "telescope stars"
    },
    {
      "name": "Space Mission Design and Operations",
      "provider": "edX (e.g., EPFLx)",
      "icon": "RocketIcon",
      "url": "https://www.edx.org/learn/aerospace-engineering/ecole-polytechnique-federale-de-lausanne-epflx-space-mission-design-and-operations",
      "description": "Learn the principles of designing and operating complex space missions, from concept to execution.",
      "image": "https://placehold.co/600x400.png",
      "aiHint": "spacecraft design"
    },
    {
      "name": "Fundamentals of Rocket Propulsion",
      "provider": "Udemy",
      "icon": "RocketIcon",
      "url": "https://www.udemy.com/course/fundamentals-of-rocket-propulsion/",
      "description": "Understand the core concepts behind rocket engines and propulsion systems.",
      "image": "https://placehold.co/600x400.png",
      "aiHint": "rocket engine"
    },
    {
      "name": "Exoplanets",
      "provider": "Coursera (e.g., EPFL)",
      "icon": "BookOpenIcon",
      "url": "https://www.coursera.org/learn/exoplanets",
      "description": "Delve into the methods of detecting and characterizing planets beyond our solar system.",
      "image": "https://placehold.co/600x400.png",
      "aiHint": "exoplanet discovery"
    }
];

const organizationsData = [
    { name: "NASA", iconName: "Building2", url: "https://www.nasa.gov/careers/", description: "Pioneer the future of space exploration, scientific discovery, and aeronautics research.", image: "https://placehold.co/600x400.png", aiHint: "NASA logo" },
    { name: "ESA", iconName: "Building2", url: "https://jobs.esa.int/", description: "Join the European Space Agency to shape the future of space activities in Europe.", image: "https://placehold.co/600x400.png", aiHint: "ESA logo" },
    { name: "SpaceX", iconName: "Building2", url: "https://www.spacex.com/careers/", description: "Work on reusable rockets and missions to Mars, advancing space technology.", image: "https://placehold.co/600x400.png", aiHint: "SpaceX rocket" },
    { name: "Blue Origin", iconName: "Building2", url: "https://www.blueorigin.com/careers/", description: "Help build a road to space with reusable launch systems for a future of millions living and working in space.", image: "https://placehold.co/600x400.png", aiHint: "Blue Origin rocket" },
    { name: "ISRO", iconName: "Building2", url: "https://www.isro.gov.in/careers", description: "Contribute to India's ambitious space program, from satellite launches to planetary exploration.", image: "https://placehold.co/600x400.png", aiHint: "ISRO rocket" }
];

const citizenScienceData = [
    { name: "Galaxy Zoo", iconName: "Users", url: "https://www.zooniverse.org/projects/zookeeper/galaxy-zoo/", description: "Help astronomers classify galaxies and understand cosmic evolution.", image: "https://placehold.co/600x400.png", aiHint: "galaxy classification" },
    { name: "Planet Hunters TESS", iconName: "Search", url: "https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess", description: "Discover new exoplanets by analyzing data from NASA's TESS mission.", image: "https://placehold.co/600x400.png", aiHint: "exoplanet TESS" },
    { name: "Stardust@home", iconName: "Sparkles", url: "https://stardustathome.ssl.berkeley.edu/", description: "Search for interstellar dust particles captured by NASA's Stardust mission.", image: "https://placehold.co/600x400.png", aiHint: "interstellar dust" },
    { name: "Globe at Night", iconName: "Lightbulb", url: "https://www.globeatnight.org/", description: "Measure light pollution in your area and contribute to a global database.", image: "https://placehold.co/600x400.png", aiHint: "light pollution map" }
];


const SpaceCareerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <GraduationCap className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Launch Your Cosmic Career</span>
            <span className="block text-2xl sm:text-3xl text-teal-300 mt-2">Dream. Learn. Explore the Universe.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-8 max-w-3xl mx-auto font-mono">
            "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt (adapted for space)
          </p>
           <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The final frontier is calling. Whether you aspire to walk on other worlds, design pioneering spacecraft, or unravel the universe's deepest secrets, your journey into a space-related career starts here. Discover pathways, acquire knowledge, and connect with opportunities.
          </p>
        </section>

        {/* Career Roadmaps Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-12 text-center flex items-center justify-center gap-3">
             <RocketIcon className="w-8 h-8 text-teal-400"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">Chart Your Course: Career Roadmaps</span>
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
                    border border-transparent dark:border-gray-700/50 dark:hover:border-teal-500/60
                    shadow-xl dark:shadow-teal-900/40
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-teal-500/50
                    group-hover:-rotate-y-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  ">
                     {/* Image placeholder - ideally, replace with actual Image component if images are hosted */}
                     <div className="aspect-video w-full bg-gray-700/50 overflow-hidden">
                       <Image src={career.image} alt={career.role} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={career.aiHint}/>
                     </div>
                    <CardHeader className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-teal-600/20 rounded-full">
                           <CareerIcon className="h-7 w-7 text-teal-300" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-100">{career.role}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <h3 className="text-md font-semibold text-teal-200 mb-2">Key Steps:</h3>
                      <ul className="list-disc list-inside text-sm text-gray-300 dark:text-gray-400 space-y-1.5 pl-2">
                        {career.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                      <h3 className="text-md font-semibold text-teal-200 mt-4 mb-2">Essential Skills:</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.map((skill, i) => (
                          <span key={i} className="text-xs bg-teal-700/50 text-teal-200 px-2 py-0.5 rounded-full border border-teal-600/70">{skill}</span>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-4 pt-2 mt-auto">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-teal-500/80 to-cyan-600/80 text-white hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/40 rounded-md px-4 py-2.5 text-sm font-medium"
                      >
                        <Link href={career.resourcesLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
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
           <h2 className="text-3xl font-semibold mb-12 text-center flex items-center justify-center gap-3">
             <BookOpenIcon className="w-8 h-8 text-yellow-400"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Knowledge is Power: Courses & Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.map((course, i) => {
              const CourseIcon = iconComponents[course.icon.replace('Icon','')] || BookOpenIcon;
              return (
                <div
                  key={i}
                  className="group perspective block h-full"
                  style={{ perspective: '1000px' }}
                >
                  <Card className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    border border-transparent dark:border-gray-700/50 dark:hover:border-yellow-500/60
                    shadow-xl dark:shadow-yellow-900/40
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-yellow-500/50
                    group-hover:rotate-y-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  ">
                     <div className="aspect-video w-full bg-gray-700/50 overflow-hidden">
                       <Image src={course.image} alt={course.name} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={course.aiHint}/>
                     </div>
                    <CardHeader className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2.5 bg-yellow-600/20 rounded-full">
                           <CourseIcon className="h-7 w-7 text-yellow-300" />
                         </div>
                        <CardTitle className="text-xl font-bold text-gray-100">{course.name}</CardTitle>
                      </div>
                      <CardDescription className="text-orange-400 text-sm">Offered by: {course.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                       {course.description}
                      </p>
                    </CardContent>
                    <div className="p-4 pt-2 mt-auto">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-yellow-500/80 to-orange-600/80 text-white hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/40 rounded-md px-4 py-2.5 text-sm font-medium"
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

        {/* Featured Space Organizations Section */}
        <section className="mb-20">
           <h2 className="text-3xl font-semibold mb-12 text-center flex items-center justify-center gap-3">
             <Building2 className="w-8 h-8 text-sky-400"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Join the Vanguard: Space Organizations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizationsData.map((org, i) => {
              const OrgIcon = iconComponents[org.iconName] || Building2;
              return (
                <div key={i} className="group perspective block h-full" style={{ perspective: '1000px' }}>
                  <Card className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    border border-transparent dark:border-gray-700/50 dark:hover:border-sky-500/60
                    shadow-xl dark:shadow-sky-900/40
                    transition-all duration-500 ease-out transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-sky-500/50
                    group-hover:rotate-x-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  ">
                     <div className="aspect-video w-full bg-gray-700/50 overflow-hidden">
                       <Image src={org.image} alt={org.name} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={org.aiHint}/>
                     </div>
                    <CardHeader className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2.5 bg-sky-600/20 rounded-full">
                           <OrgIcon className="h-7 w-7 text-sky-300" />
                         </div>
                        <CardTitle className="text-xl font-bold text-gray-100">{org.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 leading-relaxed">{org.description}</p>
                    </CardContent>
                    <div className="p-4 pt-2 mt-auto">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-sky-500/80 to-blue-600/80 text-white hover:from-sky-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/40 rounded-md px-4 py-2.5 text-sm font-medium"
                      >
                        <Link href={org.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View Careers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        {/* Citizen Science Opportunities Section */}
        <section className="mb-20">
           <h2 className="text-3xl font-semibold mb-12 text-center flex items-center justify-center gap-3">
             <Users className="w-8 h-8 text-green-400"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-500">Become a Discoverer: Citizen Science</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {citizenScienceData.map((project, i) => {
              const ProjectIcon = iconComponents[project.iconName] || Users;
              return (
                <div key={i} className="group perspective block h-full" style={{ perspective: '1000px' }}>
                  <Card className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    border border-transparent dark:border-gray-700/50 dark:hover:border-green-500/60
                    shadow-xl dark:shadow-green-900/40
                    transition-all duration-500 ease-out transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-green-500/50
                    group-hover:-rotate-x-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  ">
                    <div className="aspect-[16/10] w-full bg-gray-700/50 overflow-hidden"> {/* Adjusted aspect ratio for potentially non-standard images */}
                       <Image src={project.image} alt={project.name} width={600} height={375} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={project.aiHint}/>
                    </div>
                    <CardHeader className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-green-600/20 rounded-full">
                          <ProjectIcon className="h-7 w-7 text-green-300" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-100">{project.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                    </CardContent>
                    <div className="p-4 pt-2 mt-auto">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500/80 to-lime-600/80 text-white hover:from-green-500 hover:to-lime-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-lime-500/40 rounded-md px-4 py-2.5 text-sm font-medium"
                      >
                        <Link href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          Participate Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        {/* Placeholder for Skills Section */}
        <section>
             <h2 className="text-3xl font-semibold mb-12 text-center flex items-center justify-center gap-3">
                <ListChecks className="w-8 h-8 text-pink-400"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">Essential Skills for the Cosmos</span>
             </h2>
             <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl p-8">
                <CardTitle className="text-2xl font-semibold text-gray-100 mb-6 text-center">Unlock Your Potential</CardTitle>
                <p className="text-center text-gray-400 dark:text-gray-300">
                (Detailed information on key skills such as Problem Solving, Critical Thinking, Programming, Data Analysis, and Engineering Principles coming soon! This section will highlight the transferable skills vital for a career in the space sector.)
                </p>
             </Card>
        </section>

      </div>
    </div>
  );
};

export default SpaceCareerPage;
