import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Home from "./pages/home";
import CoinInfo from "./pages/coininfo";

import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/Dashboard",
                element: <Dashboard />,
            },
            {
                path: "/About",
                element: <About />,
            },
            {
                path: "/Home",
                element: <Home />,
            },
            {
                path: "/Coin",
                element: <CoinInfo />,
            },
        ],
    },
]);
