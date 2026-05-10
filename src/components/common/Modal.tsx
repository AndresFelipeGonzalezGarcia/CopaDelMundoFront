import { useState } from "react";

const gold = "#c99722";
const goldLight = "#e0b040";
const bg = "#060810";
const fontDisplay = "'Bebas Neue', sans-serif";
const fontBody = "'DM Sans', sans-serif";

const steps = [
  {
    num: "01",
    title: "Crea tu cuenta",
    desc: "Regístrate con tu correo universitario y elige tu nombre de jugador. Es gratis y solo toma un minuto.",
  },
  {
    num: "02",
    title: "Arma tu álbum",
    desc: "Colecciona figuritas virtuales de todos los jugadores del mundial. Completa los sobres diarios y canjea con tus compañeros.",
  },
  {
    num: "03",
    title: "Entra a las pollas",
    desc: "Predice resultados, arma tu bracket y compite contra los grupos de Ingeniería en el ranking general.",
  },
  {
    num: "04",
    title: "Sigue el torneo en vivo",
    desc: "Calendario actualizado en tiempo real, resultados al instante y estadísticas de cada partido.",
  },
];

export default function ComoFuncionaModal({
  onClose,
  onCTA,
}: {
  onClose: () => void;
  onCTA: () => void;
}) {
  return (
    <>
      <style>{`
        @keyframes modal-fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-slideup { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .cf-close:hover { color: ${gold} !important; }
        .cf-cta:hover { background-position: 100% 0 !important; transform: translateY(-1px) !important; }
      `}</style>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(6,8,16,0.88)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          animation: "modal-fadein 0.25s ease both",
        }}
      >
        {/* Caja del modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "linear-gradient(160deg, #0d1120, #080c18)",
            border: `1px solid ${gold}33`,
            borderTop: `3px solid ${gold}`,
            borderRadius: 4,
            width: "100%",
            maxWidth: 480,
            margin: "1rem",
            padding: "2.5rem 2.5rem 2rem",
            position: "relative",
            fontFamily: fontBody,
            animation: "modal-slideup 0.3s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Botón cerrar */}
          <button
            className="cf-close"
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "none",
              border: "none",
              color: "#3a4258",
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1,
              padding: 4,
              transition: "color 0.2s",
            }}
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>

          {/* Título */}
          <div
            style={{
              fontFamily: fontDisplay,
              fontSize: "1.8rem",
              letterSpacing: "0.15em",
              color: "#fff",
              margin: 0,
            }}
          >
            ¿CÓMO <span style={{ color: gold }}>FUNCIONA?</span>
          </div>
          <div
            style={{
              width: 32,
              height: 2,
              background: `linear-gradient(90deg, ${gold}, transparent)`,
              margin: "0.8rem 0 1.8rem",
            }}
          />

          {/* Pasos */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              marginBottom: "2rem",
            }}
          >
            {steps.map((s) => (
              <div
                key={s.num}
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    borderRadius: 2,
                    border: `1px solid ${gold}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fontDisplay,
                    fontSize: "1rem",
                    color: gold,
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.num}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#c4cad8",
                      marginBottom: 3,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#3a4460",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Separador */}
          <div
            style={{ height: 1, background: "#0f1526", marginBottom: "1.5rem" }}
          />

          {/* CTA */}
          <button
            className="cf-cta"
            onClick={onCTA}
            style={{
              width: "100%",
              background: `linear-gradient(90deg, #b8861e, ${gold}, ${goldLight}, ${gold}, #b8861e)`,
              backgroundSize: "200% 100%",
              border: "none",
              borderRadius: 2,
              padding: "0.9rem",
              fontFamily: fontDisplay,
              fontSize: "1rem",
              letterSpacing: "0.2em",
              color: bg,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Empezar ahora
          </button>
        </div>
      </div>
    </>
  );
}
