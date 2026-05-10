import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell, T } from "../components/layout/PageShell";

// ─── Tipos y Datos ────────────────────────────────────────────────────────────
interface Producto {
  id: string;
  tipo: "sobre" | "ticket";
  nombre: string;
  descripcion: string;
  precio: number;
  color: string;
  icono: string;
}

const PRODUCTOS: Producto[] = [
  {
    id: "sobre_normal",
    tipo: "sobre",
    nombre: "Pack Normal",
    descripcion: "1 sobre básico (5 láminas aleatorias)",
    precio: 5000,
    color: "#8a95a5",
    icono: "📦",
  },
  {
    id: "sobre_silver",
    tipo: "sobre",
    nombre: "Pack Silver",
    descripcion: "3 sobres + 1 lámina holográfica garantizada",
    precio: 12000,
    color: "#c0c0c0",
    icono: "🥈",
  },
  {
    id: "sobre_gold",
    tipo: "sobre",
    nombre: "Pack Gold",
    descripcion: "5 sobres premium de alta rareza",
    precio: 20000,
    color: T.gold,
    icono: "✦",
  },
  {
    id: "ticket_vip",
    tipo: "ticket",
    nombre: "Entrada VIP",
    descripcion: "Boleto Categoría 1 - Acceso a Zonas Exclusivas",
    precio: 350000,
    color: "#a855f7",
    icono: "🎫",
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
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);
  const [pagado, setPagado] = useState(false);

  // Por defecto seleccionamos el Pack Gold
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>(
    PRODUCTOS[2],
  );

  const [datosPago, setDatosPago] = useState({
    nombre: "",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Formateo visual de tarjeta
    if (name === "tarjeta")
      value = value
        .replace(/\D/g, "")
        .substring(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    if (name === "vencimiento")
      value = value
        .replace(/\D/g, "")
        .substring(0, 4)
        .replace(/(\d{2})(?=\d)/g, "$1/");
    if (name === "cvv") value = value.replace(/\D/g, "").substring(0, 4);

    setDatosPago({ ...datosPago, [name]: value });
  };

  const procesarPago = (e: React.FormEvent) => {
    e.preventDefault();
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      setPagado(true);
    }, 2500);
  };

  // Formateador de moneda colombiana
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  // PANTALLA DE ÉXITO
  if (pagado) {
    const esTicket = productoSeleccionado.tipo === "ticket";
    return (
      <PageShell>
        <div
          style={{
            minHeight: "calc(100vh - 66px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              background: T.bg2,
              border: `1px solid ${productoSeleccionado.color}`,
              borderRadius: 4,
              padding: "4rem 3rem",
              textAlign: "center",
              maxWidth: 500,
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${productoSeleccionado.color}22`,
            }}
          >
            <div
              style={{
                fontSize: "5rem",
                color: productoSeleccionado.color,
                marginBottom: "1rem",
                textShadow: `0 0 20px ${productoSeleccionado.color}66`,
              }}
            >
              {productoSeleccionado.icono}
            </div>
            <h2
              style={{
                fontFamily: T.fontDisplay,
                fontWeight: 700,
                fontSize: "2rem",
                color: T.white,
                letterSpacing: "0.1em",
                margin: "0 0 1rem",
              }}
            >
              ¡COMPRA EXITOSA!
            </h2>
            <p
              style={{
                fontFamily: T.fontBody,
                color: T.grayLight,
                margin: "0 0 2.5rem",
                lineHeight: 1.6,
              }}
            >
              {esTicket
                ? "Tu entrada VIP ha sido confirmada. Hemos enviado el código QR de acceso a tu correo electrónico."
                : "Tus sobres han sido añadidos a tu inventario y están listos para ser abiertos."}
            </p>
            <button
              onClick={() => navigate(esTicket ? "/calendario" : "/album")}
              style={{
                background: productoSeleccionado.color,
                color: T.bg0,
                border: "none",
                padding: "1rem 2rem",
                fontFamily: T.fontDisplay,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              {esTicket ? "VER PARTIDOS" : "IR A MI ÁLBUM"}
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  // PANTALLA DE TIENDA Y PAGO
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
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel>Tienda Oficial</SectionLabel>
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
            Adquiere <span style={{ color: T.gold }}>Artículos</span>
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* COLUMNA IZQUIERDA: SELECCIÓN Y FORMULARIO */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* 1. Selección de Producto */}
            <div>
              <h3
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1rem",
                  color: T.white,
                  margin: "0 0 1rem",
                  letterSpacing: "0.1em",
                }}
              >
                1. SELECCIONA TU PRODUCTO
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                }}
              >
                {PRODUCTOS.map((prod) => {
                  const seleccionado = productoSeleccionado.id === prod.id;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setProductoSeleccionado(prod)}
                      style={{
                        background: seleccionado ? T.bg3 : T.bg2,
                        border: `1px solid ${seleccionado ? prod.color : T.border}`,
                        borderRadius: 4,
                        padding: "1.2rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        boxShadow: seleccionado
                          ? `0 0 15px ${prod.color}22`
                          : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.8rem",
                            filter: `drop-shadow(0 0 5px ${prod.color}66)`,
                          }}
                        >
                          {prod.icono}
                        </span>
                        <span
                          style={{
                            fontFamily: T.fontDisplay,
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            color: prod.color,
                          }}
                        >
                          {formatearPrecio(prod.precio)}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontFamily: T.fontDisplay,
                          fontSize: "1rem",
                          color: T.white,
                          margin: "0 0 0.3rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {prod.nombre}
                      </h4>
                      <p
                        style={{
                          fontFamily: T.fontBody,
                          fontSize: "0.75rem",
                          color: T.gray,
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {prod.descripcion}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Formulario de Pago */}
            <div
              style={{
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 4,
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                  borderBottom: `1px solid ${T.border}`,
                  paddingBottom: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: T.fontDisplay,
                    fontSize: "1rem",
                    color: T.white,
                    margin: 0,
                    letterSpacing: "0.1em",
                  }}
                >
                  2. DATOS DE LA TARJETA
                </h3>
                <span style={{ fontSize: "1.5rem" }}>💳</span>
              </div>

              <form
                onSubmit={procesarPago}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: T.fontBody,
                      fontSize: "0.75rem",
                      color: T.grayLight,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Titular de la Tarjeta
                  </label>
                  <input
                    required
                    name="nombre"
                    value={datosPago.nombre}
                    onChange={handleChange}
                    placeholder="ANDRÉS G."
                    style={{
                      width: "100%",
                      background: T.bg1,
                      border: `1px solid ${T.border}`,
                      padding: "1rem",
                      color: T.white,
                      outline: "none",
                      fontFamily: T.fontDisplay,
                      fontSize: "1rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: T.fontBody,
                      fontSize: "0.75rem",
                      color: T.grayLight,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Número de Tarjeta
                  </label>
                  <input
                    required
                    name="tarjeta"
                    value={datosPago.tarjeta}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    style={{
                      width: "100%",
                      background: T.bg1,
                      border: `1px solid ${T.border}`,
                      padding: "1rem",
                      color: T.gold,
                      outline: "none",
                      fontFamily: T.fontDisplay,
                      fontSize: "1.2rem",
                      letterSpacing: "0.15em",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: T.fontBody,
                        fontSize: "0.75rem",
                        color: T.grayLight,
                        marginBottom: "0.5rem",
                      }}
                    >
                      Vencimiento
                    </label>
                    <input
                      required
                      name="vencimiento"
                      value={datosPago.vencimiento}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      style={{
                        width: "100%",
                        background: T.bg1,
                        border: `1px solid ${T.border}`,
                        padding: "1rem",
                        color: T.white,
                        outline: "none",
                        fontFamily: T.fontDisplay,
                        fontSize: "1.1rem",
                        textAlign: "center",
                        letterSpacing: "0.1em",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: T.fontBody,
                        fontSize: "0.75rem",
                        color: T.grayLight,
                        marginBottom: "0.5rem",
                      }}
                    >
                      CVV
                    </label>
                    <input
                      required
                      type="password"
                      name="cvv"
                      value={datosPago.cvv}
                      onChange={handleChange}
                      placeholder="•••"
                      style={{
                        width: "100%",
                        background: T.bg1,
                        border: `1px solid ${T.border}`,
                        padding: "1rem",
                        color: T.white,
                        outline: "none",
                        fontFamily: T.fontDisplay,
                        fontSize: "1.1rem",
                        textAlign: "center",
                        letterSpacing: "0.2em",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.8rem",
                  }}
                >
                  <div style={{ color: T.green, fontSize: "1.2rem" }}>🔒</div>
                  <p
                    style={{
                      fontFamily: T.fontBody,
                      fontSize: "0.75rem",
                      color: T.gray,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Pagos encriptados con cifrado SSL de 256-bits. Tus datos no
                    son almacenados.
                  </p>
                </div>

                <button
                  disabled={procesando}
                  type="submit"
                  style={{
                    background: procesando ? T.bg3 : productoSeleccionado.color,
                    color: procesando ? T.gray : T.bg0,
                    border: "none",
                    padding: "1.2rem",
                    fontFamily: T.fontDisplay,
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: procesando ? "wait" : "pointer",
                    marginTop: "1rem",
                    transition: "all 0.2s",
                    borderRadius: 2,
                  }}
                >
                  {procesando
                    ? "Procesando..."
                    : `PAGAR ${formatearPrecio(productoSeleccionado.precio)}`}
                </button>
              </form>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN DEL PEDIDO */}
          <div
            style={{
              background: `linear-gradient(180deg, ${T.bg2}, ${T.bg1})`,
              border: `1px solid ${productoSeleccionado.color}55`,
              borderRadius: 4,
              padding: "2.5rem",
              position: "sticky",
              top: "100px",
              transition: "border-color 0.3s",
            }}
          >
            <h3
              style={{
                fontFamily: T.fontDisplay,
                fontSize: "1.2rem",
                color: productoSeleccionado.color,
                margin: "0 0 2rem",
                letterSpacing: "0.1em",
              }}
            >
              RESUMEN DE ORDEN
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                borderBottom: `1px dashed ${T.border}`,
                paddingBottom: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 60,
                      background: T.bg0,
                      border: `1px solid ${productoSeleccionado.color}`,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      boxShadow: `0 0 10px ${productoSeleccionado.color}44`,
                    }}
                  >
                    {productoSeleccionado.icono}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: T.fontDisplay,
                        fontSize: "1rem",
                        color: T.white,
                        margin: "0 0 0.3rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {productoSeleccionado.nombre}
                    </h4>
                    <p
                      style={{
                        fontFamily: T.fontBody,
                        fontSize: "0.75rem",
                        color: T.gray,
                        margin: 0,
                        maxWidth: "150px",
                      }}
                    >
                      {productoSeleccionado.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: T.fontBody,
                  fontSize: "0.85rem",
                  color: T.gray,
                }}
              >
                <span>Subtotal</span>
                <span>{formatearPrecio(productoSeleccionado.precio)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: T.fontBody,
                  fontSize: "0.85rem",
                  color: T.gray,
                }}
              >
                <span>Impuestos (IVA)</span>
                <span>Incluido</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderTop: `1px solid ${T.border}`,
                paddingTop: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "0.9rem",
                  color: T.white,
                  letterSpacing: "0.1em",
                }}
              >
                TOTAL A PAGAR
              </span>
              <span
                style={{
                  fontFamily: T.fontDisplay,
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: productoSeleccionado.color,
                  lineHeight: 1,
                }}
              >
                {formatearPrecio(productoSeleccionado.precio)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
