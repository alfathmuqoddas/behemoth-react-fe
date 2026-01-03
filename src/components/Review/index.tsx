import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";

export default function Review() {
  return (
    <section className="mt-32">
      <h2 className="text-2xl font-light tracking-tight mb-12">
        Reviews & Ratings
      </h2>

      <ReviewInput />
      <ReviewList />
    </section>
  );
}
