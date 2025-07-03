import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config_back/config";

export const Delete_user_fn = async (id_usuario) => {
    try {
        const response = await axios.post(`${config}delete_user.php`, { id_usuario });
        console.log('Respuesta del servidor:', response.data);

        if (response.data.respuesta === true) {
            toast.success("Usuario eliminado correctamente.");
        } else {
            toast.error(response.data.mensaje || "Error al eliminar el usuario.");
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        toast.error("Error en la comunicación con el servidor.");
    }
};
