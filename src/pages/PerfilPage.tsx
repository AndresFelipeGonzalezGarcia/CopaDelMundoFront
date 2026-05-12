import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Componentes de Utilidad ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: "1.25rem",
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

export default function PerfilPage() {
  const navigate = useNavigate();
  // Simulamos los datos del usuario conectado
  const [usuario] = useState({
    nombre: "Andrés",
    correo: "andres@mundialtotal.com",
    rango: "Leyenda",
    puntos: 125,
    laminas: 4,
    fechaRegistro: "Mayo 2026",
  });

  const [notificaciones, setNotificaciones] = useState(true);

  const handleLogout = () => {
    // Aquí luego limpiarás el token guardado con ayuda del backend
    navigate("/"); // Lo mandamos de vuelta a la Landing
  };

  return (
    <PageShell>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "2.5rem 3rem",
          minHeight: "calc(100vh - 66px - 100px)",
        }}
      >
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel>Mi Cuenta</SectionLabel>
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
            Panel de <span style={{ color: T.gold }}>Jugador</span>
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2.5fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* COLUMNA IZQUIERDA: TARJETA DE USUARIO */}
          <div
            style={{
              background: T.bg2,
              border: `1px solid ${T.borderGold}`,
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100px",
                background: `linear-gradient(145deg, ${T.gold}44, transparent)`,
                borderBottom: `1px solid ${T.borderGold}`,
              }}
            />

            <div
              style={{
                padding: "0 2rem 2rem",
                textAlign: "center",
                marginTop: "-50px",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: T.bg0,
                  border: `2px solid ${T.gold}`,
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  position: "relative",
                  zIndex: 2,
                  boxShadow: `0 0 20px ${T.gold}44`,
                }}
              ></div>

              <h2
                style={{
                  fontFamily: T.fontDisplay,
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: T.white,
                  margin: "0 0 0.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {usuario.nombre}
              </h2>
              <p
                style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.8rem",
                  color: T.gray,
                  margin: "0 0 1rem",
                }}
              >
                {usuario.correo}
              </p>

              <div
                style={{
                  display: "inline-block",
                  background: T.bg3,
                  border: `1px solid ${T.gold}`,
                  color: T.gold,
                  fontFamily: T.fontDisplay,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  padding: "0.3rem 1rem",
                  borderRadius: "2px",
                  marginBottom: "2rem",
                }}
              >
                RANGO: {usuario.rango}
              </div>

              <div
                style={{
                  borderTop: `1px dashed ${T.border}`,
                  paddingTop: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    color: T.grayLight,
                    border: `1px solid ${T.border}`,
                    padding: "0.8rem",
                    borderRadius: "2px",
                    fontFamily: T.fontDisplay,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = T.white;
                    e.currentTarget.style.color = T.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.color = T.grayLight;
                  }}
                >
                  EDITAR PERFIL
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    background: T.bg0,
                    color: "#ef4444",
                    border: `1px solid #ef444455`,
                    padding: "0.8rem",
                    borderRadius: "2px",
                    fontFamily: T.fontDisplay,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ef4444";
                    e.currentTarget.style.color = T.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = T.bg0;
                    e.currentTarget.style.color = "#ef4444";
                  }}
                >
                  CERRAR SESIÓN
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: ESTADÍSTICAS Y AJUSTES */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Resumen de Estadísticas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  background: T.bg2,
                  border: `1px solid ${T.border}`,
                  padding: "1.5rem",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: "0.7rem",
                    color: T.grayLight,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Puntos Polla
                </span>
                <div
                  style={{
                    fontFamily: T.fontDisplay,
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    color: T.gold,
                    lineHeight: 1,
                    marginTop: "0.5rem",
                  }}
                >
                  {usuario.puntos}
                </div>
              </div>
              <div
                style={{
                  background: T.bg2,
                  border: `1px solid ${T.border}`,
                  padding: "1.5rem",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: "0.7rem",
                    color: T.grayLight,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Láminas Álbum
                </span>
                <div
                  style={{
                    fontFamily: T.fontDisplay,
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    color: T.white,
                    lineHeight: 1,
                    marginTop: "0.5rem",
                  }}
                >
                  {usuario.laminas}
                  <span style={{ fontSize: "1rem", color: T.gray }}>/48</span>
                </div>
              </div>
              <div
                style={{
                  background: T.bg2,
                  border: `1px solid ${T.border}`,
                  padding: "1.5rem",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: "0.7rem",
                    color: T.grayLight,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Miembro Desde
                </span>
                <div
                  style={{
                    fontFamily: T.fontDisplay,
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: T.white,
                    lineHeight: 1.2,
                    marginTop: "0.5rem",
                  }}
                >
                  {usuario.fechaRegistro}
                </div>
              </div>
            </div>

            {/* Ajustes */}
            <div
              style={{
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: "4px",
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.2rem",
                  color: T.white,
                  margin: "0 0 1.5rem",
                  letterSpacing: "0.1em",
                }}
              >
                PREFERENCIAS DE CUENTA
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px dashed ${T.border}`,
                    paddingBottom: "1.5rem",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: T.fontDisplay,
                        fontSize: "1rem",
                        color: T.grayLight,
                        margin: "0 0 0.2rem",
                      }}
                    >
                      Notificaciones por Correo
                    </h4>
                    <p
                      style={{
                        fontFamily: T.fontBody,
                        fontSize: "0.8rem",
                        color: T.gray,
                        margin: 0,
                      }}
                    >
                      Recibe alertas cuando un partido esté por comenzar.
                    </p>
                  </div>
                  <button
                    onClick={() => setNotificaciones(!notificaciones)}
                    style={{
                      width: "44px",
                      height: "24px",
                      background: notificaciones ? T.gold : T.bg0,
                      border: `1px solid ${notificaciones ? T.gold : T.border}`,
                      borderRadius: "12px",
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        background: T.white,
                        borderRadius: "50%",
                        position: "absolute",
                        top: "2px",
                        left: notificaciones ? "22px" : "2px",
                        transition: "left 0.2s",
                      }}
                    />
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: T.fontDisplay,
                        fontSize: "1rem",
                        color: T.grayLight,
                        margin: "0 0 0.2rem",
                      }}
                    >
                      Contraseña
                    </h4>
                    <p
                      style={{
                        fontFamily: T.fontBody,
                        fontSize: "0.8rem",
                        color: T.gray,
                        margin: 0,
                      }}
                    >
                      Actualiza tu credencial de acceso de forma segura.
                    </p>
                  </div>
                  <button
                    style={{
                      background: "transparent",
                      color: T.gold,
                      border: `1px solid ${T.gold}`,
                      padding: "0.5rem 1rem",
                      borderRadius: "2px",
                      fontFamily: T.fontDisplay,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    CAMBIAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
