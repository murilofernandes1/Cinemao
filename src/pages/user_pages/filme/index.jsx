import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sessions from "../sessions";
import api from "../../../../api";
import "./filmes.css";
export default function Filme() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function loadMovie() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMovie(response.data.movies);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    loadMovie();
  }, [id]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="filme-container">
          {movie && (
            <>
              <p className="filme-titulo">{movie.titulo}</p>
              <div style={{ display: "flex", gap: "5px" }}>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#e94560",
                    fontSize: "1.2rem",
                  }}
                >
                  Sinopse:{" "}
                </p>
                <p style={{ fontSize: "1.2rem" }}> {movie.sinopse}</p>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#e94560",
                    fontSize: "1.2rem",
                  }}
                >
                  Duração:{" "}
                </p>
                <p style={{ fontSize: "1.2rem" }}>{movie.duracao}</p>
                <p style={{ fontSize: "1.2rem" }}>Minutos</p>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#e94560",
                    fontSize: "1.2rem",
                  }}
                >
                  Data de lançamento: {""}
                </p>
                <p style={{ fontSize: "1.2rem" }}>
                  {new Date(movie.dataLancamento).toLocaleDateString()}
                </p>
              </div>
            </>
          )}

          <div className="filme-sessoes">
            <Sessions movieId={id} />
          </div>
        </div>
      </div>
    </>
  );
}
