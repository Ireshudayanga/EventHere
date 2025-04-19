import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaHome,
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt
} from 'react-icons/fa';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 text-center border-b">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="p-4 flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <FaHome />
            Home
          </NavLink>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <FaUsers />
            User Management
          </NavLink>

          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <FaCalendarAlt />
            Events
          </NavLink>
          <NavLink
            to="/admin/messages"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h5m-1 8c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
              />
            </svg>
            Messages
          </NavLink>

        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
