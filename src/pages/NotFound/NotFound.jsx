import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "10rem", fontWeight: "700" }}>
      <p style={{ fontSize: "2rem" }}>
        <span>A página que você está procurando não</span>
        <span style={{ color: "#e94560" }}> existe</span>
      </p>
      <Link to="/">Voltar para a home</Link>
    </div>
  );
}
