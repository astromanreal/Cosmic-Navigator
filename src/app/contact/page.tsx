
'use client';

import { Mail, Instagram, Twitter, Phone, Github, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ContactMethod {
  icon: React.ElementType;
  title: string;
  value: string;
  href: string;
  iconColor: string;
  actionText?: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'astroman6569@gmail.com',
    href: 'mailto:astroman6569@gmail.com',
    iconColor: 'text-teal-400',
    actionText: 'Send Email',
  },
  {
    icon: Twitter,
    title: 'Connect on Twitter',
    value: '@Sathyamsarthak',
    href: 'https://x.com/Sathyamsarthak',
    iconColor: 'text-blue-400',
    actionText: 'View Profile',
  },
  {
    icon: Instagram,
    title: 'Follow on Instagram',
    value: '@srishikharji',
    href: 'https://instagram.com/srishikharji/',
    iconColor: 'text-pink-400',
    actionText: 'View Profile',
  },
  {
    icon: Github,
    title: 'Explore on GitHub',
    value: 'astromanreal',
    href: 'https://github.com/astromanreal',
    iconColor: 'text-gray-300',
    actionText: 'View Repository',
  },
  {
    icon: Phone,
    title: 'Give Us a Call',
    value: '+91 8102116569',
    href: 'tel:+918102116569',
    iconColor: 'text-green-400',
    actionText: 'Call Now',
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Mail className="w-16 h-16 text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "We are all connected. To each other, biologically. To the earth, chemically. To the rest of the universe atomically." - Neil deGrasse Tyson
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions, feedback, or just want to talk about space? We'd love to hear from you. Reach out through any of the channels below.
          </p>
        </section>

        {/* Contact Methods Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => {
            const MethodIcon = method.icon;
            return (
              <div
                key={index}
                className="group perspective block h-full"
                style={{ perspective: '1000px' }}
              >
                <Card
                  className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    border border-transparent dark:border-gray-700/50 dark:hover:border-cyan-500/60
                    shadow-lg dark:shadow-cyan-900/30
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-cyan-500/50
                    group-hover:-rotate-y-1 group-hover:-translate-z-2
                    overflow-hidden h-full flex flex-col
                  "
                >
                  <CardHeader className="items-center text-center">
                    <div className={`p-4 bg-gray-700/50 dark:bg-black/50 rounded-full inline-block mb-4 shadow-md group-hover:bg-cyan-800/30 transition-colors`}>
                      <MethodIcon className={`h-10 w-10 ${method.iconColor} transition-colors group-hover:text-cyan-300`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-100">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-grow">
                    <p className="text-gray-300 dark:text-gray-400 mb-6 text-lg group-hover:text-cyan-100 transition-colors">
                      {method.value}
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-teal-500/70 to-cyan-600/70 text-white hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30 rounded-md px-4 py-2.5 text-sm font-medium"
                    >
                      <Link href={method.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        {method.actionText || 'Connect'} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </section>

        {/* Optional: Contact Form Placeholder */}
        <section className="mt-20">
          <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl p-8">
            <CardTitle className="text-2xl font-semibold text-gray-100 mb-6 text-center">Send Us a Message Directly</CardTitle>
            <p className="text-center text-gray-400 dark:text-gray-300">
              (Contact form functionality coming soon!)
            </p>
             {/* You can add a form here using ShadCN form components later */}
          </Card>
        </section>

      </div>
    </div>
  );
};

export default ContactPage;
