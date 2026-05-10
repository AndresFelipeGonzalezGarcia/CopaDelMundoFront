import { useState, useCallback, useRef } from "react";
// Importamos el estándar que acabamos de crear
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Foto {
  id: number;
  titulo: string;
  imagen: string;
  upvotes: number;
  grupo: string;
  pais: string;
  autor: string;
}

const GRUPO_COLORS: Record<string, string> = {
  A: "#d4a843",
  B: "#4a9eff",
  C: "#a855f7",
  D: "#22a060",
  E: "#f97316",
  F: "#e84393",
  G: "#14b8a6",
  H: "#ef4444",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const FOTOS_INIT: Foto[] = [
  {
    id: 1,
    titulo: "Celebrando en Bogotá",
    imagen:
      "https://images.unsplash.com/photo-1522778034537-20a2486be803?w=500&h=340&fit=crop",
    upvotes: 47,
    grupo: "A",
    pais: "Colombia",
    autor: "Andrés G.",
  },
  {
    id: 2,
    titulo: "Con amigos en el fanzone",
    imagen:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&h=340&fit=crop",
    upvotes: 31,
    grupo: "C",
    pais: "Argentina",
    autor: "Thomas R.",
  },
  {
    id: 3,
    titulo: "¡Mi primer Mundial!",
    imagen:
      "https://images.unsplash.com/photo-1562077981-4d7eafd44932?w=500&h=340&fit=crop",
    upvotes: 89,
    grupo: "H",
    pais: "Alemania",
    autor: "Paula S.",
  },
];

// ─── Componentes Internos ─────────────────────────────────────────────────────
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

function ModalSubir({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (d: any) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [pais, setPais] = useState("");
  const [grupo, setGrupo] = useState("A");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  return (
    // ✅ CORREGIDO
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "1rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: T.bg1,
          border: `1px solid ${T.borderGold}`,
          borderRadius: 4,
          padding: "2.5rem",
          maxWidth: 460,
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            height: 2,
            background: T.gold,
            marginBottom: "1.75rem",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: T.fontDisplay,
              fontWeight: 700,
              fontSize: "1.3rem",
              color: T.white,
              textTransform: "uppercase",
            }}
          >
            Subir Foto
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: T.gray,
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            ✕
          </button>
        </div>
        <div
          onClick={() => ref.current?.click()}
          style={{
            border: `1px dashed ${T.borderGold}`,
            borderRadius: 3,
            padding: "1.5rem",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "1.25rem",
            minHeight: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: T.bg2,
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{ maxHeight: 160, borderRadius: 2 }}
            />
          ) : (
            <div style={{ color: T.gray }}>
              📷
              <br />
              Selecciona tu foto
            </div>
          )}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={onFile}
          style={{ display: "none" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            marginBottom: "1.5rem",
          }}
        >
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título *"
            style={{
              background: T.bg2,
              border: `1px solid ${T.border}`,
              borderRadius: 3,
              padding: "0.7rem",
              color: T.white,
              outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: "0.65rem" }}>
            <input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="País"
              style={{
                flex: 1,
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 3,
                padding: "0.7rem",
                color: T.white,
              }}
            />
            <select
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              style={{
                background: GRUPO_COLORS[grupo],
                borderRadius: 3,
                padding: "0.7rem",
                fontFamily: T.fontDisplay,
                fontWeight: 700,
              }}
            >
              {Object.keys(GRUPO_COLORS).map((g) => (
                <option key={g} value={g}>
                  Grupo {g}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.65rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.8rem",
              background: "transparent",
              border: `1px solid ${T.border}`,
              color: T.gray,
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            CANCELAR
          </button>
          <button
            onClick={() => {
              if (titulo) {
                onSubmit({ titulo, pais, grupo, file });
                onClose();
              }
            }}
            style={{
              flex: 2,
              padding: "0.8rem",
              background: T.gold,
              border: "none",
              color: T.bg0,
              borderRadius: 3,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            PUBLICAR
          </button>
        </div>
      </div>
    </div>
  );
}

function FotoCard({
  foto,
  onVote,
}: {
  foto: Foto;
  onVote: (id: number) => void;
}) {
  const [voted, setVoted] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.bg2,
        border: `1px solid ${hov ? T.borderGold : T.border}`,
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.2s",
        transform: hov ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img
          src={foto.imagen}
          alt={foto.titulo}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: GRUPO_COLORS[foto.grupo],
            color: T.bg0,
            fontFamily: T.fontDisplay,
            fontWeight: 700,
            fontSize: "0.6rem",
            padding: "0.15rem 0.5rem",
            borderRadius: 2,
          }}
        >
          GRUPO {foto.grupo}
        </div>
      </div>
      <div
        style={{
          padding: "0.85rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontFamily: T.fontDisplay,
              fontWeight: 600,
              fontSize: "0.85rem",
              color: T.white,
              margin: 0,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {foto.titulo}
          </p>
          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: "0.65rem",
              color: T.gray,
              margin: 0,
            }}
          >
            {foto.pais} · {foto.autor}
          </p>
        </div>
        <button
          onClick={() => {
            if (!voted) {
              setVoted(true);
              onVote(foto.id);
            }
          }}
          style={{
            background: voted ? T.greenDark : "transparent",
            border: `1px solid ${voted ? T.green : T.border}`,
            color: voted ? T.green : T.gray,
            borderRadius: 2,
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>▲</span> {foto.upvotes + (voted ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}

// ─── Export Principal ─────────────────────────────────────────────────────────
export default function AlbumPage() {
  const [fotos, setFotos] = useState<Foto[]>(FOTOS_INIT);
  const [filtro, setFiltro] = useState("TODOS");
  const [showModal, setShowModal] = useState(false);

  const handleVote = useCallback((id: number) => {
    setFotos((prev) =>
      prev.map((f) => (f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f)),
    );
  }, []);

  const handleSubir = (datos: any) => {
    const nueva = {
      id: Date.now(),
      ...datos,
      autor: "Andrés",
      upvotes: 0,
      imagen: datos.file
        ? URL.createObjectURL(datos.file)
        : "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500",
    };
    setFotos((prev) => [nueva, ...prev]);
  };

  const fotosFiltradas = fotos.filter(
    (f) => filtro === "TODOS" || f.grupo === filtro,
  );

  return (
    <PageShell>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem" }}>
        {/* Encabezado de Galería */}
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
            <SectionLabel>Galería de la Comunidad</SectionLabel>
            <h1
              style={{
                fontFamily: T.fontDisplay,
                fontWeight: 700,
                fontSize: "3rem",
                color: T.white,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Mundial en <span style={{ color: T.gold }}>Fotos</span>
            </h1>
            <p style={{ color: T.gray, maxWidth: 500, marginTop: "0.5rem" }}>
              Comparte tus momentos favoritos del torneo con otros estudiantes
              de Ingeniería de Sistemas.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: T.gold,
              color: T.bg0,
              border: "none",
              borderRadius: 2,
              padding: "0.9rem 2rem",
              fontFamily: T.fontDisplay,
              fontWeight: 700,
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            + SUBIR FOTO
          </button>
        </div>

        {/* Filtros */}
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            borderBottom: `1px solid ${T.border}`,
            paddingBottom: "1.5rem",
          }}
        >
          {["TODOS", "A", "B", "C", "D", "E", "F", "G", "H"].map((g) => (
            <button
              key={g}
              onClick={() => setFiltro(g)}
              style={{
                background: filtro === g ? T.gold : T.bg2,
                color: filtro === g ? T.bg0 : T.gray,
                border: "none",
                padding: "0.4rem 1rem",
                borderRadius: 2,
                cursor: "pointer",
                fontFamily: T.fontDisplay,
                fontWeight: 600,
              }}
            >
              {g === "TODOS" ? "Todos" : `Grupo ${g}`}
            </button>
          ))}
        </div>

        {/* Grid de Fotos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {fotosFiltradas.map((f) => (
            <FotoCard key={f.id} foto={f} onVote={handleVote} />
          ))}
        </div>
      </div>

      {showModal && (
        <ModalSubir
          onClose={() => setShowModal(false)}
          onSubmit={handleSubir}
        />
      )}
    </PageShell>
  );
}
