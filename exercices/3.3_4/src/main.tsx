
import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage.tsx";
import App from "./components/App.tsx";
import CinemaPage from "./components/pages/CinemaPage.tsx";
import MovieListPage from "./components/pages/MovieListPage.tsx";
import "./index.css";
import AddMoviePage from "./components/pages/AddMoviePage.tsx";
import MoviePage from "./components/pages/MoviePage.tsx";
import RegisterPage from "./components/pages/RegisterPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cinemas",
        element: <CinemaPage />,
      },
      {
        path: "movie-list",
        element: <MovieListPage />,
      },
      {
        path:"addMoviePage",
        element: <AddMoviePage />
      },
      {
        path: "movies/:id",
        element: <MoviePage />
      },
      {
        path:"register",
        element: <RegisterPage />
      },
      {
        path:"login",
        element: <LoginPage />
      }
    ],
  }, 
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>
);
