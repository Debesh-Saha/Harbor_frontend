import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";
import { LightModeIcon } from "../icons/Lightmode";
import { DarkModeIcon } from "../icons/Darkmodeicon";
import { useTheme } from "../hooks/useTheme";

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
}

export function SharedBrain() {
    const { hash } = useParams();
    const [username, setUsername] = useState<string>("");
    const [contents, setContents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { darkMode, toggleTheme } = useTheme();

    const width = useWindowWidth();

    let columns = 1;
    if (width >= 1200) columns = 5;
    else if (width >= 992) columns = 3;
    else if (width >= 768) columns = 2;

    useEffect(() => {
        async function fetchSharedBrain() {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
                setUsername(res.data.username);
                setContents(res.data.content);
            } catch (err) {
                console.error("Error loading shared brain:", err);
            } finally {
                setLoading(false);
            }
        }

        if (hash) fetchSharedBrain();
    }, [hash]);

    if (loading) return <div className="text-center mt-10">Loading shared brain...</div>;

    return (
        <div className="h-screen w-screen bg-background dark:bg-dark-background px-1 py-2 md:py-3 overflow-x-hidden overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
                <div className="relative flex justify-between items-end mb-3 mt-2 border-b-2 pb-3 border-normal-text/50 mx-3">
                    <div
                        className="dark:text-dark-darker-normal-text text-darker-normal-text cursor-pointer z-10"
                        onClick={toggleTheme}
                    >
                        {darkMode ? width > 425 ? <DarkModeIcon size={"md"} /> : <DarkModeIcon size={"sm"} /> : width > 425 ? <LightModeIcon size={"md"} /> : <LightModeIcon size={"sm"} />}
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 w-7 md:w-35">
                        <img src={`${darkMode ? width>426? "/dark_harbor_logo_full.png" : "/dark_harbor_logo.png" : width>426? "/harbor_logo_full.png": "/harbor_logo.png"}`} alt="" />
                    </div>

                    <span className="text-xs md:text-base text-normal-text dark:text-dark-normal-text z-10">
                        Shared by{" "}
                        <span className="font-medium text-darker-normal-text dark:text-dark-darker-normal-text">
                            {username || "Anonymous"}
                        </span>
                    </span>

                </div>


                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-headings-text dark:text-dark-headings-text mb-1">
                        {username ? `${username}'s Harbor` : "Shared Harbor"}
                    </h2>
                    <p className="text-headings-text dark:text-dark-headings-text text-xs md:text-sm text-center ">
                        Explore the Harbor — a curated dock of shared ideas & links
                    </p>
                </div>

                {contents.length === 0 ? (
                    <div className="text-center text-normal-text dark:text-dark-normal-text">No shared content found.</div>
                ) : (
                    <div className={``}>
                        <Masonry
                            breakpointCols={columns}
                            className="flex flex-wrap"
                            columnClassName="bg-transparent space-y-1 md:space-x-1"
                        >
                            {
                                contents.map(({ _id, type, link, title }) => (
                                    <Card key={_id} _id={_id} type={type} link={link} title={title} view={true} />
                                ))
                            }
                        </Masonry>
                    </div>
                )}
            </div>

            <div className="mt-10 pb-10 text-center">
                <div className="text-normal-text dark:text-dark-normal-text text-xs md:text-sm px-4">
                    <span className="font-semibold text-darker-normal-text dark:text-dark-darker-normal-text">
                        HARBOR
                    </span>
                    — drop your ideas and links here, sail back anytime you like
                </div>
            </div>
        </div>
    );
}
