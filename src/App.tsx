import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense } from "react";
import PermissionGuard from "./components/PermissionGuard";
import NotFound from "./pages/NotFound";
import { APP_ROUTES } from "./routes/config";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          {APP_ROUTES.map((route) => {
            const Component = route.component;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isProtected ? (
                    <PermissionGuard>
                      <Component />
                    </PermissionGuard>
                  ) : (
                    <Component />
                  )
                }
              />
            );
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
