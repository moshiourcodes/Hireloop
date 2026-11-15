
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save form reference before the async request
    const form = e.currentTarget;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData(form);

      const name = formData.get("fullName") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Something went wrong. Please try again."
        );
        return;
      }

      console.log("Signup successful:", data);

      setSuccessMessage(
        "Your account has been created successfully!"
      );

      // Reset the form safely
      form.reset();
      setShowPassword(false);

    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        "Unable to create your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050508] px-4 py-12 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[35%] h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-blue-700/10 blur-[150px]" />

      <div className="relative z-10 flex w-full max-w-122.5 flex-col items-center">

        {/* HireLoop Logo */}
        <Link href="/" className="mb-10">
          <span className="text-[38px] font-extrabold tracking-[-2px]">
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              hire
            </span>
            <span className="bg-linear-to-r from-blue-500 via-orange-400 to-red-400 bg-clip-text text-transparent">
              loop
            </span>
          </span>
        </Link>

        {/* Sign Up Card */}
        <div className="w-full rounded-[22px] border border-white/12 bg-white/8.5 p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-[30px] font-bold sm:text-[34px]">
              Create your account
            </h1>

            <p className="text-sm text-gray-300 sm:text-base">
              Three minutes to set up. Matches start arriving today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-gray-200"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                  className="h-13 w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-200"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-13 w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-200"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-13 w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
              >
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                role="status"
                className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400"
              >
                {successMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex h-13.5 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#527CFF] to-[#3986F7] text-base font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Toggle to Sign In */}
          <div className="mt-7 text-center text-sm text-gray-200 sm:text-base">
            Already have an account?{" "}
            <Link
              href="/sign.in"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
