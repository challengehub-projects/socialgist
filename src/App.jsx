import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    function registerSW() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js");
      }
    }
    
    registerSW();
  }, []);


  useEffect(() => {
    const handler = (e) => {
      // Prevent automatic install prompt
      e.preventDefault();
      console.log("Install prompt blocked");
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  useEffect(() => {
    // splash duration (like real apps: 2–3 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <SplashScreen /> : <LoginPage />}
    </>
  );
}
