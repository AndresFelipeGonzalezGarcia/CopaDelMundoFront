import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* 1. NAVEGACIÓN SUPERIOR */}
      <SiteHeader />

      <main className="flex-1">
        {/* 2. BANNER DE CABECERA (Estilo Álbum Oficial) */}
        <section className="relative overflow-hidden border-b-4 border-gold bg-gradient-paper">
          {/* Capa decorativa de fondo (Confeti/Textura) */}
          <div className="absolute inset-0 confetti-bg opacity-30 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
            {eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-royal/80">
                {eyebrow}
              </p>
            )}

            <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-royal md:text-5xl">
              {title}
            </h1>

            {description && (
              <p className="mt-3 max-w-2xl text-sm text-royal/60 md:text-base leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </section>

        {/* 3. CONTENIDO DINÁMICO (Lo que Thomas, Paula y Samuel desarrollen) */}
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
          {children}
        </div>
      </main>

      {/* 4. CIERRE DEL SITIO */}
      <SiteFooter />
    </div>
  );
}
