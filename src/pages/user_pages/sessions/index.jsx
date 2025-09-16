import api from "../../../../api";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./sessions.css";
export default function Sessions() {
  const { id } = useParams();
  const [sessoes, setSessoes] = useState([]);
  6;
  const navigate = useNavigate();

  useEffect(() => {
    async function ShowSessions() {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(`/movies/${id}/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSessoes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    ShowSessions();
  }, [id]);

  return (
    <div className="sessoes-container">
      <h1>Sessões disponíveis</h1>
      {sessoes && sessoes.length > 0 ? (
        sessoes.map((sessao) => (
          <div className="sessao-card" key={sessao.id}>
            <button onClick={() => navigate(`/sessions/${sessao.id}/cadeiras`)}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <p style={{ color: "#e94560" }}>Sala: </p>
                <span style={{ fontWeight: "700" }}>
                  {sessao.sala.numeroSala}
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <p style={{ color: "#e94560" }}>Horário da sessão:</p>
                <span style={{ fontWeight: "700" }}>
                  {new Date(sessao.dataHora).toLocaleString()}
                </span>
              </div>
            </button>
          </div>
        ))
      ) : (
        <p>Nenhuma sessão encontrada.</p>
      )}
    </div>
  );
}
