import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex-grow flex items-center justify-center bg-[#FDFDFD] py-12 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl mb-6">
            <span className="text-xl font-bold">A</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-zinc-500">
            {isLogin ? "Enter your details to access your account." : "Join us to manage your orders and wishlist."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-black uppercase">First Name</label>
                <input type="text" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-black uppercase">Last Name</label>
                <input type="text" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-black uppercase">Email Address</label>
            <input type="email" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-semibold tracking-wider text-black uppercase">Password</label>
              {isLogin && <a href="#" className="text-xs text-zinc-500 hover:text-black">Forgot password?</a>}
            </div>
            <input type="password" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors" />
          </div>

          <button type="submit" className="w-full py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center mt-8">
            {isLogin ? "Log In" : "Sign Up"} <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-black font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
