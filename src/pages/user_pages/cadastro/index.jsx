import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../../api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "./cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/users/cadastro", {
        name,
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem("id", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("token", token);

      Swal.fire({
        title: "Conta criada com sucesso!",
        icon: "success",
        iconColor: "#e94560",
        confirmButtonColor: "#e94560",
        confirmButtonText: "Ok",
        background: "#0c0a3e",
        color: "#e94560",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro!",
        text: "Um erro aconteceu ao criar sua conta",
        icon: "error",
        iconColor: "#e94560",
        confirmButtonText: "Ok",
        confirmButtonColor: "#e94560",
        background: "#0c0a3e",
        color: "#e94560",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          disabled={loading}
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Cadastrar
        </button>
        <div className="login">
          <p>Já tem uma conta?</p>
          <Link to={"/login"}>Entrar</Link>
        </div>
      </form>
    </div>
  );
}
