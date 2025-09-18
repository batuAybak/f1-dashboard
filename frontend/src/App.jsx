import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import DriversPage from "./components/drivers/DriversPage";
import TeamsPage from "./components/teams/TeamsPage";
import ProfilePage from "./components/profile/ProfilePage";
import HomePage from "./components/HomePage";

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
      </Route>
    </Routes>
  );
}
