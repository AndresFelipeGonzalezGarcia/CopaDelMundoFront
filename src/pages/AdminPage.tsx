import { useState } from "react";
import { PageShell, T } from "../components/layout/PageShell";

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

export default function AdminPage() {
  const [tab, setTab] = useState<"PARTIDOS" | "USUARIOS" | "VENTAS">(
    "PARTIDOS",
  );

  return (
    <PageShell>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "2.5rem 3rem",
          minHeight: "calc(100vh - 66px)",
        }}
      >
        {/* ENCABEZADO DE ADMIN */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel>Consola de Mando</SectionLabel>
          <h1
            style={{
              fontFamily: T.fontDisplay,
              fontWeight: 700,
              fontSize: "2.5rem",
              color: T.white,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Admin <span style={{ color: T.gold }}>Control Panel</span>
          </h1>
        </div>

        {/* INDICADORES RÁPIDOS (KPIs) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { label: "Usuarios Totales", val: "1,240", color: T.white },
            { label: "Ingresos Totales", val: "$4'250.000", color: T.green },
            { label: "Pollas Activas", val: "856", color: T.gold },
            { label: "Tickets Vendidos", val: "142", color: "#a855f7" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              style={{
                background: T.bg2,
                border: `1px solid ${T.border}`,
                padding: "1.5rem",
                borderRadius: 4,
              }}
            >
              <span
                style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.7rem",
                  color: T.gray,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {kpi.label}
              </span>
              <div
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.8rem",
                  color: kpi.color,
                  marginTop: "0.5rem",
                }}
              >
                {kpi.val}
              </div>
            </div>
          ))}
        </div>

        {/* NAVEGACIÓN DE MÓDULOS */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          {(["PARTIDOS", "USUARIOS", "VENTAS"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                padding: "1rem 2rem",
                cursor: "pointer",
                fontFamily: T.fontDisplay,
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: tab === t ? T.gold : T.gray,
                borderBottom: tab === t ? `2px solid ${T.gold}` : "none",
                transition: "all 0.2s",
              }}
            >
              GESTIÓN DE {t}
            </button>
          ))}
        </div>

        {/* CONTENIDO DINÁMICO SEGÚN TAB */}
        <div
          style={{
            background: T.bg2,
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {tab === "PARTIDOS" && (
            <div style={{ padding: "2rem" }}>
              <h3
                style={{
                  fontFamily: T.fontDisplay,
                  color: T.white,
                  marginBottom: "1.5rem",
                }}
              >
                REPORTAR RESULTADOS OFICIALES
              </h3>
              <p
                style={{
                  color: T.gray,
                  fontSize: "0.85rem",
                  marginBottom: "2rem",
                }}
              >
                Ingresa los marcadores finales para que el sistema de pollas
                calcule los puntos automáticamente.
              </p>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${T.border}`,
                      color: T.gray,
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                    }}
                  >
                    <th style={{ padding: "1rem" }}>Partido</th>
                    <th style={{ padding: "1rem" }}>Marcador Real</th>
                    <th style={{ padding: "1rem" }}>Estado</th>
                    <th style={{ padding: "1rem" }}>Acción</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    color: T.white,
                    fontFamily: T.fontBody,
                    fontSize: "0.9rem",
                  }}
                >
                  {[
                    {
                      id: 1,
                      local: "Brasil",
                      visit: "Alemania",
                      score: "2 - 1",
                      estado: "FINALIZADO",
                    },
                    {
                      id: 2,
                      local: "Colombia",
                      visit: "España",
                      score: "",
                      estado: "EN JUEGO",
                    },
                  ].map((p) => (
                    <tr
                      key={p.id}
                      style={{ borderBottom: `1px solid ${T.border}` }}
                    >
                      <td style={{ padding: "1.5rem 1rem" }}>
                        {p.local} vs {p.visit}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <input
                          defaultValue={p.score}
                          style={{
                            background: T.bg1,
                            border: `1px solid ${T.border}`,
                            color: T.gold,
                            padding: "0.4rem",
                            width: "60px",
                            textAlign: "center",
                            fontFamily: T.fontDisplay,
                          }}
                        />
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            background:
                              p.estado === "FINALIZADO" ? T.bg3 : T.gold,
                            color: p.estado === "FINALIZADO" ? T.gray : T.bg0,
                            padding: "0.2rem 0.5rem",
                            borderRadius: 2,
                            fontWeight: 700,
                          }}
                        >
                          {p.estado}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <button
                          style={{
                            background: T.gold,
                            border: "none",
                            color: T.bg0,
                            padding: "0.4rem 1rem",
                            borderRadius: 2,
                            fontFamily: T.fontDisplay,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          ACTUALIZAR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "USUARIOS" && (
            <div
              style={{ padding: "4rem", textAlign: "center", color: T.gray }}
            >
              <p>
                Módulo de gestión de base de datos de usuarios (CRUD) habilitado
                para RAUL Y JUIANDA.
              </p>
            </div>
          )}

          {tab === "VENTAS" && (
            <div
              style={{ padding: "4rem", textAlign: "center", color: T.gray }}
            >
              <p>Historial de transacciones de la pasarela de pagos.</p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
