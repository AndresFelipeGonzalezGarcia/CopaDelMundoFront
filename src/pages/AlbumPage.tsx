import { useEffect, useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { Star, Globe2, X, Sparkles } from "lucide-react";
import {
  albumService,
  type ProgresoAlbum,
  type PaisAlbum,
} from "../service/albumService";

// Agrupamos la estructura por confederación
const SECCIONES_ALBUM = [
  {
    nombre: "CONMEBOL (Sudamérica)",
    icono: "🌎",
    paises: [
      { id: 1, nombre: "Colombia", bandera: "🇨🇴" },
      { id: 2, nombre: "Argentina", bandera: "🇦🇷" },
      { id: 3, nombre: "Brasil", bandera: "🇧🇷" },
      { id: 4, nombre: "Uruguay", bandera: "🇺🇾" },
      { id: 5, nombre: "Ecuador", bandera: "🇪🇨" },
      { id: 6, nombre: "Venezuela", bandera: "🇻🇪" },
    ],
  },
  {
    nombre: "UEFA (Europa)",
    icono: "🌍",
    paises: [
      { id: 7, nombre: "Alemania", bandera: "🇩🇪" },
      { id: 8, nombre: "Francia", bandera: "🇫🇷" },
      { id: 9, nombre: "España", bandera: "🇪🇸" },
      { id: 10, nombre: "Inglaterra", bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { id: 11, nombre: "Portugal", bandera: "🇵🇹" },
      { id: 12, nombre: "Italia", bandera: "🇮🇹" },
    ],
  },
];

export default function AlbumPage() {
  const [progreso, setProgreso] = useState<ProgresoAlbum | null>(null);
  const [misLaminas, setMisLaminas] = useState<number[]>([]);
  const [cargando, setCargando] = useState(true);

  // Estados para la animación del sobre
  const [abriendoSobre, setAbriendoSobre] = useState(false);
  const [laminasReveladas, setLaminasReveladas] = useState<PaisAlbum[] | null>(
    null,
  );

  const usuarioId = 1;

  // Carga inicial
  useEffect(() => {
    const cargarDatosAlbum = async () => {
      try {
        const [dataProgreso, dataInventario] = await Promise.all([
          albumService.obtenerProgreso(usuarioId),
          albumService.obtenerMisLaminas(usuarioId),
        ]);
        setProgreso(dataProgreso);
        setMisLaminas(dataInventario);
      } catch (error) {
        console.error("Error sincronizando:", error);
      } finally {
        setTimeout(() => setCargando(false), 800);
      }
    };
    cargarDatosAlbum();
  }, []);

  const tengoLaLamina = (id: number) => misLaminas.includes(id);

  // LOGICA PARA ABRIR EL SOBRE
  const manejarAbrirSobre = async () => {
    setAbriendoSobre(true);
    setLaminasReveladas(null); // Resetea las láminas previas si las hay

    try {
      const nuevasLaminas = await albumService.abrirSobre(usuarioId);
      setLaminasReveladas(nuevasLaminas);

      // Actualizamos el inventario local para que el álbum de fondo se actualice mágicamente
      const nuevosIds = nuevasLaminas.map((l) => l.id);
      setMisLaminas((prev) => [...new Set([...prev, ...nuevosIds])]);

      // Actualizamos la barra de progreso
      setProgreso((prev) =>
        prev
          ? {
              ...prev,
              laminasObtenidas:
                prev.laminasObtenidas +
                nuevasLaminas.filter((l) => !tengoLaLamina(l.id)).length,
            }
          : null,
      );
    } catch (error) {
      console.error("Error al abrir sobre:", error);
      setAbriendoSobre(false);
    }
  };

  const cerrarModal = () => {
    setAbriendoSobre(false);
    setLaminasReveladas(null);
  };

  if (cargando || !progreso) {
    return (
      <PageShell title="Cargando Álbum...">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
          <h1 className="mt-4">Estamos cargando tu proceso chiquis</h1>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Colección de Banderas • 2026"
      title="Álbum Mundial"
      description="Colecciona las banderas de los 48 países clasificados al mundial."
    >
      <div className="space-y-12">
        {/* WIDGET DE PROGRESO */}
        <div className="rounded-2xl border-2 border-gold/20 bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-black text-royal uppercase">
              Banderas Coleccionadas
            </h3>
            <span className="font-bold text-gold text-2xl">
              {progreso.laminasObtenidas} / {progreso.totalLaminas}
            </span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-gold to-yellow-500 transition-all duration-1000 ease-out"
              style={{
                width: `${Math.round((progreso.laminasObtenidas / progreso.totalLaminas) * 100)}%`,
              }}
            />
          </div>
          {/* ¡AQUÍ ESTÁ DE VUELTA EL TEXTO DEL PORCENTAJE! */}
          <p className="mt-2 text-right text-xs font-bold text-gray-400">
            {Math.round(
              (progreso.laminasObtenidas / progreso.totalLaminas) * 100,
            )}
            % del mundo descubierto
          </p>
        </div>
        {/* LISTADO POR CONFEDERACIONES */}
        {SECCIONES_ALBUM.map((seccion) => (
          <div key={seccion.nombre} className="space-y-6">
            <div className="flex items-center gap-4 border-b-2 border-gray-100 pb-2">
              <span className="text-3xl">{seccion.icono}</span>
              <h2 className="font-display text-2xl font-black text-royal uppercase">
                {seccion.nombre}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {seccion.paises.map((pais) => (
                <div key={pais.id} className="group relative aspect-[3/4]">
                  {tengoLaLamina(pais.id) ? (
                    <div className="h-full w-full overflow-hidden rounded-xl border-2 border-gold bg-white shadow-md">
                      <div className="flex h-3/4 items-center justify-center bg-gray-50 text-6xl drop-shadow-md">
                        {pais.bandera}
                      </div>
                      <div className="flex h-1/4 items-center justify-center bg-royal text-[10px] font-black text-white border-t-2 border-gold uppercase tracking-wider text-center px-1">
                        {pais.nombre}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gold/50">
                      <Globe2 className="text-gray-200 mb-2" size={32} />
                      <span className="text-xl font-black text-gray-300">
                        {pais.id.toString().padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* BOTÓN DE SOBRE */}
        <div className="flex flex-col items-center gap-4 pt-10">
          <button
            onClick={manejarAbrirSobre}
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-royal px-10 py-5 font-black text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#0f2a5a] hover:shadow-gold/40"
          >
            <Star
              className="text-gold group-hover:animate-spin"
              fill="#D4AF37"
              size={24}
            />
            <span className="tracking-widest">ABRIR SOBRE DE PAÍSES</span>
          </button>
        </div>
      </div>

      {/* MODAL DE APERTURA DE SOBRE (OVERLAY) */}
      {abriendoSobre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal/95 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl text-center">
            {/* Botón Cerrar */}
            {laminasReveladas && (
              <button
                onClick={cerrarModal}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors"
              >
                <X size={32} />
              </button>
            )}

            {!laminasReveladas ? (
              // ANIMACIÓN DE CARGA / SUSPENSO
              <div className="flex flex-col items-center animate-pulse">
                <Star
                  className="text-gold animate-spin mb-6"
                  size={64}
                  fill="#D4AF37"
                />
                <h2 className="font-display text-3xl font-black text-white uppercase tracking-widest">
                  Abriendo Sobre...
                </h2>
                <p className="mt-2 text-gold">
                  Conectando con la base de datos oficial...
                </p>
              </div>
            ) : (
              // LÁMINAS REVELADAS
              <div className="space-y-12 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="text-gold" size={32} />
                  <h2 className="font-display text-4xl font-black text-white uppercase tracking-widest text-shadow-lg">
                    ¡Nuevas Banderas!
                  </h2>
                  <Sparkles className="text-gold" size={32} />
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                  {laminasReveladas.map((lamina, index) => (
                    <div
                      key={lamina.id}
                      className="w-40 aspect-[3/4] overflow-hidden rounded-xl border-4 border-gold bg-white shadow-2xl shadow-gold/50 transform transition-all hover:-translate-y-4"
                      style={{ animationDelay: `${index * 150}ms` }} // Efecto cascada
                    >
                      <div className="flex h-3/4 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 text-8xl drop-shadow-xl">
                        {lamina.bandera}
                      </div>
                      <div className="flex h-1/4 flex-col items-center justify-center bg-royal text-white border-t-4 border-gold">
                        <span className="text-xs font-black uppercase tracking-widest">
                          {lamina.nombre}
                        </span>
                        <span className="text-[8px] text-gray-300 uppercase">
                          {lamina.confederacion}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={cerrarModal}
                  className="rounded-full bg-gold px-8 py-3 font-bold text-royal hover:bg-white hover:scale-105 transition-all"
                >
                  PEGAR EN EL ÁLBUM
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
