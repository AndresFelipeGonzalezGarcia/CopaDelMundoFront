import { useState, useEffect } from "react";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface PaisAlbum {
  id: number;
  nombre: string;
  bandera: string;
}

interface SeccionAlbum {
  nombre: string;
  icono: string; // clase de Tabler Icons, ej: "ti-map"
  paises: PaisAlbum[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const SECCIONES_ALBUM: SeccionAlbum[] = [
  {
    nombre: "CONMEBOL · Sudamérica",
    icono: "ti-map",
    paises: [
      { id: 1, nombre: "Colombia", bandera: "🇨🇴" },
      { id: 2, nombre: "Argentina", bandera: "🇦🇷" },
      { id: 3, nombre: "Brasil", bandera: "🇧🇷" },
      { id: 4, nombre: "Uruguay", bandera: "🇺🇾" },
      { id: 5, nombre: "Ecuador", bandera: "🇪🇨" },
      { id: 6, nombre: "Venezuela", bandera: "🇻🇪" },
    ],
  },
  {
    nombre: "UEFA · Europa",
    icono: "ti-world",
    paises: [
      { id: 7, nombre: "Alemania", bandera: "🇩🇪" },
      { id: 8, nombre: "Francia", bandera: "🇫🇷" },
      { id: 9, nombre: "España", bandera: "🇪🇸" },
      { id: 10, nombre: "Inglaterra", bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { id: 11, nombre: "Portugal", bandera: "🇵🇹" },
      { id: 12, nombre: "Italia", bandera: "🇮🇹" },
    ],
  },
  {
    nombre: "CONCACAF · N. América",
    icono: "ti-building",
    paises: [
      { id: 13, nombre: "México", bandera: "🇲🇽" },
      { id: 14, nombre: "EE. UU.", bandera: "🇺🇸" },
      { id: 15, nombre: "Canadá", bandera: "🇨🇦" },
      { id: 16, nombre: "Costa Rica", bandera: "🇨🇷" },
      { id: 17, nombre: "Jamaica", bandera: "🇯🇲" },
      { id: 18, nombre: "Panamá", bandera: "🇵🇦" },
    ],
  },
];

const TOTAL_LAMINAS = 48;

// ─── Tokens ───────────────────────────────────────────────────────────────────
const gold = "#c99722";
const goldLight = "#e0b040";
const bg = "#060810";
const bgCard = "#0d1120";
const bgDark = "#080c18";
const borderGold = "#c9972233";
const fontDisplay = "'Bebas Neue', sans-serif";
const fontBody = "'DM Sans', sans-serif";

// ─── Sub-componentes ──────────────────────────────────────────────────────────
function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: "0.5rem",
      }}
    >
      <div style={{ width: 3, height: 14, background: gold, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: fontDisplay,
          fontSize: "0.65rem",
          color: gold,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function CardObtenida({
  pais,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  pais: PaisAlbum;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        aspectRatio: "3/4",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s",
        transform: isHovered ? "translateY(-4px)" : "none",
        background: bgCard,
        border: `1px solid ${isHovered ? gold + "66" : borderGold}`,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3.5rem",
        }}
      >
        {pais.bandera}
      </div>
      <div
        style={{
          background: bgDark,
          borderTop: `1px solid ${borderGold}`,
          padding: "6px 8px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: fontDisplay,
            fontSize: "0.75rem",
            color: "#c4cad8",
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          {pais.nombre}
        </span>
      </div>
    </div>
  );
}

function CardVacia({ id }: { id: number }) {
  return (
    <div
      style={{
        aspectRatio: "3/4",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        border: "1px dashed #0d1526",
      }}
    >
      <span
        style={{
          fontFamily: fontDisplay,
          fontSize: "1.3rem",
          color: "#131b2e",
          letterSpacing: "0.05em",
        }}
      >
        {String(id).padStart(2, "0")}
      </span>
    </div>
  );
}

// ─── Modal Sobre ──────────────────────────────────────────────────────────────
function ModalSobre({
  cargando,
  nuevasLaminas,
  onClose,
}: {
  cargando: boolean;
  nuevasLaminas: PaisAlbum[] | null;
  onClose: () => void;
}) {
  return (
    <>
      <style>{`
        @keyframes mfadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mslideup { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mspin { to { transform: rotate(360deg); } }
        @keyframes cardReveal { from { opacity: 0; transform: translateY(20px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .sobre-close:hover { color: ${gold} !important; }
        .sobre-cta:hover { background-position: 100% 0 !important; }
      `}</style>

      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(6,8,16,0.95)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          padding: "2rem",
          animation: "mfadein 0.2s ease",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: `linear-gradient(160deg, ${bgCard}, ${bgDark})`,
            border: `1px solid ${borderGold}`,
            borderTop: `3px solid ${gold}`,
            borderRadius: 4,
            width: "100%",
            maxWidth: 500,
            padding: "2rem",
            textAlign: "center",
            position: "relative",
            animation: "mslideup 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {nuevasLaminas && (
            <button
              className="sobre-close"
              onClick={onClose}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                color: "#3a4258",
                fontSize: 18,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          )}

          {cargando ? (
            <div style={{ padding: "2rem 0" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "2px solid #0d1526",
                  borderTop: `2px solid ${gold}`,
                  borderRadius: "50%",
                  animation: "mspin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "1.5rem",
                  color: "#fff",
                  letterSpacing: "0.2em",
                  margin: "0 0 0.3rem",
                }}
              >
                Abriendo sobre...
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#3a4460",
                  letterSpacing: "0.1em",
                }}
              >
                Sincronizando con los servidores
              </div>
            </div>
          ) : (
            nuevasLaminas && (
              <>
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: "1.8rem",
                    color: gold,
                    letterSpacing: "0.15em",
                    margin: "0 0 1.5rem",
                  }}
                >
                  ¡Nuevas banderas!
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "1.8rem",
                  }}
                >
                  {nuevasLaminas.map((lamina, i) => (
                    <div
                      key={lamina.id}
                      style={{
                        width: 110,
                        aspectRatio: "3/4",
                        background: bgCard,
                        border: `1px solid ${gold}55`,
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        animation: `cardReveal 0.4s ease ${i * 0.12}s both`,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "3.2rem",
                        }}
                      >
                        {lamina.bandera}
                      </div>
                      <div
                        style={{
                          background: bgDark,
                          borderTop: `1px solid ${borderGold}`,
                          padding: 5,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.55rem",
                            color: gold,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase" as const,
                            marginBottom: 2,
                          }}
                        >
                          Nueva
                        </div>
                        <div
                          style={{
                            fontFamily: fontDisplay,
                            fontSize: "0.65rem",
                            color: "#fff",
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.1em",
                          }}
                        >
                          {lamina.nombre}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="sobre-cta"
                  onClick={onClose}
                  style={{
                    background: `linear-gradient(90deg, #b8861e, ${gold}, ${goldLight}, ${gold}, #b8861e)`,
                    backgroundSize: "200% 100%",
                    border: "none",
                    borderRadius: 2,
                    padding: "0.8rem 2.5rem",
                    fontFamily: fontDisplay,
                    fontSize: "0.95rem",
                    letterSpacing: "0.2em",
                    color: bg,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  Pegar en el álbum
                </button>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────────
export default function AlbumPage() {
  const [cargando, setCargando] = useState(true);
  const [misLaminas, setMisLaminas] = useState<Set<number>>(
    new Set([1, 2, 8, 12]),
  );
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargandoSobre, setCargandoSobre] = useState(false);
  const [nuevasLaminas, setNuevasLaminas] = useState<PaisAlbum[] | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 500);
    return () => clearTimeout(t);
  }, []);

  const laminasObtenidas = misLaminas.size;
  const porcentaje = Math.round((laminasObtenidas / TOTAL_LAMINAS) * 100);

  const abrirSobre = () => {
    setModalAbierto(true);
    setCargandoSobre(true);
    setNuevasLaminas(null);

    setTimeout(() => {
      // Obtener láminas que el usuario no tiene
      const disponibles = SECCIONES_ALBUM.flatMap((s) => s.paises).filter(
        (p) => !misLaminas.has(p.id),
      );
      const seleccionadas = disponibles
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, disponibles.length));

      setNuevasLaminas(seleccionadas);
      setCargandoSobre(false);
      setMisLaminas((prev) => {
        const nueva = new Set(prev);
        seleccionadas.forEach((p) => nueva.add(p.id));
        return nueva;
      });
    }, 1400);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNuevasLaminas(null);
  };

  if (cargando) {
    return (
      <PageShell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            fontFamily: fontDisplay,
            fontSize: "1.2rem",
            letterSpacing: "0.25em",
            color: gold,
          }}
        >
          CARGANDO ÁLBUM...
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        .sobre-btn-main:hover { background-position: 100% 0 !important; transform: translateY(-1px); }
      `}</style>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          padding: "2.5rem 3rem",
        }}
      >
        {/* ── Encabezado ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <EyebrowLabel>Colección oficial 2026</EyebrowLabel>
            <h1
              style={{
                fontFamily: fontDisplay,
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                color: "#fff",
                margin: "0 0 0.4rem",
                textTransform: "uppercase" as const,
                lineHeight: 0.95,
                letterSpacing: "0.03em",
              }}
            >
              Álbum <span style={{ color: gold }}>Mundial</span>
            </h1>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.78rem",
                color: "#3a4460",
                margin: 0,
                maxWidth: 420,
                lineHeight: 1.6,
              }}
            >
              Gestiona tu colección de banderas de los 48 países clasificados.
            </p>
          </div>

          <button
            className="sobre-btn-main"
            onClick={abrirSobre}
            style={{
              background: `linear-gradient(90deg, #b8861e, ${gold}, ${goldLight}, ${gold}, #b8861e)`,
              backgroundSize: "200% 100%",
              border: "none",
              borderRadius: 2,
              padding: "0.8rem 2rem",
              fontFamily: fontDisplay,
              fontSize: "0.95rem",
              letterSpacing: "0.2em",
              color: bg,
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <i
              className="ti ti-package"
              style={{ fontSize: 16 }}
              aria-hidden="true"
            />
            Abrir sobre
          </button>
        </div>

        {/* ── Barra de progreso ── */}
        <div
          style={{
            background: bgDark,
            border: `1px solid #0d1526`,
            borderRadius: 3,
            padding: "1.2rem 1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.6rem",
            }}
          >
            <span
              style={{
                fontFamily: fontDisplay,
                fontSize: "0.85rem",
                color: "#3a4460",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
              }}
            >
              Tu progreso
            </span>
            <span
              style={{
                fontFamily: fontDisplay,
                fontSize: "1.4rem",
                color: gold,
                letterSpacing: "0.05em",
              }}
            >
              {laminasObtenidas} / {TOTAL_LAMINAS}
            </span>
          </div>
          <div
            style={{
              height: 4,
              background: "#0d1220",
              borderRadius: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${porcentaje}%`,
                height: "100%",
                background: `linear-gradient(90deg, #b8861e, ${gold}, ${goldLight})`,
                transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              color: "#252e42",
              textAlign: "right",
              marginTop: 4,
              letterSpacing: "0.1em",
            }}
          >
            {porcentaje}% COMPLETADO
          </div>
        </div>

        {/* ── Secciones del álbum ── */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
          {SECCIONES_ALBUM.map((seccion) => {
            const obtenidas = seccion.paises.filter((p) =>
              misLaminas.has(p.id),
            ).length;
            return (
              <div key={seccion.nombre}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    borderBottom: "1px solid #0d1220",
                    paddingBottom: "0.7rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 2,
                      border: `1px solid ${borderGold}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: gold,
                      fontSize: 14,
                    }}
                  >
                    <i className={`ti ${seccion.icono}`} aria-hidden="true" />
                  </div>
                  <h2
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: "1rem",
                      color: "#fff",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.12em",
                      margin: 0,
                    }}
                  >
                    {seccion.nombre}
                  </h2>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "0.65rem",
                      color: "#252e42",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {obtenidas}/{seccion.paises.length}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(130px, 1fr))",
                    gap: 12,
                  }}
                >
                  {seccion.paises.map((pais) =>
                    misLaminas.has(pais.id) ? (
                      <CardObtenida
                        key={pais.id}
                        pais={pais}
                        isHovered={hoveredCard === pais.id}
                        onMouseEnter={() => setHoveredCard(pais.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      />
                    ) : (
                      <CardVacia key={pais.id} id={pais.id} />
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal sobre ── */}
      {modalAbierto && (
        <ModalSobre
          cargando={cargandoSobre}
          nuevasLaminas={nuevasLaminas}
          onClose={cerrarModal}
        />
      )}
    </PageShell>
  );
}
