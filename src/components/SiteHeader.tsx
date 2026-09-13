"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";

const links = [
  { href: "/study", label: "Study" },
  { href: "/practice", label: "Practice test" },
  { href: "/progress", label: "Progress" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="az-nav">
      <div className="az-shell az-nav-inner">
        <Link href="/" className="brand-mark">
          <span className="brand-badge" aria-hidden>
            AZ
          </span>
          <span className="font-display text-[1.15rem]">{APP_NAME}</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => {
            const current =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
