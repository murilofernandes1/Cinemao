import { useState, useEffect } from "react";
import api from "../../../api";
import "../adm.css";

export default function AddSession() {
  const [todosFilmes, setTodosFilmes] = useState([]);
  const [filme, setFilme] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [todasSalas, setTodasSalas] = useState([]);
  const [sala, setSala] = useState("");

  useEffect(() => {
    async function loadSalas() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/salas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodasSalas(data);
      } catch (err) {
        console.error("Erro ao carregar as salas:", err);
      }
    }
    loadSalas();
  }, []);

  useEffect(() => {
    async function loadMovies() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodosFilmes(data.movies);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }
    loadMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filme || !dataHora || !sala) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/sessions",
        {
          filmeId: filme,
          dataHora: new Date(dataHora).toISOString(),
          salaId: sala,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Sessão criada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar sessão!");
    }
  };

  return (
    <div className="container-form">
      <h2>Adicionar sessão</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={filme}
          onChange={(e) => setFilme(e.target.value)}
          required
        >
          <option value="">Selecione um filme</option>
          {todosFilmes.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titulo}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
          required
        />

        <select value={sala} onChange={(e) => setSala(e.target.value)} required>
          <option value="">Selecione uma sala</option>
          {todasSalas.map((s) => (
            <option key={s.id} value={s.id}>
              {s.numeroSala}
            </option>
          ))}
        </select>

        <button type="submit">Criar sessão</button>
      </form>
    </div>
  );
}
