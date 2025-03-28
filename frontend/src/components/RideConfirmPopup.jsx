/* eslint-disable react/prop-types */
// components/RideConfirmPopup.jsx
import React from "react";
import Button from "./Button"; // your existing button component

const RideConfirmPopup = ({ request, onAccept, onReject }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center max-w-sm mx-auto">
      <p className="text-lg text-black font-semibold mb-3">
        {request?.name} wants to ride with you!
      </p>
      <p className="text-sm text-gray-600 mb-4">Do you want to accept the ride request?</p>
      <div className="flex justify-center gap-4">
        <Button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded-xl">
          Accept
        </Button>
        <Button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded-xl">
          Reject
        </Button>
      </div>
    </div>
  );
};

export default RideConfirmPopup;
