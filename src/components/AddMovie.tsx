import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { movieService } from "../api/movie";

export default function AddMovie({ mutate }: { mutate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imdbId, setImdbId] = useState("");

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    { imdbId: string }
  >("/api/movies/add-imdb", (_url, { arg }) =>
    movieService.addByImdbId(arg.imdbId)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imdbId) return;
    trigger(
      { imdbId },
      {
        onSuccess: () => {
          setIsOpen(false);
          mutate();
        },
        onError: (error) =>
          alert(`There's problem with your registration. ${error}`),
      }
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] uppercase tracking-[0.2em] font-bold border rounded-lg hover:cursor-pointer bg-slate-900 px-6 py-3 hover:bg-slate-800 text-white transition-all duration-300"
      >
        Add Movie
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          {/* Blur Backdrop */}
          <div
            className="absolute inset-0 bg-white/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-sm bg-white border border-slate-100 p-10 shadow-2xl animate-in fade-in zoom-in duration-300 rounded-lg">
            <header className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl">New Entry</h3>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                  Add to collection
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-slate-900 transition-colors"
              >
                ✕
              </button>
            </header>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="group">
                <label
                  htmlFor="imdbId"
                  className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 group-focus-within:text-slate-900 transition-colors"
                >
                  IMDB ID
                </label>
                <input
                  type="text"
                  id="imdbId"
                  value={imdbId}
                  onChange={(e) => setImdbId(e.target.value)}
                  autoFocus
                  className="block w-full border-b border-slate-200 py-2 outline-none focus:border-slate-900 transition-colors text-sm font-mono placeholder:text-slate-200"
                  placeholder="tt1234567"
                />
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isMutating}
                  className="w-full bg-slate-900 rounded-lg hover:cursor-pointer text-white text-[10px] uppercase tracking-[0.2em] py-4 hover:bg-slate-800 transition-all font-bold"
                >
                  {isMutating ? "Loading..." : "Add Movie"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-[10px] uppercase tracking-[0.2em] py-2 text-slate-400 hover:text-slate-900 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
