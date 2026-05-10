import { useState, useEffect } from "react";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Partido {
  id: number;
  fecha: string;
  hora: string;
  equipoLocal: string;
  equipoVisitante: string;
  flagLocal: string;
  flagVisitante: string;
  estadio: string;
  fase: string;
}

const PARTIDOS_CALENDARIO: Partido[] = [
  // =========================
  // GRUPO A
  // =========================
  {
    id: 1,
    fecha: "2026-06-11",
    hora: "18:00",
    equipoLocal: "México",
    equipoVisitante: "Canadá",
    flagLocal: "mx",
    flagVisitante: "ca",
    estadio: "Estadio Azteca",
    fase: "GRUPO A",
  },
  {
    id: 2,
    fecha: "2026-06-11",
    hora: "21:00",
    equipoLocal: "Estados Unidos",
    equipoVisitante: "Japón",
    flagLocal: "us",
    flagVisitante: "jp",
    estadio: "MetLife Stadium",
    fase: "GRUPO A",
  },
  {
    id: 3,
    fecha: "2026-06-15",
    hora: "17:00",
    equipoLocal: "México",
    equipoVisitante: "Estados Unidos",
    flagLocal: "mx",
    flagVisitante: "us",
    estadio: "Estadio Akron",
    fase: "GRUPO A",
  },
  {
    id: 4,
    fecha: "2026-06-15",
    hora: "20:00",
    equipoLocal: "Canadá",
    equipoVisitante: "Japón",
    flagLocal: "ca",
    flagVisitante: "jp",
    estadio: "BC Place",
    fase: "GRUPO A",
  },
  {
    id: 5,
    fecha: "2026-06-19",
    hora: "18:00",
    equipoLocal: "Japón",
    equipoVisitante: "México",
    flagLocal: "jp",
    flagVisitante: "mx",
    estadio: "SoFi Stadium",
    fase: "GRUPO A",
  },
  {
    id: 6,
    fecha: "2026-06-19",
    hora: "18:00",
    equipoLocal: "Estados Unidos",
    equipoVisitante: "Canadá",
    flagLocal: "us",
    flagVisitante: "ca",
    estadio: "AT&T Stadium",
    fase: "GRUPO A",
  },

  // =========================
  // GRUPO B
  // =========================
  {
    id: 7,
    fecha: "2026-06-12",
    hora: "16:00",
    equipoLocal: "Brasil",
    equipoVisitante: "Suiza",
    flagLocal: "br",
    flagVisitante: "ch",
    estadio: "Hard Rock Stadium",
    fase: "GRUPO B",
  },
  {
    id: 8,
    fecha: "2026-06-12",
    hora: "20:00",
    equipoLocal: "Portugal",
    equipoVisitante: "Senegal",
    flagLocal: "pt",
    flagVisitante: "sn",
    estadio: "Mercedes-Benz Stadium",
    fase: "GRUPO B",
  },
  {
    id: 9,
    fecha: "2026-06-16",
    hora: "17:00",
    equipoLocal: "Brasil",
    equipoVisitante: "Portugal",
    flagLocal: "br",
    flagVisitante: "pt",
    estadio: "Levi's Stadium",
    fase: "GRUPO B",
  },
  {
    id: 10,
    fecha: "2026-06-16",
    hora: "20:00",
    equipoLocal: "Suiza",
    equipoVisitante: "Senegal",
    flagLocal: "ch",
    flagVisitante: "sn",
    estadio: "Lumen Field",
    fase: "GRUPO B",
  },
  {
    id: 11,
    fecha: "2026-06-20",
    hora: "18:00",
    equipoLocal: "Senegal",
    equipoVisitante: "Brasil",
    flagLocal: "sn",
    flagVisitante: "br",
    estadio: "NRG Stadium",
    fase: "GRUPO B",
  },
  {
    id: 12,
    fecha: "2026-06-20",
    hora: "18:00",
    equipoLocal: "Portugal",
    equipoVisitante: "Suiza",
    flagLocal: "pt",
    flagVisitante: "ch",
    estadio: "Gillette Stadium",
    fase: "GRUPO B",
  },

  // =========================
  // GRUPO C
  // =========================
  {
    id: 13,
    fecha: "2026-06-13",
    hora: "15:00",
    equipoLocal: "Argentina",
    equipoVisitante: "Polonia",
    flagLocal: "ar",
    flagVisitante: "pl",
    estadio: "Arrowhead Stadium",
    fase: "GRUPO C",
  },
  {
    id: 14,
    fecha: "2026-06-13",
    hora: "19:00",
    equipoLocal: "Francia",
    equipoVisitante: "Corea del Sur",
    flagLocal: "fr",
    flagVisitante: "kr",
    estadio: "Lincoln Financial Field",
    fase: "GRUPO C",
  },
  {
    id: 15,
    fecha: "2026-06-17",
    hora: "16:00",
    equipoLocal: "Argentina",
    equipoVisitante: "Francia",
    flagLocal: "ar",
    flagVisitante: "fr",
    estadio: "SoFi Stadium",
    fase: "GRUPO C",
  },
  {
    id: 16,
    fecha: "2026-06-17",
    hora: "20:00",
    equipoLocal: "Polonia",
    equipoVisitante: "Corea del Sur",
    flagLocal: "pl",
    flagVisitante: "kr",
    estadio: "BC Place",
    fase: "GRUPO C",
  },
  {
    id: 17,
    fecha: "2026-06-21",
    hora: "18:00",
    equipoLocal: "Corea del Sur",
    equipoVisitante: "Argentina",
    flagLocal: "kr",
    flagVisitante: "ar",
    estadio: "Mercedes-Benz Stadium",
    fase: "GRUPO C",
  },
  {
    id: 18,
    fecha: "2026-06-21",
    hora: "18:00",
    equipoLocal: "Francia",
    equipoVisitante: "Polonia",
    flagLocal: "fr",
    flagVisitante: "pl",
    estadio: "MetLife Stadium",
    fase: "GRUPO C",
  },

  // =========================
  // GRUPO D
  // =========================
  {
    id: 19,
    fecha: "2026-06-14",
    hora: "15:00",
    equipoLocal: "Inglaterra",
    equipoVisitante: "Croacia",
    flagLocal: "gb",
    flagVisitante: "hr",
    estadio: "AT&T Stadium",
    fase: "GRUPO D",
  },
  {
    id: 20,
    fecha: "2026-06-14",
    hora: "19:00",
    equipoLocal: "Uruguay",
    equipoVisitante: "Marruecos",
    flagLocal: "uy",
    flagVisitante: "ma",
    estadio: "Hard Rock Stadium",
    fase: "GRUPO D",
  },
  {
    id: 21,
    fecha: "2026-06-18",
    hora: "16:00",
    equipoLocal: "Inglaterra",
    equipoVisitante: "Uruguay",
    flagLocal: "gb",
    flagVisitante: "uy",
    estadio: "Lumen Field",
    fase: "GRUPO D",
  },
  {
    id: 22,
    fecha: "2026-06-18",
    hora: "20:00",
    equipoLocal: "Croacia",
    equipoVisitante: "Marruecos",
    flagLocal: "hr",
    flagVisitante: "ma",
    estadio: "NRG Stadium",
    fase: "GRUPO D",
  },
  {
    id: 23,
    fecha: "2026-06-22",
    hora: "18:00",
    equipoLocal: "Marruecos",
    equipoVisitante: "Inglaterra",
    flagLocal: "ma",
    flagVisitante: "gb",
    estadio: "Estadio Azteca",
    fase: "GRUPO D",
  },
  {
    id: 24,
    fecha: "2026-06-22",
    hora: "18:00",
    equipoLocal: "Uruguay",
    equipoVisitante: "Croacia",
    flagLocal: "uy",
    flagVisitante: "hr",
    estadio: "Levi's Stadium",
    fase: "GRUPO D",
  },

  // =========================
  // GRUPO E
  // =========================
  {
    id: 25,
    fecha: "2026-06-15",
    hora: "15:00",
    equipoLocal: "España",
    equipoVisitante: "Dinamarca",
    flagLocal: "es",
    flagVisitante: "dk",
    estadio: "Gillette Stadium",
    fase: "GRUPO E",
  },
  {
    id: 26,
    fecha: "2026-06-15",
    hora: "19:00",
    equipoLocal: "Colombia",
    equipoVisitante: "Nigeria",
    flagLocal: "co",
    flagVisitante: "ng",
    estadio: "BC Place",
    fase: "GRUPO E",
  },
  {
    id: 27,
    fecha: "2026-06-19",
    hora: "16:00",
    equipoLocal: "España",
    equipoVisitante: "Colombia",
    flagLocal: "es",
    flagVisitante: "co",
    estadio: "SoFi Stadium",
    fase: "GRUPO E",
  },
  {
    id: 28,
    fecha: "2026-06-19",
    hora: "20:00",
    equipoLocal: "Dinamarca",
    equipoVisitante: "Nigeria",
    flagLocal: "dk",
    flagVisitante: "ng",
    estadio: "Arrowhead Stadium",
    fase: "GRUPO E",
  },
  {
    id: 29,
    fecha: "2026-06-23",
    hora: "18:00",
    equipoLocal: "Nigeria",
    equipoVisitante: "España",
    flagLocal: "ng",
    flagVisitante: "es",
    estadio: "MetLife Stadium",
    fase: "GRUPO E",
  },
  {
    id: 30,
    fecha: "2026-06-23",
    hora: "18:00",
    equipoLocal: "Colombia",
    equipoVisitante: "Dinamarca",
    flagLocal: "co",
    flagVisitante: "dk",
    estadio: "Estadio Azteca",
    fase: "GRUPO E",
  },

  // =========================
  // GRUPO F
  // =========================
  {
    id: 31,
    fecha: "2026-06-16",
    hora: "15:00",
    equipoLocal: "Alemania",
    equipoVisitante: "Suecia",
    flagLocal: "de",
    flagVisitante: "se",
    estadio: "BMO Field",
    fase: "GRUPO F",
  },
  {
    id: 32,
    fecha: "2026-06-16",
    hora: "19:00",
    equipoLocal: "Países Bajos",
    equipoVisitante: "Ecuador",
    flagLocal: "nl",
    flagVisitante: "ec",
    estadio: "Lumen Field",
    fase: "GRUPO F",
  },

  // =========================
  // GRUPO G
  // =========================
  {
    id: 33,
    fecha: "2026-06-17",
    hora: "15:00",
    equipoLocal: "Italia",
    equipoVisitante: "Serbia",
    flagLocal: "it",
    flagVisitante: "rs",
    estadio: "Rose Bowl",
    fase: "GRUPO G",
  },
  {
    id: 34,
    fecha: "2026-06-17",
    hora: "19:00",
    equipoLocal: "Bélgica",
    equipoVisitante: "Costa Rica",
    flagLocal: "be",
    flagVisitante: "cr",
    estadio: "NRG Stadium",
    fase: "GRUPO G",
  },

  // =========================
  // GRUPO H
  // =========================
  {
    id: 35,
    fecha: "2026-06-18",
    hora: "15:00",
    equipoLocal: "Croacia",
    equipoVisitante: "Australia",
    flagLocal: "hr",
    flagVisitante: "au",
    estadio: "Gillette Stadium",
    fase: "GRUPO H",
  },
  {
    id: 36,
    fecha: "2026-06-18",
    hora: "19:00",
    equipoLocal: "Turquía",
    equipoVisitante: "Egipto",
    flagLocal: "tr",
    flagVisitante: "eg",
    estadio: "Hard Rock Stadium",
    fase: "GRUPO H",
  },

  // =========================
  // GRUPO I
  // =========================
  {
    id: 37,
    fecha: "2026-06-19",
    hora: "15:00",
    equipoLocal: "Noruega",
    equipoVisitante: "Austria",
    flagLocal: "no",
    flagVisitante: "at",
    estadio: "BC Place",
    fase: "GRUPO I",
  },
  {
    id: 38,
    fecha: "2026-06-19",
    hora: "19:00",
    equipoLocal: "Chile",
    equipoVisitante: "Irán",
    flagLocal: "cl",
    flagVisitante: "ir",
    estadio: "Levi's Stadium",
    fase: "GRUPO I",
  },

  // =========================
  // GRUPO J
  // =========================
  {
    id: 39,
    fecha: "2026-06-20",
    hora: "15:00",
    equipoLocal: "Perú",
    equipoVisitante: "Ghana",
    flagLocal: "pe",
    flagVisitante: "gh",
    estadio: "Arrowhead Stadium",
    fase: "GRUPO J",
  },
  {
    id: 40,
    fecha: "2026-06-20",
    hora: "19:00",
    equipoLocal: "Ucrania",
    equipoVisitante: "Túnez",
    flagLocal: "ua",
    flagVisitante: "tn",
    estadio: "Mercedes-Benz Stadium",
    fase: "GRUPO J",
  },

  // =========================
  // GRUPO K
  // =========================
  {
    id: 41,
    fecha: "2026-06-21",
    hora: "15:00",
    equipoLocal: "Camerún",
    equipoVisitante: "Arabia Saudita",
    flagLocal: "cm",
    flagVisitante: "sa",
    estadio: "MetLife Stadium",
    fase: "GRUPO K",
  },
  {
    id: 42,
    fecha: "2026-06-21",
    hora: "19:00",
    equipoLocal: "República Checa",
    equipoVisitante: "Paraguay",
    flagLocal: "cz",
    flagVisitante: "py",
    estadio: "SoFi Stadium",
    fase: "GRUPO K",
  },

  // =========================
  // GRUPO L
  // =========================
  {
    id: 43,
    fecha: "2026-06-22",
    hora: "15:00",
    equipoLocal: "Argelia",
    equipoVisitante: "Nueva Zelanda",
    flagLocal: "dz",
    flagVisitante: "nz",
    estadio: "AT&T Stadium",
    fase: "GRUPO L",
  },
  {
    id: 44,
    fecha: "2026-06-22",
    hora: "19:00",
    equipoLocal: "Grecia",
    equipoVisitante: "Panamá",
    flagLocal: "gr",
    flagVisitante: "pa",
    estadio: "Lincoln Financial Field",
    fase: "GRUPO L",
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
            "GRUPO D",
            "GRUPO E",
            "GRUPO F",
            "GRUPO G",
            "GRUPO H",
            "GRUPO I",
            "GRUPO J",
            "GRUPO K",
            "GRUPO L",
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
