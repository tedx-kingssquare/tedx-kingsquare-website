"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const QUICK_LINKS = [
    { label: "About", href: "/about" },
    { label: "Event", href: "/event" },
    { label: "Contact", href: "/contact" },
  ];

  const RESOURCES_LINKS = [
    { label: "Speakers", href: "/#speakers" },
    { label: "Schedule", href: "/event" },
    { label: "Tickets", href: "/event#tickets" },
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
            <a href="/" className="inline-block">
              <Image
                src="/logo-white.png"
                alt="TEDx Kings Square Women"
                className="h-[48px] w-auto object-contain"
                width={195}
                height={48}
              />
            </a>
            <p className="font-heading text-[12px] leading-[18px] text-gray-400 mt-2">
              <span className="text-red-500 font-medium">x</span> = independently organized TED event
            </p>
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
              <a href="https://www.instagram.com/tedxkingssquarewomen?igsh=dmhpYnkwM3NhZ2dh&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition" aria-label="Instagram">
                <img src="/instagram.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden />
              </a>
              <a href="https://x.com/tedxkingssquare?s=21&t=YAcBV-XQa2PxoOXOOZomJw" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition" aria-label="X">
                <img src="/x.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden />
              </a>
              <a href="https://chat.whatsapp.com/BpjkeQJOVHK7D3zacrlVGw" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
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
