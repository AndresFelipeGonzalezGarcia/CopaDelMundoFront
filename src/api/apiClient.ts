// Si no hay variable de entorno, usa el localhost por defecto para Spring Boot
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

async function peticionPersonalizada(
  endpoint: string,
  opciones: RequestInit = {},
) {
  const token = localStorage.getItem("token");
  const headers = new Headers(opciones.headers || {});

  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
      ...opciones,
      headers,
    });

    if (!respuesta.ok) {
      throw new Error(
        `Error del servidor: ${respuesta.status} ${respuesta.statusText}`,
      );
    }

    return await respuesta.json();
  } catch (error) {
    console.error(`Fallo la petición a ${endpoint}:`, error);
    throw error;
  }
}

export const apiClient = {
  get: (endpoint: string) => peticionPersonalizada(endpoint, { method: "GET" }),

  post: (endpoint: string, body: any) =>
    peticionPersonalizada(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint: string, body: any) =>
    peticionPersonalizada(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint: string) =>
    peticionPersonalizada(endpoint, { method: "DELETE" }),
};
