"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
  { name: "Speaker One", role: "CEO, Company Name", image: "" },
  { name: "Speaker Two", role: "Professor, University", image: "" },
  { name: "Speaker Three", role: "Entrepreneur", image: "" },
  { name: "Speaker Four", role: "Artist & Advocate", image: "" },
  { name: "Speaker Five", role: "Tech Leader", image: "" },
  { name: "Speaker Six", role: "Healthcare Pioneer", image: "" },
  { name: "Speaker Seven", role: "Education Innovator", image: "" },
  { name: "Speaker Eight", role: "Community Builder", image: "" },
];

const STATS = [
  { value: "50+", label: "Speakers" },
  { value: "100+", label: "Attendees" },
  { value: "100K+", label: "Views" },
];

const CARD_GAP = 24;

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
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const cards = [...CORE_VALUES, ...CORE_VALUES, ...CORE_VALUES];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        aria-label="Core values carousel"
      >
        <div className="flex gap-6 w-max">
        {cards.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            data-card
            className="flex-shrink-0 w-[280px] md:w-[320px] rounded-xl bg-white p-8 snap-start text-center flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center mb-4 mx-auto shrink-0">
              <item.Icon className="w-6 h-6 text-brand-white" aria-hidden />
            </div>
            <h3 className="font-heading font-bold text-gray-1 text-lg mb-2 shrink-0">{item.title}</h3>
            <p className="font-sans text-gray-2 text-sm leading-relaxed flex-1">{item.description}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/hero.webp"
            alt="TEDx Kings Square Women"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-black/60" />
          <div className="relative z-10 text-center text-white px-6 mx-auto">
            <h1 className="mx-auto text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 lg:w-max font-heading">
              <span className="text-brand-primary">TEDx</span> Kings Square Women
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">Unscripted</p>
            <a
              href="#about"
              className="inline-flex items-center justify-center w-[168px] h-[48px] bg-red-600 text-white rounded-md text-[16px] font-heading font-medium hover:bg-red-700 transition"
            >
              Get Ticket
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] font-heading">
            <div>
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
                className="inline-flex items-center justify-center mt-[29px] w-[96px] h-[48px] rounded-md bg-brand-white text-gray-1 font-['Helvetica']! text-[16px] leading-[24px] font-medium tracking-[0.5%] border border-gray-11 hover:opacity-90 transition"
              >
                Learn more
              </button>
            </div>
          </div>
        </section>

        {/* Core Value */}
        <section className="py-[96px] bg-[#F5F5F5] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-1 text-center">
              Our Core Values
            </h2>
          </div>
          <CoreValuesCarousel />
        </section>

        {/* Event Details */}
        <section id="events" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Event Details
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-xl overflow-hidden shadow-md bg-gray-200 aspect-video">
                <img
                  src="https://placehold.co/800x450/374151/9ca3af?text=Event+Stage"
                  alt="TEDx event stage placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Join us at{" "}
                  <span className="text-red-600">TEDx</span> Kings Square Women – Unscripted 2026
                </h3>
                <ul className="space-y-4 text-gray-600 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="text-red-600 text-xl">📅</span>
                    Saturday, 8th Nov. 2026
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-600 text-xl">🕐</span>
                    9 AM – 5 PM
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-600 text-xl">📍</span>
                    Civic Center, Onitsha
                  </li>
                </ul>
                <a
                  href="#register"
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why TEDx - Stats */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
              Why TEDx Kings Square Women?
            </h2>
            <div className="rounded-xl overflow-hidden shadow-md bg-gray-200 aspect-video max-w-3xl mx-auto mb-10">
              <img
                src="https://placehold.co/900x500/374151/9ca3af?text=Why+Attend"
                alt="Why attend TEDx placeholder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Speakers */}
        <section id="speakers" className="py-16 md:py-24 bg-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Featured Speakers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {SPEAKERS.map((speaker) => (
                <div
                  key={speaker.name}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full bg-gray-300 mb-3 overflow-hidden">
                    <img
                      src={`https://placehold.co/112x112/9ca3af/6b7280?text=${encodeURIComponent(speaker.name.slice(0, 2))}`}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{speaker.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{speaker.role}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="#speakers" className="text-red-600 font-semibold hover:underline">
                View All Speakers
              </a>
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section id="partners" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Become a <span className="text-red-600">TEDx</span> Kings Square Women Partner Today
            </h2>
            <p className="text-gray-600 mb-8">
              Partner with us to amplify ideas and support a community of innovators and
              storytellers. Your partnership helps us create an unforgettable experience for
              speakers and attendees alike.
            </p>
            <a
              href="#contact"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Join Now
            </a>
          </div>
        </section>

        {/* Ready to be Inspired */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to be Inspired?
            </h2>
            <p className="text-gray-600 mb-8">
              Join us for a day of powerful talks, meaningful connections, and ideas that could
              change the way you see the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                id="register"
                href="#"
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition text-center"
              >
                Register Now
              </a>
              <a
                href="#contact"
                className="inline-block bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-md font-semibold hover:bg-red-50 transition text-center"
              >
                Become a Speaker
              </a>
            </div>
          </div>
        </section>

        {/* Contact / Question */}
        <section id="contact" className="py-16 md:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Got a question? We&apos;re here to help!
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you want to speak, partner, or simply learn more about the event, reach out
              and we&apos;ll get back to you as soon as we can.
            </p>
            <a
              href="mailto:hello@tedxkingssquarewomen.com"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-20 bg-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Stay up to date with the latest news
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for event updates, speaker announcements, and more.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
