import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
    themeColor: "#EB0028",
};

export const metadata: Metadata = {
    title: "Event",
    description:
        "Join TEDx Kings Square Women: Unscripted 2026. Discover a day of transformative ideas, speakers, and networking at Civic Center, Onitsha.",
    openGraph: {
        title: "Event | TEDx Kings Square Women",
        description:
            "Unscripted 2026 – Explore transformative ideas at Civic Center, Onitsha. Get your tickets now.",
        url: "https://tedxkingssquarewomen.com/event",
        images: [
            {
                url: "/og-image.png",
                width: 640,
                height: 640,
                alt: "TEDx Kings Square Women Event Preview",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Event | TEDx Kings Square Women",
        description: "Join us at Civic Center, Onitsha for Unscripted 2026.",
        images: ["/og-image.png"],
    },
};

export default function EventLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
