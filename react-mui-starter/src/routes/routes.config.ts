import path from "path";
import { lazy } from "react";
import signUp from "../pages/auth/signUp/signUp";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const ForgotPassword = lazy(()=>import("../pages/auth/forgotPassword/forgotPassword"))

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  forgotPassword:"/auth/forgotPassword",
  signUp:"/auth/signUp"
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path:paths.forgotPassword,
    component:ForgotPassword
  },
  {
    path:paths.signUp,
    component:signUp
  }
];
