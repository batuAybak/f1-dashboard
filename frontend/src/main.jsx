import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ApiProvider } from "./api/ApiContext.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import "./index.css";
import "../styles/navbar.css";
import "../styles/teamsPage.css";
import "../styles/homePage.css";
import "../styles/driversPage.css";
import "../styles/calendarPage.css";
import "../styles/calendarDetails.css";
import "../styles/profilePage.css";
import "../styles/forumPage.css";
import "../styles/resultsTables.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </AuthProvider>
);
