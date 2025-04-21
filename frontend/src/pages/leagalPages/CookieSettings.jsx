import React from "react";

const CookieSettings = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Cookie Settings</h1>
      <p className="text-gray-600 mb-4">
        We use cookies to enhance your experience on EventHere.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li><strong>Essential Cookies:</strong> Necessary for core functionality</li>
        <li><strong>Analytics Cookies:</strong> Help us improve the site</li>
        <li><strong>Marketing Cookies:</strong> Personalize your experience</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Manage Preferences</h2>
      <p className="text-gray-600">
        You can update your cookie preferences through your browser settings or use a cookie consent tool.
      </p>
    </div>
  );
};

export default CookieSettings;
