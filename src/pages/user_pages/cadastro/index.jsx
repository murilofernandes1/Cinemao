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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/users/cadastro", { name, email, password });
      Swal.fire({
        title: "Cadastro realizado com sucesso!",
        icon: "sucess",
        confirmButtonText: "Ok",
        isConfirmed: navigate("/home"),
      });
    } catch (error) {
      alert("Erro ao cadastrar usuário", error);
    }
  }

  return (
    <div className="container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Cadastrar</button>
        <div className="login">
          <p>Já tem uma conta?</p>
          <Link to={"/login"}>Entrar</Link>
        </div>
      </form>
    </div>
  );
}
