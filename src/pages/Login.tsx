import { useState } from "react";
import { Link } from "react-router"; // Note: ensure you are using 'react-router-dom' or the v7 'react-router'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    console.log({ email, password });
    alert(`Logging in with: ${email}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full bg-white">
        <div className="flex flex-col justify-center gap-6 w-full md:w-1/2 p-8 lg:p-12">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">Selamat Datang</h3>
            <p className="text-sm text-gray-500 mt-2">
              Silahkan masuk dengan email dan password
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input
                className="styled-input"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="styled-input"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg mt-2"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-600 mt-4">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://picsum.photos/seed/devops/600/800"
            alt="login background"
            className="absolute inset-0 object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
