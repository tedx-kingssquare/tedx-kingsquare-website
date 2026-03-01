"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const QUICK_LINKS = [
    { label: "About", href: "#about" },
    { label: "Event", href: "/event" },
    { label: "Contact", href: "#contact" },
  ];
  
  const RESOURCES_LINKS = [
    { label: "Speakers", href: "#speakers" },
    { label: "Schedule", href: "#schedule" },
    { label: "Tickets", href: "#register" },
    { label: "Venue", href: "/event" },
  ];

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const ctx = gsap.context(() => {
      const grid = footer.querySelector("[class*='grid']");
      const divider = footer.querySelector("[class*='border-t']");
      const copyright = footer.querySelector("[data-footer-copyright]");
      if (!grid) return;
      const columns = Array.from(grid.children);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });
      tl.fromTo(columns, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 });
      if (divider) tl.fromTo(divider, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
      if (copyright) tl.fromTo(copyright, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    }, footer);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-brand-black text-white">
      <div className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
          <div>
            <a href="#" className="inline-block">
              <Image
                src="/logo-white.png"
                alt="TEDx Kings Square Women"
                className="h-[48px] w-auto object-contain"
                width={195}
                height={48}
              />
            </a>
          </div>
          <div>
            <h4 className="font-heading font-medium text-white text-[16px] leading-[24px] tracking-[0.05%] mb-4">
              Quick links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-heading text-[16px] leading-[24px] tracking-[0.05%] text-gray-11 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium text-white text-[16px] leading-[24px] tracking-[0.05%] mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-heading text-[16px] leading-[24px] tracking-[0.05%] text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium text-white text-[16px] leading-[24px] tracking-[0.05%] mb-4">
              Connect
            </h4>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-white hover:opacity-80 transition" aria-label="Instagram">
                <img src="/instagram.png" alt="" className="w-[24px] h-[24px] object-contain" aria-hidden />
              </a>
              <a href="#" className="text-white hover:opacity-80 transition" aria-label="X">
                <img src="/x.png" alt="" className="w-[24px] h-[24px] object-contain" aria-hidden />
              </a>
              <a href="#" className="text-white hover:opacity-80 transition" aria-label="LinkedIn">
                <img src="/linkedin.png" alt="" className="w-[24px] h-[24px] object-contain" aria-hidden />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t-[0.2px] border-white/80 w-full mt-[132px] mb-[32px]"></div>
        <div data-footer-copyright className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
          <p className="font-heading text-[14px] leading-[22px] tracking-[0.05%] text-gray-11">
            <Image src="/copyright.png" alt="Copyright" className="inline-block mr-[12px] w-[20px] h-[20px] object-contain" width={20} height={20} /> 2026 TEDx Kings Square Women. All rights reserved.
        </p>
        </div>
      </div>
    </footer>
  );
}
