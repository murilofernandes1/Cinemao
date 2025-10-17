import { useNavigate } from "react-router-dom";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function Sair() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <header className="header-container">
      <div className="logo" onClick={() => navigate("/")}>
        <span className="logo-cine">Cine</span>
        <span className="logo-mão">mão</span>
      </div>

      {token ? (
        <nav className="nav-buttons">
          <button onClick={() => navigate("/")} className="nav-btn">
            Home
          </button>
          <button onClick={() => navigate("/profile")} className="nav-btn">
            Minha conta
          </button>
          <button onClick={Sair} className="nav-btn">
            Sair
          </button>
        </nav>
      ) : null}
    </header>
  );
}
