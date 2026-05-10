import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Design Tokens Centralizados ───────────────────────────────────────────
export const T = {
  bg0: "#05070f",
  bg1: "#0a0e1a",
  bg2: "#0f1528",
  bg3: "#161d35",
  border: "#1e2a4a",
  borderGold: "#c9a84c",
  gold: "#d4a843",
  goldLight: "#f0c84a",
  goldMuted: "#8a6d2a",
  white: "#f4f6ff",
  gray: "#6b7a9e",
  grayLight: "#9ba8c4",
  green: "#22a060",
  greenDark: "#155c3a",
  fontDisplay: "'Oswald', 'Barlow Condensed', 'Arial Narrow', sans-serif",
  fontBody: "'DM Sans', 'Barlow', system-ui, sans-serif",
};

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  const activePath = location.pathname;

  const links = [
    { name: "inicio", path: "/dashboard" },
    { name: "calendario", path: "/calendario" },
    { name: "álbum", path: "/album" },
    { name: "galería", path: "/galeria" },
    { name: "pollas", path: "/pollas" },
    { name: "contacto", path: "/contacto" },
    { name: "checkout", path: "/checkout" },
    { name: "perfil", path: "/perfil" },
  ];

  const mid = 3;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* NAVBAR CENTRALIZADO */}
      <nav
        style={{
          background: T.bg0,
          borderBottom: `1px solid ${T.border}`,
          position: "sticky",
          top: 0,
          zIndex: 200,
        }}
      >
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${T.gold} 50%, transparent 100%)`,
          }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "flex",
            alignItems: "center",
            height: 66,
          }}
        >
          <div style={{ display: "flex", gap: "2rem", flex: 1 }}>
            {links.slice(0, mid).map((l) => (
              <Link
                key={l.path}
                to={l.path}
                style={{
                  textDecoration: "none",
                  fontFamily: T.fontDisplay,
                  fontWeight: 500,
                  fontSize: "0.76rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: activePath === l.path ? T.goldLight : T.gray,
                  borderBottom: `1px solid ${activePath === l.path ? T.goldLight : "transparent"}`,
                  paddingBottom: 2,
                }}
              >
                {l.name}
              </Link>
            ))}
          </div>

          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              textAlign: "center",
              padding: "0 2.5rem",
              flexShrink: 0,
            }}
          >
            <style>
              {`
                @keyframes spinLogo {
                from{
                transform: rotate(0deg);
              }
                to{
                transform: rotate(360deg);
              }
              }
              `}
            </style>

            <img
              src="https://res.cloudinary.com/adidas-app/image/upload/c_limit,h_2532,q_auto:good,w_2532/v1/page-assets/40/cew3rfyp1imizmnzptkc.png"
              alt="Trofeo Copa del Mundo"
              style={{
                maxHeight: "50px",
                width: "auto",
                filter: `drop-shadow(0 0 30px rgba(0,0,0,0.8)) drop-shadow(0 0 10px ${T.gold}44)`,
                position: "relative",
                zIndex: 2,
                animation: "spinLogo 4s ease-in-out infinite",
                transform: "center",
              }}
            />
          </Link>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {links.slice(mid).map((l) => (
              <Link
                key={l.path}
                to={l.path}
                style={{
                  textDecoration: "none",
                  fontFamily: T.fontDisplay,
                  fontWeight: 500,
                  fontSize: "0.76rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: activePath === l.path ? T.goldLight : T.gray,
                  borderBottom: `1px solid ${activePath === l.path ? T.goldLight : "transparent"}`,
                  paddingBottom: 2,
                }}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ flex: 1 }}>{children}</main>

      {/* FOOTER CORREGIDO */}
      <footer style={{ background: T.bg0, borderTop: `1px solid ${T.border}` }}>
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${T.gold}44, transparent)`,
          }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "1.1rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: "0.7rem",
              color: T.gray,
              margin: 0,
            }}
          >
            © 2026 Mundial Total — Proyecto Universitario · Ingeniería de
            Sistemas · Universidad El Bosque
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["IG", "FB", "TW", "YT"].map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  color: T.gray,
                  cursor: "pointer",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
