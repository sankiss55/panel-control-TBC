import axios from "axios";
import config from "../config_back/config";
import { toast } from "react-hot-toast";

export const Edit_user_fn = async (id_usuario, formData) => {
    try {
        const response = await axios.post(`${config}edit_user.php`, {
            id_usuario,
            usuario: formData.usuario,
            nombre: formData.nombre,
        });
        console.log('Respuesta del servidor:', response.data);

        if (response.data.respuesta === true) {
            toast.success("Usuario actualizado correctamente.");
        } else {
            toast.error(response.data.mensaje || "Error al actualizar el usuario.");
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        toast.error("Error en la comunicación con el servidor.");
    }
};
