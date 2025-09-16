import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/header/footer";

export default function PublicRoutes() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
