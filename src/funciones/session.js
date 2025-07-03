import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config_back/config.js";
export default function session(usuario, password, navigate) {

  console.log("Iniciando sesión con usuario:", usuario, "y contraseña:", password);
const respuesta="";
  toast.promise(
    axios.post(`${config}session.php`, {
      usuario,
      password,
    }).then((res) => {
      console.log(res.data);
      if (res.data.respuesta==false && res.data.respuesta) {
         
        throw new Error("Credenciales inválidas");
      } else {
        localStorage.setItem("session", "true");
            navigate('/');

      }
    }),
    {
      loading: "Iniciando sesión...",
      success: () => <b>Sesión iniciada</b>,
      error: (err) => <b>{err.message || "Error al iniciar sesión"}</b>,
    }
  );
}
export function AddUser_fn(nombre, usuario, passoword) {
    alert("Función AddUser_fn no implementada");
    
   }