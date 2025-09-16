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
      console.log(error);

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
    async function Sessao() {
      try {
        const sessaoResponse = await api.get(`/sessions/${sessaoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sessao = sessaoResponse.data[0];
        setSessaoSelecionada(sessao);
        console.log(sessao);

        const salaResponse = await api.get(`/salas/${sessao.salaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const response = salaResponse.data[0].numeroSala;
        setNumeroSala(response);

        await api.get(`/movies/${sessao.filmeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    Sessao();
  }, [sessaoId, token]);

  useEffect(() => {
    async function Cadeira() {
      try {
        const response = await api.get(`/sessions/${sessaoId}/cadeiras`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cadeira = response.data.find((c) => c.id === cadeiraId);
        setCadeiraSelecionada(cadeira);
      } catch (error) {
        console.log(error);
      }
    }
    Cadeira();
  }, [cadeiraId, sessaoId, token]);

  return (
    <>
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

        <p className="resumo-item">
          Sala: <span className="resumo-valor">{numeroSala}</span>
        </p>

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
    </>
  );
}
