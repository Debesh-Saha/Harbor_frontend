import { TwitterIcon } from "../icons/Twittericon";
import { YoutubeIcon } from "../icons/Youtubeicon";
import { SidebarItem } from "./SidebarItem";
import { PdfIcon } from "../icons/Pdficon";
import { SpotifyIcon } from "../icons/Spotifyicon";
import { InstagramIcon } from "../icons/Instagramicon";
import { RedditIcon } from "../icons/Redditicon";
import { DockIcon } from "../icons/Dockicon";
import { LinkIcon } from "../icons/Linkicon";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LightModeIcon } from "../icons/Lightmode";
import { DarkModeIcon } from "../icons/Darkmodeicon";
import { useTheme } from "../hooks/useTheme";
import { MenuIcon } from "../icons/Menuicon";

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function SideBar({ selectedCategory, onCategorySelect, isOpen, setIsOpen }: SidebarProps) {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { darkMode, toggleTheme } = useTheme();

  /* Fetch username */
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/me`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.data.username) {
          setUsername(response.data.username);
        }
      } catch (err) {
        console.log("Username fetch failed", err);
      }
    };

    fetchUsername();
  }, []);


  const menuItems = [
    { text: "Dock", icon: <DockIcon size="md" /> },
    { text: "Twitter", icon: <TwitterIcon size="md" /> },
    { text: "YouTube", icon: <YoutubeIcon size="md" /> },
    { text: "Files", icon: <PdfIcon size="md" /> },
    { text: "Spotify", icon: <SpotifyIcon size="md" /> },
    { text: "Instagram", icon: <InstagramIcon size="md" /> },
    { text: "Reddit", icon: <RedditIcon size="md" /> },
    { text: "Other Links", icon: <LinkIcon size="md" /> },
  ];

  return (
    <div className="select-none">
      {/* Blur overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 left-0 top-0 h-screen bg-sidebar-background dark:bg-dark-sidebar-background shadow-md 
        border border-gray-200 dark:border-gray-900 flex flex-col
        transition-all duration-300 w-74 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}

      >

        <div>
          <div className="flex justify-between items-center mx-4 mt-4 mb-5 cursor-pointer dark:text-dark-darker-normal-text text-darker-normal-text">

            {/* <div className="text-button-blue text-2xl font-bold">HARBOR</div> */}
            <div className="w-27">
              <img src={`${darkMode ? "/dark_harbor_logo_full.png" : "/harbor_logo_full.png"}`} alt="" />
            </div>

            <div onClick={() => setIsOpen(false)}>
              <MenuIcon size="lg" />
            </div>

          </div>

          <div className="flex justify-between items-center mx-4 mt-3 mb-4">
            <div className="flex gap-2 items-center">
              <div className="w-9 h-9 rounded-full bg-button-light-blue flex items-center justify-center text-lg font-semibold text-button-blue">
                {username ? username[0].toUpperCase() : "A"}
              </div>
              <div className="text-base font-semibold text-darker-normal-text dark:text-dark-darker-normal-text">
                {username || "Anonymous"}
              </div>
            </div>

            <div
              className="dark:text-dark-darker-normal-text text-darker-normal-text cursor-pointer"
              onClick={toggleTheme}
            >
              {darkMode ? <DarkModeIcon size="md" /> : <LightModeIcon size="md" />}
            </div>
          </div>

          <div className="border-t-3 m-2 border-gray-600/30 pt-2 pb-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.text}
                text={item.text}
                icon={item.icon}
                active={selectedCategory === item.text}
                onClick={() => onCategorySelect(item.text)}
              />
            ))}
          </div>

          <div className="border-t-3 m-2 border-gray-600/30 pt-2 pb-2">
            <div onClick={() => window.dispatchEvent(new Event("open-feedback"))}>
              <SidebarItem text="Feedback / Suggest Feature" />
            </div>
            <div onClick={() => Navigate("/about")}>
              <SidebarItem text="About Harbor" />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mr-4 mt-4 md:mt-5">
          <Button
            variant="secondary"
            size="sm"
            text="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              Navigate("/signin", { replace: true });
            }}
          />
        </div>
      </div>
    </div>
  );
}
