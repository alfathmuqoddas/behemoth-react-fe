import { lazy, Suspense } from "react";
import { useRoutes } from "react-router";
import ScrollToTop from "./components/ScrollToTop";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Movie = lazy(() => import("./pages/Movie"));
const Index = lazy(() => import("./pages"));
import MainLayout from "./components/MainLayout";

export default function App() {
  let routes = useRoutes([
    {
      path: "/login",
      element: (
        <Suspense
          fallback={
            <div className="flex h-screen justify-center items-center">
              Loading...
            </div>
          }
        >
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense
          fallback={
            <div className="flex h-screen justify-center items-center">
              Loading...
            </div>
          }
        >
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={
                <div className="flex h-screen justify-center items-center">
                  Loading...
                </div>
              }
            >
              <Index />
            </Suspense>
          ),
        },
        {
          path: "movie/:id",
          element: (
            <Suspense
              fallback={
                <div className="flex h-screen justify-center items-center">
                  Loading...
                </div>
              }
            >
              <Movie />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  );
}
