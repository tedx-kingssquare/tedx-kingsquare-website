"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";

gsap.registerPlugin(ScrollTrigger);
import Footer from "../../components/Footer";

const TICKET_PRICE = 10000;
const CURRENCY = "NGN";

const EVENT_SPEAKERS = [
  {
    name: "Angela Osarodion",
    topic: "Breaking Barriers: Women's Rights in Law",
    image: "/speaker_img.png",
    details:
      "This talk explores how the legal system can both hinder and empower women, and how judges, lawyers, and advocates can dismantle systemic barriers to equality. Drawing from her journey growing up in Benin and rising to the bench, the speaker highlights the transformative role of law in advancing women's rights.",
  },
  {
    name: "Angela Osarodion",
    topic: "Breaking Barriers: Women's Rights in Law",
    image: "/speaker_img.png",
    details:
      "This talk explores how the legal system can both hinder and empower women, and how judges, lawyers, and advocates can dismantle systemic barriers to equality. Drawing from her journey growing up in Benin and rising to the bench, the speaker highlights the transformative role of law in advancing women's rights.",
  },
  {
    name: "Angela Osarodion",
    topic: "Breaking Barriers: Women's Rights in Law",
    image: "/speaker_img.png",
    details:
      "This talk explores how the legal system can both hinder and empower women, and how judges, lawyers, and advocates can dismantle systemic barriers to equality. Drawing from her journey growing up in Benin and rising to the bench, the speaker highlights the transformative role of law in advancing women's rights.",
  },
  {
    name: "Angela Osarodion",
    topic: "Breaking Barriers: Women's Rights in Law",
    image: "/speaker_img.png",
    details:
      "This talk explores how the legal system can both hinder and empower women, and how judges, lawyers, and advocates can dismantle systemic barriers to equality. Drawing from her journey growing up in Benin and rising to the bench, the speaker highlights the transformative role of law in advancing women's rights.",
  },
];

export default function EventPage() {
  const [quantity, setQuantity] = useState(1);
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
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);
    return () => ctx.revert();
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
                Join us for{" "}
                <span className="text-brand-primary text-4xl md:text-5xl lg:text-6xl">
                  TEDx Kings Square Women
                </span>
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
              {/* Left: theme, venue, date */}
              <div className="font-heading space-y-6">
                <p className="text-gray-1 text-[20px] leading-[28px]">
                  The theme of this year TEDx talk is{" "}
                  <span className="text-brand-primary font-semibold">&quot;Unscripted&quot;</span>
                </p>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-9 mb-1">Venue</p>
                  <p className="text-gray-1 font-medium text-[20px] leading-[28px]">
                    Benin City, Edo state
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-9 mb-1">Date</p>
                  <p className="text-gray-1 font-medium text-[20px] leading-[28px]">
                    March 22nd, 2025
                  </p>
                </div>
              </div>

              {/* Right: ticket selection */}
              <div className="bg-gray-12 rounded-xl p-6 md:p-8 font-heading">
                <h2 className="text-gray-1 font-medium text-[18px] leading-[26px] mb-6">
                  Get your tickets and be part of an extraordinary gathering!
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-gray-2 text-[16px] leading-[24px]">Regular</span>
                    <div className="flex items-center border border-gray-11 rounded-md overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-2 hover:bg-gray-12 transition"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="w-12 text-center text-[16px] font-medium text-gray-1">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-2 hover:bg-gray-12 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-[16px] leading-[24px] text-gray-2 pt-2">
                    <span>
                      {quantity} Regular ticket{quantity !== 1 ? "s" : ""}
                    </span>
                    <span className="font-medium text-gray-1">
                      {CURRENCY} {formatPrice(quantity * TICKET_PRICE)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-11">
                  <span className="text-success" aria-hidden>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-1 text-[18px] leading-[26px]">
                    Total
                  </span>
                  <span className="ml-auto font-semibold text-gray-1 text-[18px]">
                    {CURRENCY} {formatPrice(total)}
                  </span>
                </div>
                <Link
                  href="#"
                  className="mt-6 w-full inline-flex items-center justify-center bg-success text-white py-3.5 px-6 rounded-md font-medium text-[16px] leading-[24px] hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </section>

          {/* Theme description */}
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-6 sm:py-8 md:py-10 lg:py-12">
            <p className="font-heading text-gray-2 text-[20px] leading-[28px] text-center max-w-3xl mx-auto">
              The theme &quot;<span className="text-brand-primary font-semibold">Unscripted</span>
              &quot; is a bold call for women to advance and create new possibilities in spaces where
              women&apos;s voices and visions are essential.
            </p>
          </section>

          {/* Speakers and Featured Topics – odd: image left, text right; even: text left, image right; red image area, contained headshot */}
          <section ref={speakersSectionRef} className="bg-white py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
              <h2 className="font-heading font-bold text-brand-black text-3xl md:text-4xl text-center mb-12 md:mb-16">
                Speakers and Featured Topics
              </h2>
              <div className="flex flex-col gap-8 md:gap-10">
                {EVENT_SPEAKERS.map((speaker, i) => {
                  const isEven = i % 2 === 1;
                  const textBlock = (
                    <div
                      className={`bg-[#F5F5F5] p-6 md:p-8 lg:p-10 flex flex-col justify-center text-left ${isEven ? "md:order-1" : "md:order-2"}`}
                    >
                      <h3 className="font-heading font-bold text-brand-black text-xl md:text-2xl lg:text-[28px] leading-tight mb-4">
                        {speaker.name}
                      </h3>
                      <p className="font-heading font-bold text-brand-black text-base md:text-lg lg:text-xl leading-snug mb-6 md:mb-7">
                        {speaker.topic}
                      </p>
                      <h4 className="font-heading font-bold text-brand-black text-base mb-3">
                        Details
                      </h4>
                      <p className="font-heading text-brand-black text-[15px] md:text-[16px] leading-[24px] md:leading-[26px]">
                        {speaker.details}
                      </p>
                    </div>
                  );
                  const imageBlock = (
                    <div
                      className={`flex items-center justify-center w-[350px] min-w-[350px] h-[350px] p-0 ${isEven ? "bg-brand-black md:order-2" : "bg-brand-primary"}`}
                    >
                      <div className="relative w-[350px] h-[350px] shrink-0 overflow-hidden">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover object-top"
                          sizes="350px"
                        />
                      </div>
                    </div>
                  );
                  return (
                    <div
                      key={i}
                      className={`speaker-card grid grid-cols-1 gap-0 items-stretch h-[350px] md:h-[350px] bg-[#FAFAFA] border border-gray-12 overflow-hidden ${isEven ? "md:grid-cols-[1fr_350px]" : "md:grid-cols-[350px_1fr]"}`}
                    >
                      {isEven ? (
                        <>
                          {textBlock}
                          {imageBlock}
                        </>
                      ) : (
                        <>
                          {imageBlock}
                          {textBlock}
                        </>
                      )}
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
