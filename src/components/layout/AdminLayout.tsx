import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Users, Ticket, Settings, LogOut } from "lucide-react";

export const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar de Administración */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2
          style={{ color: "#fbbf24", fontSize: "1.2rem", marginBottom: "2rem" }}
        >
          ADMIN PANEL
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link
            to="/admin"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              gap: "10px",
            }}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/admin/stickers"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              gap: "10px",
            }}
          >
            <Ticket size={20} /> Gestionar Láminas
          </Link>
          <Link
            to="/admin/users"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              gap: "10px",
            }}
          >
            <Users size={20} /> Usuarios
          </Link>
          <hr style={{ opacity: 0.2, width: "100%" }} />
          <Link
            to="/"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              display: "flex",
              gap: "10px",
            }}
          >
            <LogOut size={20} /> Salir al sitio
          </Link>
        </nav>
      </aside>

      {/* Contenido dinámico del Admin */}
      <main style={{ flex: 1, backgroundColor: "#f1f5f9", padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
};
