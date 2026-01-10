import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authService, type TUserRegister } from "../api/auth";
import useSWRMutation from "swr/mutation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    TUserRegister
  >("/register", (_url, { arg }) =>
    authService.register({
      email: arg.email,
      password: arg.password,
      firstName: arg.firstName,
      lastName: arg.lastName,
      userName: arg.userName,
    })
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !firstName || !lastName)
      return;
    if (password !== confirmPassword)
      return alert("Password tidak cocok dengan konfirmasi password.");
    trigger(
      { email, password, firstName, lastName, userName },
      {
        onSuccess: () => {
          alert("Registrasi berhasil.");
          navigate("/");
        },
        onError: (error) =>
          alert(`There's problem with your registration. ${error}`),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full bg-white">
        <div className="flex flex-col justify-center gap-6 w-full md:w-1/2 p-8 lg:p-12">
          <div>
            <h3 className="text-3xl font-bold text-slate-800">
              Selamat Datang
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Silahkan registrasi dengan email dan password
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input
                className="styled-input"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="styled-input"
                type="text"
                placeholder="Full Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="styled-input"
                type="text"
                placeholder="Username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
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
              <input
                className="styled-input"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={isMutating}
                className="w-full bg-slate-900 hover:bg-slate-900 hover:cursor-pointer text-white font-bold py-3 rounded-lg transition-colors shadow-lg mt-2"
              >
                {isMutating ? "Registering..." : "Registrasi"}
              </button>

              <p className="text-sm text-center text-gray-600 mt-4">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://picsum.photos/seed/ewfewf/600/800"
            alt="login background"
            className="absolute inset-0 object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
