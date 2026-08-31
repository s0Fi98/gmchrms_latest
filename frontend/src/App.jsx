// import React from 'react'
// import './App.css'
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// import Login from './features/auth/login/Login' 
// import CommonLayout from './layouts/CommonLayout'
// import Home from './features/home/Home'

// const routesPath = createBrowserRouter([
//     {
//         path: '/', element: <Navigate to="/login" replace />,
//     },
//     {
//         path: '/login', element: <Login />,
//     },
//     {
//         path: '/layout', 
//         element: <CommonLayout />,
//         children: [
//             {
//                 index: true, element: <Home />,
//             },
//             {
//                 path: '/home', element: <Home />,
//             },
//         ],
//     },
//     {
//         path: '*', element: <Navigate to="/" replace />,
//     },
// ])

// function App() {
//     return (
//         <React.Fragment>
//             <RouterProvider router={routesPath} />
//         </React.Fragment>
//     )
// }

// export default App


import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Login from './features/auth/login/Login' 
import CommonLayout from './layouts/CommonLayout'
import Home from './features/home/Home'

const routesPath = createBrowserRouter([
    {
        path: '/', 
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login', 
        element: <Login />,
    },
    {
        // 1. Base portal layout route
        path: '/home', 
        element: <CommonLayout />,
        children: [
            {
                // When on "/app", renders Home directly
                index: true, 
                element: <Home />,
            },
            {
                // Notice NO leading slash: matches "/app/home"
                path: 'home', 
                element: <Home />,
            },
        ],
    },
    {
        // 2. Catch-all fallback
        path: '*', 
        element: <Navigate to="/login" replace />,
    },
])

export default function App() {
    return <RouterProvider router={routesPath} />
}

