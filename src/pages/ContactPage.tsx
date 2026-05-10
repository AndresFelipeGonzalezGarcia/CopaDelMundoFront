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

// ─── Export Principal ─────────────────────────────────────────────────────────
export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Simulamos la petición al backend de Spring Boot
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setFormData({ nombre: "", correo: "", asunto: "", mensaje: "" });

      // El mensaje de éxito desaparece después de 5 segundos
      setTimeout(() => setEnviado(false), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <SectionLabel>Soporte y Atención</SectionLabel>
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
            Ponte en <span style={{ color: T.gold }}>Contacto</span>
          </h1>
          <p
            style={{
              color: T.gray,
              marginTop: "0.5rem",
              maxWidth: 600,
              margin: "0.5rem auto 0",
            }}
          >
            ¿Tienes problemas con tu álbum o dudas sobre el calendario?
            Escríbenos y nuestro equipo de soporte te responderá a la brevedad.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            flex: 1,
          }}
        >
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div
            style={{
              background: T.bg2,
              border: `1px solid ${T.border}`,
              borderRadius: 4,
              padding: "2.5rem",
            }}
          >
            {enviado ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                    color: T.green,
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: T.fontDisplay,
                    fontSize: "1.5rem",
                    color: T.white,
                    margin: "0 0 0.5rem",
                  }}
                >
                  ¡MENSAJE ENVIADO!
                </h3>
                <p style={{ color: T.gray }}>
                  Gracias por contactarnos. El equipo revisará tu solicitud
                  pronto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: T.fontDisplay,
                    fontSize: "1.2rem",
                    color: T.white,
                    margin: "0 0 1rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ENVÍANOS UN MENSAJE
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.2rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: T.fontBody,
                        fontSize: "0.75rem",
                        color: T.grayLight,
                        marginBottom: "0.4rem",
                      }}
                    >
                      Nombre completo *
                    </label>
                    <input
                      required
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: T.bg1,
                        border: `1px solid ${T.border}`,
                        borderRadius: 3,
                        padding: "0.8rem",
                        color: T.white,
                        outline: "none",
                        fontFamily: T.fontBody,
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = T.gold)}
                      onBlur={(e) => (e.target.style.borderColor = T.border)}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: T.fontBody,
                        fontSize: "0.75rem",
                        color: T.grayLight,
                        marginBottom: "0.4rem",
                      }}
                    >
                      Correo electrónico *
                    </label>
                    <input
                      required
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: T.bg1,
                        border: `1px solid ${T.border}`,
                        borderRadius: 3,
                        padding: "0.8rem",
                        color: T.white,
                        outline: "none",
                        fontFamily: T.fontBody,
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = T.gold)}
                      onBlur={(e) => (e.target.style.borderColor = T.border)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: T.fontBody,
                      fontSize: "0.75rem",
                      color: T.grayLight,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Asunto *
                  </label>
                  <input
                    required
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      background: T.bg1,
                      border: `1px solid ${T.border}`,
                      borderRadius: 3,
                      padding: "0.8rem",
                      color: T.white,
                      outline: "none",
                      fontFamily: T.fontBody,
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = T.gold)}
                    onBlur={(e) => (e.target.style.borderColor = T.border)}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: T.fontBody,
                      fontSize: "0.75rem",
                      color: T.grayLight,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Mensaje *
                  </label>
                  <textarea
                    required
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    style={{
                      width: "100%",
                      background: T.bg1,
                      border: `1px solid ${T.border}`,
                      borderRadius: 3,
                      padding: "0.8rem",
                      color: T.white,
                      outline: "none",
                      fontFamily: T.fontBody,
                      transition: "border-color 0.2s",
                      resize: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = T.gold)}
                    onBlur={(e) => (e.target.style.borderColor = T.border)}
                  />
                </div>

                <button
                  disabled={enviando}
                  type="submit"
                  style={{
                    background: enviando ? T.bg3 : T.gold,
                    color: enviando ? T.gray : T.bg0,
                    border: "none",
                    borderRadius: 3,
                    padding: "1rem",
                    fontFamily: T.fontDisplay,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: enviando ? "wait" : "pointer",
                    transition: "all 0.2s",
                    marginTop: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!enviando) e.currentTarget.style.background = T.white;
                  }}
                  onMouseLeave={(e) => {
                    if (!enviando) e.currentTarget.style.background = T.gold;
                  }}
                >
                  {enviando ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                </button>
              </form>
            )}
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN Y EQUIPO */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${T.bg2}, ${T.bg1})`,
                border: `1px solid ${T.borderGold}`,
                borderRadius: 4,
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "-10%",
                  top: "-10%",
                  fontSize: "8rem",
                  opacity: 0.05,
                }}
              >
                🏆
              </div>
              <h3
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.2rem",
                  color: T.gold,
                  margin: "0 0 1.5rem",
                  letterSpacing: "0.1em",
                }}
              >
                INFORMACIÓN OFICIAL
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: T.fontDisplay,
                      color: T.white,
                      margin: "0 0 0.2rem",
                      fontSize: "0.9rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    SEDE UNIVERSITARIA
                  </p>
                  <p
                    style={{
                      fontFamily: T.fontBody,
                      color: T.gray,
                      margin: 0,
                      fontSize: "0.85rem",
                    }}
                  >
                    Universidad El Bosque
                    <br />
                    Bogotá, Colombia
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: T.fontDisplay,
                      color: T.white,
                      margin: "0 0 0.2rem",
                      fontSize: "0.9rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    CORREO ELECTRÓNICO
                  </p>
                  <p
                    style={{
                      fontFamily: T.fontBody,
                      color: T.gray,
                      margin: 0,
                      fontSize: "0.85rem",
                    }}
                  >
                    soporte@mundialtotal2026.edu.co
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 4,
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
                EQUIPO DE DESARROLLO
              </h3>
              <p
                style={{
                  fontFamily: T.fontBody,
                  color: T.grayLight,
                  fontSize: "0.85rem",
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                }}
              >
                Este proyecto fue desarrollado por estudiantes de quinto
                semestre de Ingeniería de Sistemas:
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {["Andrés", "Thomas", "Paula", "Samuel"].map((nombre) => (
                  <div
                    key={nombre}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        background: T.gold,
                        borderRadius: "50%",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: T.fontDisplay,
                        color: T.white,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontSize: "0.85rem",
                      }}
                    >
                      {nombre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
