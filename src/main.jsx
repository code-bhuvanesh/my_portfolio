import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/mainPage/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProjectsPage from "./pages/projectsPage/ProjectsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // <App />
  // </React.StrictMode>,
);
