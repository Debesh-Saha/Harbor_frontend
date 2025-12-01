import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.10 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="w-full h-full"
      initial="hidden"
      animate={controls}
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
