"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";

gsap.registerPlugin(ScrollTrigger);
import Footer from "../../components/Footer";

const TICKET_PRICE = 5000;
const CURRENCY = "₦";
const SEATS_LEFT = 198;

const MYSTERY_SPEAKERS = [{}];


export default function EventPage() {
  const [quantity, setQuantity] = useState(0);
  const total = quantity * TICKET_PRICE;
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImageInnerRef = useRef<HTMLDivElement>(null);
  const footerParallaxInnerRef = useRef<HTMLDivElement>(null);
  const footerParallaxRef = useRef<HTMLElement>(null);
  const speakersSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = heroSectionRef.current;
    const title = heroTitleRef.current;
    const subtitle = heroSubtitleRef.current;
    const image = heroImageRef.current;
    if (!section || !title || !subtitle || !image) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(title, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .fromTo(image, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.5");
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = heroSectionRef.current;
    const imageInner = heroImageInnerRef.current;
    if (!section || !imageInner) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageInner,
        { yPercent: 0 },
        {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 2.5,
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  // Bottom banner: smooth parallax (wrapper overflow hidden + taller image, counter-scroll via GSAP)
  useEffect(() => {
    const container = footerParallaxRef.current;
    const inner = footerParallaxInnerRef.current;
    if (!container || !inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(inner,
        { yPercent: 0 },
        {
          yPercent: -33,
          ease: "none",
          scrollTrigger: {
            trigger: container.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, container);
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);


  useEffect(() => {
    const section = speakersSectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(".speaker-card");
      cards.forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        });
      });
    }, section);
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const formatPrice = (n: number) =>
    n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar activePage="event" />

      {/* Scrollable Content Wrapper */}
      <div className="relative z-10 bg-white shadow-2xl">
        <main className="flex-1 pt-[72px] md:pt-[80px]">
          {/* Hero */}
          <section ref={heroSectionRef} className="relative text-center pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
              <h1 ref={heroTitleRef} className="font-heading font-bold text-brand-black text-3xl md:text-4xl lg:text-[48px] leading-[56px] tracking-[-1%] mb-3">
                Join us for <span className="text-brand-primary">TEDx</span> Kings Square Women
              </h1>
              <p ref={heroSubtitleRef} className="font-heading text-gray-10 text-lg md:text-[32px] leading-[40px] tracking-[-0.5%] mx-auto ">
                an extraordinary gathering in the heart of Benin City.
              </p>
            </div>
            {/* Fixed frame so scale animation stays inside */}
            <div className="relative mt-10 md:mt-14 w-full h-[516px] overflow-hidden">
              <div
                ref={heroImageRef}
                className="absolute inset-0 w-full h-full origin-center"
              >
                <div
                  ref={heroImageInnerRef}
                  className="absolute top-0 left-0 w-full h-[130%]"
                >
                  <Image
                    src="/event-hero.webp"
                    alt="TEDx Kings Square Women event"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Event details: two columns */}
          <section id="tickets" className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left: venue + date */}
              <div className="font-heading space-y-10">
                <div>
                  <p className="text-[28px] leading-[36px] font-medium text-[#191919]">Venue:</p>
                  <p className="text-[28px] leading-[36px] font-medium text-[#313131]">
                    Benin City, Edo State
                  </p>
                </div>
                <div>
                  <p className="text-[28px] leading-[36px] font-medium text-[#191919]">Date:</p>
                  <p className="text-[28px] leading-[36px] font-medium text-[#313131]">
                    March 22nd, 2026
                  </p>
                </div>
              </div>

              {/* Right: ticket card */}
              <div className="flex flex-col gap-3 max-w-[610px]">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden font-heading shadow-sm">
                  {/* Card header */}
                  <div className="px-6 pt-6 pb-4 text-center">
                    <p className="font-semibold text-gray-1 text-[15px] leading-[22px]">
                      Get tickets for TEDx Kings Square Women
                    </p>
                    <p className="text-gray-9 text-[13px] mt-1">March 22nd, 2026 @10am</p>
                  </div>
                  <div className="h-[3px] bg-brand-primary" />

                  {/* Ticket row */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-1 text-[14px] leading-[20px]">TEDx Kings Square Women</p>
                        <p className="text-gray-1 font-semibold text-[15px] mt-0.5">{CURRENCY}5,000</p>
                        <p className="text-gray-9 text-[12px] mt-0.5">{SEATS_LEFT} seats left</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                          disabled={quantity === 0}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-1 text-white text-lg font-medium hover:opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[15px] font-medium text-gray-1">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-1 text-white text-lg font-medium hover:opacity-80 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="px-6 py-4 flex items-center gap-2 border-b border-gray-100">
                    <span className="text-success" aria-hidden>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-medium text-gray-1 text-[15px]">Total</span>
                    <span className="ml-auto font-semibold text-gray-1 text-[15px]">
                      {CURRENCY}{formatPrice(total)}
                    </span>
                  </div>

                  {/* Continue button */}
                  <div className="px-6 py-5">
                    <button
                      type="button"
                      disabled={quantity === 0}
                      className="w-full inline-flex items-center justify-center py-3 px-6 rounded-md font-medium text-[15px] leading-[24px] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-brand-primary text-white hover:opacity-90"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* Join community */}
                <div className="flex justify-end">
                  <a
                    href="https://chat.whatsapp.com/BpjkeQJOVHK7D3zacrlVGw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-success text-white px-4 py-2.5 rounded-full text-[13px] font-medium hover:opacity-90 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Join our community
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Theme description */}
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-6 sm:py-8 md:py-10 lg:py-12">
            <p className="font-heading text-[#222222] text-[28px] md:text-[36px] leading-[36px] md:leading-[44px] font-medium text-center">
              The theme is a bold call for women to advance and create new possibilities in spaces where
              women&apos;s voices and visions are essential.
            </p>
          </section>

          {/* Speakers — Mystery Cards */}
          <section ref={speakersSectionRef} className="bg-white py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
              <h2 className="font-heading font-bold text-brand-black text-3xl md:text-4xl text-center mb-12 md:mb-16">
                Speakers and Featured Topics
              </h2>
              <div className="flex flex-col gap-8 md:gap-10">
                {MYSTERY_SPEAKERS.map((_, i) => {
                  const isEven = i % 2 === 1;
                  const textBlock = (
                    <div className={`bg-[#F5F5F5] p-6 md:p-8 lg:p-10 flex flex-col justify-center text-left h-[350px] ${isEven ? "md:order-1" : "md:order-2"}`}>
                      <h4 className="font-heading font-bold text-brand-black text-base mb-3">Details</h4>
                      <p className="font-heading font-bold text-brand-primary text-[15px] md:text-[16px] leading-[24px] mb-2">Coming Soon</p>
                      <p className="font-heading text-gray-500 text-[14px] md:text-[15px] leading-[22px] md:leading-[24px]">
                        Our lineup of extraordinary speakers is being carefully curated. Follow us on Instagram to be the first to know when speakers are revealed.
                      </p>
                    </div>
                  );
                  const imageBlock = (
                    <div className={`flex items-center justify-center w-[350px] min-w-[350px] h-[350px] ${isEven ? "bg-brand-black md:order-2" : "bg-brand-primary"}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="rgba(255,255,255,0.25)"
                        className="w-[45%]"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                  );
                  return (
                    <div
                      key={i}
                      className={`speaker-card grid grid-cols-1 gap-0 items-stretch bg-[#FAFAFA] border border-gray-12 overflow-hidden ${isEven ? "md:grid-cols-[1fr_350px]" : "md:grid-cols-[350px_1fr]"}`}
                    >
                      {isEven ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative z-10 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-center bg-white">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
              <h2 className="font-heading font-bold text-brand-black text-2xl md:text-3xl mb-8">
                Get tickets for a life changing event.
              </h2>
              <Link
                href="/event#tickets"
                className="cta-text-swap inline-flex items-center justify-center bg-brand-primary text-brand-white px-8 py-3.5 rounded-md font-medium text-[16px] leading-[24px] hover:opacity-90 transition"
              >
                <span className="cta-text-swap__inner">
                  <span className="cta-text-swap__track">
                    <span className="cta-text-swap__line">Get Ticket</span>
                    <span className="cta-text-swap__line" aria-hidden>Reserve your spot</span>
                  </span>
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* Bottom banner: Reveal Parallax Effect (Image stays behind) */}
      <div className="relative h-[596px] z-0">
        <section
          ref={footerParallaxRef}
          className="sticky top-0 h-screen w-full overflow-hidden -z-10"
        >
          <div
            ref={footerParallaxInnerRef}
            className="absolute top-0 left-0 w-full h-[150%] will-change-transform"
          >
            <div className="relative w-full h-full">
              <Image
                src="/event-footer.webp"
                alt="TEDx Kings Square Women gathering"
                fill
                className="object-cover object-top"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-brand-black/20" />
            </div>
          </div>
        </section>
      </div>

      {/* Footer also scrolls over the image */}
      <div className="relative z-20 bg-brand-black">
        <Footer />
      </div>
    </div>
  );
}
