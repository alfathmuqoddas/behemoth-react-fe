import { Navigate } from "react-router";
import { type JSX, useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

export default function PermissionGuard({
  children,
}: {
  children: JSX.Element;
}) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        setIsHydrated(true);
      });
      return () => unsub();
    }
  }, []);

  if (!isHydrated) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
