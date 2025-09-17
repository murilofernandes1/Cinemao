import { Navigate, Outlet } from "react-router-dom";
import { decodeJWT } from "../utils/decodeJWT";
import Footer from "../components/header/footer";
import HeaderAdm from "../components/headerAdm";

export default function AdminRoutes() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decoded = decodeJWT(token);

  if (!decoded || decoded.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <HeaderAdm />
      <Outlet />
      <Footer />
    </>
  );
}
