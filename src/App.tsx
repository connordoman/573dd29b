import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ActivityFeed from "./feed/ActivityFeed";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <div>Sorry, there was an error.</div>,
    },
    {
        path: "/feed",
        element: <ActivityFeed />,
        errorElement: <div>Sorry, there was an error.</div>,
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
