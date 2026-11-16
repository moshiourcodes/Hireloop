"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"

import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react"

import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    setErrorMessage("")
    setIsLoading(true)

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.")
        return
      }

      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/"
    } catch (error) {
      console.error("Signin error:", error)

      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050508] px-4 py-10">
      <div className="w-full max-w-122.5 rounded-[22px] border border-white/10 bg-white/4 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* Logo */}
        <Link href="/" className="mb-8 block text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Hire
            </span>
            <span className="text-white">Loop</span>
          </h1>
        </Link>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue your job hunt.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101017] px-4">
              <Mail size={18} className="text-gray-500" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101017] px-4">
              <LockKeyhole size={18} className="text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 transition hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 transition hover:text-blue-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign.up"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  )
}
