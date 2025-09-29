import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import DriversPage from "./components/drivers/DriversPage";
import TeamsPage from "./components/teams/TeamsPage";
import ProfilePage from "./components/profile/ProfilePage";
import HomePage from "./components/HomePage";
import CalendarPage from "./components/calendar/CalendarPage";
import CalendarDetails from "./components/calendar/CalendarDetails";
import ForumPage from "./components/forum/ForumPage";
import ForumTopicDetails from "./components/forum/ForumTopicDetails";
import StandingsPage from "./components/standings/StandingsPage";
import DriverResults from "./components/drivers/DriverResults";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar/:meetingKey" element={<CalendarDetails />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:id" element={<ForumTopicDetails />} />
        <Route path="/standings/:driverNumber" element={<DriverResults />} />
      </Route>
    </Routes>
  );
}
