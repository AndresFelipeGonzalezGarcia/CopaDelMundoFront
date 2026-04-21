import { useEffect, useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { Calendar, Trophy, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
// ¡AQUÍ ESTÁ LA MAGIA! Importamos Partido como 'type' para respetar el verbatimModuleSyntax
import { partidosService, type Partido } from "../service/partidosService";

export default function DashboardPage() {
  // Estado para guardar los partidos que vienen del "backend" (o de nuestro mock temporal)
  const [partidos, setPartidos] = useState<Partido[]>([]);

  // Efecto que se ejecuta automáticamente al abrir la página
  useEffect(() => {
    const cargarDatos = async () => {
      const proximos = await partidosService.obtenerProximos();
      setPartidos(proximos);
    };
    cargarDatos();
  }, []);

  return (
    <PageShell
      eyebrow="Panel de Control • Andrés"
      title="Dashboard"
      description="Sigue el pulso del Mundial 2026: Resultados, álbum y estadísticas en tiempo real."
    >
      <div className="space-y-8">
        {/* 1. SECCIÓN HERO */}
        <div className="relative overflow-hidden rounded-2xl bg-royal text-white shadow-2xl">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000")',
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter md:text-5xl text-gold">
              ¡LA PASIÓN DEL MUNDIAL EN TUS MANOS!
            </h2>
            <p className="mt-4 max-w-xl text-lg font-medium opacity-90">
              Calendario, Resultados, Noticias y Estadísticas Exclusivas del
              evento más grande del mundo.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/calendario"
                className="rounded-full bg-gold px-8 py-3 font-bold text-royal transition-transform hover:scale-105 flex items-center justify-center"
              >
                VER CALENDARIO
              </Link>
              <Link
                to="/album"
                className="rounded-full border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-all hover:bg-white hover:text-royal flex items-center justify-center"
              >
                MI ÁLBUM
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 h-2 w-full bg-gold" />
        </div>

        {/* 2. GRIDS DE INFORMACIÓN */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* PRÓXIMOS PARTIDOS DINÁMICOS */}
          <div className="col-span-1 rounded-xl border-t-4 border-royal bg-white p-6 shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-xl font-black text-royal">
                <Calendar className="text-gold" /> PRÓXIMOS PARTIDOS
              </h3>
              <Link
                to="/calendario"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gold transition-colors"
              >
                Ver todo
              </Link>
            </div>

            <div className="space-y-4">
              {/* Aquí iteramos sobre los datos reales que llegan del servicio */}
              {partidos.length > 0 ? (
                partidos.map((partido) => (
                  <div
                    key={partido.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-gold/30"
                  >
                    <div className="flex items-center gap-3 font-bold text-royal">
                      <span className="text-2xl">{partido.banderaLocal}</span>{" "}
                      {partido.equipoLocal}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-gold">
                        {partido.fecha}
                      </span>
                      <span className="text-xl font-black text-royal">VS</span>
                      <span className="text-[10px] text-gray-400">
                        {partido.hora}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-bold text-royal">
                      {partido.equipoVisitante}{" "}
                      <span className="text-2xl">
                        {partido.banderaVisitante}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm font-bold text-gray-400 py-4">
                  Cargando partidos...
                </div>
              )}
            </div>
          </div>

          {/* TABLA DE POSICIONES */}
          <div className="rounded-xl bg-[#2E7D32] p-6 text-white shadow-lg border-t-4 border-gold flex flex-col">
            <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-black uppercase">
              <Trophy size={20} /> Posiciones
            </h3>

            <div className="space-y-4 text-sm flex-1">
              <div className="flex justify-between border-b border-white/20 pb-2 font-bold">
                <span>GRUPO A</span>
                <span>PTS</span>
              </div>
              <div className="flex justify-between">
                <span>1. 🇩🇪 Alemania</span>
                <span className="font-bold">6</span>
              </div>
              <div className="flex justify-between">
                <span>2. 🇨🇴 Colombia</span>
                <span className="font-bold">4</span>
              </div>
              <div className="flex justify-between opacity-60">
                <span>3. 🇯🇵 Japón</span>
                <span className="font-bold">1</span>
              </div>
            </div>

            <Link
              to="/posiciones"
              className="mt-8 w-full rounded-lg border border-white/30 bg-white/10 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white/20 text-center block"
            >
              Ver grupos completos
            </Link>
          </div>
        </div>

        {/* 3. ACCESOS RÁPIDOS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Link
            to="/perfil"
            className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md border-b-4 border-gray-100 hover:border-gold transition-all cursor-pointer"
          >
            <Users className="text-royal mb-2" size={32} />
            <span className="text-[10px] font-black text-royal uppercase">
              Mi Perfil
            </span>
          </Link>
          <Link
            to="/album"
            className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md border-b-4 border-gray-100 hover:border-gold transition-all cursor-pointer"
          >
            <Star className="text-gold mb-2" size={32} />
            <span className="text-[10px] font-black text-royal uppercase">
              Álbum
            </span>
          </Link>
          <Link
            to="/pollas"
            className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md border-b-4 border-gray-100 hover:border-gold transition-all cursor-pointer"
          >
            <Trophy className="text-royal mb-2" size={32} />
            <span className="text-[10px] font-black text-royal uppercase">
              Pollas
            </span>
          </Link>
          <Link
            to="/tickets"
            className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md border-b-4 border-gray-100 hover:border-gold transition-all cursor-pointer"
          >
            <Calendar className="text-royal mb-2" size={32} />
            <span className="text-[10px] font-black text-royal uppercase">
              Tickets
            </span>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
