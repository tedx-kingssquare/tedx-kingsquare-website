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
  PARTNERS_SECTION,
  INSPIRED_SECTION,
} from "../constants";

const CORE_VALUES_ICONS: Record<(typeof CORE_VALUES)[number]["icon"], React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  WandSparkles,
  SquaresIntersect,
  Waves,
};

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
      const grid = section.querySelector('[class*="grid"]');
      if (!grid) return;
      const cards = grid.children;
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
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
              <button
                className="cta-text-swap inline-flex items-center justify-center mt-[29px] w-[96px] h-[48px] rounded-md bg-brand-white text-gray-1 font-['Helvetica']! text-[16px] leading-[24px] font-medium tracking-[-0.5%] border border-gray-11 hover:opacity-90 transition"
              >
                <span className="cta-text-swap__inner">
                  <span className="cta-text-swap__track">
                    <span className="cta-text-swap__line">{ABOUT.cta.primary}</span>
                    <span className="cta-text-swap__line" aria-hidden>{ABOUT.cta.secondary}</span>
                  </span>
                </span>
              </button>
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

        {/* Featured Speakers */}
        <section ref={speakersSectionRef} id="speakers" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]">
            <h2 className="font-heading text-2xl md:text-[40px] md:leading-[48px] font-bold text-brand-black text-center mb-10 md:mb-20">
              {SPEAKERS_SECTION.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {SPEAKERS.map((speaker) => (
                <div
                  key={speaker.name}
                  className="bg-white rounded-xl overflow-hidden text-center h-[380px] sm:h-[340px] md:h-[400px] lg:h-[438px] flex flex-col border border-[#C1C1C1]"
                >
                  <div className="w-full flex-1 min-h-0 relative bg-gray-200">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3 md:p-4 shrink-0">
                    <h3 className="font-sans font-semibold text-[13px] md:text-[16px] text-brand-black mb-1 md:mb-2">
                      {speaker.name}
                    </h3>
                    <p className="font-sans text-[12px] md:text-[14px] text-gray-9">
                      {speaker.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 md:mt-14">
              <a
                href={SPEAKERS_SECTION.viewAll.href}
                className="cta-text-swap inline-flex items-center justify-center font-sans font-medium text-[24px] text-brand-primary hover:underline"
              >
                <span className="cta-text-swap__inner">
                  <span className="cta-text-swap__track">
                    <span className="cta-text-swap__line">{SPEAKERS_SECTION.viewAll.primary}</span>
                    <span className="cta-text-swap__line" aria-hidden>{SPEAKERS_SECTION.viewAll.secondary}</span>
                  </span>
                </span>
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
