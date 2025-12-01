import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Popup } from "../components/Popup";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  function showPopup(message: string, type: "success" | "error" = "error") {
    setPopupMessage(message);
    setPopupType(type);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 1800);
  }

  async function handleGoogleSignin(idToken: string) {
    try {
      const res = await axios.post(BACKEND_URL + "/api/v1/google-auth", {
        idToken,
      });

      if (!res.data.token) {
        showPopup(res.data.message || "Google Sign-in failed", "error");
        return;
      }

      localStorage.setItem("token", res.data.token);
      showPopup("Signed in with Google!", "success");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      showPopup(
        err.response?.data?.message || "Google Sign-in failed",
        "error"
      );
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          handleGoogleSignin(response.credential);
        },
      });

      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
          shape: "pill",
        }
      );
    };
  }, []);


  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      if (!response.data.token) {
        showPopup(response.data.message || "Signin failed", "error");
        return;
      }

      localStorage.setItem("token", response.data.token);
      showPopup("Signed in successfully!", "success");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (e: any) {
      showPopup(e.response?.data?.message || "Something went wrong", "error");
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center px-4 dark:from-dark-sidebar-background dark:to-dark-background/100">
      <div className="bg-background dark:bg-dark-background rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-headings-text dark:text-dark-headings-text mb-2 text-center">
          Welcome Back!
        </h2>

        <p className="text-base text-darker-normal-text dark:text-dark-darker-normal-text text-center mb-8">
          Glad to see you again! Let's get you back to your favorite ideas and links.
        </p>

        <div className="space-y-4">
          <span className="text-headings-text dark:text-dark-headings-text font-semibold">
            Enter your username
          </span>
          <Input ref={usernameRef} placeholder="Username" />

          <span className="text-headings-text dark:text-dark-headings-text font-semibold">
            Type your secret passcode
          </span>
          <Input ref={passwordRef} placeholder="Password" />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            size="sm"
            variant="primary"
            text="Sign In"
            fullwidth={true}
            loading={false}
            onClick={signin}
          />
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-normal-text/50"></div>
          <span className="px-3 text-normal-text/70 text-sm">or</span>
          <div className="flex-1 h-px bg-normal-text/50"></div>
        </div>

        <div id="google-signin-btn" className="flex justify-center w-full"></div>

        <p className="text-sm text-normal-text dark:text-dark-normal-text text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </div>

      <Popup message={popupMessage} visible={popupVisible} type={popupType} />
    </div>
  );
}
