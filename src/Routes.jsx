import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";

import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/about",
                element: <About />,
            },
            // {
            //     path: "/about",
            //     element: <AboutPage />,
            // },

        ],
    },
]);
