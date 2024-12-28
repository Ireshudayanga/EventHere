
import React, { Children } from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import EventPaage from '../pages/Event/EventPaage';

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
        path: "/events",
        element: <EventPaage />,
    }
])
export default router
