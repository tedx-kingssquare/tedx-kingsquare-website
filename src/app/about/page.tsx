"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
export default function AboutPage() {
    return (
        <div className=" bg-white">
            <Navbar activePage="about" />


            <section className=" md:px-30 px-10 md:py-10 py-2 md:max-w-7xl mx-auto">
                <h1 className="md:pt-25 pt-25  text-center md:text-3xl text-xl font-semibold  md:font-bold">About <span className="text-brand-primary">TEDx</span></h1>
                <div className="md:py-10 py-3 md:max-w-4xl max-w-md flex flex-col gap-4 mx-auto">
                    <h2 className="text-[21px] font-semibold">X = independently organised event</h2>
                    <p className="text-[16px]">In the spirit of discovering and spreading ideas, TEDx is a program of local,
                        self-organized events that bring people together to share a TED-like
                        experience. At a TEDx event, TED Talks videos and live speakers combine to
                        spark deep discussion and connection. These local, self-organized events are
                        branded TEDx, where x = independently organized TED event. The TED
                        Conference provides general guidance for the TEDx program, but individual
                        TEDx events are self-organized. (Subject to certain rules and regulations.)</p>
                    <div className="flex">
                        <Image
                            src="/about1.png"
                            alt="TEDx"
                            width={270}
                            height={300}
                            className="mx-auto mt-4 md:block hidden"
                        />
                        <Image
                            src="/about2.png"
                            alt="TEDx"
                            width={360}
                            height={300}
                            className="mx-auto mt-4"
                        />
                        <Image
                            src="/about3.png"
                            alt="TEDx"
                            width={270}
                            height={300}
                            className="mx-auto mt-4 md:block hidden"
                        />
                    </div>
                </div>
                <div className="py-10 max-w-4xl mx-auto flex flex-col gap-8">

                    <h2 className="text-[21px] font-semibold text-center md:text-left">
                        About TED
                    </h2>

                    <p className="text-base leading-relaxed text-center md:text-left">
                        TED is a nonprofit, nonpartisan organization dedicated to discovering,
                        debating and spreading ideas that spark conversation, deepen
                        understanding and drive meaningful change. Our organization is devoted to
                        curiosity, reason, wonder and the pursuit of knowledge — without an agenda.
                        We welcome people from every discipline and culture who seek a deeper
                        understanding of the world and connection with others.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-10">

                        <div className="w-full md:w-1/3">
                            <Image
                                src="/about5.png"
                                alt="TED"
                                width={400}
                                height={500}
                                className=" w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full md:w-2/3">
                            <p className="text-base  leading-relaxed">
                                TED began in 1984 as a conference where Technology, Entertainment and
                                Design converged, but today it spans a multitude of worldwide communities
                                and initiatives exploring everything from science and business to education,
                                arts and global issues. From <span className="font-semibold">TED-Ed</span> and original podcasts to <span className="font-semibold">The Audacious
                                Project, Countdown,</span> and <span className="font-semibold">TED Democracy</span>, we welcome people from every
                                discipline and culture to engage with ideas and activate them in their community.
                            </p>
                        </div>

                    </div>
                </div>
                <div className="md:py-10 py-3 md:max-w-4xl max-w-xl flex flex-col md:gap-4 gap:2 mx-auto">
                    <h1 className="text-[21px] font-semibold">About <span className="text-brand-primary">TEDx </span> Kings Square Women</h1>
                    <p className="">About TEDx Kings Square Women
                        In Nigeria and across the globe, persistent inequalities continue to limit women’s full potential. In Nigeria, women make up only 22 percent of STEM graduates and scarcely 4–5 percent of the National Assembly. These data compel urgency: we must create spaces that empower women to script new futures.
                    </p>
                    <p>
                        <span className="font-semibold">TEDxKingsSquare Women</span> is designed to catalyze change and celebrate the works and voices of women. It is a movement to share ideas worth spreading about women thriving in spheres beyond the norm.
                    </p>
                    <h1 className="md:text-[21px] text-[] font-semibold">The theme:<span className="text-brand-primary ">Unscript</span> </h1>
                    <p className="">“Unscripted” symbolizes women in their diversity and resilience authoring change. It is a bold call for women to advance and create new possibilities in spaces where their voices and visions are essential. We believe the future is never fixed; it is imagined and shaped through bold ideas and courageous action.</p>
                </div>
                <div className="py-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-10">


                    <div className="md:w-2/3">
                        <p className="font-semibold mb-2">Potential Talk Direction</p>
                        <ul className="list-disc pl-5 space-y-[2px] mb-6">
                            <li>Breaking barriers in traditionally male-dominated fields</li>
                            <li>Reimagining women in leadership, community and business</li>
                            <li>Creative identification of identity, culture and storytelling</li>
                            <li>Personal journey of courage, innovation and reinvention</li>
                        </ul>

                        <p className="font-semibold mb-2">Our Objectives:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Inspire Women to Author Their Futures: Encouraging women to be active co-authors of the future, not passive observers.</li>
                            <li>Showcase Innovators and Changemakers: Amplifying the voices and impact stories of women driving social transformation.</li>
                            <li>Build a Connected Community: Creating a thriving network for mentorship and shared learning among leaders, creatives, and advocates.</li>
                            <li>Amplify Women’s Narratives: Providing a platform for ideas centered on women’s experiences and visions.</li>
                        </ul>
                    </div>


                    <div className="md:w-1.8/3">
                        <img
                            src="/about4.png"
                            alt="TED"
                            width={400}
                            height={500}
                            className="w-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex py-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-10 ">

                    <div className="md:w-1.8/3">
                        <img
                            src="/about6.png"
                            alt="TED"
                            width={400}
                            height={500}
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col md:w-2/3">
                        <p className="font-semibold mb-2"> Target Audience</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Women across all strata of society in Benin City and across Nigeria.</li>
                            <li>Students and emerging leaders eager to be part of impact-driven conversations.</li>
                            <li>Women's allies who prioritize impact over spectacle and are ready for tangible shifts in perspective.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}