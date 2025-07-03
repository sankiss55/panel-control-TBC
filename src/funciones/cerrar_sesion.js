import { useNavigate } from "react-router-dom";

export default function cerrar_sesion() {
  const navigate = useNavigate();
  localStorage.removeItem("session");
  navigate("/login"); 
}