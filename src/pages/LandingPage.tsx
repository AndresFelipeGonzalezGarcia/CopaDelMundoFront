import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { T } from "../components/layout/PageShell";
import Modal from "../components/common/Modal";

const gold = "#c99722";
const goldLight = "#e0b040";
const bg = "#060810";
const fontDisplay = "'Bebas Neue', sans-serif";
const fontBody = "'DM Sans', sans-serif";

export default function LandingPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        .lp-nav-btn:hover { background: ${gold} !important; color: ${bg} !important; border-color: ${gold} !important; }
        .lp-cta-primary { background: linear-gradient(90deg, #b8861e, ${gold}, ${goldLight}, ${gold}, #b8861e); background-size: 200% 100%; transition: all 0.3s !important; }
        .lp-cta-primary:hover { background-position: 100% 0 !important; transform: translateY(-2px) !important; }
        .lp-cta-secondary:hover { border-color: ${gold}44 !important; color: ${gold} !important; }
        .lp-feature-icon { transition: border-color 0.2s, background 0.2s; }
        .lp-feature:hover .lp-feature-icon { border-color: ${gold}66 !important; background: ${gold}11 !important; }

        @keyframes lp-fadein { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .lp-hero-inner { animation: lp-fadein 0.7s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: fontBody,
        }}
      >
        {/* Fondo fotográfico */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://www.tudn.com/_next/image?url=https%3A%2F%2Fst1.uvnimg.com%2F53%2F8d%2Fc17fd25e4e4d8bf1c6d19962a1b1%2Fwc-omb-fw25-trophy-mexico-1-16x9.jpg&w=1280&q=75')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.25) saturate(1.3)",
            zIndex: 0,
          }}
        />

        {/* Gradiente de fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, rgba(6,8,16,0.2) 0%, rgba(6,8,16,0.6) 50%, ${bg} 100%)`,
            zIndex: 0,
          }}
        />

        {/* Halos */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: `radial-gradient(ellipse, ${gold}22 0%, transparent 70%)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-80px",
            top: "40%",
            width: "300px",
            height: "400px",
            background: `radial-gradient(ellipse, ${gold}11 0%, transparent 70%)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "40%",
            width: "300px",
            height: "400px",
            background: `radial-gradient(ellipse, ${gold}11 0%, transparent 70%)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Líneas de cancha */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.04,
            zIndex: 1,
          }}
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="400"
            cy="300"
            r="100"
            fill="none"
            stroke={gold}
            strokeWidth="1"
          />
          <circle cx="400" cy="300" r="5" fill={gold} />
          <line
            x1="400"
            y1="0"
            x2="400"
            y2="600"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="60"
            y="180"
            width="170"
            height="240"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="60"
            y="225"
            width="65"
            height="150"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="570"
            y="180"
            width="170"
            height="240"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="675"
            y="225"
            width="65"
            height="150"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="15"
            y="15"
            width="770"
            height="570"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
        </svg>

        {/* NAVBAR */}
        <nav
          style={{
            position: "relative",
            zIndex: 10,
            padding: "1.4rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${gold}15`,
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box" as const,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="20" cy="20" r="19" stroke={gold} strokeWidth="1.5" />
              <polygon
                points="20,5 27,10 25,18 15,18 13,10"
                fill="none"
                stroke={gold}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <polygon
                points="25,18 32,22 30,30 20,33 10,30 8,22 15,18"
                fill="none"
                stroke={gold}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "1.3rem",
                  letterSpacing: "0.2em",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                MUNDIAL <span style={{ color: gold }}>TOTAL</span>
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "#5a6278",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  marginTop: 2,
                }}
              >
                2026 · Universidad El Bosque
              </div>
            </div>
          </div>

          <button
            className="lp-nav-btn"
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              border: `1px solid ${gold}55`,
              color: gold,
              padding: "0.55rem 1.4rem",
              borderRadius: 2,
              fontFamily: fontBody,
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        </nav>

        {/* HERO */}
        <main
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 2rem 2rem",
            textAlign: "center",
          }}
        >
          <div className="lp-hero-inner" style={{ maxWidth: 720 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: `1px solid ${gold}33`,
                padding: "0.35rem 1rem",
                borderRadius: 2,
                background: "rgba(0,0,0,0.4)",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: gold,
                }}
              />
              <span
                style={{
                  fontSize: "0.68rem",
                  color: gold,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  fontWeight: 500,
                }}
              >
                La plataforma universitaria oficial · Ingeniería de Sistemas
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: fontDisplay,
                fontSize: "clamp(3rem, 9vw, 5.5rem)",
                color: "#fff",
                lineHeight: 0.92,
                textTransform: "uppercase" as const,
                margin: "0 0 1.5rem",
                letterSpacing: "0.03em",
              }}
            >
              Vive la copa
              <br />
              <span style={{ color: gold }}>Como una leyenda</span>
            </h1>

            {/* Subtítulo */}
            <p
              style={{
                fontSize: "1rem",
                color: "#6a7490",
                margin: "0 auto 2.5rem",
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              Colecciona el álbum virtual, compite en las pollas contra tus
              compañeros de Ingeniería y sigue el calendario en tiempo real.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "3.5rem",
              }}
            >
              <button
                className="lp-cta-primary"
                onClick={() => navigate("/login")}
                style={{
                  border: "none",
                  borderRadius: 2,
                  padding: "1rem 2.5rem",
                  fontFamily: fontDisplay,
                  fontSize: "1.05rem",
                  letterSpacing: "0.2em",
                  color: bg,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                Crear cuenta gratis
              </button>
              <button
                className="lp-cta-secondary"
                onClick={() => setModalOpen(true)}
                style={{
                  background: "transparent",
                  border: "1px solid #1e2540",
                  borderRadius: 2,
                  padding: "1rem 2rem",
                  fontFamily: fontBody,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "#4a556a",
                  cursor: "pointer",
                }}
              >
                ¿Cómo funciona? →
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                justifyContent: "center",
                borderTop: "1px solid #0f1526",
                paddingTop: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "48", label: "Partidos" },
                { num: "48", label: "Selecciones" },
                { num: "3", label: "Sedes" },
                { num: "∞", label: "Emoción" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: "2.2rem",
                      color: gold,
                      letterSpacing: "0.05em",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#3a4460",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase" as const,
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* FEATURES ROW */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            borderTop: "1px solid #0d1220",
          }}
        >
          {[
            {
              icon: "ti-photo",
              title: "Álbum Virtual",
              desc: "Colecciona figuritas de todos los jugadores del mundial",
            },
            {
              icon: "ti-trophy",
              title: "Pollas & Rankings",
              desc: "Compite con tus compañeros de ingeniería en tiempo real",
            },
            {
              icon: "ti-calendar",
              title: "Calendario",
              desc: "Resultados y fixture actualizados al instante",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="lp-feature"
              style={{
                flex: 1,
                padding: "1.5rem",
                borderRight: i < 2 ? "1px solid #0d1220" : "none",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                className="lp-feature-icon"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  border: `1px solid ${gold}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: gold,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                <i className={`ti ${f.icon}`} aria-hidden="true" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "#c4cad8",
                    letterSpacing: "0.03em",
                    marginBottom: 4,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#2e3850",
                    lineHeight: 1.5,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer
          style={{
            position: "relative",
            zIndex: 10,
            borderTop: "1px solid #0d1220",
            background: "rgba(6,8,16,0.6)",
            backdropFilter: "blur(10px)",
            padding: "1rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.68rem", color: "#252e42" }}>
            © 2026 Mundial Total
          </span>
          <span style={{ fontSize: "0.68rem", color: "#252e42" }}>
            Proyecto de Ingeniería de Sistemas · Universidad El Bosque
          </span>
        </footer>
      </div>

      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onCTA={() => {
            setModalOpen(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
}
