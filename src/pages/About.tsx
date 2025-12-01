import { useWindowWidth } from "../actions/useWindowWidth";
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom";
import { Reveal } from "../components/Reveal";

export function AboutHarbor() {
    const Navigate = useNavigate();
    const width = useWindowWidth()
    return (
        <div className="overflow-x-hidden bg-background dark:bg-dark-background">

            {/* Hero Section */}
            <div className={`min-h-[500px] lg:min-h-[640px] bg-gradient-to-t from-button-light-blue dark:from-button-blue/35 from-[%] to-background to-[60%] dark:to-dark-background`}>
                <div className={`${width > 425 ? "mt-40 mx-30" : "mt-30 mx-10"}`}>
                    <Reveal delay={0.15}>
                        <div className={`${width > 768 ? "text-6xl" : width > 425 ? "text-5xl" : "text-4xl"} font-semibold text-darker-normal-text dark:text-dark-darker-normal-text`}>
                            Anchor your
                        </div>
                    </Reveal>

                    <Reveal delay={0.25}>
                        <div className={`${width > 768 ? "text-8xl" : width > 425 ? "text-7xl" : "text-6xl"} font-bold text-button-blue mb-20 md:mb-14`}>
                            inspiration.
                        </div>
                    </Reveal>

                    <Reveal delay={0.35}>
                        <p className={`${width > 1024 ? "text-lg mr-130" : width > 768 ? "mr-60 text-lg" : width > 425 ? "text-base" : "text-sm"} font-medium text-normal-text dark:text-dark-normal-text`}>
                            The internet is an ocean of noise. HARBOR is where your thoughts, inspirations,
                            and discoveries find a safe place to anchor - quiet, organized, and always within reach.<br /><br />
                        </p>

                        <Button variant={"primary"} size={`${width > 768 ? "lg" : "md"}`} text={"Get Started"} onClick={() => { Navigate("/"); }} />
                    </Reveal>
                </div>
            </div>

            {/* Our Vision */}
            <div className={`${width > 425 ? "h-100" : "h-80"} bg-sidebar-background dark:bg-dark-sidebar-background overflow-hidden`}>

                <Reveal delay={0.15}>
                    <div className={`text-headings-text dark:text-dark-headings-text font-bold text-center md:text-left ${width > 768 ? "text-5xl" : width > 425 ? "text-4xl" : "text-3xl"} mb-6 relative top-14 md:left-20 md:top-24 z-1`}>
                        Our Vision
                    </div>


                    <div className={`text-darker-normal-text dark:text-darker-normal-text font-medium text-center md:text-left ${width > 1024 ? "text-lg mr-180" : width > 768 ? "mr-80 text-lg" : width > 425 ? "mr-60 text-base" : "mx-8 text-sm"} relative top-14 md:left-20 md:top-24 z-1`}>
                        We believe great ideas don't appear in chaos — they appear in clarity.
                        That's why <strong>HARBOR</strong> isn't another dashboard.
                        It's a digital refuge for thinkers, creators, and collectors who want a space
                        that feels like still water.
                        <br /><br />
                        Here, everything has a place — and nothing feels cluttered.
                    </div>


                    <div className={`opacity-12 relative ${width > 1024 ? "w-400 -bottom-13" : width > 768 ? "w-350 -bottom-15" : width > 425 ? "w-300 -bottom-24" : "w-190 -bottom-10 -left-8"}`}>
                        <img src="/Waves.png" alt="" />
                    </div>
                </Reveal>
            </div>

            {/* Why We Built HARBOR? */}
            <div className={`${width > 425 ? "h-100" : "h-94"} bg-background dark:bg-dark-background border-y-2 border-normal-text/20`}>

                <Reveal delay={0.15}>
                    <div className={`text-headings-text dark:text-dark-headings-text font-bold text-center ${width > 768 ? "text-5xl" : width > 425 ? "text-4xl" : "text-3xl mx-10"} mb-6 relative top-14 md:top-24 z-1`}>
                        Why We Built HARBOR?
                    </div>


                    <div className={`text-darker-normal-text dark:text-darker-normal-text font-medium text-center ${width > 1024 ? "mx-80 text-lg" : width > 768 ? "mx-45 text-lg" : width > 425 ? "mx-30 text-base" : "mx-10 text-sm"} relative top-14 md:top-24 z-1`}>
                        The web gives us everything — but it also takes away focus.
                        Tabs multiply. Notes scatter. Inspiration drowns in distraction.

                        We wanted a simple place to pause.
                        A space to dock the things that matter before they drift away.

                        So we built HARBOR — not just to store your ideas,
                        but to help you rediscover them when you need them most.
                    </div>
                </Reveal>
            </div>

            {/* Our Philosoph */}
            <div className={`${width > 1024 ? "h-100" : width > 768 ? "h-100" : width > 425 ? "h-84" : "h-65"} bg-sidebar-background dark:bg-dark-sidebar-background overflow-hidden`}>

                <Reveal delay={0.15}>
                    <div className={`text-headings-text dark:text-dark-headings-text font-bold ${width > 768 ? "text-5xl" : width > 425 ? "text-4xl" : "text-3xl"} mb-6 text-center md:text-right relative top-14 md:top-24 md:right-20 z-1`}>
                        Our Philosoph
                    </div>


                    <p className={`text-darker-normal-text dark:text-dark-darker-normal-text font-medium  ${width > 1024 ? "text-lg pl-200" : width > 768 ? "pl-100 text-lg" : width > 425 ? "pl-60 text-base" : "mx-8 text-sm"} relative top-14 text-center md:top-24 md:text-right md:right-20 z-1 mx-4 md:mx-0`}>
                        Minimal doesn't mean empty.
                        It means essential.
                        Every pixel, motion, and interaction in HARBOR exists for a reason —
                        to create calm through design.
                        We remove the noise so your ideas can breathe.
                    </p>


                    <div className={`opacity-12 relative ${width > 1024 ? "w-400 -bottom-27" : width > 768 ? "w-350 -bottom-29" : width > 425 ? "w-300 -bottom-26" : "w-190 -bottom-15 -left-8"}`}>
                        <img src="/Waves.png" alt="" />
                    </div>
                </Reveal>
            </div>

            {/* Built for People Who Think Deeply */}
            <div className={`${width > 1024 ? "h-100" : width > 768 ? "h-100" : width > 425 ? "h-95" : "h-75"} bg-background dark:bg-dark-background border-y-1 border-normal-text/20`}>
                <Reveal delay={0.15}>
                    <div className={`text-headings-text dark:text-dark-headings-text font-bold text-center md:text-left ${width > 768 ? "text-5xl" : width > 425 ? "text-4xl" : "text-3xl"} mb-6 relative top-14 md:left-20 md:top-24 z-1`}>
                        Built for People Who <br />Think Deeply
                    </div>


                    <div className={`text-darker-normal-text dark:text-darker-normal-text font-medium text-center md:text-left ${width > 1024 ? "text-lg mr-240" : width > 768 ? "mr-120 text-lg" : width > 425 ? "mr-80 text-base" : "mx-12 text-sm"} relative top-14 md:left-20 md:top-24 z-1`}>
                        Designers. Writers. Students. Dreamers. Builders.
                        People who need a space that respects their thoughts.
                        No clutter. No chaos. Just calm.
                    </div>
                </Reveal>
            </div>

            {/* Our Promise */}
            <div className={`${width > 1024 ? "h-100" : width > 768 ? "h-100" : width > 425 ? "h-90" : "h-75"} bg-sidebar-background dark:bg-dark-sidebar-background border-y-2 border-normal-text/20 overflow-hidden`}>
                <Reveal delay={0.15}>
                    <div className={`text-headings-text dark:text-dark-headings-text font-bold text-center ${width > 768 ? "text-5xl" : width > 425 ? "text-4xl" : "text-3xl"} mb-6 relative top-14 md:top-24 z-1`}>
                        Our Promise
                    </div>


                    <div className={`text-darker-normal-text dark:text-darker-normal-text font-medium text-center ${width > 1024 ? "mx-100 text-lg" : width > 768 ? "mx-60 text-lg" : width > 425 ? "mx-30 text-base" : "mx-10 text-sm"} relative top-14 md:top-24 z-1`}>
                        To stay timeless, not trendy.
                        To build tools that feel like instruments, not interfaces.
                        To protect your ideas — so they can grow quietly.
                    </div>


                    <p className={`${width > 768 ? "text-xl" : width > 425 ? "text-lg" : "mx-16 text-base"} font-bold mt-6 sm:mt-10 text-button-blue dark:text-button-light-blue text-center relative top-14 md:top-24 mx-6 md:mx-0 z-1`}>
                        HARBOR — Where inspirations finds a home.
                    </p>

                    <div className={`opacity-12 relative ${width > 1024 ? "w-400 -bottom-16" : width > 768 ? "w-350 -bottom-11" : width > 425 ? "w-300 -bottom-20" : "w-190 -bottom-11 -left-8"}`}>
                        <img src="/Waves.png" alt="" />
                    </div>
                </Reveal>
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-5 md:py-8 bg-background dark:bg-dark-background">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} HARBOR. Calmly crafted.
                </p>
            </footer>
        </div>
    )
}