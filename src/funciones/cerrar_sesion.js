
import { useNavigate } from "react-router-dom";

export default function useCerrarSesion() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  return cerrarSesion;
}
