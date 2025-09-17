import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/user_pages/login/index";
import Cadastro from "./pages/user_pages/cadastro";
import Home from "./pages/user_pages/home";
import AdminDashboard from "./pages/admin_dashboard";
import PublicRoutes from "./routes/PublicRoutes";
import Profile from "./pages/user_pages/profile";
import Filme from "./pages/user_pages/filme";
import Cadeiras from "./pages/user_pages/cadeiras";
import Reserva from "./pages/user_pages/reserva";
import DeleteReserva from "./pages/deleteReserva";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route index element={<Home />} />
            <Route path="/movies/:id/" element={<Filme />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/sessions/:sessaoId/cadeiras" element={<Cadeiras />} />

            <Route
              path="/sessions/:sessaoId/:cadeiraId/:userId"
              element={<Reserva />}
            />
            <Route path="/reserva/:id" element={<DeleteReserva />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/movies/:id/" element={<Filme />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/sessions/:sessaoId/cadeiras" element={<Cadeiras />} />
            <Route
              path="/sessions/:sessaoId/:cadeiraId/:userId"
              element={<Reserva />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
