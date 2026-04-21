import { apiClient } from "../api/apiClient";

export interface ProgresoAlbum {
  usuarioId: number;
  totalLaminas: number;
  laminasObtenidas: number;
  porcentaje: number;
}

export interface PaisAlbum {
  id: number;
  nombre: string;
  bandera: string;
  confederacion: string;
}

export const albumService = {
  obtenerProgreso: async (usuarioId: number): Promise<ProgresoAlbum> => {
    try {
      return await apiClient.get(`/album/progreso/${usuarioId}`);
    } catch {
      return {
        usuarioId,
        totalLaminas: 48,
        laminasObtenidas: 0,
        porcentaje: Math.round((4 / 48) * 100),
      };
    }
  },

  obtenerMisLaminas: async (usuarioId: number): Promise<number[]> => {
    try {
      return await apiClient.get(`/album/usuario/${usuarioId}/laminas`);
    } catch {
      return [1, 2, 8, 12];
    }
  },

  // ¡NUEVO! Función para abrir el sobre
  abrirSobre: async (usuarioId: number): Promise<PaisAlbum[]> => {
    try {
      return await apiClient.post(`/album/abrir-sobre`, { usuarioId });
    } catch {
      // Mock: Simulamos que el backend de Thomas, Paula y Samuel nos devuelve 3 láminas al azar
      // En la vida real, el backend hace el Math.random y descuenta un sobre de tu cuenta
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 5,
              nombre: "Uruguay",
              bandera: "UY",
              confederacion: "CONMEBOL",
            },
            { id: 7, nombre: "Alemania", bandera: "🇩🇪", confederacion: "UEFA" },
            {
              id: 10,
              nombre: "Inglaterra",
              bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
              confederacion: "UEFA",
            },
          ]);
        }, 1500); // Simulamos 1.5 segundos de suspenso en la red
      });
    }
  },
};
