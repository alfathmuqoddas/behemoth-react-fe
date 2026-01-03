import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { reviewService } from "../../api/review";
import useAuthStore from "../../store/useAuthStore";

export default function ReviewInput({ movieId }: { movieId: string }) {
  const user = useAuthStore((state) => state.user);
  const [userReview, setUserReview] = useState({ rating: 5, comment: "" });

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    {
      movieId: string;
      rating: number;
      review: string;
      userId: string;
      userName: string;
    }
  >("/api/reviews/add", (_url, { arg }) =>
    reviewService.create(
      arg.movieId,
      arg.rating,
      arg.review,
      arg.userId,
      arg.userName
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
        userName: user?.email ?? "",
      },
      {
        onSuccess: () => {
          setUserReview({ rating: 5, comment: "" });
          alert("Review submitted successfully");
        },
        onError: (error) =>
          alert(`There's problem with your registration. ${error}`),
      }
    );
  };

  return (
    <div className="bg-slate-50 p-8 rounded-xl mb-8">
      <h3 className="text-xs uppercase tracking-widest font-bold mb-6">
        Write a review
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 uppercase tracking-tighter">
            Rating
          </span>
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
          className="w-full bg-transparent border-b border-slate-200 py-4 outline-none text-sm placeholder:text-slate-300 focus:border-slate-900 transition-colors resize-none"
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
          className="disabled:opacity-50 bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-lg hover:cursor-pointer hover:bg-slate-800 transition-all"
        >
          {isMutating ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
