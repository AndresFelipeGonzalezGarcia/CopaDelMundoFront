import { apiClient } from "../api/apiClient";

// Definimos la estructura (Interfaces) para que TypeScript nos ayude
export interface Partido {
  id: number;
  equipoLocal: string;
  banderaLocal: string; // ej: "🇨🇴"
  equipoVisitante: string;
  banderaVisitante: string;
  fecha: string;
  hora: string;
}

export interface PosicionGrupo {
  id: number;
  equipo: string;
  bandera: string;
  puntos: number;
}

export const partidosService = {
  obtenerProximos: async (): Promise<Partido[]> => {
    // Cuando el backend no exista, podemos engañar a la app temporalmente
    // devolviendo los datos quemados (MOCK) si la petición falla.
    try {
      return await apiClient.get("/partidos/proximos");
    } catch {
      return [
        {
          id: 1,
          equipoLocal: "Colombia",
          banderaLocal: "🇨🇴",
          equipoVisitante: "Alemania",
          banderaVisitante: "🇩🇪",
          fecha: "14 JUN",
          hora: "15:00",
        },
        {
          id: 2,
          equipoLocal: "Argentina",
          banderaLocal: "🇦🇷",
          equipoVisitante: "Francia",
          banderaVisitante: "🇫🇷",
          fecha: "15 JUN",
          hora: "20:00",
        },
      ];
    }
  },

  obtenerTablaPosiciones: async (grupo: string): Promise<PosicionGrupo[]> => {
    try {
      return await apiClient.get(`/posiciones/${grupo}`);
    } catch {
      return [
        { id: 1, equipo: "Alemania", bandera: "🇩🇪", puntos: 6 },
        { id: 2, equipo: "Colombia", bandera: "🇨🇴", puntos: 4 },
        { id: 3, equipo: "Japón", bandera: "🇯🇵", puntos: 1 },
      ];
    }
  },
};
