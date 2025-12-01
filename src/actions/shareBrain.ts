import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";

export async function sharebrain(showPopup: (msg: string, type: "success" | "error") => void) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/brain/share`,
      { share: true },
      {
        headers: {
          Authorization: localStorage.getItem("token")!,
        },
      }
    );

    const shareUrl = `${FRONTEND_URL}share/${response.data.hash}`;

    await navigator.clipboard.writeText(shareUrl);

    showPopup("Share link copied to clipboard!", "success");
  } catch (error) {
    console.error(error);
    showPopup("Failed to share. Try again.", "error");
  }
}