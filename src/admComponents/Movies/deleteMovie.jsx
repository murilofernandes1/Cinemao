import { useState, useEffect } from "react";
import api from "../../../api";
import "../adm.css";

export default function DeleteMovie() {
  const [todosFilmes, setTodosFilmes] = useState([]);
  const [filmeDeletado, setFilmeDeletado] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodosFilmes(data.movies);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }
    loadMovies();
  }, []);

  const handleDeleteMovie = async (e) => {
    e.preventDefault();
    if (!filmeDeletado) {
      alert("Selecione um filme para deletar!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/movies/${filmeDeletado}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Filme deletado com sucesso");
      const { data } = await api.get("/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodosFilmes(data.movies);
      setFilmeDeletado("");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar filme");
    }
  };

  return (
    <div className="container-form">
      <h2>Deletar um filme</h2>
      <form onSubmit={handleDeleteMovie}>
        <select
          value={filmeDeletado}
          onChange={(e) => setFilmeDeletado(e.target.value)}
        >
          <option value="">Selecione um filme</option>
          {todosFilmes.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titulo}
            </option>
          ))}
        </select>
        <button type="submit">Deletar</button>
      </form>
    </div>
  );
}
