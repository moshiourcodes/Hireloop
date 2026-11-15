
// "use client";

// import { useState } from "react";
// import type { FormEvent } from "react";
// import Link from "next/link";
// import {
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";

// export default function SignInPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setErrorMessage("");
//     setSuccessMessage("");
//     setIsLoading(true);

//     try {
//       const form = e.currentTarget;
//       const formData = new FormData(form);

//       const email = formData.get("email") as string;
//       const password = formData.get("password") as string;

//       const { data, error } = await authClient.signIn.email({
//         email,
//         password,
//         callbackURL: "/",
//       });

//       if (error) {
//         setErrorMessage(
//           error.message || "Invalid email or password. Please try again."
//         );
//         return;
//       }

//       console.log("Sign in successful:", data);

//       setSuccessMessage("You have signed in successfully!");

//       // Redirect to homepage after successful sign-in
//       window.location.href = "/";
      
//     } catch (error) {
//       console.error("Sign in error:", error);

//       setErrorMessage(
//         "Unable to sign in. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050508] px-4 py-12 text-white">

//       {/* Background Glow */}
//       <div className="pointer-events-none absolute left-1/2 top-[35%] h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-blue-700/10 blur-[150px]" />

//       <div className="relative z-10 flex w-full max-w-122.5 flex-col items-center">

//         {/* HireLoop Logo */}
//         <Link href="/" className="mb-10">
//           <span className="text-[38px] font-extrabold tracking-[-2px]">
//             <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//               hire
//             </span>
//             <span className="bg-linear-to-r from-blue-500 via-orange-400 to-red-400 bg-clip-text text-transparent">
//               loop
//             </span>
//           </span>
//         </Link>

//         {/* Sign In Card */}
//         <div className="w-full rounded-[22px] border border-white/12 bg-white/4.5 p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

//           <div className="mb-10 text-center">
//             <h1 className="mb-3 text-[34px] font-bold sm:text-[38px]">
//               Welcome back
//             </h1>

//             <p className="text-base text-gray-300">
//               Sign in to continue your job hunt.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-3 block text-base font-semibold text-gray-200"
//               >
//                 Email address
//               </label>

//               <div className="relative">
//                 <Mail
//                   size={21}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
//                 />

//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   required
//                   className="h-14.5 w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-12 pr-4 text-base outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <div className="mb-3 flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="text-base font-semibold text-gray-200"
//                 >
//                   Password
//                 </label>

//                 <Link
//                   href="/forgot-password"
//                   className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <div className="relative">
//                 <LockKeyhole
//                   size={21}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
//                 />

//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Your password"
//                   autoComplete="current-password"
//                   required
//                   className="h-14.5 w-full rounded-xl border border-white/10 bg-[#292832]/90 pl-12 pr-12 text-base outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label="Toggle password visibility"
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 transition hover:text-white"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={21} />
//                   ) : (
//                     <Eye size={21} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div
//                 role="alert"
//                 className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
//               >
//                 {errorMessage}
//               </div>
//             )}

//             {/* Success Message */}
//             {successMessage && (
//               <div
//                 role="status"
//                 className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400"
//               >
//                 {successMessage}
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="h-15 w-full rounded-xl bg-linear-to-r from-[#527CFF] to-[#3986F7] text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isLoading ? "Signing In..." : "Sign In"}
//             </button>

//           </form>

//           {/* Toggle to Sign Up */}
//           <div className="mt-9 text-center text-base text-gray-200">
//             New to HireLoop?{" "}
//             <Link
//               href="/sign.up"
//               className="font-semibold text-blue-400 transition hover:text-blue-300"
//             >
//               Create an account
//             </Link>
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// }









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

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Signin error:", error);

      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050508] px-4 py-10">
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
          <h2 className="text-2xl font-semibold text-white">
            Welcome back
          </h2>

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
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
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
  );
}