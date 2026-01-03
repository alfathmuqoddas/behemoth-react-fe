import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";

export default function Review({ movieId }: { movieId: string }) {
  return (
    <section className="mt-32">
      <h2 className="text-2xl tracking-tight mb-8">Reviews & Ratings</h2>

      <ReviewInput movieId={movieId} />
      <ReviewList movieId={movieId} />
    </section>
  );
}
