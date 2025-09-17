import api from "../../../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./reserva.css";

export default function Reserva() {
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const [cadeiraSelecionada, setCadeiraSelecionada] = useState(null);
  const [numeroSala, setNumeroSala] = useState(null);
  const navigate = useNavigate();

  const { sessaoId, cadeiraId } = useParams();

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  async function Reservar() {
    const url = `/sessions/${sessaoId}/${cadeiraId}/${userId}/reserva`;
    try {
      await api.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔹 Resetando corretamente os estados
      setCadeiraSelecionada(null);
      setSessaoSelecionada(null);
      setNumeroSala(null);

      Swal.fire({
        title: "Reserva feita!",
        text: "Sua cadeira foi reservada com sucesso.",
        icon: "success",
        iconColor: "#e94560",
        confirmButtonColor: "#e94560",
        confirmButtonText: "Ok",
        background: "#0c0a3e",
        color: "#e94560",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error.response?.data || error.message);

      Swal.fire({
        title: "Erro!",
        text: "Não foi possível fazer a reserva.",
        icon: "error",
        iconColor: "#e94560",
        confirmButtonText: "Ok",
        confirmButtonColor: "#e94560",
        background: "#0c0a3e",
        color: "#e94560",
      });
    }
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        // 🔹 Pega a sessão primeiro
        const sessaoResponse = await api.get(`/sessions/${sessaoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sessao = Array.isArray(sessaoResponse.data)
          ? sessaoResponse.data[0]
          : sessaoResponse.data;

        setSessaoSelecionada(sessao);

        // 🔹 Busca sala + cadeiras em paralelo
        const [salaResponse, cadeirasResponse] = await Promise.all([
          api.get(`/salas/${sessao.salaId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/sessions/${sessaoId}/cadeiras`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Atualiza sala
        const numero = Array.isArray(salaResponse.data)
          ? salaResponse.data[0].numeroSala
          : salaResponse.data.numeroSala;
        setNumeroSala(numero);

        // Atualiza cadeira
        const cadeira = cadeirasResponse.data.find(
          (c) => c.id === Number(cadeiraId) // 🔹 compara como number
        );
        setCadeiraSelecionada(cadeira);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }

    carregarDados();
  }, [sessaoId, cadeiraId, token]);

  return (
    <div className="resumo-container">
      <h1>Resumo da sua reserva</h1>

      {sessaoSelecionada && (
        <>
          <p className="resumo-item">
            Filme:{" "}
            <span className="resumo-valor">
              {sessaoSelecionada.filme.titulo}
            </span>
          </p>
          <p className="resumo-item">
            Horário:{" "}
            <span className="resumo-valor">
              {new Date(sessaoSelecionada.dataHora).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </>
      )}

      {numeroSala && (
        <p className="resumo-item">
          Sala: <span className="resumo-valor">{numeroSala}</span>
        </p>
      )}

      {cadeiraSelecionada && (
        <p className="resumo-item">
          Cadeira:{" "}
          <span className="resumo-valor">{cadeiraSelecionada.numeracao}</span>
        </p>
      )}

      <button className="confirmar-button" onClick={Reservar}>
        Confirmar Reserva
      </button>
    </div>
  );
}
