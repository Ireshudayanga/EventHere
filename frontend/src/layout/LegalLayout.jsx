/* eslint-disable react/prop-types */
import React from "react";
import { Outlet } from "react-router-dom";

const LegalLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-500 text-sm md:text-base">
            Last updated: April 2025
          </p>
        </div>

        {/* Page Content */}
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
         <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
