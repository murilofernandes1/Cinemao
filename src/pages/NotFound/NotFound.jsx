import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <h1>A página que você está procurando não existe.</h1>
      <Link to="/">Voltar para a home</Link>
    </div>
  );
}
