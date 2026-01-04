import { lazy } from "react";
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Movie = lazy(() => import("../pages/Movie"));
const Index = lazy(() => import("../pages"));

export const APP_ROUTES = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    component: Index,
  },
  {
    path: "/movie/:id",
    component: Movie,
  },
];
