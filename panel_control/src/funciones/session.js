import axios from "axios";
export default function session(usuario, password) {
 axios.post("/api/session", {
    usuario:usuario,
    password:password
 }
 ).then((response) => {
    console.log(response.data);
 }).catch((error) => {
    console.error("Error al iniciar sesión:", error);
 });
}