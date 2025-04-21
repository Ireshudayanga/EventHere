import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="text-gray-600 mb-4">
        By using EventHere, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Account Use</h2>
      <p className="text-gray-600">
        You are responsible for maintaining the confidentiality of your account and activities that occur under your login.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Event Creation</h2>
      <p className="text-gray-600">
        You may create, edit, and publish events. You agree not to post harmful, illegal, or offensive content.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Ticket Sales</h2>
      <p className="text-gray-600">
        Ticket sales are final unless the event is canceled. We are not liable for issues caused by third-party payment processors.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Modifications</h2>
      <p className="text-gray-600">
        We reserve the right to update these terms at any time. You will be notified of significant changes.
      </p>
    </div>
  );
};

export default TermsAndConditions;
