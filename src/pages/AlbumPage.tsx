import { useState, useEffect } from "react";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos y Configuración ──────────────────────────────────────────────────
interface PaisAlbum {
  id: number;
  nombre: string;
  iso: string;
}

interface SeccionAlbum {
  nombre: string;
  icono: string;
  paises: PaisAlbum[];
}

type TipoSobre = "NORMAL" | "PLATA" | "ORO";

const CONFIG_SOBRES = {
  NORMAL: {
    nombre: "Sobre Normal",
    cantidad: 3,
    descripcion: "Regalo Diario",
    gradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
  },
  PLATA: {
    nombre: "Sobre Plata",
    cantidad: 4,
    descripcion: "Especial",
    gradient: "linear-gradient(135deg, #475569, #94a3b8, #475569)",
  },
  ORO: {
    nombre: "Sobre Oro",
    cantidad: 5,
    descripcion: "Premium",
    gradient: "linear-gradient(135deg, #b8861e, #fbbf24, #b8861e)",
  },
};

const SECCIONES_ALBUM: SeccionAlbum[] = [
  {
    nombre: "GRUPO A",
    icono: "ti-circle-letter-a",
    paises: [
      { id: 1, nombre: "México", iso: "mx" },
      { id: 2, nombre: "Sudáfrica", iso: "za" },
      { id: 3, nombre: "Corea del Sur", iso: "kr" },
      { id: 4, nombre: "Uruguay", iso: "uy" },
    ],
  },
  {
    nombre: "GRUPO B",
    icono: "ti-circle-letter-b",
    paises: [
      { id: 5, nombre: "Canadá", iso: "ca" },
      { id: 6, nombre: "Bosnia", iso: "ba" },
      { id: 7, nombre: "Qatar", iso: "qa" },
      { id: 8, nombre: "Suiza", iso: "ch" },
    ],
  },
  {
    nombre: "GRUPO C",
    icono: "ti-circle-letter-c",
    paises: [
      { id: 9, nombre: "Brasil", iso: "br" },
      { id: 10, nombre: "Marruecos", iso: "ma" },
      { id: 11, nombre: "Haití", iso: "ht" },
      { id: 12, nombre: "Escocia", iso: "gb-sct" },
    ],
  },
  {
    nombre: "GRUPO D",
    icono: "ti-circle-letter-d",
    paises: [
      { id: 13, nombre: "EE. UU.", iso: "us" },
      { id: 14, nombre: "Paraguay", iso: "py" },
      { id: 15, nombre: "Australia", iso: "au" },
      { id: 16, nombre: "Turquía", iso: "tr" },
    ],
  },
  {
    nombre: "GRUPO E",
    icono: "ti-circle-letter-e",
    paises: [
      { id: 17, nombre: "Alemania", iso: "de" },
      { id: 18, nombre: "Curazao", iso: "cw" },
      { id: 19, nombre: "Costa de Marfil", iso: "ci" },
      { id: 20, nombre: "Ecuador", iso: "ec" },
    ],
  },
  {
    nombre: "GRUPO F",
    icono: "ti-circle-letter-f",
    paises: [
      { id: 21, nombre: "Países Bajos", iso: "nl" },
      { id: 22, nombre: "Japón", iso: "jp" },
      { id: 23, nombre: "Suecia", iso: "se" },
      { id: 24, nombre: "Túnez", iso: "tn" },
    ],
  },
  {
    nombre: "GRUPO G",
    icono: "ti-circle-letter-g",
    paises: [
      { id: 25, nombre: "Bélgica", iso: "be" },
      { id: 26, nombre: "Egipto", iso: "eg" },
      { id: 27, nombre: "Irán", iso: "ir" },
      { id: 28, nombre: "N. Zelanda", iso: "nz" },
    ],
  },
  {
    nombre: "GRUPO H",
    icono: "ti-circle-letter-h",
    paises: [
      { id: 29, nombre: "España", iso: "es" },
      { id: 30, nombre: "Cabo Verde", iso: "cv" },
      { id: 31, nombre: "A. Saudita", iso: "sa" },
      { id: 32, nombre: "Portugal", iso: "pt" },
    ],
  },
  {
    nombre: "GRUPO I",
    icono: "ti-circle-letter-i",
    paises: [
      { id: 33, nombre: "Francia", iso: "fr" },
      { id: 34, nombre: "Senegal", iso: "sn" },
      { id: 35, nombre: "Irak", iso: "iq" },
      { id: 36, nombre: "Noruega", iso: "no" },
    ],
  },
  {
    nombre: "GRUPO J",
    icono: "ti-circle-letter-j",
    paises: [
      { id: 37, nombre: "Argentina", iso: "ar" },
      { id: 38, nombre: "Argelia", iso: "dz" },
      { id: 39, nombre: "Austria", iso: "at" },
      { id: 40, nombre: "Jordania", iso: "jo" },
    ],
  },
  {
    nombre: "GRUPO K",
    icono: "ti-circle-letter-k",
    paises: [
      { id: 41, nombre: "Dinamarca", iso: "dk" },
      { id: 42, nombre: "R. del Congo", iso: "cg" },
      { id: 43, nombre: "Uzbekistán", iso: "uz" },
      { id: 44, nombre: "Colombia", iso: "co" },
    ],
  },
  {
    nombre: "GRUPO L",
    icono: "ti-circle-letter-l",
    paises: [
      { id: 45, nombre: "Inglaterra", iso: "gb-eng" },
      { id: 46, nombre: "Croacia", iso: "hr" },
      { id: 47, nombre: "Ghana", iso: "gh" },
      { id: 48, nombre: "Panamá", iso: "pa" },
    ],
  },
];
const TOTAL_LAMINAS = 48;

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function StickerCard({
  pais,
  obtenido,
}: {
  pais: PaisAlbum;
  obtenido: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const imgUrl = `https://flagcdn.com/w320/${pais.iso}.png`;

  if (!obtenido) {
    return (
      <div
        style={{
          aspectRatio: "3/4",
          background: T.bg2,
          border: `1px dashed ${T.border}`,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.bg3,
          fontFamily: T.fontDisplay,
          fontSize: "1.8rem",
        }}
      >
        {String(pais.id).padStart(2, "0")}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        aspectRatio: "3/4",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        background: T.bg2,
        border: `1px solid ${isHovered ? T.gold : T.border}`,
        transform: isHovered ? "translateY(-5px) scale(1.02)" : "none",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: isHovered
          ? `0 10px 20px rgba(0,0,0,0.5), 0 0 15px ${T.gold}33`
          : "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
          zIndex: 2,
        }}
      />
      <div style={{ height: "70%", background: "#000", display: "flex" }}>
        <img
          src={imgUrl}
          alt={pais.nombre}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          height: "30%",
          background: T.bg3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.4rem",
            color: T.gold,
            fontFamily: T.fontDisplay,
            letterSpacing: "1px",
          }}
        >
          FIFA WORLD CUP 2026
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: T.white,
            fontFamily: T.fontDisplay,
            fontWeight: 600,
          }}
        >
          {pais.nombre.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────────

export default function AlbumPage() {
  const [cargando, setCargando] = useState(true);
  const [misLaminas, setMisLaminas] = useState<Set<number>>(new Set());
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargandoSobre, setCargandoSobre] = useState(false);
  const [nuevasLaminas, setNuevasLaminas] = useState<PaisAlbum[] | null>(null);
  const [packAbierto, setPackAbierto] = useState<TipoSobre | null>(null);

  // 🕒 Lógica de tiempo para el sobre Normal
  const [puedeAbrirNormal, setPuedeAbrirNormal] = useState(true);

  useEffect(() => {
    const savedProgress = localStorage.getItem("progreso_album");
    if (savedProgress) setMisLaminas(new Set(JSON.parse(savedProgress)));

    const ultimaApertura = localStorage.getItem("fecha_ultimo_sobre_normal");
    const hoy = new Date().toDateString();
    if (ultimaApertura === hoy) setPuedeAbrirNormal(false);

    setTimeout(() => setCargando(false), 500);
  }, []);

  const abrirSobre = (tipo: TipoSobre) => {
    if (tipo === "NORMAL" && !puedeAbrirNormal) return;

    setPackAbierto(tipo);
    setModalAbierto(true);
    setCargandoSobre(true);

    setTimeout(() => {
      const todos = SECCIONES_ALBUM.flatMap((s) => s.paises);
      const cantidad = CONFIG_SOBRES[tipo].cantidad;

      const seleccionadas = [...todos]
        .sort(() => Math.random() - 0.5)
        .slice(0, cantidad);

      setNuevasLaminas(seleccionadas);
      setCargandoSobre(false);

      setMisLaminas((prev) => {
        const nueva = new Set(prev);
        seleccionadas.forEach((p) => nueva.add(p.id));
        localStorage.setItem(
          "progreso_album",
          JSON.stringify(Array.from(nueva)),
        );
        return nueva;
      });

      // Solo bloqueamos si el sobre abierto es el NORMAL
      if (tipo === "NORMAL") {
        const hoy = new Date().toDateString();
        localStorage.setItem("fecha_ultimo_sobre_normal", hoy);
        setPuedeAbrirNormal(false);
      }
    }, 2000);
  };

  if (cargando)
    return (
      <PageShell>
        <div
          style={{
            color: T.gold,
            textAlign: "center",
            padding: "100px",
            fontFamily: T.fontDisplay,
          }}
        >
          SINCROZINANDO ÁLBUM...
        </div>
      </PageShell>
    );

  return (
    <PageShell>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem" }}>
        {/* Cabecera */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: T.fontDisplay,
              fontSize: "3.5rem",
              color: T.white,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Colección de <span style={{ color: T.gold }}>Naciones</span>
          </h1>
          <p
            style={{
              color: T.gray,
              fontFamily: T.fontBody,
              fontSize: "0.9rem",
            }}
          >
            Completa tu álbum abriendo los sobres disponibles.
          </p>
        </div>

        {/* ─── SELECTOR DE SOBRES ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {(["NORMAL", "PLATA", "ORO"] as TipoSobre[]).map((tipo) => {
            const isNormal = tipo === "NORMAL";
            const isDisabled = isNormal && !puedeAbrirNormal;

            return (
              <div
                key={tipo}
                style={{
                  background: T.bg1,
                  border: `1px solid ${isDisabled ? T.bg2 : T.border}`,
                  padding: "2rem",
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "all 0.3s",
                  filter: isDisabled ? "grayscale(1)" : "none",
                  opacity: isDisabled ? 0.6 : 1,
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "100px",
                    background: CONFIG_SOBRES[tipo].gradient,
                    margin: "0 auto 1.5rem",
                    borderRadius: 2,
                    boxShadow: isDisabled
                      ? "none"
                      : `0 0 20px ${CONFIG_SOBRES[tipo].gradient.split(",")[1]}44`,
                  }}
                />
                <h3
                  style={{
                    fontFamily: T.fontDisplay,
                    color: T.white,
                    margin: "0 0 0.5rem",
                    fontSize: "1.2rem",
                  }}
                >
                  {CONFIG_SOBRES[tipo].nombre}
                </h3>
                <p
                  style={{
                    color: isNormal ? T.gold : T.gray,
                    fontSize: "0.7rem",
                    marginBottom: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  {isNormal
                    ? puedeAbrirNormal
                      ? "DISPONIBLE HOY"
                      : "VUELVE MAÑANA"
                    : CONFIG_SOBRES[tipo].descripcion}
                </p>

                <button
                  onClick={() => abrirSobre(tipo)}
                  disabled={isDisabled}
                  style={{
                    background: isDisabled ? "transparent" : T.white,
                    color: isDisabled ? T.gray : T.bg0,
                    border: `1px solid ${isDisabled ? T.border : "transparent"}`,
                    padding: "0.7rem 1rem",
                    fontFamily: T.fontDisplay,
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    width: "100%",
                    textTransform: "uppercase",
                  }}
                >
                  {isDisabled ? "Agotado" : "Reclamar Pack"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Barra de Progreso */}
        <div
          style={{
            background: T.bg1,
            padding: "1.5rem",
            borderRadius: 4,
            border: `1px solid ${T.border}`,
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: T.gold,
              fontFamily: T.fontDisplay,
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: "0.7rem", letterSpacing: "2px" }}>
              PROGRESO TOTAL
            </span>
            <span>
              {misLaminas.size} / {TOTAL_LAMINAS}
            </span>
          </div>
          <div style={{ height: 2, background: T.bg2, overflow: "hidden" }}>
            <div
              style={{
                width: `${(misLaminas.size / TOTAL_LAMINAS) * 100}%`,
                height: "100%",
                background: T.gold,
                transition: "1.5s ease",
              }}
            />
          </div>
        </div>

        {/* Rejilla de Grupos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {SECCIONES_ALBUM.map((seccion) => (
            <div key={seccion.nombre}>
              <h2
                style={{
                  fontFamily: T.fontDisplay,
                  color: T.white,
                  borderLeft: `3px solid ${T.gold}`,
                  paddingLeft: 15,
                  marginBottom: 30,
                  fontSize: "1.5rem",
                }}
              >
                {seccion.nombre}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: "2.5rem",
                }}
              >
                {seccion.paises.map((p) => (
                  <StickerCard
                    key={p.id}
                    pais={p}
                    obtenido={misLaminas.has(p.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE APERTURA */}
      {modalAbierto && packAbierto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.98)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: 900,
              width: "100%",
              padding: "2rem",
            }}
          >
            {cargandoSobre ? (
              <div
                style={{
                  color: T.white,
                  fontFamily: T.fontDisplay,
                  fontSize: "2rem",
                  letterSpacing: "5px",
                }}
              >
                RASGANDO SOBRE...
              </div>
            ) : (
              <div style={{ animation: "fadeIn 0.5s" }}>
                <h2
                  style={{
                    fontFamily: T.fontDisplay,
                    color: T.white,
                    fontSize: "2.5rem",
                    marginBottom: "3rem",
                  }}
                >
                  ¡HAS OBTENIDO {nuevasLaminas?.length} LÁMINAS!
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: "4rem",
                  }}
                >
                  {nuevasLaminas?.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        width: 140,
                        animation: `fadeIn 0.5s ease ${i * 0.15}s both`,
                      }}
                    >
                      <StickerCard pais={p} obtenido={true} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setModalAbierto(false)}
                  style={{
                    background: T.gold,
                    border: "none",
                    padding: "1rem 4rem",
                    fontFamily: T.fontDisplay,
                    fontWeight: 700,
                    color: T.bg0,
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  PEGAR EN ÁLBUM
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
