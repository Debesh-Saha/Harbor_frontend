import { iconSizeVariant, iconWidthVariant, type IconProps } from "."

export const CrossIcon= (props: IconProps)=>{
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={iconWidthVariant[props.size]} stroke-linecap="round" stroke-linejoin="round"  className={iconSizeVariant[props.size]}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
}