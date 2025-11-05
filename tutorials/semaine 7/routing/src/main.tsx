import React from 'react'
import ReactDOM from "react-dom/client"
import './index.css'
import App, { UserPage } from './App'
import { AboutPage, ContactPage, HomePage } from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path:"",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "users/:userId",
        element: <UserPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)