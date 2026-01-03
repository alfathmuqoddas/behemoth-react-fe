export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Page not found</p>
        <a href="/" className="mt-5 text-blue-500 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
}
