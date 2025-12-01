import type { ReactElement } from "react";

type Variants = "primary" | "secondary"

interface ButtonProps {
    variant: Variants;
    size: "xs" | "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-button-blue text-button-blue-text",
    "secondary": "bg-button-light-blue text-button-light-blue-text"
}

const defaultStyle = "flex justify-center item-center font-medium cursor-pointer whitespace-nowrap";

const sizeStyle = {
    xs: "py-2 px-3 text-xs rounded-sm",
    sm: "py-2 px-3 text-sm rounded-sm",
    md: "py-3 px-5 text-base rounded-md",
    lg: "py-3 px-6 md:text-lg rounded-lg font-medium",
};

const responsivePadding = {
    xs: "max-sm:px-2",
    sm: "max-sm:px-2",
    md: "max-sm:px-3",
    lg: "max-sm:px-4",
};

export const Button = (props: ButtonProps) => {
    const mobilePadding = responsivePadding[props.size];

    return <button onClick={props.onClick} disabled={props.loading} className={`${variantStyles[props.variant]} ${defaultStyle} ${sizeStyle[props.size]} ${props.fullwidth ? " w-full" : ""} ${props.loading ? "opacity-60 cursor-progress" : ""} ${mobilePadding}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
}

