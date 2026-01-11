import { movieService } from "../api/movie";
import { Link } from "react-router";
import { useState } from "react";
import useSWR from "swr";
import AddMovie from "../components/AddMovie";

export default function Index() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12); // Modern grids look better with multiples of 3 or 4

  const { data, isLoading, error, mutate } = useSWR(
    [`/movies`, page, size],
    () => movieService.getAll(page, size, "")
  );

  const totalPages = data?.totalPages || 0;

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <p className="font-medium">
          Failed to load movies. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-slate-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-slate-900 font-bold">Movies</h1>
            <p className="text-slate-500 mt-2">Rate and Review Movies</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-slate-400 uppercase tracking-widest text-[10px]">
                Show
              </span>
              <select
                className="bg-transparent border-b border-slate-200 focus:border-slate-900 outline-none pb-1 cursor-pointer"
                value={size}
                onChange={(e) => {
                  setSize(parseInt(e.target.value));
                  setPage(1);
                }}
              >
                {[12, 24, 48].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <AddMovie mutate={mutate} />
          </div>
        </header>

        {/* Grid Section */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 animate-pulse">
            {[...Array(size)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-slate-100 aspect-2/3 rounded-sm" />
                <div className="h-4 bg-slate-100 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {data?.movies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-slate-100 rounded-xl aspect-2/3">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <div className="mt-4 space-y-1 text-center">
                  <h3 className="font-bold  text-xl leading-tighter group-hover:underline decoration-1 underline-offset-4">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-mono">
                    {movie.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
}
