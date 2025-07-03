export default function cerrar_sesion(){
    localStorage.removeItem("session");
    window.location.href = "/login";
}