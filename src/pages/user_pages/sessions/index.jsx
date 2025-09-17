import api from "../../../../api";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./sessions.css";

export default function Sessions() {
  const { id } = useParams();
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function ShowSessions() {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const sessionsResponse = await api.get(`/movies/${id}/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessoes(sessionsResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    ShowSessions();
  }, [id]);

  return (
    <div className="sessoes-container">
      {loading ? (
        <div className="spinner-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h2>Sessões disponíveis</h2>

          {sessoes.length > 0 ? (
            <div className="sessoes-list">
              {sessoes.map((sessao) => (
                <div className="sessao-card" key={sessao.id}>
                  <button
                    className="sessao-button"
                    onClick={() => navigate(`/sessions/${sessao.id}/cadeiras`)}
                  >
                    <div className="sessao-info">
                      <p>Sala:</p>
                      <span>{sessao.sala.numeroSala}</span>
                    </div>
                    <div className="sessao-info">
                      <p>Horário:</p>
                      <span>
                        {new Date(sessao.dataHora).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-sessoes">Nenhuma sessão encontrada.</p>
          )}
        </>
      )}
    </div>
  );
}
