import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell, T } from "../components/layout/PageShell";
import imagen from "../assets/copaP.png";

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
}
interface GrupoPos {
  grupo: string;
  lider: string;
  pts: number;
}
interface Noticia {
  id: number;
  titulo: string;
  imagen: string;
  categoria: string;
  minutos: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PARTIDOS: Partido[] = [
  {
    id: 1,
    fecha: "14 JUN",
    hora: "14:00",
    equipoLocal: "Brasil",
    equipoVisitante: "Alemania",
    flagLocal: "🇧🇷",
    flagVisitante: "🇩🇪",
    estadio: "Lusail Stadium",
  },
  {
    id: 2,
    fecha: "15 JUN",
    hora: "17:00",
    equipoLocal: "Argentina",
    equipoVisitante: "Francia",
    flagLocal: "🇦🇷",
    flagVisitante: "🇫🇷",
    estadio: "Al Bayt Stadium",
  },
  {
    id: 3,
    fecha: "16 JUN",
    hora: "20:00",
    equipoLocal: "Colombia",
    equipoVisitante: "España",
    flagLocal: "🇨🇴",
    flagVisitante: "🇪🇸",
    estadio: "Education City",
  },
  {
    id: 4,
    fecha: "17 JUN",
    hora: "14:00",
    equipoLocal: "Portugal",
    equipoVisitante: "Inglaterra",
    flagLocal: "🇵🇹",
    flagVisitante: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    estadio: "Khalifa Intl.",
  },
];
const GRUPOS: GrupoPos[] = [
  { grupo: "A", lider: "Brasil", pts: 9 },
  { grupo: "B", lider: "España", pts: 7 },
  { grupo: "C", lider: "Argentina", pts: 9 },
  { grupo: "D", lider: "Francia", pts: 6 },
  { grupo: "E", lider: "Alemania", pts: 7 },
  { grupo: "F", lider: "Portugal", pts: 9 },
  { grupo: "G", lider: "Uruguay", pts: 6 },
  { grupo: "H", lider: "Colombia", pts: 7 },
];
const NOTICIAS: Noticia[] = [
  {
    id: 1,
    titulo: "Messi rompe otro récord en el mundial",
    imagen:
      "https://images.unsplash.com/photo-1551958219-acbc630e2914?w=400&h=220&fit=crop",
    categoria: "DESTACADO",
    minutos: 12,
  },
  {
    id: 2,
    titulo: "Mbappé lidera a Francia con hat-trick",
    imagen:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&h=80&fit=crop",
    categoria: "ANÁLISIS",
    minutos: 38,
  },
  {
    id: 3,
    titulo: "Colombia vence a España en choque histórico",
    imagen:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&h=80&fit=crop",
    categoria: "NOTICIAS",
    minutos: 65,
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
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          width: 3,
          height: 16,
          background: T.gold,
          borderRadius: 1,
          flexShrink: 0,
        }}
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

// ─── HERO CON LA COPA DEL MUNDO ───
function Hero({ onExplorar }: { onExplorar: () => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const mundial = new Date("2026-06-11T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = mundial - now;

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        height: 600,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Fondo de Estadio con mayor contraste */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://www.tudn.com/_next/image?url=https%3A%2F%2Fst1.uvnimg.com%2F53%2F8d%2Fc17fd25e4e4d8bf1c6d19962a1b1%2Fwc-omb-fw25-trophy-mexico-1-16x9.jpg&w=1280&q=75')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2) saturate(0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${T.bg0} 0%, ${T.bg0}cc 40%, transparent 100%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          padding: "0 4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Columna Texto */}
        <div
          style={{
            flex: "1 1 55%",
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateX(-30px)",
            transition: "all 1s ease-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ width: 30, height: 1, background: T.gold }} />
            <span
              style={{
                fontFamily: T.fontDisplay,
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                color: T.gold,
                textTransform: "uppercase",
              }}
            >
              FIFA World Cup 2026 · Universidad El Bosque
            </span>
          </div>

          <h1
            style={{
              fontFamily: T.fontDisplay,
              fontWeight: 700,
              fontSize: "clamp(3.5rem, 6vw, 5rem)",
              lineHeight: 0.9,
              margin: "0 0 1.5rem",
              color: T.white,
              textTransform: "uppercase",
            }}
          >
            EL TROFEO
            <br />
            <span style={{ color: T.gold }}>MÁS DESEADO</span>
          </h1>

          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: "1rem",
              color: T.grayLight,
              margin: "0 0 3rem",
              maxWidth: 450,
              lineHeight: 1.8,
            }}
          >
            Bienvenido al centro de operaciones de tu mundial. Sigue los
            partidos, compite con tus amigos y completa tu colección de
            banderas.
          </p>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <button
              onClick={onExplorar}
              style={{
                background: T.gold,
                color: T.bg0,
                border: "none",
                borderRadius: 2,
                padding: "1rem 2.5rem",
                fontFamily: T.fontDisplay,
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: `0 10px 20px ${T.gold}33`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = T.goldLight)
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
            >
              VER CALENDARIO
            </button>
          </div>
        </div>

        {/* Columna de la Copa */}
        <div
          style={{
            flex: "1 1 45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            opacity: ready ? 1 : 0,
            transform: ready ? "scale(1)" : "scale(0.8)",
            transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "900px",
              height: "720px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* CONTADOR */}
            <div
              style={{
                position: "absolute",
                display: "flex",
                gap: "24px",
                zIndex: 1,
                top: "63%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {[
                { label: "DÍAS", value: timeLeft.dias },
                { label: "HORAS", value: timeLeft.horas },
                { label: "MIN", value: timeLeft.minutos },
                { label: "SEG", value: timeLeft.segundos },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    width: "135px",
                    height: "135px",
                    borderRadius: "30px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: `
            inset 0 0 20px rgba(255,255,255,0.05),
            0 0 25px rgba(0,0,0,0.45)
          `,
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      lineHeight: 1,
                      textShadow: "0 0 15px rgba(255,255,255,0.35)",
                    }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>

                  <span
                    style={{
                      marginTop: "12px",
                      color: "rgba(255,255,255,0.75)",
                      letterSpacing: "3px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* COPA */}
            <img
              src="https://i.pinimg.com/originals/0c/2d/32/0c2d323f7af4b8ebb5d5e5278cbe0c52.png"
              alt="Trofeo Copa del Mundo"
              style={{
                height: "720px",
                width: "auto",
                position: "absolute",
                zIndex: 5,
                filter: `
        drop-shadow(0 0 40px rgba(255,215,0,0.35))
        drop-shadow(0 0 80px rgba(255,215,0,0.15))
      `,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Componentes de Grid ───
function ColPartidos({ partidos }: { partidos: Partido[] }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div
      style={{
        padding: "2.5rem",
        borderRight: `1px solid ${T.border}`,
        minWidth: 0,
      }}
    >
      <SectionLabel>Próximos Partidos</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {partidos.map((p, i) => (
          <div
            key={p.id}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              background: hov === i ? T.bg3 : T.bg2,
              border: `1px solid ${hov === i ? T.borderGold : T.border}`,
              borderRadius: 3,
              padding: "1.2rem",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.8rem",
              }}
            >
              <span
                style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.65rem",
                  color: T.gray,
                }}
              >
                {p.estadio}
              </span>
              <span
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "0.7rem",
                  color: T.gold,
                  letterSpacing: "0.1em",
                }}
              >
                {p.fecha} · {p.hora}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.8rem" }}>{p.flagLocal}</span>
                <span
                  style={{
                    fontFamily: T.fontDisplay,
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: T.white,
                  }}
                >
                  {p.equipoLocal.toUpperCase()}
                </span>
              </div>
              <span
                style={{ color: T.border, fontWeight: 800, fontSize: "0.8rem" }}
              >
                VS
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexDirection: "row-reverse",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{p.flagVisitante}</span>
                <span
                  style={{
                    fontFamily: T.fontDisplay,
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: T.white,
                  }}
                >
                  {p.equipoVisitante.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColPosiciones({ grupos }: { grupos: GrupoPos[] }) {
  return (
    <div
      style={{
        padding: "2.5rem",
        borderRight: `1px solid ${T.border}`,
        minWidth: 0,
      }}
    >
      <SectionLabel>Líderes de Grupo</SectionLabel>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem" }}
      >
        {grupos.slice(0, 5).map((g) => (
          <div
            key={g.grupo}
            style={{
              background: T.bg2,
              border: `1px solid ${T.border}`,
              borderRadius: 3,
              padding: "0.8rem 1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: T.gold,
                  color: T.bg0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: T.fontDisplay,
                  fontWeight: 800,
                  fontSize: "0.75rem",
                }}
              >
                {g.grupo}
              </div>
              <span
                style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.9rem",
                  color: T.white,
                }}
              >
                {g.lider}
              </span>
            </div>
            <span
              style={{
                fontFamily: T.fontDisplay,
                fontSize: "0.9rem",
                color: T.gold,
                fontWeight: 700,
              }}
            >
              {g.pts} PTS
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColNoticias({ noticias }: { noticias: Noticia[] }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ padding: "2.5rem", minWidth: 0 }}>
      <SectionLabel>Última Hora</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {noticias.map((n, i) => (
          <div
            key={n.id}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: "flex",
              gap: 15,
              background: hov === i ? T.bg3 : T.bg2,
              border: `1px solid ${hov === i ? T.borderGold : T.border}`,
              borderRadius: 4,
              padding: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <img
              src={n.imagen}
              alt="news"
              style={{
                width: 70,
                height: 60,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: T.gold,
                  letterSpacing: "0.1em",
                }}
              >
                {n.categoria}
              </span>
              <p
                style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.85rem",
                  color: T.white,
                  margin: "2px 0 0",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {n.titulo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [grupos, setGrupos] = useState<GrupoPos[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setPartidos(PARTIDOS);
      setGrupos(GRUPOS);
      setNoticias(NOTICIAS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Lista de Sponsors Oficiales
  const sponsors = [
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Logo_Adidas.png",
    "https://cdn.worldvectorlogo.com/logos/coca-cola-2021.svg",
    "https://cdn.worldvectorlogo.com/logos/visa-10.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/3840px-McDonald%27s_Golden_Arches.svg.png",
    "https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Logo.png",
    "https://www.freelogovectors.net/wp-content/uploads/2023/09/qatar_airways_logo-freelogovectors.net_.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/3840px-Lenovo_logo_2015.svg.png",
  ];

  return (
    <PageShell>
      {/* 1. SECCIÓN HERO */}
      <Hero onExplorar={() => navigate("/calendario")} />

      {/* 3. MARQUESINA DE SPONSORS INFINITA Y UNIFORME */}
      <div
        style={{
          background: T.bg1,
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
          padding: "1.5rem 0",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <style>{`
    @keyframes marquee-sponsors {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .sponsors-track {
      display: flex;
      width: max-content; 
      animation: marquee-sponsors 45s linear infinite;
    }

    /* Contenedor individual para cada logo */
    .sponsor-slot {
      width: 180px; /* Ancho fijo para cada "estación" del logo */
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0; /* EVITA QUE SE AMONTONEN */
      padding: 0 1rem;
    }

    .sponsor-logo-img {
      max-height: 30px; /* Altura máxima uniforme */
      max-width: 130px; /* Ancho máximo para logos muy largos */
      object-fit: contain; /* Mantiene la proporción sin deformar */
      filter: grayscale(1) invert(1);
      opacity: 0.3;
      transition: all 0.3s ease;
    }

    .sponsor-slot:hover .sponsor-logo-img {
      opacity: 1;
      transform: scale(1.1);
      filter: grayscale(0) invert(0); /* Opcional: recupera color original al pasar el mouse */
    }
  `}</style>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Etiqueta fija lateral */}
          <div
            style={{
              background: T.bg1,
              padding: "0 2.5rem",
              zIndex: 10,
              borderRight: `1px solid ${T.border}`,
              boxShadow: `10px 0 15px ${T.bg1}`, // Sombra para difuminar la entrada de logos
            }}
          >
            <span
              style={{
                fontFamily: T.fontDisplay,
                fontSize: "0.65rem",
                color: T.gray,
                fontWeight: 700,
                letterSpacing: "0.2em",
              }}
            >
              OFFICIAL PARTNERS
            </span>
          </div>

          <div className="sponsors-track">
            {/* Repetimos la secuencia 3 veces para garantizar que no haya huecos */}
            {[1, 2, 3].map((bloque) => (
              <div key={bloque} style={{ display: "flex" }}>
                {sponsors.map((logo, idx) => (
                  <div className="sponsor-slot" key={`${bloque}-${idx}`}>
                    <img
                      src={logo}
                      className="sponsor-logo-img"
                      alt="Sponsor Oficial Mundial"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 4. GRID DE CONTENIDO PRINCIPAL */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          padding: "4rem 0",
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "10rem",
              fontFamily: T.fontDisplay,
              letterSpacing: "0.3em",
              color: T.gray,
            }}
          >
            SINCRONIZANDO DATOS DEL MUNDIAL...
          </div>
        ) : (
          <div
            style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr" }}
          >
            <ColPartidos partidos={partidos} />
            <ColPosiciones grupos={grupos} />
            <ColNoticias noticias={noticias} />
          </div>
        )}
      </div>
    </PageShell>
  );
}
