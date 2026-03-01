"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { WandSparkles, SquaresIntersect, Waves } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CORE_VALUES = [
  {
    title: "Ideas That Inspire",
    description:
      "Thought-provoking ideas designed to spark curiosity, challenge perspectives, and inspire new ways of thinking.",
    Icon: WandSparkles,
  },
  {
    title: "Meaningful Exchange",
    description:
      "A space for ideas to meet encouraging dialogue, shared perspectives that continue beyond the stage.",
    Icon: SquaresIntersect,
  },
  {
    title: "Ideas worth Spreading",
    description:
      "Powerful insights with the potential to influence, resonate, and create lasting impact within and beyond the community.",
    Icon: Waves,
  },
];

const SPEAKERS = [
  { name: "Efe Omoregie", role: "Policy Analyst", image: "/speaker_1.png" },
  { name: "Michael Adeyemi", role: "Startup Mentor", image: "/speaker_2.png" },
  { name: "Rachel Mensah", role: "Women Advocate", image: "/speaker_3.png" },
  { name: "Helen Parker", role: "Social Strategist", image: "/speaker_4.png" },
  { name: "Zainab Yusuf", role: "CEO, CivicTech Hub", image: "/speaker_5.png" },
  { name: "Daniel Kings", role: "Health Advocate", image: "/speaker_6.png" },
  { name: "Zainab Lawal", role: "Community Analyst", image: "/speaker_7.png" },
  { name: "Ifeoma Okafor", role: "Community Advocate", image: "/speaker_8.png" },
];

const CARD_GAP = 24;

const AUTO_SCROLL_SPEED = 0.8; // px per tick
const AUTO_SCROLL_INTERVAL = 20; // ms

function CoreValuesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const getSetWidth = () => {
      const firstCard = el.querySelector("[data-card]") as HTMLElement | null;
      const cardWidth = firstCard?.offsetWidth ?? 320;
      return cardWidth * CORE_VALUES.length + CARD_GAP * (CORE_VALUES.length - 1);
    };

    const onScroll = () => {
      if (isResettingRef.current) return;
      const setWidth = getSetWidth();
      if (setWidth <= 0) return;
      if (el.scrollLeft >= setWidth - 1) {
        isResettingRef.current = true;
        el.style.scrollBehavior = "auto";
        const n = Math.floor(el.scrollLeft / setWidth);
        el.scrollLeft -= n * setWidth;
        requestAnimationFrame(() => {
          el.style.scrollBehavior = "";
          isResettingRef.current = false;
        });
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    const autoScroll = setInterval(() => {
      if (!scrollRef.current || paused || isResettingRef.current) return;
      el.scrollLeft += AUTO_SCROLL_SPEED;
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      clearInterval(autoScroll);
    };
  }, []);

  const cards = [...CORE_VALUES, ...CORE_VALUES, ...CORE_VALUES];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] w-full">
      <div
        ref={scrollRef}
        className="overflow-x-scroll overflow-y-hidden scrollbar-hide w-full min-w-0"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
        aria-label="Core values carousel"
      >
        <div
          className="flex gap-6 flex-nowrap"
          style={{ width: "max-content", minWidth: "max-content" }}
        >
        {cards.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            data-card
            className="flex-shrink-0 w-[280px] md:w-[320px] rounded-xl bg-white p-8 text-center flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center mb-4 mx-auto shrink-0">
              <item.Icon className="w-6 h-6 text-brand-white" aria-hidden />
            </div>
            <h3 className="font-heading font-bold text-gray-1 text-lg mb-2 shrink-0">{item.title}</h3>
            <p className="font-heading text-gray-2 text-sm leading-relaxed flex-1">{item.description}</p>
          </div>
        ))}
        </div>
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
            start: "top 82%",
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
                src="/hero.webp"
                alt="TEDx Kings Square Women"
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
          <div className="relative z-10 text-center text-white px-6 mx-auto">
            <h1
              ref={heroTitleRef}
              className="mx-auto text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 lg:w-max font-heading"
            >
              <span className="hero-title-mask">
                <span className="hero-title-word text-brand-primary">TEDx</span>
              </span>
              <span className="hero-title-mask">
                <span className="hero-title-word">Kings</span>
              </span>
              <span className="hero-title-mask">
                <span className="hero-title-word">Square</span>
              </span>
              <span className="hero-title-mask">
                <span className="hero-title-word">Women</span>
              </span>
            </h1>
            <p
              ref={heroSubtitleRef}
              className="text-xl md:text-2xl mb-8 opacity-95"
            >
              Unscripted
            </p>
            <a
              ref={heroCtaRef}
              href="#about"
              className="cta-text-swap inline-flex items-center justify-center w-[168px] h-[48px] bg-red-600 text-white rounded-md text-[16px] font-heading font-medium hover:bg-red-700 transition"
            >
              <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">Get Ticket</span>
                  <span className="cta-text-swap__line" aria-hidden>Reserve your spot</span>
                </span>
              </span>
            </a>
          </div>
        </section>

        {/* About */}
        <section ref={aboutSectionRef} id="about" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] font-heading">
            <div ref={aboutContentRef}>
              <h2 className="font-heading max-w-[532px] text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] font-bold text-gray-1 tracking-[-0.1%]">
                What is <span className="text-brand-primary">TEDx</span>
              </h2>
              <h2 className="font-heading max-w-[532px] text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] font-bold text-gray-1 tracking-[-0.1%] mb-[42px]">
                Kings Square Women?
              </h2>
              <div className="text-gray-2 space-y-5 text-left font-heading text-[20px] leading-[28px]">
                <p>
                  TEDx Kings Square Women is a locally organized TEDx event created to amplify
                  women's voices and ideas that inspire meaningful change. The event brings
                  together speakers from diverse backgrounds to share powerful insights, personal
                  stories, and perspectives that challenge assumptions and spark new ways of
                  thinking.
                </p>
                <p>
                  Rooted in the global TED philosophy of Ideas Worth Spreading, TEDx Kings Square
                  Women creates a platform for learning, dialogue, and connection. Through carefully
                  curated talks, the event encourages curiosity, reflection, and conversations that
                  extend beyond the stage.
                </p>
                <p>
                  More than just a conference, TEDx Kings Square Women is a space where ideas meet
                  lived experiences, and where women come together to explore topics that shape our
                  communities, industries, and futures. Each session is designed to inform, inspire,
                  and leave audiences with ideas worth carrying forward.
                </p>
              </div>
              <button
                className="cta-text-swap inline-flex items-center justify-center mt-[29px] w-[96px] h-[48px] rounded-md bg-brand-white text-gray-1 font-['Helvetica']! text-[16px] leading-[24px] font-medium tracking-[-0.5%] border border-gray-11 hover:opacity-90 transition"
              >
                <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">Learn more</span>
                  <span className="cta-text-swap__line" aria-hidden>Discover more</span>
                </span>
              </span>
              </button>
            </div>
          </div>
        </section>

        {/* Core Value */}
        <section className="py-[96px] bg-[#F5F5F5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-1 text-center">
              Our Core Values
            </h2>
          </div>
          <CoreValuesCarousel />
        </section>

        {/* Event Details */}
        <section ref={eventSectionRef} id="events" className="py-[96px] bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Event Details
            </h2>
            <div className="grid md:grid-cols-2 gap-[80px] items-center">
              <div
                ref={eventImageRef}
                className="group relative rounded-xl overflow-hidden shadow-md w-[600px] h-[600px] max-w-full mx-auto md:mx-0"
              >
                <div className="absolute inset-0 transition-transform duration-300 ease-out scale-100 group-hover:scale-105">
                  <Image
                    src="/event.webp"
                    alt="TEDx Kings Square Women event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
              <div ref={eventContentRef}>
                <h3 className="max-w-[416px] text-[32px] leading-[40px] font-medium text-gray-900 tracking-[-0.5%] mb-[40px]">
                  Join us at{" "}
                  <span className="text-brand-primary">TEDx</span> Kings Square Women- Unscripted 2026
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-3">
                    <span className="w-12 h-12 rounded-full bg-gray-6 flex items-center justify-center shrink-0">
                      <img src="/date.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1 font-heading">Date</p>
                      <p className="text-gray-900 font-heading font-medium text-[20px] leading-[28px]">Saturday, 15th March, 2026</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-12 h-12 rounded-full bg-gray-6 flex items-center justify-center shrink-0">
                      <img src="/time.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1 font-heading">Time</p>
                      <p className="text-gray-900 font-heading font-medium text-[20px] leading-[28px]">10:00 AM - 6:00 PM</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-12 h-12 rounded-full bg-gray-6 flex items-center justify-center shrink-0">
                      <img src="/location.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1 font-heading">Venue</p>
                      <p className="text-gray-900 font-heading font-medium text-[20px] leading-[28px]">Benin City, Edo State</p>
                    </div>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-[60px] mt-[80px]">
                  <a
                    href="#register"
                    className="cta-text-swap inline-flex items-center justify-center bg-brand-primary text-brand-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
                  >
                    <span className="cta-text-swap__inner">
                    <span className="cta-text-swap__track">
                      <span className="cta-text-swap__line">Get Your Ticket</span>
                      <span className="cta-text-swap__line" aria-hidden>Reserve now</span>
                    </span>
                  </span>
                  </a>
                  <a
                    href="#about"
                    className="cta-text-swap inline-flex items-center justify-center bg-brand-white text-gray-900 px-6 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-50 transition"
                  >
                    <span className="cta-text-swap__inner">
                      <span className="cta-text-swap__track">
                        <span className="cta-text-swap__line">Learn more</span>
                        <span className="cta-text-swap__line" aria-hidden>Find out more</span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Speakers */}
        <section ref={speakersSectionRef} id="speakers" className="py-16 md:py-24 bg-gray-12">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <h2 className="font-heading text-[40px] leading-[48px] font-bold text-brand-black text-center mb-16 md:mb-20">
              Featured Speakers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {SPEAKERS.map((speaker) => (
                <div
                  key={speaker.name}
                  className="bg-white rounded-xl overflow-hidden text-center h-[438px] flex flex-col border border-[#C1C1C1]"
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
                  <div className="p-4 shrink-0">
                    <h3 className="font-sans font-semibold text-[16px] lg:text-[16px] text-brand-black mb-2">
                      {speaker.name}
                    </h3>
                    <p className="font-sans text-[14px] text-gray-9">
                      {speaker.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 md:mt-14">
              <a
                href="#speakers"
                className="cta-text-swap inline-flex items-center justify-center font-sans font-medium text-[24px] text-brand-primary hover:underline"
              >
                <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">View All Speakers</span>
                  <span className="cta-text-swap__line" aria-hidden>See everyone</span>
                </span>
              </span>
              </a>
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section ref={partnersSectionRef} id="partners" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <h2 className="font-heading max-w-[618px] text-[40px] leading-[48px] font-bold text-brand-black tracking-[-0.1%] mb-6">
              Become a <span className="text-brand-primary">TEDx</span> Kings Square Women Partner Today
            </h2>
            <p className="font-heading text-[20px] leading-[28px] font-normal text-gray-2 w-full mb-8">
              We welcome organizations and individuals who share our vision. Partner with us to
              support this year&apos;s event and connect with a growing community of changemakers.
            </p>
            <a
              href="#contact"
              className="cta-text-swap inline-flex items-center justify-center bg-brand-primary text-brand-white px-6 py-3 rounded-md font-sans font-medium text-[16px] leading-[24px] tracking-[0.05%] hover:opacity-90 transition"
            >
              <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
<span className="cta-text-swap__line">Join Partners</span>
                <span className="cta-text-swap__line" aria-hidden>Partner with us</span>
                </span>
              </span>
            </a>
          </div>
        </section>

        {/* Ready to be Inspired */}
        <section ref={inspiredSectionRef} className="py-[96px] bg-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] text-center">
            <h2 className="text-3xl md:text-[32px] leading-[40px] font-bold text-gray-1 mb-[32px] tracking-[-0.5%]">
              Ready to be Inspired?
            </h2>
            <p className="text-gray-8 mb-[40px] font-heading text-[20px] leading-[28px]">
            Don't miss this opportunity to connect with extraordinary women and groundbreaking ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                id="register"
                href="#"
                className="cta-text-swap inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition text-center text-[16px] leading-[24px] tracking-[0.05%]"
              >
                <span className="cta-text-swap__inner">
                <span className="cta-text-swap__track">
                  <span className="cta-text-swap__line">Get Your Ticket</span>
                  <span className="cta-text-swap__line" aria-hidden>Reserve now</span>
                </span>
              </span>
              </a>
              <a
                href="#contact"
                className="cta-text-swap inline-flex items-center justify-center bg-white text-gray-1 border border-[#B3B3B3] px-8 py-3 rounded-md font-semibold hover:bg-red-50 transition text-center text-[16px] leading-[24px] tracking-[0.05%]"
              >
                <span className="cta-text-swap__inner">
                  <span className="cta-text-swap__track">
                    <span className="cta-text-swap__line">Join Our Community</span>
                    <span className="cta-text-swap__line" aria-hidden>Connect now</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
