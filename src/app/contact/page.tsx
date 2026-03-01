"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const INQUIRY_TYPES = [
    "General Inquiry",
    "Tickets",
    "Partnerships",
    "Speaking Opportunities",
    "Press & Media",
    "Other",
];

// ── Custom Dropdown ──────────────────────────────────────────────────────────
function CustomDropdown({
    options,
    value,
    onChange,
    placeholder = "Select",
    hasError,
}: {
    options: string[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    hasError?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Capture trigger position when opening
    const handleToggle = () => {
        if (!open && triggerRef.current) {
            setRect(triggerRef.current.getBoundingClientRect());
        }
        setOpen((o) => !o);
    };

    // Update position on scroll/resize while open
    useEffect(() => {
        if (!open) return;
        const update = () => {
            if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
        };
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [open]);

    // Open / close animation
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        if (open) {
            gsap.fromTo(
                list,
                { opacity: 0, y: -8, pointerEvents: "none" },
                { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", pointerEvents: "auto" }
            );
        } else {
            gsap.to(list, { opacity: 0, y: -6, duration: 0.15, ease: "power2.in", pointerEvents: "none" });
        }
    }, [open]);

    // Close on outside click
    useEffect(() => {
        const onOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                triggerRef.current && !triggerRef.current.contains(target) &&
                listRef.current && !listRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onOutside);
        return () => document.removeEventListener("mousedown", onOutside);
    }, []);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const dropdownList = rect ? (
        <ul
            ref={listRef}
            role="listbox"
            style={{
                opacity: 0,
                pointerEvents: "none",
                position: "fixed",
                top: rect.bottom + 6,
                left: rect.left,
                width: rect.width,
                zIndex: 9999,
            }}
            className="bg-white border border-gray-11 rounded-md shadow-xl overflow-hidden py-1"
        >
            {options.map((option) => {
                const selected = option === value;
                return (
                    <li
                        key={option}
                        role="option"
                        aria-selected={selected}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => { onChange(option); setOpen(false); }}
                        className={`flex items-center justify-between px-4 py-1.5 font-heading text-[15px] leading-[22px] cursor-pointer transition-colors duration-100 ${selected
                            ? "text-brand-primary bg-brand-primary/5"
                            : "text-gray-1 hover:bg-gray-12"
                            }`}
                    >
                        <span>{option}</span>
                        {selected && (
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </li>
                );
            })}
        </ul>
    ) : null;

    return (
        <div className="relative">
            {/* Trigger */}
            <button
                ref={triggerRef}
                type="button"
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`w-full h-[48px] px-4 pr-10 rounded-md border font-heading text-[15px] leading-[22px] bg-white outline-none transition-all duration-200 text-left cursor-pointer ${hasError
                    ? "border-brand-primary ring-2 ring-brand-primary/20"
                    : open
                        ? "border-brand-primary ring-2 ring-brand-primary/20"
                        : "border-gray-11"
                    } ${value ? "text-gray-1" : "text-gray-11"}`}
            >
                {value || placeholder}
                <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    <svg className="w-4 h-4 text-gray-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {/* Portal: rendered on document.body to escape stacking contexts */}
            {mounted && open && createPortal(dropdownList, document.body)}
        </div>
    );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const heading = headingRef.current;
        const subtitle = subtitleRef.current;
        const form = formRef.current;
        if (!heading || !subtitle || !form) return;

        const ctx = gsap.context(() => {
            // Heading + subtitle entrance
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.fromTo(heading, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
                .fromTo(subtitle, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");

            // Stagger each field group
            const fields = form.querySelectorAll("[data-field]");
            gsap.fromTo(
                fields,
                { opacity: 0, y: 28 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.35,
                }
            );
        });

        return () => ctx.revert();
    }, [submitted]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
        if (!form.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!form.inquiryType) newErrors.inquiryType = "Please select an inquiry type.";
        if (!form.message.trim()) newErrors.message = "Message is required.";
        return newErrors;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setSubmitted(true);
    };

    const inputBase = "w-full h-[48px] px-4 rounded-md border font-heading text-[15px] leading-[22px] text-gray-1 placeholder-gray-11 bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary";

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar activePage="contact" />

            <main className="flex-1 pt-[72px] md:pt-[80px]">
                <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-16 md:py-24">
                    {/* Header */}
                    <div className="mb-10 md:mb-12">
                        <h1
                            ref={headingRef}
                            className="font-heading font-bold text-brand-black text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-center mb-3"
                        >
                            Get in Touch
                        </h1>
                        <p
                            ref={subtitleRef}
                            className="font-heading text-gray-8 text-[16px] md:text-[18px] leading-[24px] md:leading-[26px] text-center"
                        >
                            We&apos;d love to hear from you. Reach out about tickets, partnerships, or speaking opportunities.
                        </p>
                    </div>

                    {/* Form */}
                    {submitted ? (
                        <div className="max-w-[530px] mx-auto text-center py-16">
                            <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center mx-auto mb-5">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="font-heading font-bold text-brand-black text-2xl md:text-3xl mb-3">
                                Message Sent!
                            </h2>
                            <p className="font-heading text-gray-8 text-[16px] leading-[24px]">
                                Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ fullName: "", email: "", phone: "", inquiryType: "", message: "" }); }}
                                className="mt-8 inline-flex items-center justify-center bg-brand-primary text-white px-8 py-3 rounded-md font-medium text-[16px] hover:opacity-90 transition font-heading"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            noValidate
                            className="max-w-[530px] mx-auto flex flex-col gap-5"
                        >
                            {/* Full name */}
                            <div data-field className="flex flex-col gap-1.5">
                                <label htmlFor="fullName" className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium">
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter full name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className={`${inputBase} ${errors.fullName ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-gray-11"}`}
                                />
                                {errors.fullName && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div data-field className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`${inputBase} ${errors.email ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-gray-11"}`}
                                />
                                {errors.email && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div data-field className="flex flex-col gap-1.5">
                                <label htmlFor="phone" className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium">
                                    Phone number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="080 000 0000"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={`${inputBase} border-gray-11`}
                                />
                            </div>

                            {/* Inquiry type */}
                            <div data-field className="flex flex-col gap-1.5">
                                <label className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium">
                                    Inquiry type
                                </label>
                                <CustomDropdown
                                    options={INQUIRY_TYPES}
                                    value={form.inquiryType}
                                    onChange={(val) => {
                                        setForm((prev) => ({ ...prev, inquiryType: val }));
                                        if (errors.inquiryType) {
                                            setErrors((prev) => { const n = { ...prev }; delete n.inquiryType; return n; });
                                        }
                                    }}
                                    hasError={!!errors.inquiryType}
                                />
                                {errors.inquiryType && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.inquiryType}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div data-field className="flex flex-col gap-1.5">
                                <label htmlFor="message" className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Write a message"
                                    value={form.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-md border font-heading text-[15px] leading-[22px] text-gray-1 placeholder-gray-11 bg-white outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary ${errors.message ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-gray-11"}`}
                                />
                                {errors.message && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <div data-field>
                                <button
                                    type="submit"
                                    className="mt-1 w-full h-[48px] inline-flex items-center justify-center bg-brand-primary text-white rounded-md font-heading font-medium text-[16px] leading-[24px] hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
