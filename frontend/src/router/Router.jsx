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
import VolunteerPage from '../pages/Volunteer/VolunteerPage';
import ExplorePage from '../pages/Explore/ExplorePage';
import LegalLayout from '../layout/LegalLayout';
import PrivacyPolicy from '../pages/leagalPages/PrivacyPolicy';
import TermsAndConditions from '../pages/leagalPages/TermsAndConditions';
import CookieSettings from '../pages/leagalPages/CookieSettings';
import ModernSlaveryStatement from '../pages/leagalPages/ModernSlaveryStatement';

const router = createBrowserRouter([

  // HomePage Routes
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
    {
      path: "/volunteer", element: <VolunteerPage/>,
    },
    {
      path : "/explore", element: <ExplorePage />,
    }

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

  // Signup Route
  {
    path: "/signup",
    element: <Signup />
  },

  // Legal Pages
  {
    path: "/",
    element: < LegalLayout />,
    children: [{
      path: "/privacy", element: <PrivacyPolicy />,
    },
    {
      path: "/terms", element: <TermsAndConditions/>,
    },
    {
      path : "/cookies", element: <CookieSettings />,
    },
    {
      path : "/modern-slavery", element: <ModernSlaveryStatement />,
    }

    ]
  },
]);

export default router;
