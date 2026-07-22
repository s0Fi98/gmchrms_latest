import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Login from './features/auth/login/Login' 
import CommonLayout from './layouts/CommonLayout'
import Home from './features/home/Home'

const routesPath = createBrowserRouter([
    {
        path: '/', element: <Navigate to="/login" replace />,
    },
    {
        path: '/login', element: <Login />,
    },
    {
        path: '/home', 
        element: <CommonLayout />,
        children: [
            {
                index: true, element: <Home />,
            },
            // {
            //     path: '/employees', element: <EmployeeManagement />,
            // },
        ],
    },
    {
        path: '*', element: <Navigate to="/" replace />,
    },
])

function App() {
    return (
        <React.Fragment>
            <RouterProvider router={routesPath} />
        </React.Fragment>
    )
}

export default App