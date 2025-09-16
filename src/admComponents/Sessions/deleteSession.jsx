import { useState, useEffect } from "react";
import api from "../../../api";
import "../adm.css";

export default function DeleteSession() {
  const [todasSessoes, setTodasSessoes] = useState([]);
  const [sessaoDeletada, setSessaoDeletada] = useState("");

  useEffect(() => {
    async function loadSessoes() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodasSessoes(data);
      } catch (err) {
        console.error("Erro ao carregar sessões:", err);
      }
    }
    loadSessoes();
  }, []);

  const deleteSessao = async (e) => {
    e.preventDefault();
    if (!sessaoDeletada) {
      alert("Selecione uma sessão para deletar!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/sessions/${sessaoDeletada}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = await api.get("/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodasSessoes(data.sessions);
      alert("Sessão deletada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar sessão");
    }
  };

  return (
    <div className="container-form">
      <h2>Deletar sessão</h2>
      <form onSubmit={deleteSessao}>
        <select
          value={sessaoDeletada}
          onChange={(e) => setSessaoDeletada(e.target.value)}
        >
          <option value="">Escolha uma sessão para deletar</option>
          {todasSessoes?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.filme?.titulo} - {new Date(s.dataHora).toLocaleString()}
            </option>
          ))}
        </select>
        <button type="submit">Deletar sessão</button>
      </form>
    </div>
  );
}
