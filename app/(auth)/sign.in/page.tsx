
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Sign In Form Data:", data);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050508] px-4 py-12 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[35%] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[150px]" />

      <div className="relative z-10 flex w-full max-w-[490px] flex-col items-center">

        {/* HireLoop Logo */}
        <Link href="/" className="mb-10">
          <span className="text-[38px] font-extrabold tracking-[-2px]">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              hire
            </span>
            <span className="bg-gradient-to-r from-blue-500 via-orange-400 to-red-400 bg-clip-text text-transparent">
              loop
            </span>
          </span>
        </Link>

        {/* Sign In Card */}
        <div className="w-full rounded-[22px] border border-white/[0.12] bg-white/[0.045] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

          <div className="mb-10 text-center">
            <h1 className="mb-3 text-[34px] font-bold sm:text-[38px]">
              Welcome back
            </h1>

            <p className="text-base text-gray-300">
              Sign in to continue your job hunt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-base font-semibold text-gray-200"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-[58px] w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-12 pr-4 text-base outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-semibold text-gray-200"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  autoComplete="current-password"
                  required
                  className="h-[58px] w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-12 pr-12 text-base outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-[60px] w-full rounded-xl bg-gradient-to-r from-[#527CFF] to-[#3986F7] text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          {/* Toggle to Sign Up */}
          <div className="mt-9 text-center text-base text-gray-200">
            New to HireLoop?{" "}
            <Link
              href="/sign.up"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
