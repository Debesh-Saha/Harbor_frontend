import { TrashIcon } from "../icons/Trashicon";
import { YoutubeIcon } from "../icons/Youtubeicon";
import { TwitterIcon } from "../icons/Twittericon";
import { PdfIcon } from "../icons/Pdficon";
import { SpotifyIcon } from "../icons/Spotifyicon";
import { InstagramIcon } from "../icons/Instagramicon";
import { RedditIcon } from "../icons/Redditicon";
import { LinkIcon } from "../icons/Linkicon";
import { YoutubeEmbed } from "../embeds/YoutubeEmbed";
import { TwitterEmbed } from "../embeds/TwitterEmbed";
import { SpotifyEmbed } from "../embeds/SpotifyEmbed";
import { InstagramEmbed } from "../embeds/InstagramEmbed";
import { RedditEmbed } from "../embeds/RedditEmbed";
import { MiscEmbed } from "../embeds/MiscEmbed";
import { PdfEmbed } from "../embeds/PdfEmbed";
import { OpenLinkIcon } from "../icons/Openlinkicon";

interface CardProps {
    _id: string;
    title: string,
    link: string,
    type: "twitter" | "youtube" | "pdf" | "spotify" | "instagram" | "reddit" | "misc";
    view?: boolean
    onDelete?: () => void;
}

const defaultStyle = `
  bg-sidebar-background dark:bg-dark-sidebar-background rounded-md shadow-sm 
  border border-gray-200 dark:border-gray-800 p-4 min-w-75
  w-full
  sm:w-auto
`;

export function Card({ title, link, type, view, onDelete }: CardProps) {

    return <div>
        <div className={`${defaultStyle}`}>
            <div className="flex justify-between">
                <div className="flex items-center text-base font-medium">
                    <div className="text-darker-normal-text pr-2">
                        {type === "youtube" && <YoutubeIcon size={"sm"} />}
                        {type === "twitter" && <TwitterIcon size={"sm"} />}
                        {type === "pdf" && <PdfIcon size={"sm"} />}
                        {type === "spotify" && <SpotifyIcon size={"sm"} />}
                        {type === "instagram" && <InstagramIcon size={"sm"} />}
                        {type === "reddit" && <RedditIcon size={"sm"} />}
                        {type === "misc" && <LinkIcon size={"sm"} />}
                    </div>
                    <div className="truncate max-w-46 text-headings-text dark:text-dark-headings-text">
                        {title}
                    </div>
                </div>
                {view ? "" : <div className="flex items-center dark:text-dark-normal-text text-normal-text cursor-pointer">
                    <div className="pr-2">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <OpenLinkIcon size={"sm"} />
                        </a>
                    </div>
                    <div onClick={onDelete}>
                        <TrashIcon size={"sm"} />
                    </div>
                </div>}
            </div>
            <div className="pt-3">

                {type === "youtube" && <YoutubeEmbed link={link}/>}

                {type === "twitter" && <TwitterEmbed link={link}/>}

                {type === "pdf" && <PdfEmbed title={title} link={link} type={type}/>}

                {type === "spotify" && <SpotifyEmbed link={link}/>}

                {type === "instagram" && <InstagramEmbed link={link}/>}

                {type === "reddit" && <RedditEmbed link={link}/>}

                {type === "misc" && <MiscEmbed title={title} link={link}/>}
            </div>
        </div>
    </div>
}

