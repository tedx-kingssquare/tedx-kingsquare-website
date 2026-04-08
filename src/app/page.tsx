"use client";

import React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { WandSparkles, SquaresIntersect, Waves } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CORE_VALUES,
  SPEAKERS,
  HERO,
  ABOUT,
  CORE_VALUES_SECTION,
  EVENT_DETAILS,
  SPEAKERS_SECTION,
  FAQ_SECTION,
  FAQ_ITEMS,
  PARTNERS_SECTION,
  INSPIRED_SECTION,
} from "../constants";

const CORE_VALUES_ICONS: Record<(typeof CORE_VALUES)[number]["icon"], React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  WandSparkles,
  SquaresIntersect,
  Waves,
};

function renderHighlightedText(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
    const isBold = part.startsWith("**") && part.endsWith("**");
    if (!isBold) return <React.Fragment key={idx}>{part}</React.Fragment>;
    return (
      <strong key={idx} className="font-semibold text-brand-primary">
        {part.slice(2, -2)}
      </strong>
    );
  });
}

function renderFaqAnswer(answer: string) {
  const lines = answer.split("\n").map((line) => line.trim());
  const items: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (!bulletBuffer.length) return;
    items.push(
      <ul key={`bullets-${items.length}`} className="list-disc pl-5 space-y-1.5 marker:text-gray-8">
        {bulletBuffer.map((bullet, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderHighlightedText(bullet)}
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  lines.forEach((line) => {
    if (!line) {
      flushBullets();
      return;
    }
    if (line.startsWith("- ")) {
      bulletBuffer.push(line.slice(2));
      return;
    }
    flushBullets();
    items.push(
      <p key={`p-${items.length}`} className="leading-relaxed">
        {renderHighlightedText(line)}
      </p>
    );
  });
  flushBullets();
  return items;
}

function CoreValuesGrid() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full">
      <div className="flex flex-col md:flex-row gap-[74px] items-center mx-auto justify-center">
        {CORE_VALUES.map((item) => {
          const Icon = CORE_VALUES_ICONS[item.icon];
          return (
            <div
              key={item.title}
              data-core-value-card
              className="max-w-[320px] rounded-xl bg-white p-8 text-center flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center mb-4 mx-auto shrink-0">
                <Icon className="w-6 h-6 text-brand-white" aria-hidden />
              </div>
              <h3 className="font-heading font-bold text-gray-1 text-lg mb-2 shrink-0">{item.title}</h3>
              <p className="font-heading text-gray-2 text-sm leading-relaxed flex-1">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImageInnerRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const eventSectionRef = useRef<HTMLElement>(null);
  const eventImageRef = useRef<HTMLDivElement>(null);
  const eventContentRef = useRef<HTMLDivElement>(null);
  const coreValuesSectionRef = useRef<HTMLElement>(null);
  const speakersSectionRef = useRef<HTMLElement>(null);
  const partnersSectionRef = useRef<HTMLElement>(null);
  const inspiredSectionRef = useRef<HTMLElement>(null);
  const faqContentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = heroSectionRef.current;
    const image = heroImageRef.current;
    const overlay = heroOverlayRef.current;
    const titleEl = heroTitleRef.current;
    const subtitle = heroSubtitleRef.current;
    const cta = heroCtaRef.current;
    const imageInner = heroImageInnerRef.current;
    if (!section || !image || !imageInner || !overlay || !titleEl || !subtitle || !cta) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        imageInner,
        { scale: 1.08 },
        { scale: 1.4, duration: 1.4, ease: "power2.inOut" }
      )
        .fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=1.4"
        )
        .fromTo(
          titleEl.querySelectorAll(".hero-title-word"),
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.9"
        )
        .fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          cta,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        );

      // Parallax: image moves less than scroll so the lag is evident; scrub adds visible delay
      gsap.fromTo(
        image,
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

  useEffect(() => {
    const section = aboutSectionRef.current;
    const content = aboutContentRef.current;
    if (!section || !content) return;
    const ctx = gsap.context(() => {
      const titles = content.querySelectorAll("h2");
      const paragraphs = content.querySelectorAll("p");
      const cta = content.querySelector("button");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });
      tl.fromTo(titles, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 })
        .fromTo(paragraphs, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, "-=0.4");
      if (cta) {
        tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      }
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = eventSectionRef.current;
    const imageEl = eventImageRef.current;
    const content = eventContentRef.current;
    if (!section || !imageEl || !content) return;
    const ctx = gsap.context(() => {
      const title = section.querySelector("h2");
      const heading = content.querySelector("h3");
      const listItems = content.querySelectorAll("ul li");
      const ctaWrap = content.querySelector(".flex.flex-wrap");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });
      if (title) tl.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo(imageEl, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.7 }, "-=0.4");
      if (heading) tl.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.5");
      if (listItems.length)
        tl.fromTo(listItems, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.35");
      if (ctaWrap) tl.fromTo(ctaWrap, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = coreValuesSectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll("[data-core-value-card]");
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = speakersSectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const label = section.querySelector("[data-speaker-label]");
      const cards = section.querySelectorAll("[data-speaker-body]:first-of-type > div");
      const cta = section.querySelector("[data-speaker-body]:last-of-type");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      if (label) tl.fromTo(label, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 });
      if (cards.length) tl.fromTo(cards, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.2");
      if (cta) tl.fromTo(cta, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = partnersSectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const title = section.querySelector("h2");
      const body = section.querySelector("p");
      const cta = section.querySelector("a");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      if (title) tl.fromTo(title, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65 });
      if (body) tl.fromTo(body, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4");
      if (cta) tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = inspiredSectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const title = section.querySelector("h2");
      const body = section.querySelector("p");
      const ctas = section.querySelectorAll("a");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      if (title) tl.fromTo(title, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65 });
      if (body) tl.fromTo(body, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4");
      if (ctas.length) tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.35");
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    faqContentRefs.current.forEach((el, idx) => {
      if (!el) return;
      const isOpen = activeFaq === idx;
      if (isOpen) {
        gsap.killTweensOf(el);
        gsap.set(el, { display: "block" });
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(el, { height: "auto" });
          },
        });
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeFaq]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          ref={heroSectionRef}
          className="relative h-screen min-h-0 flex items-center justify-center overflow-hidden"
        >
          <div
            ref={heroImageRef}
            className="absolute top-0 left-0 right-0 w-full overflow-hidden"
            style={{ height: "160%" }}
          >
            <div
              ref={heroImageInnerRef}
              className="absolute inset-0 origin-center will-change-transform"
              style={{ transform: "scale(1.08)" }}
            >
              <Image
                src={HERO.image.src}
                alt={HERO.image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 bg-brand-black/70 backdrop-blur-[5px]"
          />
          <div className="relative z-10 text-center text-white px-4 sm:px-6 mx-auto">
            <h1
              ref={heroTitleRef}
              className="mx-auto text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 lg:w-max font-heading"
            >
              {HERO.titleWords.map((word, i) => (
                <span key={word} className="hero-title-mask">
                  <span className={`hero-title-word ${i === HERO.titleHighlightIndex ? "text-brand-primary" : ""}`}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p
              ref={heroSubtitleRef}
              className="text-base md:text-xl lg:text-2xl mb-8 opacity-95 max-w-md md:max-w-xl mx-auto"
            >
              {HERO.subtitle}
            </p>
            <a
              ref={heroCtaRef}
              href={HERO.cta.href}
              className="cta-text-swap inline-flex items-center justify-center w-[168px] h-[48px] bg-red-600 text-white rounded-md text-[16px] font-heading font-medium hover:bg-red-700 transition"
            >
              <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">{HERO.cta.primary}</span>
                  <span className="cta-text-swap__line" aria-hidden>{HERO.cta.secondary}</span>
                </span>
              </span>
            </a>
          </div>
        </section>

        {/* About */}
        <section ref={aboutSectionRef} id="about" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] font-heading">
            <div ref={aboutContentRef}>
              <h2 className="font-heading max-w-[532px] text-2xl md:text-3xl lg:text-[40px] lg:leading-[48px] font-bold text-gray-1 tracking-[-0.1%]">
                {ABOUT.heading1} <span className="text-brand-primary">{ABOUT.brandName}</span>
              </h2>
              <h2 className="font-heading max-w-[532px] text-2xl md:text-3xl lg:text-[40px] lg:leading-[48px] font-bold text-gray-1 tracking-[-0.1%] mb-8 md:mb-[42px]">
                {ABOUT.heading2}
              </h2>
              <div className="text-gray-2 space-y-5 text-left font-heading text-[17px] md:text-[20px] leading-[26px] md:leading-[28px]">
                {ABOUT.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href="/about"
                className="cta-text-swap inline-flex items-center justify-center mt-[29px] w-[96px] h-[48px] rounded-md bg-brand-white text-gray-1 font-['Helvetica']! text-[16px] leading-[24px] font-medium tracking-[-0.5%] border border-gray-11 hover:opacity-90 transition"
              >
                <span className="cta-text-swap__inner">
                  <span className="cta-text-swap__track">
                    <span className="cta-text-swap__line">{ABOUT.cta.primary}</span>
                    <span className="cta-text-swap__line" aria-hidden>{ABOUT.cta.secondary}</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Core Value */}
        <section ref={coreValuesSectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] bg-[#F5F5F5]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-1 text-center">
              {CORE_VALUES_SECTION.title}
            </h2>
          </div>
          <CoreValuesGrid />
        </section>

        {/* Event Details */}
        <section ref={eventSectionRef} id="events" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              {EVENT_DETAILS.sectionTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-[80px] items-center">
              <div
                ref={eventImageRef}
                className="group relative rounded-xl overflow-hidden shadow-md w-full md:w-[600px] h-[280px] md:h-[600px] max-w-full mx-auto md:mx-0"
              >
                <div className="absolute inset-0 transition-transform duration-300 ease-out scale-100 group-hover:scale-105">
                  <Image
                    src={EVENT_DETAILS.image.src}
                    alt={EVENT_DETAILS.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
              <div ref={eventContentRef}>
                <h3 className="max-w-[416px] text-[22px] md:text-[32px] leading-[30px] md:leading-[40px] font-medium text-gray-900 tracking-[-0.5%] mb-6 md:mb-[40px]">
                  {EVENT_DETAILS.headingPrefix}
                  <span className="text-brand-primary">{EVENT_DETAILS.brandName}</span>
                  {EVENT_DETAILS.headingSuffix}
                </h3>
                <ul className="space-y-6">
                  {EVENT_DETAILS.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="w-12 h-12 rounded-full bg-gray-6 flex items-center justify-center shrink-0">
                        <img src={item.icon} alt="" className="w-[20px] h-[20px] object-contain" aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1 font-heading">{item.label}</p>
                        <p className="text-gray-900 font-heading font-medium text-[20px] leading-[28px]">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 md:gap-[60px] mt-10 md:mt-[80px]">
                  {EVENT_DETAILS.ctas.map((cta) => (
                    <a
                      key={cta.href}
                      href={cta.href}
                      className={`cta-text-swap inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold transition ${cta.isPrimary
                        ? "bg-brand-primary text-brand-white hover:opacity-90"
                        : "bg-brand-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <span className="cta-text-swap__inner">
                        <span className="cta-text-swap__track">
                          <span className="cta-text-swap__line">{cta.primary}</span>
                          <span className="cta-text-swap__line" aria-hidden>{cta.secondary}</span>
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Speakers — Coming Soon */}
        <section ref={speakersSectionRef} id="speakers" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
            <h2 data-speaker-label className="font-heading text-2xl md:text-[40px] md:leading-[48px] font-bold text-brand-black text-center mb-10 md:mb-20">
              {SPEAKERS_SECTION.title}
            </h2>
            {/* Mystery speaker grid */}
            <div data-speaker-body className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 w-full">
              {SPEAKERS.slice(0, 4).map((_, idx) => (
                <div key={idx} className="group cursor-pointer" style={{ perspective: '1000px' }}>
                  {/* Flipper */}
                  <div className="relative w-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-transform duration-500 ease-in-out">
                    {/* Front */}
                    <div className="[backface-visibility:hidden] flex flex-col bg-white rounded-2xl p-3 md:p-4 shadow-[0_2px_20px_rgba(0,0,0,0.07)]">
                      <div className="relative aspect-[1/1] rounded-xl bg-[#EFEFEF] overflow-hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#C8C8C8"
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%]"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                      <div className="mt-3 px-1 flex flex-col gap-[10px]">
                        <div className="h-[13px] bg-gray-300 rounded-full w-[68%]" aria-hidden />
                        <div className="h-[10px] bg-gray-200 rounded-full w-[45%]" aria-hidden />
                      </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-[#E2E2E2] rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.07)]">
                      <span className="font-heading font-black text-brand-primary leading-none select-none" style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}>?</span>
                      <p className="font-heading text-gray-500 text-xs mt-3 tracking-widest uppercase">Coming Soon</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div data-speaker-body className="mt-10 md:mt-14 flex flex-col items-center gap-4 text-center">
              <p className="font-heading text-[16px] md:text-[18px] leading-[26px] text-gray-2 max-w-[480px]">
                Our lineup of extraordinary women is being curated. Follow us to be the first to know when speakers are revealed.
              </p>
              <a
                href="https://www.instagram.com/tedxkingssquarewomen"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-text-swap inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-md font-heading font-medium text-[16px] leading-[24px] hover:opacity-90 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="cta-text-swap__inner">
                  <span className="cta-text-swap__track">
                    <span className="cta-text-swap__line">Follow for updates</span>
                    <span className="cta-text-swap__line" aria-hidden>@tedxkingssquarewomen</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
            <h2 className="font-heading font-bold text-brand-black text-2xl md:text-4xl text-center mb-8 md:mb-12">
              {FAQ_SECTION.title}
            </h2>
            <div className="max-w-[980px] mx-auto space-y-3 md:space-y-4">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={item.question}
                    className="rounded-md bg-[#F9F9F9] text-brand-black overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full cursor-pointer text-left px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                    >
                      <span className="font-heading text-[14px] md:text-[16px] leading-[22px] font-semibold text-[#191919]">
                        {item.question}
                      </span>
                      <span className="shrink-0 text-lg leading-none text-gray-1">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${idx}`}
                      ref={(el) => {
                        faqContentRefs.current[idx] = el;
                      }}
                      className="h-0 opacity-0 overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-5 text-sm md:text-[15px] text-gray-2 font-normal space-y-3">
                        {renderFaqAnswer(item.answer)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-[13px] md:text-[14px] text-gray-1 mt-8">
              Still have questions? We&apos;re here to help.
            </p>
            <div className="text-center mt-4">
              <a
                href={FAQ_SECTION.cta.href}
                className="inline-flex items-center justify-center h-9 px-4 rounded border border-gray-11 text-gray-1 text-[12px] hover:bg-white/40 transition"
              >
                {FAQ_SECTION.cta.label}
              </a>
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section ref={partnersSectionRef} id="partners" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
            <h2 className="font-heading max-w-[618px] text-2xl md:text-[40px] md:leading-[48px] font-bold text-brand-black tracking-[-0.1%] mb-5 md:mb-6">
              {PARTNERS_SECTION.title.split(PARTNERS_SECTION.brandName)[0]}
              <span className="text-brand-primary">{PARTNERS_SECTION.brandName}</span>
              {PARTNERS_SECTION.title.split(PARTNERS_SECTION.brandName)[1]}
            </h2>
            <p className="font-heading text-[17px] md:text-[20px] leading-[26px] md:leading-[28px] font-normal text-gray-2 w-full mb-8">
              {PARTNERS_SECTION.body}
            </p>
            <a
              href={PARTNERS_SECTION.cta.href}
              className="cta-text-swap inline-flex items-center justify-center bg-brand-primary text-brand-white px-6 py-3 rounded-md font-sans font-medium text-[16px] leading-[24px] tracking-[0.05%] hover:opacity-90 transition"
            >
              <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">{PARTNERS_SECTION.cta.primary}</span>
                  <span className="cta-text-swap__line" aria-hidden>{PARTNERS_SECTION.cta.secondary}</span>
                </span>
              </span>
            </a>
          </div>
        </section>

        {/* Ready to be Inspired */}
        <section ref={inspiredSectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] bg-gray-100">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] text-center">
            <h2 className="text-2xl md:text-[32px] md:leading-[40px] font-bold text-gray-1 mb-6 md:mb-[32px] tracking-[-0.5%]">
              {INSPIRED_SECTION.title}
            </h2>
            <p className="text-gray-8 mb-8 md:mb-[40px] font-heading text-[17px] md:text-[20px] leading-[26px] md:leading-[28px]">
              {INSPIRED_SECTION.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {INSPIRED_SECTION.ctas.map((cta, idx) => (
                <a
                  key={cta.href + (cta.id ?? "")}
                  {...(cta.id ? { id: cta.id } : {})}
                  href={cta.href}
                  className={`cta-text-swap inline-flex items-center justify-center px-8 py-3 rounded-md font-semibold transition text-center text-[16px] leading-[24px] tracking-[0.05%] ${idx === 0
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-gray-1 border border-[#B3B3B3] hover:bg-red-50"
                    }`}
                >
                  <span className="cta-text-swap__inner">
                    <span className="cta-text-swap__track">
                      <span className="cta-text-swap__line">{cta.primary}</span>
                      <span className="cta-text-swap__line" aria-hidden>{cta.secondary}</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
