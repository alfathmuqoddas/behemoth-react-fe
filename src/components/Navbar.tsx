import { Link } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      useAuthStore.getState().reset();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-0 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
          Movies<span className="font-light text-slate-400">Review</span>
        </Link>

        <div className="flex gap-8">
          {isLoggedIn ? (
            <div className="flex gap-4">
              <p className="text-xs tracking-[0.2em] hover:cursor-pointer hidden md:block">
                {user?.email}
              </p>
              <p
                className="text-xs tracking-[0.2em] uppercase hover:cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm uppercase tracking-[0.2em] font-bold transition-colors hover:text-slate-900"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
