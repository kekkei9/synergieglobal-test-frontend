import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import ShortUrlPage from "./pages/short-url-page";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:shortUrlId",
    element: <ShortUrlPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
