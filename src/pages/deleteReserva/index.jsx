import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./delete.css";
import api from "../../../api";
export default function DeleteReserva() {
  const navigate = useNavigate("");
  const token = localStorage.getItem("token");
  const [reserva, setReserva] = useState();
  const { id } = useParams();
  async function deletarReserva() {
    try {
      await api.delete(`/reserva/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Reserva excluida com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function Reserva() {
      try {
        const response = await api.get(`/reserva/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReserva(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    Reserva();
  }, [id, token]);
  return (
    <>
      <div>
        {reserva && (
          <div className="reserva">
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              <h1>Deseja cancelar a seguinte</h1>
              <h1 style={{ color: "#e94560" }}>reserva?</h1>
            </div>
            <p>
              <span className="label">Filme:</span>{" "}
              <span className="valor">{reserva.sessao.filme.titulo}</span>
            </p>
            <p>
              <span className="label">Horário:</span>{" "}
              <span className="valor">
                {new Date(reserva.sessao.dataHora).toLocaleString()}
              </span>
            </p>
            <p>
              <span className="label">Cadeira:</span>{" "}
              <span className="valor">{reserva.cadeira.numeracao}</span>
            </p>
            <p>
              <span className="label">Sala:</span>{" "}
              <span className="valor">{reserva.sessao.sala.numeroSala}</span>
            </p>
            <button className="deletar" onClick={deletarReserva}>
              Deletar reserva
            </button>
          </div>
        )}
      </div>
    </>
  );
}
