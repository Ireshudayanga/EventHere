import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        This Privacy Policy explains how we collect, use, and protect your personal information when you use EventHere.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. What We Collect</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Name and email address</li>
        <li>Event details you create or join</li>
        <li>Payment data (via secure third-party)</li>
        <li>Analytics data (device, browser, location)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use It</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>To manage your account and events</li>
        <li>To send notifications and updates</li>
        <li>To improve our platform and user experience</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Your Rights</h2>
      <p className="text-gray-600">
        You have the right to access, update, or delete your data. You can contact us at <a className="text-blue-600 underline" href="mailto:ireshudayanga23976@gmail.com">ireshudayanga23976@gmail.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
