import type { ReactElement } from "react";

interface SidebarItemProps {
  text?: string;
  icon?: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ text, icon, active, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex mx-2 my-3.5 text-lg gap-3 items-center font-semibold cursor-pointer transition-all px-4 py-1
        ${
          active
            ? "text-headings-text dark:text-dark-headings-text border-l-4 border-button-blue"
            : "text-darker-normal-text dark:text-dark-darker-normal-text hover:text-headings-text/85 dark:hover:text-dark-headings-text/85"
        }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
