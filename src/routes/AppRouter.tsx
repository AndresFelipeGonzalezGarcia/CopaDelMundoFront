import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import DashboardPage from "../pages/DashboardPage";
import AlbumPage from "../pages/AlbumPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="album" element={<AlbumPage />} />

          <Route
            path="pollas"
            element={
              <h1 style={{ padding: "50px" }}>
                Página de Pollas en construcción
              </h1>
            }
          />
          {/* Aquí puedes meter tus rutas de admin luego */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
