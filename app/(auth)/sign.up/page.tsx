
// "use client";

// import { useState } from "react";
// import type { FormEvent } from "react";
// import Link from "next/link";

// import {
//   UsersRound,
//   UserRound,
//   Shield,
//   User,
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";

// type UserRole = "seeker" | "recruiter" | "admin";

// const roles = [
//   { value: "seeker" as UserRole, label: "Job Seeker", icon: UsersRound },
//   { value: "recruiter" as UserRole, label: "Recruiter", icon: UserRound },
//   { value: "admin" as UserRole, label: "Admin", icon: Shield },
// ];

// export default function SignUpPage() {
//   const [selectedRole, setSelectedRole] = useState<UserRole>("seeker");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     const name = formData.get("fullName") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     setErrorMessage("");
//     setSuccessMessage("");

//     if (selectedRole === "admin") {
//       setErrorMessage(
//         "Admin accounts can only be created by an authorized administrator."
//       );
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { error } = await authClient.signUp.email({
//         name,
//         email,
//         password,
//         callbackURL: "/",
//       });

//       if (error) {
//         setErrorMessage(error.message || "Unable to create your account.");
//         return;
//       }

//       setSuccessMessage("Your account has been created successfully!");
//       form.reset();
//       setSelectedRole("seeker");
//       setShowPassword(false);
//     } catch (error) {
//       console.error("Signup error:", error);
//       setErrorMessage("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090e] px-4 py-8">

//       {/* Background glow */}
//       <div className="pointer-events-none absolute left-1/2 top-1/2 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

//       {/* Signup Card */}
//       <div className="relative w-full max-w-122.5 rounded-[22px] border border-white/15 bg-[#111116] px-7 py-8 shadow-2xl sm:px-10 sm:py-9">

//         {/* Logo */}
//         <Link href="/" className="mb-7 block text-center">
//           <h1 className="text-[28px] font-bold tracking-tight">
//             <span className="text-blue-500">Hire</span>
//             <span className="text-white">Loop</span>
//           </h1>
//         </Link>

//         {/* Heading */}
//         <div className="mb-7 text-center">
//           <h2 className="text-2xl font-bold text-white">
//             Create your account
//           </h2>
//           <p className="mt-2 text-sm text-gray-400">
//             Three minutes to set up. Matches start arriving today.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Role Selection */}
//           <div>
//             <label className="mb-3 block text-sm font-medium text-gray-300">
//               Joining HireLoop as
//             </label>

//             <div className="grid grid-cols-3 gap-2.5">
//               {roles.map((role) => {
//                 const Icon = role.icon;
//                 const isSelected = selectedRole === role.value;

//                 return (
//                   <button
//                     key={role.value}
//                     type="button"
//                     onClick={() => setSelectedRole(role.value)}
//                     aria-pressed={isSelected}
//                     className={`flex min-h-20.5 flex-col items-center justify-center gap-2 rounded-xl border px-1.5 py-3 transition-all ${
//                       isSelected
//                         ? "border-blue-500 bg-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
//                         : "border-white/15 bg-white/4 hover:border-blue-400/50"
//                     }`}
//                   >
//                     <Icon
//                       size={21}
//                       className={isSelected ? "text-blue-400" : "text-gray-300"}
//                     />
//                     <span className="text-xs font-semibold text-white sm:text-sm">
//                       {role.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             {selectedRole === "admin" && (
//               <p className="mt-2 text-xs text-amber-400">
//                 Admin access requires an authorized invitation.
//               </p>
//             )}
//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-300">
//               Full name
//             </label>

//             <div className="flex h-12.5 items-center gap-3 rounded-xl border border-white/15 bg-[#0d0d14] px-4 transition focus-within:border-blue-500">
//               <User size={17} className="shrink-0 text-gray-500" />
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Jane Doe"
//                 required
//                 autoComplete="name"
//                 className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-300">
//               Email address
//             </label>

//             <div className="flex h-12.5 items-center gap-3 rounded-xl border border-white/15 bg-[#0d0d14] px-4 transition focus-within:border-blue-500">
//               <Mail size={17} className="shrink-0 text-gray-500" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 required
//                 autoComplete="email"
//                 className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-300">
//               Password
//             </label>

//             <div className="flex h-12.5 items-center gap-3 rounded-xl border border-white/15 bg-[#0d0d14] px-4 transition focus-within:border-blue-500">
//               <LockKeyhole size={17} className="shrink-0 text-gray-500" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="At least 8 characters"
//                 required
//                 minLength={8}
//                 autoComplete="new-password"
//                 className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 className="text-gray-500 transition hover:text-white"
//               >
//                 {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//               </button>
//             </div>
//           </div>

//           {/* Messages */}
//           {errorMessage && (
//             <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
//               {errorMessage}
//             </p>
//           )}

//           {successMessage && (
//             <p className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-xs text-green-400">
//               {successMessage}
//             </p>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading || selectedRole === "admin"}
//             className="h-12.5 w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isLoading ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Sign In */}
//         <p className="mt-7 text-center text-sm text-gray-400">
//           Already have an account?{" "}
//           <Link
//             href="/sign.in"
//             className="font-semibold text-blue-400 transition hover:text-blue-300"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }















"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

import {
  UsersRound,
  UserRound,
  Shield,
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

type UserRole = "seeker" | "recruiter" | "admin";

const roles = [
  {
    value: "seeker" as UserRole,
    label: "Job Seeker",
    icon: UsersRound,
  },
  {
    value: "recruiter" as UserRole,
    label: "Recruiter",
    icon: UserRound,
  },
  {
    value: "admin" as UserRole,
    label: "Admin",
    icon: Shield,
  },
];

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] =
    useState<UserRole>("seeker");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role: selectedRole,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Unable to create your account."
        );
        return;
      }

      console.log("Signup successful:", data);

      setSuccessMessage(
        `Your ${selectedRole} account has been created successfully!`
      );

      form.reset();
      setSelectedRole("seeker");
      setShowPassword(false);
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090e] px-4 py-8">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Signup card */}
      <div className="relative w-full max-w-122.5 rounded-[22px] border border-white/15 bg-[#111116] px-7 py-8 shadow-2xl sm:px-10 sm:py-9">

        {/* Logo */}
        <Link href="/" className="mb-7 block text-center">
          <h1 className="text-[28px] font-bold tracking-tight">
            <span className="text-blue-500">Hire</span>
            <span className="text-white">Loop</span>
          </h1>
        </Link>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold text-white">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Three minutes to set up. Matches start arriving today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Role selection */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Joining HireLoop as
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.value;

                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    aria-pressed={isSelected}
                    className={`flex min-h-20.5 flex-col items-center justify-center gap-2 rounded-xl border px-1.5 py-3 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : "border-white/15 bg-white/4 hover:border-blue-400/50"
                    }`}
                  >
                    <Icon
                      size={21}
                      className={
                        isSelected
                          ? "text-blue-400"
                          : "text-gray-300"
                      }
                    />

                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full name
            </label>

            <div className="flex h-12.5 items-center gap-3 rounded-xl border border-white/15 bg-[#0d0d14] px-4 transition focus-within:border-blue-500">
              <User
                size={17}
                className="shrink-0 text-gray-500"
              />

              <input
                type="text"
                name="fullName"
                placeholder="Jane Doe"
                required
                autoComplete="name"
                className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email address
            </label>

            <div className="flex h-12.5 items-center gap-3 rounded-xl border border-white/15 bg-[#0d0d14] px-4 transition focus-within:border-blue-500">
              <Mail
                size={17}
                className="shrink-0 text-gray-500"
              />

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="flex h-12.5 items-center gap-3 rounded-xl border border-white/15 bg-[#0d0d14] px-4 transition focus-within:border-blue-500">
              <LockKeyhole
                size={17}
                className="shrink-0 text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="text-gray-500 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              {errorMessage}
            </p>
          )}

          {/* Success message */}
          {successMessage && (
            <p className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-xs text-green-400">
              {successMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="h-12.5 w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Sign in link */}
        <p className="mt-7 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/sign.in"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
