import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// @ts-expect-error: Unreachable code error
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import App from "./App.tsx";
import "./index.css";
import { Game } from "./pages/Game.tsx";
import { Home } from "./pages/Home.tsx";
import Offline from "./components/Offline.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Offline>
      <RouterProvider router={router} />
    </Offline>
  </React.StrictMode>
);

registerServiceWorker();