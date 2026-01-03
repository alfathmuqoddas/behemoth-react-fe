import type { JSX } from "react";
import Navbar from "./Navbar";

export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-900">
      <Navbar />

      <main className="grow">{children}</main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-slate-400">
            © {new Date().getFullYear()} Cinema Archive / All Rights Reserved
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
