import { useState } from "react";
import api from "../../../api";
import dateToIso from "../../utils/dateToISO";
import "../adm.css";
export default function AddMovie() {
  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [duracao, setDuracao] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const handleAddMovie = async (e) => {
    e.preventDefault();

    if (!dataLancamento) {
      alert("Selecione uma data válida");
      return;
    }

    let isoDate;
    try {
      isoDate = dateToIso(dataLancamento);
    } catch (err) {
      console.error(err.message);
      alert("Data inválida");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/movies",
        {
          titulo,
          sinopse,
          duracao: Number(duracao),
          dataLancamento: isoDate,
          posterUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Filme cadastrado com sucesso");
      setTitulo("");
      setSinopse("");
      setDuracao("");
      setDataLancamento("");
      setPosterUrl("");
    } catch (error) {
      console.error(error);
      alert("Um erro aconteceu");
    }
  };

  return (
    <div className="container-form">
      <h2>Postar um filme</h2>
      <form onSubmit={handleAddMovie}>
        <input
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          placeholder="Sinopse"
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          required
        />
        <input
          placeholder="Duração"
          type="number"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required
        />
        <input
          placeholder="Data de lançamento"
          type="date"
          value={dataLancamento}
          onChange={(e) => setDataLancamento(e.target.value)}
          required
        />
        <input
          placeholder="URL do poster do filme"
          type="text"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          required
        />
        <button type="submit">Postar filme</button>
      </form>
    </div>
  );
}
