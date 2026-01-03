import { Link } from "react-router";
import useAuthStore from "../store/useAuthStore";
export default function Index() {
  const { reset } = useAuthStore.getState();
  const links = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "Movie", path: "/movie/123" },
  ];
  return (
    <>
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-blue-500 text-xl hover:underline hover:underline-offset-2"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <button
        onClick={reset}
        className="text-blue-500 text-xl hover:underline hover:underline-offset-2"
      >
        logout
      </button>
    </>
  );
}
