
import React, { Children } from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        Children: [
            {
                path: "/",
                element: <Home />,
            }
        ]
    }
])
export default router
