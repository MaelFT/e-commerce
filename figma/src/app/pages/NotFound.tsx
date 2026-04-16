import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-[#FDFDFD] px-4 py-24 text-center">
      <h1 className="text-[120px] leading-none font-bold text-black mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-4">Page not found</h2>
      <p className="text-zinc-500 mb-8 max-w-sm">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="inline-flex items-center px-8 py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
    </div>
  );
}
