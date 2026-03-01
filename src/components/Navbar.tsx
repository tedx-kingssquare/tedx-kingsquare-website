"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Event", href: "/event", id: "event" },
  { label: "Contact", href: "/contact", id: "contact" },
];

type NavbarProps = { activePage?: "home" | "about" | "event" | "contact" };

export default function Navbar({ activePage: activePageProp }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIconError, setMenuIconError] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const activePage = activePageProp ?? (pathname === "/event" ? "event" : pathname === "/contact" ? "contact" : "home");

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
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
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
                className={`font-sans text-base font-normal transition ${activePage === link.id ? "text-brand-primary" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={pathname === "/event" ? "/event#tickets" : "/#register"}
              className="hidden sm:inline-flex cta-text-swap bg-red-600 text-white px-5 py-2.5 rounded-md text-[15px] font-normal hover:bg-red-700 hover:shadow-[0_2px_8px_rgba(230,43,30,0.35)] transition items-center justify-center shrink-0"
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
              className="md:hidden flex items-center justify-center w-10 h-10 shrink-0 rounded-md text-gray-800 hover:bg-gray-100 flex-shrink-0"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <>
                  {menuIconError ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <Image
                      src="/menu.png"
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                      onError={() => setMenuIconError(true)}
                      aria-hidden
                    />
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {menuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="md:hidden fixed top-0 bottom-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          >
            <div
              className="absolute top-0 left-0 right-0 w-full overflow-y-auto bg-white flex flex-col shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-end p-4">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md text-gray-800 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col px-6 pb-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-4 font-sans text-base font-normal text-gray-900 ${activePage === link.id ? "text-brand-primary font-medium" : "hover:text-brand-primary"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={pathname === "/event" ? "/event#tickets" : "/#register"}
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 cta-text-swap bg-red-600 text-white px-6 py-3.5 rounded-md text-base font-medium text-center hover:bg-red-700 transition inline-flex items-center justify-center"
                >
                  <span className="cta-text-swap__inner">
                    <span className="cta-text-swap__track">
                      <span className="cta-text-swap__line">Get Ticket</span>
                      <span className="cta-text-swap__line" aria-hidden>Reserve your spot</span>
                    </span>
                  </span>
                </Link>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
