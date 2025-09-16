import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import api from "../../../../api";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      const { token, role, name, id } = data;
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao tentar logar");
    }
  }

  return (
    <div className="container">
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit} className="form-login">
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login"
          placeholder="Digite seu email"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-login"
          placeholder="Digite sua senha"
        />
        <button className="input-button">Entrar</button>
      </form>
      <div className="login">
        <p>Ainda não tem uma conta?</p>
        <Link to={"/cadastro"}>Cadastre-se</Link>
      </div>
    </div>
  );
}
