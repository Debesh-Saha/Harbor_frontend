import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useTheme } from "../hooks/useTheme";
import { DarkModeIcon } from "../icons/Darkmodeicon";
import { LightModeIcon } from "../icons/Lightmode";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../actions/useWindowWidth";

const sections = [
  { id: "hero", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "features", label: "Features" },
  { id: "how", label: "Flow" },
  { id: "why", label: "Origin" },
  { id: "testimonials", label: "Stories" },
];

export function Navbar() {
  const time = new Date().getHours();

  const [active, setActive] = useState("hero");

  const { darkMode, toggleTheme } = useTheme();

  const Navigate = useNavigate();

  const width = useWindowWidth();

  useEffect(() => {
    const handleScroll = () => {
      let closest = "hero";
      let closestDistance = Infinity;

      sections.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - 150);

        if (distance < closestDistance) {
          closest = sec.id;
          closestDistance = distance;
        }
      });

      setActive(closest);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${active === "hero"
          ? "bg-transparent border-none shadow-none"
          : "bg-white/85 dark:bg-neutral-800/85 border-b border-black/10 dark:border-white/10 shadow-sm"
        }
      `}
    >
      <div className="flex items-center mx-3 sm:mx-4">

        <div className={`${width > 768 ? "w-[120px]" : width > 425 ? "w-[100px]" : "w-[60px]"}`}>
          <img src={time >= 12 && time < 20 ? active === "hero" ? "/dark_harbor_logo_full.png" : "/harbor_logo_full.png" : "/harbor_logo_full.png"} alt="" />
        </div>

        <div className={`max-w-7xl mx-auto flex justify-center ${width > 768 ? "gap-8 px-6" : width > 425 ? "gap-5 px-5" : "gap-2 px-4"} py-4 font-medium ${active === "hero" ? time >= 5 && time < 12 ? "text-headings-text" : "text-dark-headings-text" : "text-headings-text dark:text-dark-headings-text"}`}>

          {sections.map((sec) => (
            <div
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`relative cursor-pointer select-none ${active === "hero" ? "hover:text-button-blue/80" : "hover:text-button-blue/80"} transition-all ${width > 768 ? "text-[16px]" : width > 425 ? "text-[15px]" : "text-[11px]"}`}
            >
              {sec.label}

              {active === sec.id && (
                <motion.div
                  layoutId="underline"
                  className={`absolute left-0 right-0 h-[2px] ${active === "hero" ? time >= 12 && time < 20 ? "bg-button-light-blue" : "bg-button-blue" : "bg-button-blue"} rounded-full`}
                  style={{ bottom: "-3px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className={`${active === "hero" ? time >= 5 && time < 12 ? "text-headings-text" : "text-dark-headings-text" : "text-headings-text dark:text-dark-headings-text"}`} onClick={toggleTheme}>
            {darkMode ? <DarkModeIcon size={width > 425 ? "md" : "sm"} /> : <LightModeIcon size={width > 425 ? "md" : "sm"} />}
          </div>

          {width > 425 ?
            <div>
              {time >= 12 && time < 20 ? active === "hero" ?
                <Button size={"sm"} text={"Join Harbor"} variant={"secondary"} onClick={() => Navigate("/signup")} /> :
                <Button size={"sm"} text={"Join Harbor"} variant={"primary"} onClick={() => Navigate("/signup")} /> : <Button size={"sm"} text={"Join Harbor"} variant={"primary"} onClick={() => Navigate("/signup")} />}
            </div> :
            ""}
        </div>

      </div>
    </div>
  );
}
