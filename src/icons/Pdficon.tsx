import { iconSizeVariant, iconWidthVariant, type IconProps } from "."

export const PdfIcon= (props: IconProps)=>{
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width={iconWidthVariant[props.size]} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" className={iconSizeVariant[props.size]}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
}