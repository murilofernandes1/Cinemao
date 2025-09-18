import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";
import api from "../../../../api";
import Swal from "sweetalert2";

export default function Profile() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [token] = useState(localStorage.getItem("token") || "");
  const [role] = useState(localStorage.getItem("role") || "");
  const [reservas, setReservas] = useState([]);
  const [showDados, setShowDados] = useState(false);
  const [showReservas, setShowReservas] = useState(false);

  const alterarDados = () => {
    setShowDados(!showDados);
  };
  const mostrarReservas = () => {
    setShowReservas(!showReservas);
  };
  useEffect(() => {
    async function Reservas() {
      try {
        const response = await api.get(`/users/${id}/reserva`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReservas(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    Reservas();
  }, [id, token]);
  async function handleUpdateName(e) {
    e.preventDefault();
    try {
      await api.put(
        `/users/${id}`,
        { name: nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setName(response.data.name);
      localStorage.setItem("name", response.data.name);

      Swal.fire({
        title: "Nome de usuário atualizado com sucesso!",
        icon: "success",
        iconColor: "#e94560",
        confirmButtonColor: "#e94560",
        confirmButtonText: "Ok",
        background: "#0c0a3e",
        color: "#e94560",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Erro!",
        text: "Não foi possível alterar seu nome de usuário.",
        icon: "error",
        iconColor: "#e94560",
        confirmButtonText: "Ok",
        confirmButtonColor: "#e94560",
        background: "#0c0a3e",
        color: "#e94560",
      });
    }
  }

  async function handleUpdateEmail(e) {
    e.preventDefault();
    try {
      await api.put(
        `/users/${id}`,
        { email: email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        title: "Email atualizado com sucesso!",
        icon: "success",
        iconColor: "#e94560",
        confirmButtonColor: "#e94560",
        confirmButtonText: "Ok",
        background: "#0c0a3e",
        color: "#e94560",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Erro!",
        text: "Não foi possível alterar seu email.",
        icon: "error",
        iconColor: "#e94560",
        confirmButtonText: "Ok",
        confirmButtonColor: "#e94560",
        background: "#0c0a3e",
        color: "#e94560",
      });
    }
  }

  async function handleUpdatePassword(e) {
    e.preventDefault();
    try {
      await api.put(
        `/users/${id}`,
        { password: password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        title: "Senha atualizada com sucesso!",
        icon: "success",
        iconColor: "#e94560",
        confirmButtonColor: "#e94560",
        confirmButtonText: "Ok",
        background: "#0c0a3e",
        color: "#e94560",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Erro!",
        text: "Não foi possível alterar sua senha.",
        icon: "error",
        iconColor: "#e94560",
        confirmButtonText: "Ok",
        confirmButtonColor: "#e94560",
        background: "#0c0a3e",
        color: "#e94560",
      });
    }
  }

  return (
    <>
      <div className="perfil-container">
        <div className="ola">
          <p>Olá,</p>
          <span>{name}</span>
        </div>

        <button onClick={mostrarReservas} className="perfil-buttons">
          {showReservas ? "Minhas reservas" : "Minhas reservas"}
        </button>
        {showReservas && (
          <>
            {reservas.length === 0 ? (
              <p>
                Você ainda não tem nenhuma reserva.{" "}
                <Link to="/">Ver filmes em cartaz</Link>
              </p>
            ) : (
              reservas.map((reserva) => (
                <button
                  onClick={() => navigate(`/reserva/${reserva.id}`)}
                  className="handleReservas"
                  key={reserva.id}
                >
                  <p className="filme">{reserva.filme}</p>
                  <p>
                    <span className="label">Horário:</span>{" "}
                    <span className="valor">
                      {new Date(reserva.dataHora).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span className="label">Cadeira:</span>{" "}
                    <span className="valor">{reserva.cadeira}</span>
                  </p>
                  <p>
                    <span className="label">Sala:</span>{" "}
                    <span className="valor">{reserva.numeroSala}</span>
                  </p>
                </button>
              ))
            )}
          </>
        )}

        <button className="perfil-buttons" onClick={alterarDados}>
          {showDados ? "Alterar meus dados" : "Alterar meus dados"}
        </button>
        {showDados && (
          <>
            <form onSubmit={handleUpdateName} className="perfil-form">
              <h2>Atualize seu nome de usuário</h2>
              <input
                title="Novo nome de usuário"
                required
                placeholder="Digite aqui seu novo nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <button type="submit">Atualizar</button>
            </form>
            <form onSubmit={handleUpdateEmail} className="perfil-form">
              <h2>Atualize seu email</h2>
              <input
                required
                placeholder="Digite aqui seu novo email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Atualizar</button>
            </form>
            <form onSubmit={handleUpdatePassword} className="perfil-form">
              <h2>Atualize sua senha</h2>
              <input
                required
                placeholder="Digite aqui sua nova senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Atualizar</button>
            </form>
          </>
        )}
        {role === "ADMIN" ? (
          <button onClick={() => navigate("/admin")}>Dashboard do Admin</button>
        ) : null}
      </div>
    </>
  );
}
