import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Header from "../components/header";
import Footer from "../components/header/footer";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now().valueOf() / 1000;
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
