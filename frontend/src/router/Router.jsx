import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Dashboard from '../layout/Dashboard';
import EventPage from '../pages/Event/EventPage';
import ShareRide from '../pages/ShareRide/ShareRide';
import Message from '../pages/Massage/Massage'; // or Massage if intentional
import AddEvent from '../pages/Addevent/AddEvent';
import Signup from '../components/Signup';
import AdminPanel from '../pages/admin/AdminPanel';
import PrivateRouter from '../privetRouter/privateRouter';
import ProfilePage from '../pages/Profile/Profile';
import JoinEventPage from '../components/JoinEventPage';
import EditEvent from '../components/EditEvent';
import AdminLayout from '../layout/AdminLayout';
import AdminRoute from '../privetRouter/AdminRoute';
import UserManagement from '../pages/admin/UserManagement';
import EventManager from '../pages/admin/EventManager';
import AdminMessages from '../pages/admin/AdminMessages';
import CalendarPage from '../pages/Calendar/Calendar';
import AppContentLayout from '../layout/AppContentLayout';

const router = createBrowserRouter([

  {
    path: "/",
    element: <Main />,
    children: [{
      path: "/",
      element: <Home />,
    },
    ]
  },

  // Public Routes
  {
    path: "/",
    element: <AppContentLayout />,
    children: [{
      path: "/calendar", element: <CalendarPage />,
    },

    ]
  },


  // Admin Routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "", // Default route for /admin
        element: <AdminPanel />
      }, {
        path: "/admin/users",
        element: <UserManagement />
      },
      {
        path: "/admin/events",
        element: <EventManager />
      },
      {
        path: "/admin/messages",
        element: <AdminMessages />,
      }


    ]
  },

  // Authenticated Dashboard Routes
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      { path: "events", element: <EventPage /> },
      { path: "share-ride", element: <ShareRide /> },
      { path: "message", element: <Message /> },
      { path: "add-events", element: <AddEvent /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "join-event", element: <JoinEventPage /> },
      { path: "edit-event", element: <EditEvent /> },
    ]
  },

  {
    path: "/signup",
    element: <Signup />
  }
]);

export default router;
