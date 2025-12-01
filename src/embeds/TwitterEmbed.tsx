import { useEffect, useRef } from "react";

export const TwitterEmbed = ({ link }: { link: string }) => {
  const loadedRef = useRef(false);

  useEffect(() => {
    const loadWidgets = () => {
      const twttr = (window as any).twttr;
      if (twttr && twttr.widgets) {
        twttr.widgets.load();
        return true;
      }
      return false;
    };

    const ensureLoaded = () => {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (loadWidgets() || attempts > 20) {
          clearInterval(interval);
        }
      }, 200);
    };

    
    if (!loadedRef.current) {
      if (!document.querySelector(`script[src="https://platform.twitter.com/widgets.js"]`)) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = ensureLoaded;
        document.body.appendChild(script);
      } else {
        ensureLoaded();
      }
      loadedRef.current = true;
    } else {
      // Reinitialize widgets on every render (fix for mobile)
      ensureLoaded();
    }
  }, [link]);

  return (
    <div className="rounded-md overflow-hidden">
      <blockquote className="twitter-tweet">
        <a href={link.replace("x.com", "twitter.com")}></a>
      </blockquote>
    </div>
  );
};
