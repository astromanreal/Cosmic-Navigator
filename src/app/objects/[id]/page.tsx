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
import objectData from '../objectData.json'; // Import the JSON data
import Link from 'next/link';

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

interface Article {
  title: string;
  description: string;
}

const ObjectDetailPage = () => {
  const params = useParams();
  const objectId = params.id;

  const object: Topic | undefined = objectData.find(
    topic => topic.id === objectId
  );

  if (!object) {
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

   const relatedObjects = objectData.filter(
    (relatedObject) =>
      object.relatedTopics.includes(relatedObject.id) && relatedObject.id !== objectId
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">
          {object.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {object.description}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Overview</h2>
        <Card className="dark:bg-gray-900 bg-white">
          <CardHeader>
            <CardDescription>Category: {object.category}</CardDescription>
            <CardDescription>Difficulty: {object.difficulty}</CardDescription>
            <CardDescription>Status: {object.status}</CardDescription>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            {object.content}
              
          </CardContent>
        </Card>

        <section> 
        <h2 className="text-2xl font-semibold mt-4 dark:text-white text-gray-900">
                Further Reading
              </h2>
             {object.articles && object.articles.length > 0 ? (
            <div className="space-y-6">
              {object.articles.map((article, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold dark:text-white text-gray-900">{article.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 mt-2">{article.description}</p>
                </div>
              ))}
            </div>

            ) : (
                <p className="dark:text-gray-300">No articles available for this topic.</p>
            )}
          </section>
      </section>
       {relatedObjects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">
            Related Objects
          </h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedObjects.map((relatedObject) => (
              <Card key={relatedObject.id} className="dark:bg-gray-800 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold dark:text-white text-gray-900">
                    {relatedObject.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {relatedObject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/objects/${relatedObject.id}`}
                    className="text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200"
                  >
                    Learn More...
                  </Link>
                </CardContent>
              </Card>
            ))}
            </div>
        </section>
      )}
    </div>
  );
};

export default ObjectDetailPage;
