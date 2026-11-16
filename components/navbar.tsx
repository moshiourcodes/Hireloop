"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

function useIsActive(href: string) {
  const pathname = usePathname()

  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({
  href,
  label,
  className,
  onClick,
}: {
  href: string
  label: string
  className?: string
  onClick?: () => void
}) {
  const isActive = useIsActive(href)

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "font-sans text-[16px] leading-[1.8] text-[#EDEDEF] no-underline transition-colors hover:text-white focus-visible:underline focus-visible:outline-none",
        isActive && "font-bold underline underline-offset-2",
        className
      )}
    >
      {label}
    </Link>
  )
}

function Logo({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        priority
        className="h-11 w-auto"
      />
    </Link>
  )
}

function AuthButtons({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button
        nativeButton={false}
        render={<Link href="/sign.in" onClick={onNavigate} />}
        className="h-10 rounded-lg bg-white px-4 font-(family-name:--font-inter) text-lg leading-[1.45] font-semibold text-[#645BFF] hover:bg-white/85"
      >
        Sign In
      </Button>

      <Button
        nativeButton={false}
        render={<Link href="/sign.up" onClick={onNavigate} />}
        className="h-10 rounded-lg border border-[#090A15]/10 bg-[#5C53FE] px-4 font-(family-name:--font-instrument) text-lg leading-[1.45] font-medium text-[#EDEDEF] hover:bg-[#5C53FE]/85"
      >
        Get Started
      </Button>
    </div>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="text-[#EDEDEF] hover:bg-white/10 hover:text-white md:hidden"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="gap-6 border-l border-white/[0.07] bg-[#1A1A1F] px-6 py-8 text-[#EDEDEF]"
      >
        <SheetHeader className="p-0">
          <Logo onClick={close} />
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col items-start gap-5">
          {links.map((link) => (
            <NavLink key={link.href} {...link} onClick={close} />
          ))}
        </nav>

        <Separator className="bg-[#A8A8A8]/40" />

        <AuthButtons
          className="w-full flex-col items-stretch"
          onNavigate={close}
        />
      </SheetContent>
    </Sheet>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#141418]">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-6 px-6">
        <Logo />

        <div className="hidden h-full items-center gap-6 rounded-lg border border-white/[0.07] bg-[#1A1A1F] px-6 py-2 md:flex">
          <nav aria-label="Main navigation" className="flex items-center gap-5">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <Separator
            orientation="vertical"
            className="h-6 self-center bg-[#A8A8A8]/40"
          />

          <AuthButtons />
        </div>

        <MobileNav />
      </div>
    </header>
  )
}
