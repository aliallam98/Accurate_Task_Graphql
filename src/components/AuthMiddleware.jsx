import { useState } from "react";
import { useLocation } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
  const [token] = useState(localStorage.getItem("token"));
  const isUserLoggedIn = token;

  const isAuthRoute = pathname.startswith("login");

  console.log(pathname);
  console.log(isUserLoggedIn);
  console.log(isAuthRoute);

  return children;
};

export default AuthMiddleware;
