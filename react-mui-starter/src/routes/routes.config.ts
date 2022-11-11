import path from "path";
import { lazy } from "react";
import signUp from "../pages/auth/signUp/signUp";
import bookmarkedPost from "../pages/post/BookmarkedPost"
import ResetPassword from "../pages/auth/resetPassword/resetPassword";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const ForgotPassword = lazy(()=>import("../pages/auth/forgotPassword/forgotPassword"))
// const ResetPassword = lazy(()=>import("../pages/auth/resetPassword/resetPassword"))

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  forgotPassword:"/auth/forgotPassword",
  resetPassword:"/auth/resetPassword",
  signUp:"/auth/signUp",
  bookmark:"/bookmark"
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
  },
  {
    path:paths.bookmark,
    component:bookmarkedPost
  },
  {
    path:paths.resetPassword,
    component:ResetPassword
  }
];
