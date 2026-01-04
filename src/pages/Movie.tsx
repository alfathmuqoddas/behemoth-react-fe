import { useParams } from "react-router";
import { movieService } from "../api/movie";
import useSWR from "swr";
import Review from "../components/Review";
import DeleteMovie from "../components/DeleteMovie";

export default function Movie() {
  const { id: movieId } = useParams() as { id: string };

  const { data, isLoading, error } = useSWR([`api/movies/get/${movieId}`], () =>
    movieService.getById(movieId)
  );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <p className="font-medium">
          Failed to load movie. Please try again later.
        </p>
      </div>
    );

  if (isLoading)
    <div className="flex h-screen items-center justify-center">
      <p className="font-medium">Loading...</p>
    </div>;

  return (
    <div className="min-h-screen bg-white pb-20 max-w-6xl mx-auto px-6 md:px-0">
      {/* 1. Hero Section */}
      <section className="flex flex-col md:flex-row  pt-12 gap-12">
        <div className="w-full md:w-1/3">
          <div className="aspect-2/3 overflow-hidden rounded-xl bg-slate-100 shadow-2xl">
            <img
              src={data?.poster}
              alt={data?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                {data?.genre}
              </span>
              <h1 className="text-5xl font-bold tracking-tighter leading-none">
                {data?.title}
              </h1>
              <div className="flex gap-4 text-xs font-mono text-slate-500 pt-2">
                <span>{data?.year}</span>
                <span>{data?.runtime}</span>
                <span className="text-slate-900 font-bold">
                  IMDB {data?.imdbRating}
                </span>
              </div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed font-light max-w-xl">
              {data?.plot}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  Director
                </p>
                <p className="text-sm font-medium">{data?.director}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  Starring
                </p>
                <p className="text-sm font-medium leading-relaxed">
                  {data?.actors}
                </p>
              </div>
            </div>
            <DeleteMovie id={data?.id ?? ""} />
          </div>
        </div>
      </section>

      <Review movieId={data?.id ?? ""} />
    </div>
  );
}
