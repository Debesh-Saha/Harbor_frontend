import { FlipCard } from "../components/FlipCard";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useWindowWidth } from "../actions/useWindowWidth";

function getHeroImage() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "/harbor_morning.png";
    if (hour >= 12 && hour < 17) return "/harbor_afternoon.png";
    if (hour >= 17 && hour < 20) return "/harbor_evening.png";
    return "/harbor_night.png";
}

export function Landing() {
    const Navigate = useNavigate();
    const heroImage = getHeroImage();
    const time = new Date().getHours();
    const width = useWindowWidth();

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Smooth parallax movement
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);


    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-background dark:bg-dark-background">

            <Navbar />

            {/* Hero section */}
            <div id="hero"></div>
            <div
                ref={ref}
                className={`relative ${width > 768 ? "min-h-[800px]" : width > 425 ? "min-h-[690px]" : "h-[460px]"} bg-dark-background dark:bg-dark-sidebar-background overflow-hidden flex items-center`}
            >
                {/* Background Glow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.28 }}
                    transition={{ duration: 1.2, delay: 0.25 }}
                    className="absolute top-24 left-10 w-[480px] h-[480px] bg-button-blue/20 blur-[160px] pointer-events-none"
                />



                {/* LEFT TEXT SECTION */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        show: {
                            transition: { staggerChildren: 0.18 },
                        },
                    }}
                    className={`relative z-20 max-w-xl ${width > 768 ? "px-20" : width > 425 ? "pl-15 pr-30" : "pl-10 pr-30"}`}
                >
                    {/* Heading */}
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20, scale: 0.98 },
                            show: { opacity: 1, y: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`${width > 768 ? "text-6xl" : width > 425 ? "text-5xl" : "text-3xl"} font-bold ${time >= 5 && time < 17 ? "text-headings-text/90" : "text-dark-headings-text/90"} leading-tight`}
                    >
                        Anchor your <br /> inspiration.
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`mt-4 ${width > 768 ? "text-xl" : width > 425 ? "text-lg" : "text-sm"} ${time >= 5 && time < 17 ? "text-headings-text/70" : "text-dark-headings-text/70"} max-w-md`}
                    >
                        A calm space to save the things worth coming back to.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="mt-6 sm:mt-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={` ${width > 768 ? "text-xl px-6 py-3" : width > 425 ? "text-lg px-5 py-2" : "text-sm px-3 py-2"} rounded-full border transition-all duration-300 ${time >= 5 && time < 17 ? `bg-white/40 text-dark-background font-medium border-white/60 backdrop-blur-md shadow-md hover:bg-white/50` : `bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20`}`}
                            onClick={() => Navigate("/signup")}
                        >
                            Start Docking →
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* IMAGE FLOATING */}
                <motion.div
                    style={{ y: parallaxY }}
                    className={`absolute top-0 ${width > 768 ? "-left-10 w-[2400px]" : width > 425 ? "-left-24 w-[2000px]" : " -left-40 w-[1300px]"}
                    block`}
                >
                    <motion.img
                        src={heroImage}
                        alt=""
                        className="w-full h-full object-cover brightness-95 select-none pointer-events-none opacity-90"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </div>

            {/* Problem and Solution Section */}
            <div id="problem"></div>
            <div className={`${width > 1024 ? "mt-35 mx-90" : width > 768 ? "mt-35 mx-30" : width > 425 ? "mt-30 mx-20" : "mt-15 mx-10"}`}>
                <Reveal delay={0.1}>
                    <div className={`${width > 768 ? "text-2xl" : width > 425 ? "text-xl" : "text-base"} text-center font-semibold text-headings-text dark:text-dark-headings-text`}>
                        "Great links appear when you least expect them
                        but later, they are impossible to find"
                    </div>
                </Reveal>

                <Reveal delay={0.25}>
                    <div className={`${width > 768 ? "text-lg" : width > 425 ? "text-base" : "text-sm"} text-center font-semibold text-darker-normal-text dark:text-dark-darker-normal-text mt-6 pb-15 sm:pb-28`}>
                        <span className="font-bold text-button-blue">HARBOR</span> keeps them safe—sorted,
                        synced and ready when you return
                    </div>
                </Reveal>
            </div>
            <div className="h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-transparent dark:via-dark-normal-text/20 via-normal-text/50 to-transparent"></div>



            {/* Feature Section */}
            <div id="features"></div>
            <div>
                <Reveal>
                    <div className="flex justify-center mt-10 sm:mt-14">
                        <div className="border-2 sm:border-3 text-sm sm:text-base border-button-blue py-2 sm:py-2 px-5 sm:px-6 rounded-xl font-semibold text-headings-text/80 dark:text-dark-headings-text">
                            Features
                        </div>
                    </div>
                </Reveal>

                <div className="mt-10 pb-12 sm:pb-20">
                    {/* CARD-1 */}
                    <Reveal delay={0.15}>
                        <div className={`bg-button-blue ${width > 768 ? "mx-30" : width > 425 ? "mx-15" : "mx-3"} rounded-2xl h-85 sm:h-100 mb-2 overflow-hidden relative`}>

                            <div className={`relative text-left ${width > 768 ? "text-2xl" : width > 425 ? "text-xl" : "text-base"} text-neutral-100 font-semibold top-8 left-8 border-l-3 border-button-light-blue pl-3`}>
                                One-tap Dock Sharing
                            </div>

                            <div className={`relative text-left ${width > 1024 ? "mr-160" : width > 768 ? "mr-15 text-base" : width > 425 ? "mr-15 text-sm" : "mr-15 text-xs"} text-neutral-200 font-semibold top-14 left-8`}>
                                Share your curated collections instantly.
                                Whether it's a playlist of ideas, your saved reads, or your creative inspirations —
                                send an entire dock with a single tap and let others explore your world effortlessly.
                            </div>

                            <div className={`absolute -bottom-1 ${width > 1024 ? "right-3 w-140" : width > 768 ? "right-3 w-120" : width > 425 ? "left-1/2 tranform -translate-x-1/2 w-120" : "left-1/2 tranform -translate-x-1/2 w-85"} overflow-hidden rounded-t-xl border-t-5 sm:border-t-7 border-x-5 sm:border-x-7 border-dark-sidebar-background`}>
                                <img src="/light_shared_harbor.png" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </Reveal>


                    <div className={`${width > 1024 ? "flex" : ""} gap-2 ${width > 768 ? "mx-30" : width > 425 ? "mx-15" : "mx-3"}`}>
                        <Reveal delay={0.25}>
                            {/* CARD-2 */}
                            <div className={`bg-button-blue rounded-2xl ${width > 768 ? "h-120" : width > 425 ? "h-100" : "h-85"} w-full text-center overflow-hidden relative mb-2`}>

                                <div className={`relative text-left ${width > 768 ? "text-2xl" : width > 425 ? "text-xl" : "text-base"} text-neutral-100 font-semibold top-8 left-8 border-l-3 border-button-light-blue pl-3`}>
                                    Minimal and Adaptive Interface
                                </div>

                                <div className={`relative text-left ${width > 1024 ? "mr-15" : width > 768 ? "mr-40 text-base" : width > 425 ? "mr-25 text-sm" : "mr-15 text-xs"} text-neutral-200 font-semibold top-14 left-8`}>
                                    Clean, calm, and built to stay out of your way.
                                    HARBOR adapts to you — your flow, your habits, your style — so saving
                                    and organizing things always feels light and effortless.
                                </div>

                                <div className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 ${width > 768 ? "w-145" : width > 425 ? "w-120" : "w-85"} overflow-hidden rounded-t-xl border-t-5 sm:border-t-7 border-x-5 sm:border-x-7 border-dark-sidebar-background`}>
                                    <img src="/light_dashboard.png" alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.25}>
                            {/* CARD-3 */}
                            <div className={`bg-button-blue rounded-2xl  ${width > 768 ? "h-120" : width > 425 ? "h-100" : "h-85"} text-white w-full text-center overflow-hidden relative`}>

                                <div className={`relative text-left ${width > 768 ? "text-2xl" : width > 425 ? "text-xl" : "text-base"} text-neutral-100 font-semibold top-8 left-8 border-l-3 border-button-light-blue pl-3`}>
                                    Seamless Multi-device sync
                                </div>

                                <div className={`relative text-left  ${width > 1024 ? "mr-15" : width > 768 ? "mr-40  text-base" : width > 425 ? "mr-25 text-sm" : "mr-15 text-xs"} text-neutral-200 font-semibold top-14 left-8`}>
                                    Pick up where you left off, anywhere.
                                    Your docks stay updated across all your devices, so the things you save are
                                    always ready when you need them — no juggling, no missing links.
                                </div>

                                <div className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 ${width > 768 ? "w-145" : width > 425 ? "w-120" : "w-85"} overflow-hidden rounded-t-xl border-t-5 sm:border-t-7 border-x-5 sm:border-x-7 border-dark-sidebar-background bg-dark-background`}>
                                    <img src="/light_sidebar_off_dashboard.png" alt="" className="w-full h-full object-cover opacity-90" />
                                </div>

                                <div className={`absolute ${width > 1024 ? "w-40 right-12" : width > 768 ? "w-40 right-34" : width > 425 ? "w-35 right-34" : "w-28 right-10"} -bottom-16 overflow-hidden rounded-t-xl border-t-5 sm:border-t-7 border-x-5 sm:border-x-7 border-dark-sidebar-background shadow-xl`}>
                                    <img src="/light_mobile_dashboard.jpg" alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
            <div className="h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-transparent dark:via-dark-normal-text/20 via-normal-text/50 to-transparent"></div>

            {/* how harbor works */}
            <div id="how"></div>
            <div>
                <div className={`mt-10 sm:mt-18 bg-dark-sidebar-background ${width > 1024 ? "p-14 mx-10" : width > 768 ? "p-10 mx-25" : width > 425 ? "p-8 mx-10" : "p-6 mx-3"} rounded-3xl mb-12 sm:mb-20`}>
                    {/* TITLE */}
                    <Reveal>
                        <div className="flex justify-center">
                            <div className={`flex gap-1 items-center border-2 sm:border-3 border-button-blue py-2 sm:py-2 px-5 sm:px-6 rounded-xl font-semibold text-dark-headings-text/80 ${width > 1024 ? "mt-10" : width > 768 ? "mt-8" : width > 425 ? "mt-6" : "mt-4"} bg-dark-background/70 text-sm sm:text-base`}>
                                How <span className="font-bold">HARBOR</span> works?
                            </div>
                        </div>
                    </Reveal>

                    {/* CARD ROW */}
                    <div className={`${width > 1024 ? "flex justify-center" : "flex flex-col items-center mx-auto"} ${width > 1024 ? "gap-10 mb-6" : width > 768 ? "gap-6 mb-4" : width > 425 ? "gap-4 mb-3" : "gap-2 mb-2"}  mt-12`}>

                        {/* CARD 1 */}
                        <Reveal delay={0.5}>
                            <div className={`group bg-dark-background/70 border border-button-blue/60 rounded-2xl ${width > 1024 ? "165" : width > 768 ? "w-185" : width > 425 ? "w-155" : "w-80"} ${width > 425 ? "h-100" : "h-80"} relative overflow-hidden transition-all duration-300 hover:border-button-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:-translate-y-1`}>

                                <div className="relative text-sm sm:text-base font-semibold text-button-blue-text text-center top-0 bg-button-blue/90 mx-10 sm:mx-16 py-1 rounded-b-xl z-10">
                                    Drop it in
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-button-blue/10 to-transparent opacity-60 group-hover:opacity-80 blur-3xl transition-all duration-300"></div>

                                <div className={`absolute left-1/2 transform -translate-x-1/2 ${width > 425 ? "w-100" : "w-80"} overflow-hidden brightness-92`}>
                                    <img src="/drop_it_in.png" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </Reveal>

                        {/* CARD 2 */}
                        <Reveal delay={0.5}>
                            <div className={`group bg-dark-background/70 border border-button-blue/60 rounded-2xl ${width > 1024 ? "w-full" : width > 768 ? "w-185" : width > 425 ? "w-155" : "w-80"} ${width > 425 ? "h-100" : "h-80"} relative overflow-hidden transition-all duration-300 hover:border-button-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:-translate-y-1`}>

                                <div className="relative text-sm sm:text-base font-semibold text-button-blue-text text-center top-0 bg-button-blue/90 mx-10 sm:mx-16 py-1 rounded-b-xl z-10">
                                    It quietly finds its place
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-button-blue/10 to-white/5 opacity-50 group-hover:opacity-70 blur-2xl transition-all duration-300"></div>

                                <div className={`absolute ${width>1024? "-left-30 -top-8 w-210" : width>768? "-left-7 -top-18 w-260" : width>425? "-left-13 -top-12 w-240" : "-left-20 -top-5 w-160"} overflow-hidden`}>
                                    <img src="/it_quietly_finds_its_place.png" className="w-full h-full object-cover" /> 
                                </div>
                            </div>
                        </Reveal>

                        {/* CARD 3 */}
                        <Reveal delay={0.5}>
                            <div
                                className={`group bg-dark-background/70 border border-button-blue/60 rounded-2xl ${width > 1024 ? "w-full" : width > 768 ? "w-185" : width > 425 ? "w-155" : "w-80"} ${width > 425 ? "h-100" : "h-80"} relative overflow-hidden transition-all duration-300 hover:border-button-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:-translate-y-1`}>

                                <div className="relative text-sm sm:text-base font-semibold text-button-blue-text text-center top-0 bg-button-blue/90 mx-10 sm:mx-16 py-1 rounded-b-xl z-10">
                                    Come back whenever
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-button-blue/10 to-transparent opacity-60 group-hover:opacity-80 blur-3xl transition-all duration-300"></div>

                                <div className="absolute inset-0 bg-gradient-to-b from-button-blue/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 blur-2xl transition-all duration-300"></div>

                                <div className={`absolute left-1/2 transform -translate-x-1/2 ${width>1024? "w-92": width>768? "w-130" : width > 425 ? "w-130" : "w-78"} bottom-0 overflow-hidden rounded-t-xl border-t-5 border-x-5 sm:border-t-7 sm:border-x-7 border-dark-sidebar-background bg-dark-background`}>
                                    <img src="/come_back_whenever.png" className="w-full h-full object-cover opacity-90" />
                                </div>

                                <div className={`absolute ${width > 1024 ? "w-40 right-8 -bottom-25" : width > 768 ? "w-45 right-35 -bottom-20" : width>425? "w-45 right-20 -bottom-16" : "w-28 right-4 -bottom-11"} overflow-hidden rounded-t-xl border-t-5 sm:border-t-7  border-x-5 sm:border-x-7 border-dark-sidebar-background shadow-xl`}>
                                    <img src="/come_back_whenever_mobile.jpeg" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
            <div className="h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-transparent dark:via-dark-normal-text/20 via-normal-text/50 to-transparent"></div>

            {/* Why harbor exists */}
            <div id="why"></div>
            <div className={`${width>1024? "mt-20 mx-110" : width > 768 ? "mt-20 mx-50" : width > 425 ? "mt-15 mx-25" : "mt-15 mx-10"}`}>
                <Reveal>
                    <div className={`${width > 768 ? "text-3xl" : width > 425 ? "text-2xl" : "text-xl"} text-center font-semibold text-headings-text dark:text-dark-headings-text`}>
                        "Why <span className='font-bold text-button-blue'>HARBOR</span> exists"
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className={`${width > 768 ? "text-lg" : width > 425 ? "text-base" : "text-sm"} text-center font-semibold text-darker-normal-text dark:text-dark-darker-normal-text mt-6 pb-15 sm:pb-28`}>
                        We all find links we want to return someday.
                        But someday rarely survives a busy browser.<br /><br />
                        HARBOR exists to hold onto those moments- quitely, reliably- until
                        you're ready to come back.
                    </div>
                </Reveal>
            </div>
            <div className="h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-transparent dark:via-dark-normal-text/20 via-normal-text/50 to-transparent"></div>

            {/* Testimonials */}
            <div id="testimonials"></div>
            <div>
                <Reveal>
                    <div className="flex justify-center mt-14">
                        <div className="flex gap-1 text-sm sm:text-base items-center border-2 sm:border-3 border-button-blue py-2 sm:py-2 px-5 sm:px-6 rounded-xl font-semibold text-headings-text/80 dark:text-dark-headings-text">
                            How<span className="font-bold">HARBOR</span>changes your everyday flow
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <div className={`${width>768? "pb-18" : width > 425 ? "mx-0 text-base pb-15" : "mx-15 text-sm pb-10"} text-center font-semibold text-darker-normal-text dark:text-dark-darker-normal-text mt-6`}>
                        Tap any story and see what life feels like with HARBOR.
                    </div>
                </Reveal>

                <Reveal delay={0.30}>
                    <div className={`flex flex-wrap gap-6 justify-center ${width>1024? "mx-0" : width>768? "mx-20" : "mx-0"} mb-15`}>
                        <FlipCard
                            before={"My tabs are a mess. I keep losing the stuff I actually need."}
                            after={"Everything I need just… stays where it should be."}
                            reviewer={"Anonymous"} />
                        <FlipCard
                            before={"I save everything but somehow… nothing stays with me."}
                            after={"I finally have one calm place for all my ideas."}
                            reviewer={"Anonymous"} />
                        <FlipCard
                            before={"I can't find the link I saved yesterday, forget last week."}
                            after={"Finding things feels effortless now."}
                            reviewer={"Anonymous"} />
                        <FlipCard
                            before={"My brain feels scattered. My notes are everywhere."}
                            after={"My digital life doesn't overwhelm me anymore."}
                            reviewer={"Anonymous"} />
                    </div>
                </Reveal>
            </div>
            

            {/* Call-to-action Footer */}
            <div className={`min-w-screen bg-dark-sidebar-background ${width>768? "h-70 py-20" : width>425? "h-60 py-20" : "h-40 py-10"}  overflow-hidden`}>

                <Reveal>
                    <div className={` ${width>768? "px-30" : width>425? "px-20" : "px-10"} z-1 relative`}>
                        <div className={`text-dark-headings-text font-bold ${width>768? "text-3xl" : width>425? "text-2xl" : "text-lg"}`}>
                            Give your ideas a place to stay.
                        </div>

                        <div className={`text-dark-darker-normal-text font-semibold ${width>768? "text-2xl" : width>425? "text-xl" : "text-sm"}`}>
                            A calmer way to save the things that matter.
                        </div>

                        <div className={`${width>425? "mt-7" : "mt-4"}`}>
                            <Button text={`Start your HARBOR`} variant="primary" size={`${width>768? "md" : width>425? "sm" : "xs"}`} onClick={() => Navigate("/signup")} />
                        </div>
                    </div>
                </Reveal>

                <div className={`opacity-10 relative ${ width>1024? "w-400 bottom-5" : width>768? "w-350 bottom-5" : width>425? "w-250 -bottom-4" : "w-190 bottom-2"} left-0`}>
                    <img src="/Waves.png" alt="" />
                </div>
            </div>

        </div>
    );
}
