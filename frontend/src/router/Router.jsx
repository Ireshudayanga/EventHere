
import React, { Children } from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Dashboard from '../layout/Dashboard';
import EventPage from '../pages/Event/EventPage';
import ShareRide from '../pages/ShareRide/ShareRide';



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
           }
        ]
    },
    
])
export default router
