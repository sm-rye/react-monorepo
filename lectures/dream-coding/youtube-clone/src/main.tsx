import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import VideoListPage from "./Pages/Video/VideoListPage.tsx";
import VideoDetailPage from "./Pages/Video/VideoDetailPage.tsx";
import NotFoundPage from "./Pages/Error/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <VideoListPage />, index: true },

      { path: "/videos", element: <VideoListPage /> },
      {
        path: "/videos/:q",
        element: <VideoListPage />,
      },
      {
        path: "/videos/watch/:videoId",
        element: <VideoDetailPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
