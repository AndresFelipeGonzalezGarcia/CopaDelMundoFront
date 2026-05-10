import { useState, useEffect } from "react";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Partido {
  id: number;
  fecha: string; // Formato YYYY-MM-DD para agrupar fácil
  hora: string;
  equipoLocal: string;
  equipoVisitante: string;
  flagLocal: string;
  flagVisitante: string;
  estadio: string;
  fase: string;
}

// ─── Mock Data (Aquí se conectará Spring Boot después) ────────────────────────
const PARTIDOS_CALENDARIO: Partido[] = [
  {
    id: 1,
    fecha: "2026-06-14",
    hora: "14:00",
    equipoLocal: "Brasil",
    equipoVisitante: "Alemania",
    flagLocal: "🇧🇷",
    flagVisitante: "🇩🇪",
    estadio: "Lusail Stadium",
    fase: "GRUPO A",
  },
  {
    id: 2,
    fecha: "2026-06-14",
    hora: "18:00",
    equipoLocal: "México",
    equipoVisitante: "Canadá",
    flagLocal: "🇲🇽",
    flagVisitante: "🇨🇦",
    estadio: "Azteca",
    fase: "GRUPO A",
  },
  {
    id: 3,
    fecha: "2026-06-15",
    hora: "13:00",
    equipoLocal: "Argentina",
    equipoVisitante: "Francia",
    flagLocal: "🇦🇷",
    flagVisitante: "🇫🇷",
    estadio: "Al Bayt",
    fase: "GRUPO C",
  },
  {
    id: 4,
    fecha: "2026-06-15",
    hora: "16:00",
    equipoLocal: "Colombia",
    equipoVisitante: "España",
    flagLocal: "🇨🇴",
    flagVisitante: "🇪🇸",
    estadio: "Education City",
    fase: "GRUPO H",
  },
  {
    id: 5,
    fecha: "2026-06-16",
    hora: "14:00",
    equipoLocal: "Inglaterra",
    equipoVisitante: "Japón",
    flagLocal: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    flagVisitante: "🇯🇵",
    estadio: "Khalifa Intl",
    fase: "GRUPO B",
  },
];

// ─── Componentes de Utilidad ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: "1rem",
      }}
    >
      <div
        style={{ width: 3, height: 16, background: T.gold, borderRadius: 1 }}
      />
      <span
        style={{
          fontFamily: T.fontDisplay,
          fontWeight: 600,
          fontSize: "0.68rem",
          letterSpacing: "0.22em",
          color: T.gold,
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Export Principal ─────────────────────────────────────────────────────────
export default function CalendarioPage() {
  const [filtroFase, setFiltroFase] = useState("TODOS");
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [cargando, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga desde el servidor de la universidad
    const t = setTimeout(() => {
      setPartidos(PARTIDOS_CALENDARIO);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Agrupar partidos por fecha
  const partidosFiltrados = partidos.filter(
    (p) => filtroFase === "TODOS" || p.fase === filtroFase,
  );

  const fechasUnicas = Array.from(
    new Set(partidosFiltrados.map((p) => p.fecha)),
  ).sort();

  return (
    <PageShell>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 3rem" }}>
        {/* ENCABEZADO */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel>Fixture Oficial · 2026</SectionLabel>
          <h1
            style={{
              fontFamily: T.fontDisplay,
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: T.white,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Calendario de <span style={{ color: T.gold }}>Partidos</span>
          </h1>
          <p style={{ color: T.gray, marginTop: "0.5rem", maxWidth: 600 }}>
            Sigue de cerca cada encuentro. Filtra por fase y organiza tu agenda
            para no perderte ni un minuto de la Copa Mundial.
          </p>
        </div>

        {/* FILTROS DE FASE */}
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
            borderBottom: `1px solid ${T.border}`,
            paddingBottom: "1.5rem",
          }}
        >
          {[
            "TODOS",
            "GRUPO A",
            "GRUPO B",
            "GRUPO C",
            "GRUPO H",
            "OCTAVOS",
            "CUARTOS",
          ].map((fase) => (
            <button
              key={fase}
              onClick={() => setFiltroFase(fase)}
              style={{
                background: filtroFase === fase ? T.gold : T.bg2,
                color: filtroFase === fase ? T.bg0 : T.gray,
                border: "none",
                borderRadius: 2,
                padding: "0.5rem 1.2rem",
                fontFamily: T.fontDisplay,
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {fase}
            </button>
          ))}
        </div>

        {/* LISTADO AGRUPADO */}
        {cargando ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem",
              color: T.gray,
              fontFamily: T.fontDisplay,
              letterSpacing: "0.2em",
            }}
          >
            CARGANDO CALENDARIO...
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "4rem" }}
          >
            {fechasUnicas.map((fecha) => (
              <div key={fecha}>
                {/* Cabecera de Fecha */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                    borderLeft: `4px solid ${T.gold}`,
                    paddingLeft: "1rem",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: T.fontDisplay,
                      fontSize: "1.8rem",
                      color: T.white,
                      margin: 0,
                    }}
                  >
                    {new Date(fecha)
                      .toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "long",
                      })
                      .toUpperCase()}
                  </h2>
                  <span
                    style={{
                      color: T.gray,
                      fontFamily: T.fontBody,
                      fontSize: "0.9rem",
                    }}
                  >
                    2026
                  </span>
                </div>

                {/* Grid de Partidos para esa fecha */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {partidosFiltrados
                    .filter((p) => p.fecha === fecha)
                    .map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: T.bg2,
                          border: `1px solid ${T.border}`,
                          borderRadius: 4,
                          padding: "1.5rem",
                          transition: "border-color 0.2s",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor = T.borderGold)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = T.border)
                        }
                      >
                        {/* Badge de Fase */}
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            background: T.bg3,
                            color: T.gold,
                            fontSize: "0.6rem",
                            padding: "0.3rem 0.8rem",
                            fontFamily: T.fontDisplay,
                            fontWeight: 700,
                            borderBottomLeftRadius: 4,
                          }}
                        >
                          {p.fase}
                        </div>

                        <div style={{ marginBottom: "1rem" }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.7rem",
                              color: T.gray,
                              fontFamily: T.fontBody,
                            }}
                          >
                            {p.estadio}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.9rem",
                              color: T.gold,
                              fontFamily: T.fontDisplay,
                              fontWeight: 600,
                            }}
                          >
                            {p.hora} COT
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1rem",
                          }}
                        >
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <div
                              style={{
                                fontSize: "2.5rem",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {p.flagLocal}
                            </div>
                            <div
                              style={{
                                fontFamily: T.fontDisplay,
                                color: T.white,
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                              }}
                            >
                              {p.equipoLocal}
                            </div>
                          </div>

                          <div
                            style={{
                              color: T.border,
                              fontFamily: T.fontDisplay,
                              fontWeight: 800,
                              fontSize: "1.2rem",
                            }}
                          >
                            VS
                          </div>

                          <div style={{ flex: 1, textAlign: "center" }}>
                            <div
                              style={{
                                fontSize: "2.5rem",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {p.flagVisitante}
                            </div>
                            <div
                              style={{
                                fontFamily: T.fontDisplay,
                                color: T.white,
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                              }}
                            >
                              {p.equipoVisitante}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
