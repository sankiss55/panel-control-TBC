import axios from "axios";
import config from "../config_back/config";
import { toast } from "react-hot-toast";

export const Search_users_fn = async (usuario) => {
    console.log('Buscando usuario:', usuario);
    try {
        const response = await axios.post(`${config}search_user.php`, { usuario });
        console.log('Respuesta del servidor:', response.data);

        if (response.data.respuesta === 1) {
            return [];  
        }

        if (response.data.respuesta === true) {
            return response.data.usuarios; 
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        toast.error("Error en la comunicación con el servidor.");
        return [];
    }
};
