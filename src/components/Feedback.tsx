import { useState, useEffect } from "react";
import { CrossIcon } from "../icons/Crossicon";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-feedback", openHandler);

    return () => window.removeEventListener("open-feedback", openHandler);
  }, []);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-dark-background/50 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 
          w-full md:w-[420px] h-[75%] md:h-[520px]
          bg-background dark:bg-dark-background
          rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
          z-50 overflow-hidden transform transition-all
          ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
      >
        <div className="flex justify-between items-center px-5 py-3 border-b-2 border-normal-text dark:border-normal-text/30">
          <h2 className="text-lg font-semibold text-headings-text dark:text-dark-headings-text">
            Send Feedback
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-normal-text dark:text-dark-normal-text hover:text-darker-normal-text dark:hover:text-dark-darker-normal-text text-xl"
          >
            <CrossIcon size={"sm"} />
          </button>
        </div>
        
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfWFxK65AmaO1RkO5PsbYSQ32nN_z6OnObTeZHbJKzzdqpELA/viewform?embedded=true"
          className="w-full h-full border-none overflow-y-scroll"
        />
      </div>
    </>
  );
}
