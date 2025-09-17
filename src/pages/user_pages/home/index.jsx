import { useEffect, useState } from "react";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const [allmovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const {
          data: { movies },
        } = await api.get("/movies");

        setAllMovies(movies);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <div className="cinema-container">
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1 className="cinema-title">Em cartaz</h1>
        <h1 style={{ color: "#e94560", fontSize: "2.5rem" }}>agora</h1>
      </div>

      <div className="cinema-gallery">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          allmovies.map((movie) => (
            <div
              key={movie.id}
              className="cinema-card"
              onClick={() => navigate(`/movies/${movie.id}`)}
              style={{
                backgroundImage: `url(${
                  movie.posterUrl ||
                  "https://via.placeholder.com/200x300?text=Sem+Imagem"
                })`,
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
