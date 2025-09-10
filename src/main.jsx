import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPageDetails from "./pages/TaskPageDetails.jsx";
import TaskManagerAPI from "./pages/TaskManagerAPI.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detalhes-da-tarefa",
    element: <TaskPageDetails />,
  },
  {
    path: "/task-manager-com-API",
    element: <TaskManagerAPI />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
