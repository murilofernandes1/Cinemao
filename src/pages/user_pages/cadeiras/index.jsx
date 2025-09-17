import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./cadeiras.css";
import api from "../../../../api";

export default function Cadeiras() {
  const userId = localStorage.getItem("id");
  const { sessaoId } = useParams();
  const navigate = useNavigate();
  const [cadeiras, setCadeiras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/sessions/${sessaoId}/cadeiras`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCadeiras(res.data);
        setLoading(false); // 🔹 Finaliza o loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // mesmo em erro, tira o loading
      });
  }, [sessaoId]);

  const fileirasMap = {};
  cadeiras.forEach((c) => {
    const letra = c.numeracao[0]; // Ex: A1 → "A"
    if (!fileirasMap[letra]) fileirasMap[letra] = [];
    fileirasMap[letra].push(c);
  });

  const ordemFileiras = ["F", "E", "D", "C", "B", "A"];

  return (
    <div className="container-cadeiras">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <h1 style={{ fontWeight: "700" }}>Cadeiras</h1>
            <h1 style={{ fontWeight: "700", color: "#e94560" }}>disponíveis</h1>
          </div>

          <div className="cadeiras-container">
            {ordemFileiras.map((letra) => {
              const fileira = fileirasMap[letra];
              if (!fileira) return null;

              // Ordena por número (A1, A2, A3...)
              fileira.sort(
                (a, b) =>
                  parseInt(a.numeracao.slice(1)) -
                  parseInt(b.numeracao.slice(1))
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
        </>
      )}
    </div>
  );
}
