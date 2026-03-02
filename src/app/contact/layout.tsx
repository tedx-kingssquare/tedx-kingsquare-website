import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
    themeColor: "#EB0028",
};

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Reach out to the TEDx Kings Square Women team about tickets, sponsorships, or speaking opportunities.",
    openGraph: {
        title: "Contact | TEDx Kings Square Women",
        description:
            "Have questions? Get in touch with us for partnerships, tickets, and media inquiries.",
        url: "https://tedxkingssquarewomen.com/contact",
        images: [
            {
                url: "/og-image.png",
                width: 640,
                height: 640,
                alt: "Contact TEDx Kings Square Women",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Contact | TEDx Kings Square Women",
        description: "Get in touch with the TEDx Kings Square Women team.",
        images: ["/og-image.png"],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
