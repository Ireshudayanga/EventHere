// src/layouts/AppContentLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// eslint-disable-next-line react/prop-types
export default function AppContentLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
      <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

