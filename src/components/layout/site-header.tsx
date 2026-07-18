"use client";

import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Brand } from "@/components/layout/brand";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { authClient } from "@/features/auth/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
};

type NavItem = {
  label: string;
  href: string;
};

const publicNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore Roadmaps", href: "/roadmaps" },
  { label: "Projects", href: "/items" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const privateNavigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explore", href: "/roadmaps" },
  { label: "My Roadmaps", href: "/my-roadmaps" },
  { label: "My Projects", href: "/my-projects" },
  { label: "My Items", href: "/items/manage" },
  { label: "Interview", href: "/interview" },
  { label: "AI Mentor", href: "/mentor" },
  { label: "Profile", href: "/profile" },
];

function routeIsActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({
  isAuthenticated: isAuthenticatedOverride,
  userName: userNameOverride,
  onLogout,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPending, setLogoutPending] = useState(false);
  const isAuthenticated = isAuthenticatedOverride ?? Boolean(session?.user);
  const userName = userNameOverride ?? session?.user.name;
  const navigation = isAuthenticated ? privateNavigation : publicNavigation;

  async function handleLogout() {
    setLogoutPending(true);
    try {
      if (onLogout) {
        onLogout();
      } else {
        await authClient.signOut();
      }
      router.push("/login");
      router.refresh();
    } finally {
      setLogoutPending(false);
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300",
        pathname === "/"
          ? "border-white/25 bg-white/[0.22] shadow-none dark:border-white/10 dark:bg-slate-950/[0.24]"
          : "border-white/40 bg-white/70 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/10",
      )}
    >
      <div className="section-shell flex min-h-16 items-center justify-between gap-4 py-2">
        <Brand />

        <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 xl:flex">
          {navigation.map((item) => {
            const active = routeIsActive(pathname, item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-slate-800 dark:hover:text-cyan-300",
                  active &&
                    "bg-blue-50 text-blue-700 after:absolute after:inset-x-3 after:-bottom-2 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-blue-600 after:to-cyan-400 dark:bg-slate-800 dark:text-cyan-300",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              {userName ? (
                <span className="max-w-28 truncate px-2 text-sm font-semibold text-foreground">
                  {userName}
                </span>
              ) : null}
              <Button disabled={logoutPending} onClick={handleLogout} variant="ghost">
                <LogOut aria-hidden="true" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                className={buttonVariants({
                  variant: pathname === "/login" ? "secondary" : "ghost",
                  size: "lg",
                })}
                href="/login"
              >
                Login
              </Link>
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-4 text-white shadow-md shadow-blue-500/20 hover:brightness-105",
                )}
                href="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <Button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
            size="icon-lg"
            variant="ghost"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="border-t border-border/70 bg-background/95 px-4 py-4 shadow-lg backdrop-blur-xl xl:hidden"
          id="mobile-navigation"
        >
          <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => {
              const active = routeIsActive(pathname, item.href);

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    active && "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-cyan-300",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 grid gap-2 border-t border-border/70 pt-4 sm:grid-cols-2">
              {isAuthenticated ? (
                <Button
                  className="h-11 rounded-xl"
                  disabled={logoutPending}
                  onClick={() => {
                    setMenuOpen(false);
                    void handleLogout();
                  }}
                  variant="outline"
                >
                  <LogOut aria-hidden="true" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 rounded-xl",
                    )}
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white",
                    )}
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
