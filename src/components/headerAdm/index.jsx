import { useNavigate } from "react-router-dom";
import "./headerADM.css";

export default function HeaderAdm() {
  const navigate = useNavigate();

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

      <nav className="nav-buttons">
        <button onClick={() => navigate("/")} className="nav-btn">
          Home
        </button>
        <button onClick={() => navigate("/profile")} className="nav-btn">
          Perfil
        </button>
        <button onClick={() => navigate("/admin")} className="nav-btn">
          Admin
        </button>
        <button onClick={Sair} className="nav-btn">
          Sair
        </button>
      </nav>
    </header>
  );
}
