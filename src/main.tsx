import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// import { register as registerServiceWorker } from './serviceWorkerRegistration';
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

// registerServiceWorker();

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/src/serviceWorker.js')
//       .then(() => console.log('Service worker registered'))
//       .catch(error => console.error('Error registering service worker', error));
//   });
// }


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker.js', {
      scope: '.' 
  }).then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
  });
}