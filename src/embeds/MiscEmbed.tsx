import { useState } from "react";

export const MiscEmbed = ({ title, link }: { title: string; link: string }) => {
  const [previewFailed, setPreviewFailed] = useState(false);
  const domain = new URL(link).hostname;
  const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${link}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-xl border border-gray-200 dark:border-gray-800 
                 bg-white dark:bg-dark-background/70 shadow-sm overflow-hidden 
                 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 
                 transition-all duration-200 cursor-pointer"
    >

      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <img
            src={favicon}
            alt="favicon"
            className="w-5 h-5 rounded-sm"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-dark-headings-text truncate max-w-[200px]">
              {title || domain}
            </p>
            <p className="text-xs text-gray-500 truncate">{domain}</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-56 bg-gray-50 dark:bg-dark-background/60 overflow-hidden">
        {!previewFailed ? (
          <iframe
            src={link}
            className="h-60 w-full border-0 rounded-b-xl "
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
            title="Link Preview"
            onError={() => setPreviewFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500 text-sm dark:text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-background dark:to-dark-sidebar-background">
            <p className="mb-1">Preview unavailable</p>
            <p className="text-button-blue dark:text-button-light-blue">Click to open ↗</p>
          </div>
        )}
      </div>
    </a>
  );
};
