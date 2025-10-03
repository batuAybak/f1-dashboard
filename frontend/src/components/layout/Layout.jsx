import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Layout provides the main page structure with Navbar, main content, and Footer.
 * Uses React Router's Outlet to render nested routes.
 */
export default function Layout() {
  return (
    <div className="page-container">
      <Navbar />
      <main>
        {/* Main content rendered by React Router */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
