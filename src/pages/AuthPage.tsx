import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Tokens de diseño locales (reemplaza con T de PageShell si prefieres)
const gold = "#c99722";
const goldLight = "#e0b040";
const bg = "#060810";
const bgCard = "#0d1120";
const bgInput = "#070a14";
const border = "#161c30";
const borderGold = "#c9972233";
const gray = "#3a4258";
const grayDark = "#2d3550";
const fontDisplay = "'Bebas Neue', sans-serif";
const fontBody = "'DM Sans', sans-serif";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      navigate("/dashboard");
    }, 1800);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: bgInput,
    border: `1px solid ${focusedField === field ? goldLight + "55" : border}`,
    borderRadius: "3px",
    padding: "0.85rem 1rem 0.85rem 2.7rem",
    color: gold,
    fontFamily: fontBody,
    fontSize: "0.95rem",
    fontWeight: 400,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box" as const,
  });

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "15px",
    pointerEvents: "none",
    color: gray,
    transition: "color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.68rem",
    fontWeight: 500,
    color: "#3d4560",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "0.4rem",
    fontFamily: fontBody,
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        .auth-input::placeholder { color: #232b40; }
        .auth-tab { transition: color 0.2s; }
        .auth-tab:hover { color: ${gold}88 !important; }
        .auth-submit:hover { background-position: 100% 0 !important; transform: translateY(-1px); }
        .auth-submit:active { transform: translateY(0) !important; }
        .auth-submit::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.4s;
        }
        .auth-submit:hover::before { left: 150%; }
        .auth-note-link { cursor: pointer; border-bottom: 1px solid ${grayDark}; padding-bottom: 1px; transition: color 0.2s, border-color 0.2s; }
        .auth-note-link:hover { color: ${gold} !important; border-color: ${gold} !important; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeField { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .auth-card { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1); }
        .name-field { animation: fadeField 0.3s ease both; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          position: "relative",
          overflow: "hidden",
          fontFamily: fontBody,
        }}
      >
        {/* Líneas de cancha SVG de fondo */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.06,
          }}
          viewBox="0 0 600 500"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="300"
            cy="250"
            r="80"
            fill="none"
            stroke={gold}
            strokeWidth="1"
          />
          <circle cx="300" cy="250" r="4" fill={gold} />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="500"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="50"
            y="150"
            width="140"
            height="200"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="50"
            y="190"
            width="55"
            height="120"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="410"
            y="150"
            width="140"
            height="200"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="495"
            y="190"
            width="55"
            height="120"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
          <rect
            x="10"
            y="10"
            width="580"
            height="480"
            fill="none"
            stroke={gold}
            strokeWidth="0.8"
          />
        </svg>

        {/* Halos de luz */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "300px",
            background: `radial-gradient(ellipse, ${gold}33 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-100px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "250px",
            height: "400px",
            background: `radial-gradient(ellipse, ${gold}11 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-100px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "250px",
            height: "400px",
            background: `radial-gradient(ellipse, ${gold}11 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Tarjeta principal */}
        <div
          className="auth-card"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "420px",
            background: `linear-gradient(160deg, ${bgCard} 0%, #080c18 100%)`,
            border: `1px solid ${borderGold}`,
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
            margin: "1rem",
          }}
        >
          {/* Barra superior dorada */}
          <div
            style={{
              height: "3px",
              background: `linear-gradient(90deg, transparent, ${gold}, ${goldLight}, ${gold}, transparent)`,
            }}
          />

          <div style={{ padding: "2.5rem 2.8rem 3rem" }}>
            {/* Brand */}
            <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "0.6rem",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="19"
                    stroke={gold}
                    strokeWidth="1.5"
                  />
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
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: "2rem",
                    letterSpacing: "0.2em",
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  MUNDIAL <span style={{ color: gold }}>TOTAL</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "center",
                  margin: "0.7rem 0",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${gold}66)`,
                  }}
                />
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#5a6278",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase" as const,
                    fontWeight: 500,
                  }}
                >
                  {isLogin ? "Acceso de Jugador" : "Registro de Contendiente"}
                </div>
                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: `linear-gradient(90deg, ${gold}66, transparent)`,
                  }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: `1px solid #1a2035`,
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Entrar", value: true },
                { label: "Registro", value: false },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  className="auth-tab"
                  onClick={() => setIsLogin(value)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    padding: "0.7rem 0 0.8rem",
                    fontFamily: fontBody,
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    cursor: "pointer",
                    color: isLogin === value ? gold : gray,
                    position: "relative",
                  }}
                >
                  {label}
                  {isLogin === value && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-1px",
                        left: "10%",
                        width: "80%",
                        height: "2px",
                        background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
                        display: "block",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
              }}
            >
              {/* Campo nombre (solo registro) */}
              {!isLogin && (
                <div className="name-field">
                  <label style={labelStyle}>Nombre de usuario</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="auth-input"
                      required
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="tu_nombre"
                      autoComplete="off"
                      style={inputStyle("nombre")}
                      onFocus={() => setFocusedField("nombre")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <i
                      className="ti ti-user"
                      style={iconStyle}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label style={labelStyle}>Correo electrónico</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="auth-input"
                    required
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                    style={inputStyle("correo")}
                    onFocus={() => setFocusedField("correo")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <i
                    className="ti ti-mail"
                    style={iconStyle}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label style={labelStyle}>Contraseña</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="auth-input"
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    style={inputStyle("password")}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <i
                    className="ti ti-lock"
                    style={iconStyle}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={cargando}
                className="auth-submit"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  background: cargando
                    ? "#1a2035"
                    : `linear-gradient(90deg, #b8861e, ${gold}, ${goldLight}, ${gold}, #b8861e)`,
                  backgroundSize: "200% 100%",
                  border: "none",
                  borderRadius: "3px",
                  padding: "1rem",
                  fontFamily: fontDisplay,
                  fontSize: "1.1rem",
                  letterSpacing: "0.25em",
                  color: cargando ? gray : bg,
                  cursor: cargando ? "wait" : "pointer",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {cargando
                  ? "Sincronizando..."
                  : isLogin
                    ? "Jugar Ahora"
                    : "Entrar a la Arena"}
              </button>
            </form>

            {/* Nota inferior */}
            <div
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontSize: "0.72rem",
                color: grayDark,
                fontFamily: fontBody,
              }}
            >
              {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <span
                className="auth-note-link"
                style={{ color: "#5a6880" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Regístrate gratis" : "Inicia sesión"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
