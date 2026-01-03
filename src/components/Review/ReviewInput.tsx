import { useState } from "react";

export default function ReviewInput() {
  const [userReview, setUserReview] = useState({ rating: 5, comment: "" });
  return (
    <div className="bg-slate-50 p-8 rounded-xl mb-16">
      <h3 className="text-xs uppercase tracking-widest font-bold mb-6">
        Write a review
      </h3>
      <div className="space-y-4">
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
                {n}.0
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Share your thoughts on the cinematography, plot, or acting..."
          className="w-full bg-transparent border-b border-slate-200 py-4 outline-none text-sm placeholder:text-slate-300 focus:border-slate-900 transition-colors resize-none"
          rows={3}
          onChange={(e) =>
            setUserReview({ ...userReview, comment: e.target.value })
          }
        />
        <button className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-lg hover:cursor-pointer hover:bg-slate-800 transition-all">
          Submit Review
        </button>
      </div>
    </div>
  );
}
