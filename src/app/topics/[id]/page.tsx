// src/app/topics/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import topicData from '../topicData.json';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle, FlaskConical, Info, Lightbulb, LinkIcon, Microscope, Sigma, Sparkles, Waves, Atom } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Article {
  title: string;
  description: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  status: string;
  relatedTopics: string[];
  articles: Article[];
}

const categoryIcons: { [key: string]: LucideIcon } = {
  Cosmology: BrainCircuit,
  Relativity: Waves,
  'Quantum Physics': Atom,
  'Theoretical Physics': Sigma,
  Astrobiology: Microscope,
  'Philosophy of Science': Lightbulb,
  Astrophysics: Sparkles,
  Thermodynamics: Waves, // Or another suitable icon
  // Add more categories and icons if present in topicData.json
};

const difficultyColors: { [key: string]: string } = {
  Beginner: 'bg-green-500/20 text-green-300 border-green-500/50',
  Intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  Advanced: 'bg-red-500/20 text-red-300 border-red-500/50',
};

const statusIcons: { [key: string]: LucideIcon } = {
  Established: CheckCircle,
  Theoretical: FlaskConical,
  Hypothetical: Lightbulb,
  Speculative: Lightbulb, // Using Lightbulb for Speculative as well
};


const TopicDetailPage = () => {
  const params = useParams();
  const topicId = params.id as string;

  const topic: Topic | undefined = topicData.find(
    topic => topic.id === topicId
  );

  if (!topic) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
        <Card className="dark:bg-gray-800 bg-white shadow-xl border dark:border-gray-700 w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-destructive dark:text-red-500">
              Topic Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-gray-400 mt-2">
              Sorry, the cosmic concept you're exploring is beyond our current understanding or not yet cataloged.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/topics">
              <Button variant="outline" className="mt-4">
                Back to Topics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedTopicsData = topicData.filter(
    (related) => topic.relatedTopics.includes(related.id) && related.id !== topicId
  );

  const CategoryIcon = categoryIcons[topic.category] || BrainCircuit;
  const StatusIcon = statusIcons[topic.status] || Info;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-4">
            {topic.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto italic">
            {topic.description}
          </p>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className="lg:w-2/3 space-y-8">
            {/* Key Details Card */}
            <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                  <Info className="mr-2 h-6 w-6 text-purple-400" />
                  Key Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="h-5 w-5 text-indigo-400" />
                  <span className="font-medium text-gray-400">Category:</span>
                  <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/50 text-sm py-1 px-3">{topic.category}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Sigma className="h-5 w-5 text-yellow-400" /> {/* Placeholder for difficulty */}
                  <span className="font-medium text-gray-400">Difficulty:</span>
                  <Badge variant="outline" className={`${difficultyColors[topic.difficulty] || 'border-gray-500/50'} text-sm py-1 px-3`}>{topic.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-gray-400">Status:</span>
                  <Badge variant="outline" className={`${topic.status === 'Established' ? 'bg-green-500/20 text-green-300 border-green-500/50' : 'bg-orange-500/20 text-orange-300 border-orange-500/50'} text-sm py-1 px-3`}>{topic.status}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Overview Content */}
            <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-purple-400" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 dark:text-gray-200 leading-relaxed prose prose-invert prose-base max-w-none">
                <p>{topic.content}</p>
              </CardContent>
            </Card>

            {/* Further Reading (Articles) */}
            {topic.articles && topic.articles.length > 0 && (
              <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <LinkIcon className="mr-2 h-6 w-6 text-purple-400" />
                    Further Reading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topic.articles.map((article, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-700/30 dark:bg-black/40 border border-gray-600/50 dark:border-gray-700/60 hover:shadow-lg transition-shadow hover:border-purple-500/50">
                      <h3 className="text-lg font-semibold text-pink-400 mb-1">{article.title}</h3>
                      <p className="text-sm text-gray-300 dark:text-gray-400 line-clamp-3">{article.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </main>

          {/* Related Topics Sidebar */}
          {relatedTopicsData.length > 0 && (
            <aside className="lg:w-1/3 space-y-6">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-4">
                Related Concepts
              </h2>
              <div className="space-y-4">
                {relatedTopicsData.map((relatedTopic) => {
                  const RelatedIcon = categoryIcons[relatedTopic.category] || BrainCircuit;
                  return (
                  <Link
                    href={`/topics/${relatedTopic.id}`}
                    key={relatedTopic.id}
                    className="group perspective block"
                    style={{ perspective: '1000px' }}
                  >
                    <Card 
                      className="
                        bg-gray-700/40 dark:bg-black/50 dark:hover:bg-gray-800/70 
                        border border-gray-600/50 dark:border-gray-700/60
                        shadow-lg hover:shadow-pink-500/30 
                        transition-all duration-300 transform-style-3d 
                        group-hover:scale-105 group-hover:-rotate-y-1 group-hover:-translate-z-1
                        overflow-hidden
                      "
                    >
                       <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-pink-300 group-hover:text-pink-200 transition-colors">{relatedTopic.name}</CardTitle>
                        <RelatedIcon className="h-5 w-5 text-pink-400/70 group-hover:text-pink-300 transition-colors" />
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mb-2">{relatedTopic.description}</p>
                        <Badge variant="outline" className={`${difficultyColors[relatedTopic.difficulty] || 'border-gray-500/50'} text-xs mr-1`}>{relatedTopic.difficulty}</Badge>
                        <Badge variant="secondary" className="bg-gray-600/50 text-gray-300 text-xs">{relatedTopic.category}</Badge>
                         <div className="flex justify-end mt-2">
                            <span className="inline-flex items-center text-orange-400 group-hover:text-orange-300 text-xs font-medium">
                                Explore <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </span>
                         </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
                })}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;

// Helper button component (if not already globally available)
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: string}> = ({ children, className, variant, ...props }) => {
  // Basic styling, can be expanded
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantStyle = variant === "outline" 
    ? "border border-primary text-primary hover:bg-primary/10" 
    : "bg-primary text-primary-foreground hover:bg-primary/90";
  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
