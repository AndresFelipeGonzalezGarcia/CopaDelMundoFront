import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import AlbumPage from "../pages/AlbumPage";
import CalendarPage from "../pages/CalendarPage";
import PollasPage from "../pages/PollasPage";
import ContactPage from "../pages/ContactPage";
import GalleryPage from "../pages/GalleryPage";
import PerfilPage from "../pages/PerfilPage";
import CheckoutPage from "../pages/CheckOut";
import AdminPage from "../pages/AdminPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ZONA PÚBLICA */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* ZONA PRIVADA (A la que entras después de hacer login) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/pollas" element={<PollasPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        {/* RUTAS ADMIN (Solo accesibles para usuarios con rol admin) */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
