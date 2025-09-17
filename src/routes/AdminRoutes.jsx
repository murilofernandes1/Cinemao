import { Navigate, Outlet } from "react-router-dom";
import { decodeJWT } from "../utils/decodeJWT";
import Footer from "../components/header/footer";
import HeaderAdm from "../components/headerAdm";

export default function AdminRoutes() {
  const ADMIN = "ADMIN";
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decoded = decodeJWT(token);

  if (!decoded || decoded.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }
  if (token || ADMIN) {
    return (
      <>
        <HeaderAdm /> <Outlet /> <Footer />
      </>
    );
  }
}
