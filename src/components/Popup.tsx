import { useEffect } from "react";
import { CrossIcon } from "../icons/Crossicon";
import { SuccessIcon } from "../icons/Successicon";

export interface PopupProps {
  message: string;
  visible: boolean;
  type?: "success" | "error";
  duration?: number;
}

export function Popup({ message, visible, type = "success", duration = 1800 }: PopupProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
    }, duration);
    return () => clearTimeout(t);
  }, [visible, duration]);

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      <div
        className="absolute left-1/2 bottom-[calc(env(safe-area-inset-bottom,0)+24px)] -translate-x-1/2 flex justify-center w-full px-4"
      >
        <div
          role="status"
          className={`
              pointer-events-auto
              w-full max-w-[420px]
              rounded-xl px-5 py-3 shadow-2xl
              border
              text-sm sm:text-base font-medium
              flex items-center gap-3
              transition-all duration-350
              ${type === "success" ? "bg-button-light-blue border-button-blue text-button-light-blue-text" : "bg-button-light-blue border-button-blue text-button-light-blue-text"}
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          style={{
            transformOrigin: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          <span className="flex-shrink-0">
            {type === "success" ? (
              <SuccessIcon size={"sm"}/>
            ) : (
              <CrossIcon size={"sm"}/>
            )}
          </span>

          <div className="min-w-0">
            <p className="whitespace-pre-wrap break-words">{message}</p>
          </div>
        </div>
      </div>

      <style>{`
          .duration-350 { transition-duration: 350ms; }
          .translate-y-6 { transform: translateY(24px); }
          .translate-y-0 { transform: translateY(0); }
          .opacity-0 { opacity: 0; }
          .opacity-100 { opacity: 1; }
        `}</style>
    </div>
  );
}
