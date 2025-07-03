import axios from "axios";
import config from "../config_back/config";

export default async function delete_propiedad(id) {
  try {
    const response = await axios.post(`${config}delete_propiedad.php`, { id: id });
    console.log(response.data);
    return response.data.respuesta || false; 
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
}