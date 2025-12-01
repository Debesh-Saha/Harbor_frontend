import { useState } from "react"
import { getPdfEmbedUrl } from "../actions/getPdfEmbedUrl";
import { CrossIcon } from "../icons/Crossicon";
import { PdfIcon } from "../icons/Pdficon";
import { Popup } from "../components/Popup";

export const PdfEmbed = ({ title, link, type }: { title: string, link: string, type: string }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");

    function handleOpen() {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            showPopup("PDF viewer isn't available on smaller screens. Use the open-link icon to open the file externally.");
            return;
        }
        setModalOpen(true);
    }

    function showPopup(msg: string) {
        setPopupMsg(msg);
        setPopupVisible(true);

        setTimeout(() => {
            setPopupVisible(false);
        }, 1800);
    }

    return (
        <>
            <Popup
                message={popupMsg}
                visible={popupVisible}
                type="error"
            />
            {modalOpen && type === "pdf" && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white dark:bg-dark-sidebar-background rounded-xl w-[60%] h-[80%] shadow-lg flex flex-col overflow-hidden">
                        <div className="flex justify-end p-2 border-b border-gray-200">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-400 transition-colors"
                            >
                                <CrossIcon size="sm" />
                            </button>
                        </div>

                        <div className="flex-1">
                            <iframe
                                src={getPdfEmbedUrl(link)}
                                className="w-full h-full"
                                title="PDF Viewer"
                                style={{ border: "none" }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            <div
                onClick={handleOpen}
                className="flex flex-col justify-center items-center gap-3 w-full h-60 p-2 rounded-xl bg-gray-100 dark:bg-dark-background/70 text-darker-normal-text dark:text-dark-darker-normal-text cursor-pointer border border-gray-200 dark:border-gray-800 hover:shadow-md transition"
            >
                <PdfIcon size="xl" />
                <p className="text-sm font-medium text-center">{title}</p>
            </div>
        </>
    )
}
