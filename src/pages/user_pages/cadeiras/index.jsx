import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./cadeiras.css";
import api from "../../../../api";

export default function Cadeiras() {
  const userId = localStorage.getItem("id");
  const { sessaoId } = useParams();
  const navigate = useNavigate();
  const [cadeiras, setCadeiras] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/sessions/${sessaoId}/cadeiras`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCadeiras(res.data))
      .catch(console.log);
  }, [sessaoId]);

  const fileirasMap = {};
  cadeiras.forEach((c) => {
    const letra = c.numeracao[0];
    if (!fileirasMap[letra]) fileirasMap[letra] = [];
    fileirasMap[letra].push(c);
  });

  const ordemFileiras = ["F", "E", "D", "C", "B", "A"];

  return (
    <div className="container-cadeiras">
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <h1 style={{ fontWeight: "700" }}>Cadeiras</h1>
        <h1 style={{ fontWeight: "700", color: "#e94560" }}>disponíveis</h1>
      </div>

      <div className="cadeiras-container">
        {ordemFileiras.map((letra) => {
          const fileira = fileirasMap[letra];
          if (!fileira) return null;

          fileira.sort(
            (a, b) =>
              parseInt(a.numeracao.slice(1)) - parseInt(b.numeracao.slice(1))
          );

          return (
            <div className="cadeiras-grid" key={letra}>
              {fileira.map((c) => (
                <button
                  key={c.id}
                  disabled={c.ocupada}
                  className={`cadeira-button ${c.ocupada ? "ocupada" : ""}`}
                  onClick={() =>
                    navigate(`/sessions/${sessaoId}/${c.id}/${userId}`)
                  }
                >
                  {c.numeracao}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
