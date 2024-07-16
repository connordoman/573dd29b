import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ActivityFeed, { loader as activitiesLoader } from "./feed/ActivityFeed";
import React from "react";
import ErrorPage from "./ErrorPage";
import ActivityDetail, { loader as activityDetailLoader } from "./feed/ActivityDetail";
import ArchiveFeed, { loader as archivedActivitiesLoader } from "./feed/ArchivedFeed";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "calls",
                element: <ActivityFeed />,
                loader: activitiesLoader,
            },
            {
                path: "archive",
                element: <ArchiveFeed />,
                loader: archivedActivitiesLoader,
            },
            {
                path: "calls/:activityId",
                element: <ActivityDetail />,
                loader: activityDetailLoader,
            },
            {
                path: "archive/:activityId",
                element: <ActivityDetail />,
                loader: activityDetailLoader,
            },
        ],
    },
]);

const App = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

export default App;
