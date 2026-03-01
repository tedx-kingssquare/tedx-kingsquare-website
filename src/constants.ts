/**
 * Home page content and configuration
 */

// Carousel
export const CARD_GAP = 24;
export const AUTO_SCROLL_SPEED = 0.8; // px per tick
export const AUTO_SCROLL_INTERVAL = 20; // ms

// Core values – icon is key for mapping in component (WandSparkles | SquaresIntersect | Waves)
export const CORE_VALUES = [
  {
    title: "Ideas That Inspire",
    description:
      "Thought-provoking ideas designed to spark curiosity, challenge perspectives, and inspire new ways of thinking.",
    icon: "WandSparkles",
  },
  {
    title: "Meaningful Exchange",
    description:
      "A space for ideas to meet encouraging dialogue, shared perspectives that continue beyond the stage.",
    icon: "SquaresIntersect",
  },
  {
    title: "Ideas worth Spreading",
    description:
      "Powerful insights with the potential to influence, resonate, and create lasting impact within and beyond the community.",
    icon: "Waves",
  },
] as const;

export const SPEAKERS = [
  { name: "Efe Omoregie", role: "Policy Analyst", image: "/speaker_1.png" },
  { name: "Michael Adeyemi", role: "Startup Mentor", image: "/speaker_2.png" },
  { name: "Rachel Mensah", role: "Women Advocate", image: "/speaker_3.png" },
  { name: "Helen Parker", role: "Social Strategist", image: "/speaker_4.png" },
  { name: "Zainab Yusuf", role: "CEO, CivicTech Hub", image: "/speaker_5.png" },
  { name: "Daniel Kings", role: "Health Advocate", image: "/speaker_6.png" },
  { name: "Zainab Lawal", role: "Community Analyst", image: "/speaker_7.png" },
  { name: "Ifeoma Okafor", role: "Community Advocate", image: "/speaker_8.png" },
];

// Hero
export const HERO = {
  image: { src: "/hero.webp", alt: "TEDx Kings Square Women" },
  titleWords: ["TEDx", "Kings", "Square", "Women"] as const,
  titleHighlightIndex: 0, // "TEDx" uses brand-primary
  subtitle: "Unscripted",
  cta: { primary: "Get Ticket", secondary: "Reserve your spot", href: "#about" },
};

// About
export const ABOUT = {
  heading1: "What is",
  heading2: "Kings Square Women?",
  brandName: "TEDx",
  paragraphs: [
    "TEDx Kings Square Women is a locally organized TEDx event created to amplify women's voices and ideas that inspire meaningful change. The event brings together speakers from diverse backgrounds to share powerful insights, personal stories, and perspectives that challenge assumptions and spark new ways of thinking.",
    "Rooted in the global TED philosophy of Ideas Worth Spreading, TEDx Kings Square Women creates a platform for learning, dialogue, and connection. Through carefully curated talks, the event encourages curiosity, reflection, and conversations that extend beyond the stage.",
    "More than just a conference, TEDx Kings Square Women is a space where ideas meet lived experiences, and where women come together to explore topics that shape our communities, industries, and futures. Each session is designed to inform, inspire, and leave audiences with ideas worth carrying forward.",
  ],
  cta: { primary: "Learn more", secondary: "Discover more" },
};

// Core values section
export const CORE_VALUES_SECTION = {
  title: "Our Core Values",
};

// Event details
export const EVENT_DETAILS = {
  sectionTitle: "Event Details",
  image: { src: "/event.webp", alt: "TEDx Kings Square Women event" },
  headingPrefix: "Join us at ",
  headingSuffix: " Kings Square Women- Unscripted 2026",
  brandName: "TEDx",
  items: [
    { label: "Date", value: "Saturday, 15th March, 2026", icon: "/date.png" },
    { label: "Time", value: "10:00 AM - 6:00 PM", icon: "/time.png" },
    { label: "Venue", value: "Benin City, Edo State", icon: "/location.png" },
  ],
  ctas: [
    { primary: "Get Your Ticket", secondary: "Reserve now", href: "#register", isPrimary: true },
    { primary: "Learn more", secondary: "Find out more", href: "#about", isPrimary: false },
  ],
};

// Featured speakers
export const SPEAKERS_SECTION = {
  title: "Featured Speakers",
  viewAll: { primary: "View All Speakers", secondary: "See everyone", href: "#speakers" },
};

// Partnership
export const PARTNERS_SECTION = {
  title: "Become a TEDx Kings Square Women Partner Today",
  brandName: "TEDx",
  body: "We welcome organizations and individuals who share our vision. Partner with us to support this year's event and connect with a growing community of changemakers.",
  cta: { primary: "Join Partners", secondary: "Partner with us", href: "#contact" },
};

// Ready to be Inspired
export const INSPIRED_SECTION = {
  title: "Ready to be Inspired?",
  body: "Don't miss this opportunity to connect with extraordinary women and groundbreaking ideas.",
  ctas: [
    { primary: "Get Your Ticket", secondary: "Reserve now", href: "#", id: "register" },
    { primary: "Join Our Community", secondary: "Connect now", href: "#contact" },
  ],
};
