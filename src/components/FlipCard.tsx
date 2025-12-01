import React, { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
    before: string;
    after: string;
    reviewer: string;
    avatar?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
    before,
    after,
    reviewer,
    avatar
}) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="w-71 h-64 perspective-1000">
            <motion.div
                onClick={() => setFlipped(!flipped)}
                className="relative w-full h-full cursor-pointer"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >

                {/* FRONT SIDE */}
                <div className="absolute inset-0 rounded-xl p-5 border-2 sm:border-3 border-button-blue bg-sidebar-background dark:bg-dark-sidebar-background shadow-md flex flex-col justify-between backface-hidden">
                    <div className="text-base font-semibold text-headings-text dark:text-dark-headings-text">
                        Before <span className="font-bold">HARBOR</span>
                    </div>

                    <div className="text-center text-base text-darker-normal-text dark:text-dark-darker-normal-text px-2 leading-snug">
                        {before}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-button-light-blue text-button-light-blue-text flex items-center justify-center">
                            {avatar ? (
                                <img src={avatar} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-semibold">
                                    {reviewer.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div className="text-sm text-darker-normal-text dark:text-dark-darker-normal-text font-medium">
                            {reviewer}
                        </div>
                    </div>
                </div>


                {/* BACK SIDE */}
                <div className="absolute inset-0 rounded-xl p-5 border-2 sm:border-3 border-button-blue bg-button-light-blue/20 dark:bg-button-light-blue shadow-md flex flex-col justify-between backface-hidden rotate-y-180">
                    <div className="text-base font-semibold text-button-blue">
                        After <span className="font-bold">HARBOR</span>
                    </div>

                    <div className="text-center text-base text-button-light-blue-text px-2 leading-snug">
                        {after}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-button-light-blue dark:bg-button-blue/90 text-button-light-blue-text dark:text-button-blue-text flex items-center justify-center">
                            {avatar ? (
                                <img src={avatar} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-semibold">
                                    {reviewer.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div className="text-sm text-darker-normal-text dark:text-button-light-blue-text/60 font-medium">
                            {reviewer}
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};
