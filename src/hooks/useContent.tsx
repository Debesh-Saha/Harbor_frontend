import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "pdf" | "spotify" | "instagram" | "reddit" | "misc";
  tags?: string[];
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  let lastDelete = 0;

  async function refresh() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setContents(response.data.content);
    } catch (err) {
      console.error("Error refreshing content:", err);
    }
  }

  function contentDelete(contentId: string) {
    setContents(curr => curr.filter(c => c._id !== contentId));
    lastDelete = Date.now();

    axios
      .delete(`${BACKEND_URL}/api/v1/content?contentId=${contentId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .catch(err => {
        console.error("Delete failed:", err);
        refresh();
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      if (Date.now() - lastDelete > 4000) refresh();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return { contents, refresh, contentDelete };
}
