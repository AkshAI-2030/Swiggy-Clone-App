import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
import "../index.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"; // Import toast here

// Layouts
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import SavedCart from "./components/savedCart";

// Lazy loaded
const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (e) {
        console.log("Invalid token", e);
      }
    }
  }, []);

  return (
    <Provider store={appStore}>
      <ToastContainer position="top-center" autoClose={1000} />
      <UserContext.Provider
        value={{ loggedInUser: username, setLoggedInUser: setUsername }}
      >
        <RouterProvider router={appRouter} />
      </UserContext.Provider>
    </Provider>
  );
};

// Create Router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading....🔍</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurants/:resId", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/saved-cart", element: <SavedCart /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
