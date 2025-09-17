import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./delete.css";
import Swal from "sweetalert2";
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
      Swal.fire({
        title: "Reserva cancelada com sucesso!",
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
        text: "Não foi possível cancelar sua reserva.",
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
            <h1>
              Deseja cancelar a seguinte{" "}
              <span className="reserva-destaque">reserva?</span>
            </h1>
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
