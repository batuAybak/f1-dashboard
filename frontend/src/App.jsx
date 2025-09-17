import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import DriversPage from "./drivers/DriversPage";
import TeamsPage from "./teams/TeamsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Route>
    </Routes>
  );
}
