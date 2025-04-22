/* eslint-disable react/prop-types */
// components/PopupModal.jsx

export default function PopupModal({ onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[3000]">
        <div className="bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-md text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to EventHere! 🎉
          </h2>
  
          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
            EventHere helps you <strong>create</strong>, <strong>discover</strong>, and <strong>join</strong> events in your local community — all in one place.
          </p>
  
          <ul className="text-sm text-left text-gray-600 mb-4 list-disc list-inside">
            <li>Create and manage your own events easily</li>
            <li>Join local gatherings, workshops, and festivals</li>
            <li>Share or offer rides for events</li>
            <li>Get reminders for volunteer opportunities</li>
            <li>Chat directly with admins if needed</li>
          </ul>
  
          <p className="text-gray-500 text-xs mb-5">
            We’re excited to have you here. Let’s get started!
          </p>
  
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm transition duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }
  