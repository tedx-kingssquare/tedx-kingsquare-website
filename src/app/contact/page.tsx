"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const INQUIRY_TYPES = [
    "General Inquiry",
    "Tickets",
    "Partnerships",
    "Speaking Opportunities",
    "Press & Media",
    "Other",
];

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

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar activePage="contact" />

            <main className="flex-1 pt-[72px] md:pt-[80px]">
                <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-16 md:py-24">
                    {/* Header */}
                    <div className="mb-10 md:mb-12">
                        <h1 className="font-heading font-bold text-brand-black text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-center mb-3">
                            Get in Touch
                        </h1>
                        <p className="font-heading text-gray-8 text-[16px] md:text-[18px] leading-[24px] md:leading-[26px] text-center">
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
                            onSubmit={handleSubmit}
                            noValidate
                            className="max-w-[530px] mx-auto flex flex-col gap-5"
                        >
                            {/* Full name */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="fullName"
                                    className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium"
                                >
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter full name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className={`w-full h-[48px] px-4 rounded-md border font-heading text-[15px] leading-[22px] text-gray-1 placeholder-gray-11 bg-white outline-none transition focus:border-brand-primary ${errors.fullName ? "border-brand-primary" : "border-gray-11"
                                        }`}
                                />
                                {errors.fullName && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="email"
                                    className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full h-[48px] px-4 rounded-md border font-heading text-[15px] leading-[22px] text-gray-1 placeholder-gray-11 bg-white outline-none transition focus:border-brand-primary ${errors.email ? "border-brand-primary" : "border-gray-11"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="phone"
                                    className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium"
                                >
                                    Phone number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="080 000 0000"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full h-[48px] px-4 rounded-md border border-gray-11 font-heading text-[15px] leading-[22px] text-gray-1 placeholder-gray-11 bg-white outline-none transition focus:border-brand-primary"
                                />
                            </div>

                            {/* Inquiry type */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="inquiryType"
                                    className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium"
                                >
                                    Inquiry type
                                </label>
                                <div className="relative">
                                    <select
                                        id="inquiryType"
                                        name="inquiryType"
                                        value={form.inquiryType}
                                        onChange={handleChange}
                                        className={`w-full h-[48px] px-4 pr-10 rounded-md border font-heading text-[15px] leading-[22px] bg-white outline-none appearance-none transition focus:border-brand-primary cursor-pointer ${form.inquiryType ? "text-gray-1" : "text-gray-11"
                                            } ${errors.inquiryType ? "border-brand-primary" : "border-gray-11"}`}
                                    >
                                        <option value="" disabled>Select</option>
                                        {INQUIRY_TYPES.map((type) => (
                                            <option key={type} value={type} className="text-gray-1">
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom chevron */}
                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-11">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                                {errors.inquiryType && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.inquiryType}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="message"
                                    className="font-heading text-gray-1 text-[14px] leading-[20px] font-medium"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Write a message"
                                    value={form.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-md border font-heading text-[15px] leading-[22px] text-gray-1 placeholder-gray-11 bg-white outline-none resize-none transition focus:border-brand-primary ${errors.message ? "border-brand-primary" : "border-gray-11"
                                        }`}
                                />
                                {errors.message && (
                                    <p className="text-brand-primary text-[12px] font-heading">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-1 w-full h-[48px] inline-flex items-center justify-center bg-brand-primary text-white rounded-md font-heading font-medium text-[16px] leading-[24px] hover:opacity-90 transition"
                            >
                                Send
                            </button>
                        </form>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
