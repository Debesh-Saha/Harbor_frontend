import { Button } from "../components/Button";
import "../App.css";
import { PlusIcon } from "../icons/Plusicon";
import { ShareIcon } from "../icons/Shareicon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState, useEffect } from "react";
import { SideBar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import Masonry from "react-masonry-css";
import { sharebrain } from "../actions/shareBrain";
import { MenuIcon } from "../icons/Menuicon";
import FeedbackWidget from "../components/Feedback";
import { Popup } from "../components/Popup";
import { useWindowWidth } from "../actions/useWindowWidth";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh, contentDelete } = useContent();
  const [selectedCategory, setSelectedCategory] = useState("Dock");

  const [sidebarOpen, setSidebarOpen] = useState(() =>
    window.innerWidth > 1025 ? true : false
  );

  const width = useWindowWidth();

  let columns = 1;
  if (width >= 1200) sidebarOpen ? columns = 4 : columns = 5;
  else if (width >= 992) columns = 3;
  else if (width >= 768) columns = 2;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  function showPopup(message: string, type: "success" | "error" = "error") {
    setPopupMessage(message);
    setPopupVisible(true);
    setPopupType(type);

    setTimeout(() => setPopupVisible(false), 1800);
  }

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
  
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  

  const filteredContents = contents.filter((content) => {
    if (selectedCategory === "Dock") return true;
    if (selectedCategory === "Files") return content.type === "pdf";
    if (selectedCategory === "Other Links")
      return !["twitter", "youtube", "pdf", "spotify", "instagram", "reddit"].includes(
        content.type
      );
    return content.type.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="flex min-h-screen bg-background dark:bg-dark-background">
      <SideBar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <FeedbackWidget />

      <div className={`flex-1 transition-all bg-background dark:bg-dark-background ${width >= 1025 ? (sidebarOpen ? "ml-74" : "ml-0") : "ml-0"}`}>
        <div className="px-2 my-3">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

          <div
            className={`flex ${sidebarOpen ? "justify-end" : "justify-between"
              } items-center`}
          >
            {!sidebarOpen && (
              <div className="flex justify-center items-center gap-1">
                <div
                  className="cursor-pointer dark:text-dark-darker-normal-text text-darker-normal-text"
                  onClick={() => setSidebarOpen(true)}
                >
                  <MenuIcon size="lg" />
                </div>
                {/* <div className="text-button-blue text-2xl pt-1 md:pt-0 md:text-3xl font-bold">HARBOR</div> */}

                <div className="w-7">
                  <img src={`${darkMode? "/dark_harbor_logo.png" : "/harbor_logo.png"}`} alt="" />
                </div>
              </div>

            )}
            <div className="flex gap-1 md:gap-2 items-center">
              <Button
                onClick={() => setModalOpen(true)}
                startIcon={<PlusIcon size="sm" />}
                size="sm"
                variant="primary"
                text="Add Links"
              />
              <Button
                onClick={() => sharebrain(showPopup)}
                startIcon={<ShareIcon size="sm" />}
                size="sm"
                variant="secondary"
                text="Share Dock"
              />
            </div>
          </div>
        </div>

        <div className={`mx-1`}>
          <Masonry
            breakpointCols={columns}
            className="flex flex-wrap"
            columnClassName="bg-transparent space-y-1 md:space-x-1"
          >
            {filteredContents.map(({ _id, type, link, title }) => (
              <Card
                key={_id}
                _id={_id}
                type={type}
                link={link}
                title={title}
                onDelete={() => contentDelete(_id)}
              />
            ))}
          </Masonry>
        </div>
      </div>
      <Popup message={popupMessage} visible={popupVisible} type={popupType} />
    </div>
  );
}
