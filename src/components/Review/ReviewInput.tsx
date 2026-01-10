import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { reviewService, type TReview } from "../../api/review";
import useAuthStore from "../../store/useAuthStore";

export default function ReviewInput({
  movieId,
  mutate,
}: {
  movieId: string;
  mutate: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [userReview, setUserReview] = useState({ rating: 5, comment: "" });

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    Omit<TReview, "createdAt" | "updatedAt" | "id">
  >("/api/reviews/add", (_url, { arg }) =>
    reviewService.create(
      arg.movieId,
      arg.rating,
      arg.review,
      arg.userId,
      arg.userName,
      arg.avatar
    )
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger(
      {
        movieId,
        rating: userReview.rating,
        review: userReview.comment,
        userId: user?.id ?? "",
        userName: user?.userName ?? "",
        avatar: user?.avatar ?? "",
      },
      {
        onSuccess: () => {
          setUserReview({ rating: 5, comment: "" });
          mutate();
          alert("Review submitted successfully");
        },
        onError: (error) =>
          alert(`There's problem with your registration. ${error}`),
      }
    );
  };

  if (!isLoggedIn)
    return (
      <div className="bg-slate-50 p-8 rounded-xl mb-8">
        You must be logged in to submit a review.
      </div>
    );

  return (
    <div className="bg-slate-50 p-8 rounded-xl mb-8">
      <h3 className="text-xs uppercase tracking-widest font-bold mb-6">
        Write a review
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 uppercase">Rating</span>
          <select
            value={userReview.rating}
            onChange={(e) =>
              setUserReview({
                ...userReview,
                rating: parseInt(e.target.value),
              })
            }
            className="bg-transparent border-b border-slate-200 py-1 outline-none text-sm"
          >
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Share your thoughts on the cinematography, plot, or acting..."
          className="w-full bg-transparent border-b border-slate-200 outline-none pt-4 text-sm placeholder:text-slate-300 focus:border-slate-900 transition-colors"
          rows={3}
          value={userReview.comment}
          onChange={(e) =>
            setUserReview({ ...userReview, comment: e.target.value })
          }
        />
        <button
          disabled={
            isMutating ||
            userReview.comment.length === 0 ||
            userReview.rating === 0
          }
          type="submit"
          className="text-[11px] uppercase tracking-[0.2em] font-bold border rounded-lg hover:cursor-pointer bg-slate-900 px-6 py-3 hover:bg-slate-800 text-white transition-all duration-300"
        >
          {isMutating ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
