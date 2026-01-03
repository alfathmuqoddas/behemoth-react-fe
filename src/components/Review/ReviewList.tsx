export default function ReviewList() {
  return (
    <div className="space-y-12">
      {[1, 2].map((review) => (
        <div
          key={review}
          className="border-b border-slate-50 pb-8 last:border-0"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-tighter">
                User Name
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                OCT 24, 2023
              </p>
            </div>
            <div className="text-sm font-mono font-bold bg-slate-100 px-2 py-1">
              8.0
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            A masterpiece of modern cinema. The visual effects hold up
            incredibly well, but it's the emotional core between the father and
            daughter that really stays with you.
          </p>
        </div>
      ))}
    </div>
  );
}
