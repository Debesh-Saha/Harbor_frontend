import { CrossIcon } from "../icons/Crossicon"
import { Button } from "../components/Button"
import { Input } from "./Input"
import { useRef, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentTypes {
    Youtube = "youtube",
    Twitter = "twitter",
    Pdf = "pdf",
    Spotify = "spotify",
    Instagram = "instagram",
    Reddit = "reddit",
    Misc= "misc"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentTypes.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            type,
            title
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();
    }

    return <div>
        {open && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
                <div className="bg-sidebar-background dark:bg-dark-sidebar-background p-4 rounded-md min-w-85 min-h-100">

                    <div className="flex justify-end cursor-pointer mb-3 text-darker-normal-text dark:text-dark-darker-normal-text">
                        <div onClick={onClose}>
                            <CrossIcon size="sm" />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-headings-text dark:text-dark-headings-text mb-2 text-center">
                        Add Something Awesome
                    </h2>
                    <p className="text-sm text-darker-normal-text dark:text-dark-darker-normal-text text-center mb-6">
                        Drop in your favorite links or ideas to keep<br />
                        them all in one place.
                    </p>

                    <div className="space-y-5">
                        <span className="text-headings-text dark:text-dark-headings-text font-semibold">
                            What should we call this one?
                        </span>

                        <Input ref={titleRef} placeholder={"Title"} />

                        <span className="text-headings-text dark:text-dark-headings-text font-semibold">
                            Paste the magic link below.
                        </span>

                        <Input ref={linkRef} placeholder={"Link"} />

                        <div>
                            <span className="text-headings-text dark:text-dark-headings-text font-semibold">Select Type</span>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as ContentTypes)}
                                className="mt-2 w-full border-3 border-button-blue rounded-sm px-3 py-2 text-darker-normal-text dark:text-darker-normal-text focus:outline-none focus:ring-button-blue"
                            >
                                <option value={ContentTypes.Youtube}>YouTube</option>
                                <option value={ContentTypes.Twitter}>Twitter</option>
                                <option value={ContentTypes.Pdf}>Files</option>
                                <option value={ContentTypes.Spotify}>Spotify</option>
                                <option value={ContentTypes.Instagram}>Instagram</option>
                                <option value={ContentTypes.Reddit}>Reddit</option>
                                <option value={ContentTypes.Misc}>Other Links</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-3">
                        <Button onClick={addContent} size="sm" variant="primary" text="Add It!" fullwidth={true} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
}

