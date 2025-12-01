interface InputProps{
    placeholder: string;
    ref?: any;
    type?: string;
}

export function Input({ placeholder, ref }: InputProps) {
    return <div>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 mt-3 border-button-blue border-3 rounded-md w-full text-darker-normal-text dark:text-dark-darker-normal-text focus:outline-none" ref={ref} />
    </div>
}