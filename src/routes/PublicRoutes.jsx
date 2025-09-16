import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/header/footer";

export default function PublicRoutes() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
