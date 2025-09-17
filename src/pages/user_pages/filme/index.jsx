import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sessions from "../sessions";
import api from "../../../../api";
import "./filmes.css";

export default function Filme() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMovie(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!movie) {
    return <p className="no-movie">Filme não encontrado.</p>;
  }

  return (
    <div className="filme-container">
      <h1 className="filme-titulo">{movie.titulo}</h1>
      <p className="filme-sinopse">{movie.sinopse}</p>

      <div className="filme-detalhes">
        <div>
          <span className="detalhe-label">Duração:</span>
          <span>{movie.duracao} min</span>
        </div>
        <div>
          <span className="detalhe-label">Lançamento:</span>
          <span>
            {new Date(movie.dataLancamento).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>

      <div className="filme-sessoes">
        <Sessions movieId={id} />
      </div>
    </div>
  );
}
