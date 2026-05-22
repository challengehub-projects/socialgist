import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/welcome";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import HomeFeedPage from "./pages/feed";
import TopNavbar from "./pages/navbar";
import PostFeedStream from "./pages/feed";
import TermsOfServicePage from "./pages/terms";
import MessagesPage from "./pages/messeges";
import NotificationsPage from "./pages/notifications";
import ProfilePage from "./pages/profile";

// Wrapper to map your old custom 'onNavigate' function properties directly to React Router paths
function RouterViewWrapper({ Component }) {
  const navigate = useNavigate();

  // Maps string navigation parameters to cleaner URL paths
  const handleNavigation = (targetPage) => {
    if (targetPage === "welcome") navigate("/");
    else navigate(`/${targetPage}`);
  };

  return <Component onNavigate={handleNavigation} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-purple-50 min-h-screen selection:bg-purple-600 selection:text-white antialiased">
        <Routes>
          {/* Landing welcome root router screen */}
          <Route
            path="/"
            element={<RouterViewWrapper Component={WelcomePage} />}
          />

          {/* Register system path configuration */}
          <Route
            path="/signup"
            element={<RouterViewWrapper Component={SignupPage} />}
          />

          {/* Account authorization path configuration */}
          <Route
            path="/login"
            element={<RouterViewWrapper Component={LoginPage} />}
          />

          <Route
            path="/messages"
            element={<RouterViewWrapper Component={MessagesPage} />}
          />

          <Route
            path="/terms"
            element={<RouterViewWrapper Component={TermsOfServicePage} />}
          />

          <Route
            path="/profile"
            element={
              <>
              <TopNavbar />
              <ProfilePage />
              </>
            }
          />

          <Route
            path="/notifications"
            element={
              <>
                <TopNavbar />
                <NotificationsPage />
              </>
            }
          />

          {/* Main campus community dashboard stream dashboard view */}
          <Route
            path="/feed"
            element={
              <>
                <TopNavbar />
                <HomeFeedPage />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
