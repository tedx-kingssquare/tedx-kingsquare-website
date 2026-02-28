"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#about", active: false },
  { label: "Event", href: "#events", active: false },
  { label: "Contact", href: "#contact", active: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-[100px]">
        <div className="flex items-center justify-between py-4">
          <a href="#" className="flex items-center shrink-0">
            <img
              src="/logo-black.png"
              alt="TEDx Kings Square Women"
              className="h-9 md:h-10 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-sans text-base font-normal transition ${
                  link.active ? "text-brand-primary" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#register"
              className="bg-red-600 text-white px-5 py-2.5 rounded-md text-[15px] font-normal hover:bg-red-700 hover:shadow-[0_2px_8px_rgba(230,43,30,0.35)] transition"
            >
              Get Ticket
            </a>
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
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 font-sans text-base font-normal ${link.active ? "text-brand-primary" : "text-gray-600"}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
