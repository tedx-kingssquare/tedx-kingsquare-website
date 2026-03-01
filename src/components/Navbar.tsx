"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Event", href: "/event", id: "event" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

type NavbarProps = { activePage?: "home" | "about" | "event" | "contact" };

export default function Navbar({ activePage: activePageProp }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const activePage = activePageProp ?? (pathname === "/event" ? "event" : "home");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="fixed w-full left-0 top-0 z-50 bg-white">
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-[100px]">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo-black.png"
              alt="TEDx Kings Square Women"
              className="h-9 md:h-10 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-sans text-base font-normal transition ${
                  activePage === link.id ? "text-brand-primary" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={pathname === "/event" ? "/event#tickets" : "/#register"}
              className="cta-text-swap bg-red-600 text-white px-5 py-2.5 rounded-md text-[15px] font-normal hover:bg-red-700 hover:shadow-[0_2px_8px_rgba(230,43,30,0.35)] transition inline-flex items-center justify-center"
            >
              <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">Get Ticket</span>
                  <span className="cta-text-swap__line" aria-hidden>Reserve your spot</span>
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 md:px-[100px] py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 font-sans text-base font-normal ${activePage === link.id ? "text-brand-primary" : "text-gray-600"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
