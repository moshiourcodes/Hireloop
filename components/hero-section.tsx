import Link from "next/link"
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  Star,
  TrendingUp,
  UserSearch,
} from "lucide-react"

import { cn } from "@/lib/utils"

const trending = [
  { label: "Product Designer", href: "/jobs?q=Product%20Designer" },
  { label: "AI Engineering", href: "/jobs?q=AI%20Engineering" },
  { label: "DevOps Engineer", href: "/jobs?q=DevOps%20Engineer" },
]

const stats = [
  { value: "50K", label: "Active Jobs", icon: BriefcaseBusiness },
  { value: "12K", label: "Companies", icon: TrendingUp },
  { value: "2M", label: "Job Seekers", icon: UserSearch },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

function SearchBar() {
  return (
    <form
      action="/jobs"
      className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] py-2 pl-6 md:h-16 md:flex-row md:items-center md:gap-6"
    >
      <label className="flex flex-1 items-center gap-2">
        <span className="sr-only">Job title, skill or company</span>
        <Search className="size-6 shrink-0 text-white" />
        <input
          type="search"
          name="q"
          placeholder="Job title, skill or company"
          className="w-full bg-transparent font-sans text-base leading-[1.7] text-white outline-none placeholder:text-white/60"
        />
      </label>
      <span aria-hidden className="hidden w-px self-stretch bg-white/20 md:block" />
      <label className="flex flex-1 items-center gap-2">
        <span className="sr-only">Location or Remote</span>
        <MapPin className="size-6 shrink-0 text-white" />
        <input
          type="search"
          name="location"
          placeholder="Location or Remote"
          className="w-full bg-transparent font-sans text-base leading-[1.7] text-white outline-none placeholder:text-white/60"
        />
      </label>
      <button
        type="submit"
        aria-label="Search jobs"
        className="flex size-12 shrink-0 items-center justify-center self-center rounded-xl bg-[#5C53FE] transition-colors hover:bg-[#5C53FE]/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Search className="size-6 text-white" />
      </button>
    </form>
  )
}

function Badge() {
  return (
    <div className="flex items-center gap-6">
      <span aria-hidden className="h-px w-16 bg-white/20" />
      <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3">
        <BriefcaseBusiness className="size-6 shrink-0 text-white" />
        <span className="font-(family-name:--font-space-mono) text-xl leading-[1.2] text-white">
          50,000+ new jobs this month
        </span>
      </div>
      <span aria-hidden className="h-px w-16 bg-white/20" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#010103]">
      {/* Glow background (approximates the Figma gradient shapes) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-212.75 w-[1840px] max-w-none -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(92,83,254,0.5),rgba(220,2,206,0.18)_45%,transparent_72%)]" />
        <div className="absolute top-[65%] left-1/2 h-259.25 w-309 max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(92,83,254,0.22),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 pt-24 text-center md:pt-50">
          <Badge />
          <div className="flex max-w-3xl flex-col items-center gap-4">
            <h1 className="font-(family-name:--font-manrope) text-[44px] leading-[1.15] font-bold text-white md:text-[56px]">
              Find Your Dream Job Today
            </h1>
            <p className="font-(family-name:--font-manrope) text-lg leading-[1.6] text-white md:text-xl">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>
          </div>
          <div className="flex w-full max-w-3xl flex-col items-center gap-6">
            <SearchBar />
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="font-(family-name:--font-manrope) text-base leading-[1.3] text-white">
                Trending Position
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {trending.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-[#1A1A1B] px-3 py-1.5 font-(family-name:--font-manrope) text-sm leading-normal text-white transition-colors hover:bg-[#26262A] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live stats */}
        <div className="flex flex-col items-center gap-12 px-0 py-16 md:px-15 md:py-18">
          <h2 className="max-w-150 text-center font-(family-name:--font-instrument) text-[32px] leading-[1.3] font-medium text-white/70 md:text-[40px]">
            Assisting over 15,000 job seekers find their dream positions.
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-18 rounded-2xl p-6",
                  "min-h-63.5"
                )}
              >
                <stat.icon className="size-6 shrink-0 text-white" />
                <div className="flex flex-col gap-4">
                  <span className="font-(family-name:--font-jakarta) text-[44px] leading-[1.15] font-semibold text-white md:text-[56px]">
                    {stat.value}
                  </span>
                  <span className="font-(family-name:--font-inter-tight) text-lg leading-[1.65] text-white">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
