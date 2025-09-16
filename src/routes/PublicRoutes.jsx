import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";

export default function PublicRoutes() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
