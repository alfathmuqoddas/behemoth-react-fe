import useSWRMutation from "swr/mutation";
import { movieService } from "../api/movie";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function DeleteMovie({ id }: { id: string }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    { id: string }
  >("/api/movies/delete", (_url, { arg }) => movieService.delete(arg.id));

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) return;

    trigger(
      { id },
      {
        onSuccess: () => {
          alert("Movie deleted successfully");
          navigate("/");
        },
        onError: (error) =>
          alert(`There's problem with your registration. ${error}`),
      }
    );
  };

  if (!isLoggedIn && user?.role !== "admin") return null;

  return (
    <div className="pt-4 border-t border-slate-100">
      <button
        onClick={() => handleDelete(id)}
        disabled={isMutating}
        className="flex hover:cursor-pointer items-center gap-2 px-4 py-2 rounded-lg text-red-400 bg-red-50 hover:text-red-600 transition-all duration-300 group"
      >
        {isMutating ? (
          "Deleting..."
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:rotate-12 transition-transform"
            >
              <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
              Delete Movie
            </span>
          </>
        )}
      </button>
    </div>
  );
}
