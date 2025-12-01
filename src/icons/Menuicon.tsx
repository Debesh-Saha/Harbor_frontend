import { iconSizeVariant, iconWidthVariant, type IconProps } from "."

export const MenuIcon= (props: IconProps)=>{
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22" fill="none" stroke="currentColor" stroke-width={iconWidthVariant[props.size]} stroke-linecap="round" stroke-linejoin="round" className={iconSizeVariant[props.size]}><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
}

