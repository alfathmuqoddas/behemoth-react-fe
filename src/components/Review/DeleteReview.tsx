import useSWRMutation from "swr/mutation";
import { reviewService } from "../../api/review";
import useAuthStore from "../../store/useAuthStore";

export default function DeleteReview({
  id,
  userId,
  mutate,
}: {
  id: string;
  userId: string;
  mutate: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn && user?.id !== userId) return null;

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    { id: string }
  >("/api/movies/delete", (_url, { arg }) => reviewService.delete(arg.id));

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    trigger(
      { id },
      {
        onSuccess: () => {
          alert("Review deleted successfully");
          mutate();
        },
        onError: (error) =>
          alert(`There's problem with your registration. ${error}`),
      }
    );
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      disabled={isMutating}
      className="text-xs hover:text-red-500 hover:cursor-pointer font-semibold transition-colors"
    >
      {isMutating ? "Deleting..." : "Delete"}
    </button>
  );
}
