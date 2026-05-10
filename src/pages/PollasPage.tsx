import { useState, useEffect } from "react";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface PartidoPolla {
  id: number;
  equipoLocal: string;
  equipoVisitante: string;
  flagLocal: string;
  flagVisitante: string;
  fecha: string;
  estado: "CERRADO" | "ABIERTO";
}

interface RankingUsuario {
  posicion: number;
  nombre: string;
  puntos: number;
  aciertosExactos: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PARTIDOS_PRONOSTICO: PartidoPolla[] = [
  {
    id: 101,
    equipoLocal: "Colombia",
    equipoVisitante: "España",
    flagLocal: "🇨🇴",
    flagVisitante: "🇪🇸",
    fecha: "Hoy, 16:00 COT",
    estado: "ABIERTO",
  },
  {
    id: 102,
    equipoLocal: "Argentina",
    equipoVisitante: "Francia",
    flagLocal: "🇦🇷",
    flagVisitante: "🇫🇷",
    fecha: "Mañana, 13:00 COT",
    estado: "ABIERTO",
  },
  {
    id: 103,
    equipoLocal: "Brasil",
    equipoVisitante: "Alemania",
    flagLocal: "🇧🇷",
    flagVisitante: "🇩🇪",
    fecha: "14 JUN, 14:00 COT",
    estado: "ABIERTO",
  },
  {
    id: 104,
    equipoLocal: "México",
    equipoVisitante: "Canadá",
    flagLocal: "🇲🇽",
    flagVisitante: "🇨🇦",
    fecha: "Ayer",
    estado: "CERRADO",
  },
];

const RANKING_MOCK: RankingUsuario[] = [
  { posicion: 1, nombre: "Andrés G.", puntos: 125, aciertosExactos: 4 },
  { posicion: 2, nombre: "Paula S.", puntos: 110, aciertosExactos: 3 },
  { posicion: 3, nombre: "Thomas R.", puntos: 95, aciertosExactos: 2 },
  { posicion: 4, nombre: "Samuel M.", puntos: 80, aciertosExactos: 1 },
  { posicion: 5, nombre: "Profe Eulices", puntos: 45, aciertosExactos: 0 },
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
export default function PollasPage() {
  // Estado que guarda las predicciones en formato { idPartido: { local: x, visitante: y } }
  const [predicciones, setPredicciones] = useState<
    Record<number, { local: number | string; visitante: number | string }>
  >({
    104: { local: 1, visitante: 0 }, // El partido cerrado ya tiene pronóstico guardado
  });

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleScoreChange = (
    idPartido: number,
    equipo: "local" | "visitante",
    valor: string,
  ) => {
    // Solo permitimos números
    const num = valor.replace(/[^0-9]/g, "");
    setPredicciones((prev) => ({
      ...prev,
      [idPartido]: {
        ...prev[idPartido],
        [equipo]: num === "" ? "" : Number(num),
      },
    }));
  };

  const guardarPolla = () => {
    setGuardando(true);
    setMensaje(null);

    // Simulación de envío a Spring Boot
    setTimeout(() => {
      setGuardando(false);
      setMensaje("¡Pronósticos guardados exitosamente!");
      setTimeout(() => setMensaje(null), 4000);
    }, 1200);
  };

  return (
    <PageShell>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "2.5rem 3rem",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 66px - 100px)",
        }}
      >
        {/* ENCABEZADO */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel>Pronósticos y Apuestas</SectionLabel>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
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
                Polla <span style={{ color: T.gold }}>Mundialista</span>
              </h1>
              <p style={{ color: T.gray, marginTop: "0.5rem", maxWidth: 600 }}>
                Adivina los resultados exactos o el ganador de cada partido para
                acumular puntos y escalar en el ranking global.
              </p>
            </div>
            <div
              style={{
                background: T.bg2,
                border: `1px solid ${T.borderGold}`,
                padding: "0.8rem 1.5rem",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: T.fontBody,
                  fontSize: "0.7rem",
                  color: T.gray,
                  letterSpacing: "0.1em",
                }}
              >
                TUS PUNTOS ACTUALES
              </span>
              <span
                style={{
                  fontFamily: T.fontDisplay,
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: T.gold,
                  lineHeight: 1,
                }}
              >
                125
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "3rem",
            flex: 1,
            alignItems: "start",
          }}
        >
          {/* COLUMNA IZQUIERDA: PARTIDOS PARA PRONOSTICAR */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.2rem",
                  color: T.white,
                  margin: 0,
                  letterSpacing: "0.1em",
                }}
              >
                PRÓXIMOS PARTIDOS
              </h3>
              {mensaje && (
                <span
                  style={{
                    color: T.green,
                    fontFamily: T.fontBody,
                    fontSize: "0.85rem",
                    animation: "fadeIn 0.5s",
                  }}
                >
                  ✓ {mensaje}
                </span>
              )}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {PARTIDOS_PRONOSTICO.map((p) => {
                const cerrado = p.estado === "CERRADO";
                const pred = predicciones[p.id] || { local: "", visitante: "" };

                return (
                  <div
                    key={p.id}
                    style={{
                      background: T.bg2,
                      border: `1px solid ${T.border}`,
                      borderRadius: 4,
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      position: "relative",
                      opacity: cerrado ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: T.fontBody,
                          fontSize: "0.75rem",
                          color: T.gray,
                        }}
                      >
                        {p.fecha}
                      </span>
                      <span
                        style={{
                          background: cerrado ? T.bg3 : T.gold,
                          color: cerrado ? T.gray : T.bg0,
                          padding: "0.2rem 0.6rem",
                          borderRadius: 2,
                          fontFamily: T.fontDisplay,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {cerrado ? "TIEMPO AGOTADO" : "PRONÓSTICO ABIERTO"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      {/* Equipo Local */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          flex: 1,
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>{p.flagLocal}</span>
                        <span
                          style={{
                            fontFamily: T.fontDisplay,
                            color: T.white,
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {p.equipoLocal}
                        </span>
                      </div>

                      {/* Inputs de Marcador */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                          background: T.bg1,
                          padding: "0.5rem",
                          borderRadius: 3,
                          border: `1px solid ${T.border}`,
                        }}
                      >
                        <input
                          disabled={cerrado}
                          value={pred.local}
                          onChange={(e) =>
                            handleScoreChange(p.id, "local", e.target.value)
                          }
                          maxLength={2}
                          style={{
                            width: 45,
                            height: 45,
                            textAlign: "center",
                            background: T.bg3,
                            border: "none",
                            borderRadius: 2,
                            color: T.gold,
                            fontFamily: T.fontDisplay,
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            outline: "none",
                          }}
                        />
                        <span style={{ color: T.gray, fontWeight: 700 }}>
                          -
                        </span>
                        <input
                          disabled={cerrado}
                          value={pred.visitante}
                          onChange={(e) =>
                            handleScoreChange(p.id, "visitante", e.target.value)
                          }
                          maxLength={2}
                          style={{
                            width: 45,
                            height: 45,
                            textAlign: "center",
                            background: T.bg3,
                            border: "none",
                            borderRadius: 2,
                            color: T.gold,
                            fontFamily: T.fontDisplay,
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            outline: "none",
                          }}
                        />
                      </div>

                      {/* Equipo Visitante */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          flex: 1,
                          flexDirection: "row-reverse",
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>
                          {p.flagVisitante}
                        </span>
                        <span
                          style={{
                            fontFamily: T.fontDisplay,
                            color: T.white,
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {p.equipoVisitante}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={guardarPolla}
              disabled={guardando}
              style={{
                width: "100%",
                background: guardando ? T.bg3 : T.gold,
                color: guardando ? T.gray : T.bg0,
                border: "none",
                borderRadius: 3,
                padding: "1.2rem",
                fontFamily: T.fontDisplay,
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: guardando ? "wait" : "pointer",
                marginTop: "1.5rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!guardando) e.currentTarget.style.background = T.goldLight;
              }}
              onMouseLeave={(e) => {
                if (!guardando) e.currentTarget.style.background = T.gold;
              }}
            >
              {guardando ? "Sincronizando..." : "Guardar Pronósticos"}
            </button>
          </div>

          {/* COLUMNA DERECHA: RANKING */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              position: "sticky",
              top: "100px",
            }}
          >
            <div
              style={{
                background: `linear-gradient(180deg, ${T.bg2}, ${T.bg1})`,
                border: `1px solid ${T.borderGold}`,
                borderRadius: 4,
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.2rem",
                  color: T.gold,
                  margin: "0 0 1.5rem",
                  letterSpacing: "0.1em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>🏆</span> RANKING GLOBAL
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {RANKING_MOCK.map((user, index) => {
                  const isMe = user.nombre === "Andrés G.";
                  return (
                    <div
                      key={user.nombre}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.8rem 1rem",
                        background: isMe ? T.bg3 : "transparent",
                        border: `1px solid ${isMe ? T.borderGold : T.border}`,
                        borderRadius: 3,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: T.fontDisplay,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: index < 3 ? T.gold : T.gray,
                          width: 20,
                        }}
                      >
                        {user.posicion}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: T.fontDisplay,
                            fontWeight: 600,
                            color: isMe ? T.white : T.grayLight,
                            fontSize: "0.95rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {user.nombre}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: T.fontBody,
                            fontSize: "0.65rem",
                            color: T.gray,
                          }}
                        >
                          {user.aciertosExactos} aciertos exactos
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: T.fontDisplay,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: isMe ? T.gold : T.white,
                        }}
                      >
                        {user.puntos}{" "}
                        <span style={{ fontSize: "0.7rem", color: T.gray }}>
                          pts
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                background: T.bg2,
                border: `1px dashed ${T.border}`,
                borderRadius: 4,
                padding: "1.5rem",
              }}
            >
              <h4
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "0.9rem",
                  color: T.white,
                  margin: "0 0 1rem",
                  letterSpacing: "0.1em",
                }}
              >
                SISTEMA DE PUNTOS
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.2rem",
                  color: T.gray,
                  fontFamily: T.fontBody,
                  fontSize: "0.8rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <li>
                  <strong style={{ color: T.goldLight }}>+5 puntos</strong> por
                  adivinar el marcador exacto (Ej: pusiste 2-1 y quedó 2-1).
                </li>
                <li>
                  <strong style={{ color: T.goldLight }}>+3 puntos</strong> por
                  adivinar al ganador pero no el marcador (Ej: pusiste 2-0 y
                  quedó 1-0).
                </li>
                <li>
                  <strong style={{ color: T.goldLight }}>0 puntos</strong> si te
                  equivocas de ganador o empate.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
