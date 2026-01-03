import { useState } from "react";
import useSWR from "swr";
import { reviewService } from "../../api/review";
import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";

export default function Review({ movieId }: { movieId: string }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, mutate } = useSWR(
    [`/reviews`, movieId, page],
    () => reviewService.getByMovieId(movieId, page, 5)
  );

  const totalPages = data?.totalPages || 0;

  return (
    <section className="mt-32">
      <h2 className="text-2xl tracking-tight mb-8">Reviews & Ratings</h2>

      <ReviewInput movieId={movieId} mutate={mutate} />
      <ReviewList
        data={data}
        error={error}
        mutate={mutate}
        isLoading={isLoading}
      />
      <footer className="mt-20 pt-8 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="text-xs uppercase tracking-widest font-bold disabled:opacity-30 hover:text-slate-500 transition-colors"
        >
          Prev
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400">
            {String(page).padStart(2, "0")} /{" "}
            {String(totalPages).padStart(2, "0")}
          </span>
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="text-xs uppercase tracking-widest font-bold disabled:opacity-30 hover:text-slate-500 transition-colors"
        >
          Next
        </button>
      </footer>
    </section>
  );
}
