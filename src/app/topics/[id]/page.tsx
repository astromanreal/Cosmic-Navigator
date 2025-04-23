'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import topicData from '../topicData.json';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Topic {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  status: string;
  relatedTopics: string[];
}

const TopicDetailPage = () => {
  const params = useParams();
  const topicId = params.id;

  const topic: Topic | undefined = topicData.find(
    topic => topic.id === topicId
  );

  if (!topic) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold dark:text-white text-gray-900">
              Topic Not Found
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sorry, the topic you are looking for could not be found.
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
          {topic.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {topic.description}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Overview</h2>
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            {/* <CardTitle>{topic.name}</CardTitle> */}
            <CardDescription>Category: {topic.category}</CardDescription>
            <CardDescription>Difficulty: {topic.difficulty}</CardDescription>
            <CardDescription>Status: {topic.status}</CardDescription>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            {topic.content}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TopicDetailPage;
