
import React, { Children } from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Dashboard from '../layout/Dashboard';
import EventPage from '../pages/Event/EventPage';
import ShareRide from '../pages/ShareRide/ShareRide';
import Massage from '../pages/Massage/Massage';
import AddEvent from '../pages/Addevent/AddEvent';
import Signup from '../components/Signup';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [            {
                path: "/",
                element: <Home />,
            },
           
        ]
    },
    {
        path: "/",
        element: <Dashboard />,
        children: [            {
            path: "/events",
            element: <EventPage/>,
            },
           {
            path: "/share-ride",
            element: <ShareRide/>,
           },
           {
            path: "/message",
            element: <Massage/>,
           },
           {
            path: "/add-events",
            element: <AddEvent/>,
           },
        ]
    },
    {
        path: "/signup",
        element: <Signup />,
    },
   
    
])
export default router
