import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import UserPage from "../pages/UserPage.jsx";
import { Navigate } from "react-router-dom";
import CreateUserPage from "../pages/CreateUserPage.jsx";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: token ? <HomePage /> : <Navigate to={"login"} />,
  },
  {
    path: "/login",
    element: token ? <Navigate to={"/"} /> : <LoginPage />,
  },
  {
    path: "/profile/:id",
    element: token ? <UserPage /> : <Navigate to={"/login"} />,
  },
  {
    path: "/user/create",
    element: token ? <CreateUserPage /> : <Navigate to={"/login"} />,
  },
]);

export default router;
