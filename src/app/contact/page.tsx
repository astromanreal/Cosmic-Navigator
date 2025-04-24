'use client';

import {Mail, Instagram, Twitter, Phone} from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          Feel free to reach out with any questions or inquiries.
        </p>
      </section>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white text-gray-900">Contact Information</h2>
        <div className="mb-4">
          <h3 className="font-semibold dark:text-gray-300 text-gray-700">Email</h3>
          <div className="flex items-center space-x-2">
            <Mail className="text-gray-500 dark:text-gray-400" size={16} />
            <a href="mailto:astroman6569@gmail.com" className="text-blue-500 hover:underline">
              astroman6569@gmail.com
            </a>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold dark:text-gray-300 text-gray-700">Twitter</h3>
          <div className="flex items-center space-x-2">
            <Twitter className="text-blue-500 dark:text-blue-400" size={16} />
            <a
              href="https://x.com/Sathyamsarthak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Sathyam Sarthak
            </a>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold dark:text-gray-300 text-gray-700">Instagram</h3>
          <div className="flex items-center space-x-2">
            <Instagram className="text-pink-500 dark:text-pink-400" size={16} />
            <a
              href="https://instagram.com/srishikharji/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Sri shikharji
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold dark:text-gray-300 text-gray-700">Call</h3>
          <div className="flex items-center space-x-2">
            <Phone className="text-green-500 dark:text-green-400" size={16} />
            <a href="tel:+918102116569" className="text-blue-500 hover:underline">
              +91 8102116569
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
