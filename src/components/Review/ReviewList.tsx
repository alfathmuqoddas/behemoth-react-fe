import { useState } from "react";
import useSWR from "swr";
import { reviewService } from "../../api/review";
import DeleteReview from "./DeleteReview";

export default function ReviewList({ movieId }: { movieId: string }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const { data, isLoading, error, mutate } = useSWR(
    [`/reviews`, movieId, page, size],
    () => reviewService.getByMovieId(movieId, page, size)
  );

  if (error)
    return (
      <div className="flex items-center justify-center text-red-500">
        <p className="font-medium">
          Failed to load reviews. Please try again later.
        </p>
      </div>
    );

  if (isLoading)
    <div className="flex items-center justify-center">
      <p className="font-medium">Loading...</p>
    </div>;

  if (data?.reviews.length === 0)
    return (
      <div className="flex items-center justify-center">
        <p className="font-medium">No reviews found</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {data?.reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-slate-100 pb-8 last:border-0"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                {review.userName.charAt(0)}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  {review.userName}
                </p>
                <div className="text-[10px] text-slate-400 font-mono uppercase block">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
                <div className="text-sm font-mono font-bold bg-slate-100 px-2 py-1 w-fit rounded-md">
                  {review.rating}.0
                </div>
                <p className="text-slate-600 text-sm leading-relaxed max-w-2xl text-justify">
                  {review.review}
                </p>
              </div>
            </div>

            <DeleteReview
              id={review.id}
              userId={review?.userId ?? ""}
              mutate={mutate}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
