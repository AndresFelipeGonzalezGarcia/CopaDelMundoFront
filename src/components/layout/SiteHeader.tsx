import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b-4 border-gold bg-royal text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Lado Izquierdo */}
        <nav className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-widest md:flex">
          <Link title="Inicio" to="/" className="hover:text-gold">
            Inicio
          </Link>
          <Link title="Calendario" to="/calendario" className="hover:text-gold">
            Calendario
          </Link>
          <Link title="Equipos" to="/equipos" className="hover:text-gold">
            Equipos
          </Link>
        </nav>

        {/* Logo Central (La Copa) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
          <div className="rounded-b-2xl border-x-4 border-b-4 border-gold bg-royal p-2 shadow-xl">
            <img src="/crest.png" alt="Mundial Total" className="h-16 w-auto" />
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
          <nav className="hidden items-center gap-6 md:flex">
            <Link title="Galería" to="/galeria" className="hover:text-gold">
              Galería
            </Link>
            <Link title="Contacto" to="/contacto" className="hover:text-gold">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-gold" />
            <Menu className="h-5 w-5 md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
