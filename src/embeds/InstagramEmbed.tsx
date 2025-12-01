import {useEffect} from "react"

export const InstagramEmbed = ({ link }: { link: string }) => {
    useEffect(() => {
        const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                if ((window as any).instgrm) {
                    (window as any).instgrm.Embeds.process();
                }
            };
        } else if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
        }
    }, [link]);

    return (
        <div className="relative w-full rounded-xl overflow-hidden max-h-92 bg-white dark:bg-dark-background/70">
            <div className="flex justify-center items-center">
                <div className="origin-top scale-[1.1] md:scale-[0.82]">
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={link}
                        data-instgrm-version="14"
                        style={{
                            width: "100%",
                            margin: 0,
                            padding: 0,
                            border: 0,
                            background: "white",
                            display: "block",
                        }}
                    ></blockquote>
                </div>
            </div>
        </div>
    )
}
