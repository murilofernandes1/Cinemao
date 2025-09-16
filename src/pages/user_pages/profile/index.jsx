import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";
import api from "../../../../api";

export default function Profile() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [token] = useState(localStorage.getItem("token") || "");
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

      alert("Nome atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível alterar o nome do usuário");
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
      alert("Email atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível alterar o email do usuário");
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
      alert("Senha atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível alterar a senha do usuário");
    }
  }

  return (
    <>
      <div className="perfil-container">
        <div className="ola">
          <h1>Olá, </h1>
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
                  <p className="filme">{reserva.sessao.filme.titulo}</p>
                  <p>
                    <span className="label">Horário:</span>{" "}
                    <span className="valor">
                      {new Date(reserva.sessao.dataHora).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span className="label">Cadeira:</span>{" "}
                    <span className="valor">{reserva.cadeira.numeracao}</span>
                  </p>
                  <p>
                    <span className="label">Sala:</span>{" "}
                    <span className="valor">
                      {reserva.sessao.sala.numeroSala}
                    </span>
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
      </div>
    </>
  );
}
