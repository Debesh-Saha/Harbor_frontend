import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Popup } from "../components/Popup";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
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

  async function handleGoogleSignup(idToken: string) {
    try {
      await axios.post(BACKEND_URL + "/api/v1/google-auth", {
        idToken,
      });

      showPopup("Google signup successful!", "success");

      setTimeout(() => navigate("/signin"), 800);
    } catch (e: any) {
      showPopup(
        e.response?.data?.message ||
        e.response?.data?.error?.[0] ||
        "Google Signup failed",
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
          handleGoogleSignup(response.credential);
        },
      });

      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("google-signup-btn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
          shape: "pill",
        }
      );
    };
  }, []);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });

      showPopup("You are signed up!", "success");

      setTimeout(() => navigate("/signin"), 800);
    } catch (e: any) {
      showPopup(
        e.response?.data?.error?.[0] ||
        e.response?.data?.message ||
        "Signup failed",
        "error"
      );
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-dark-sidebar-background dark:to-dark-background/100 flex justify-center items-center px-4">
      <div className="bg-background dark:bg-dark-background rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-headings-text dark:text-dark-headings-text mb-2 text-center">
          Create an Account
        </h2>

        <p className="text-base text-darker-normal-text dark:text-dark-darker-normal-text text-center mb-8">
          Build your own space for ideas and inspiration.
        </p>

        <div className="space-y-4">
          <span className="text-headings-text dark:text-dark-headings-text font-semibold">
            What should we call you?
          </span>
          <Input ref={usernameRef} placeholder="Username" />

          <span className="text-headings-text dark:text-dark-headings-text font-semibold">
            Choose a strong password
          </span>
          <Input ref={passwordRef} placeholder="Password" />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            size="sm"
            variant="primary"
            text="Sign Up"
            fullwidth={true}
            loading={false}
            onClick={signup}
          />
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-normal-text/50"></div>
          <span className="px-3 text-normal-text/70 text-sm">or</span>
          <div className="flex-1 h-px bg-normal-text/50"></div>
        </div>

        <div id="google-signup-btn" className="flex justify-center w-full"></div>

        <p className="text-sm text-normal-text dark:text-dark-normal-text text-center mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>

      <Popup message={popupMessage} visible={popupVisible} type={popupType} />
    </div>
  );
}
