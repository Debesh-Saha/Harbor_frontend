import { useEffect, useRef } from "react";

export const RedditEmbed = ({ link }: { link: string }) => {
    const initializedRef = useRef(false);

    useEffect(() => {
        
        if (!initializedRef.current) {
            const script = document.createElement("script");
            script.src = "https://embed.redditmedia.com/widgets/platform.js";
            script.async = true;
            script.onload = () => {
                // Initialize once script is loaded
                if ((window as any).__redditEmbed) {
                    (window as any).__redditEmbed.init();
                }
            };
            document.body.appendChild(script);
            initializedRef.current = true;
        } else {
            
            const interval = setInterval(() => {
                if ((window as any).__redditEmbed) {
                    (window as any).__redditEmbed.init();
                    clearInterval(interval);
                }
            }, 200);
        }
    }, []);

    return (
        <div className="overflow-hidden rounded-xl p-1">
            <blockquote className="reddit-card" style={{ width: "100%" }}>
                <a href={link}></a>
            </blockquote>
        </div>
    );
};
