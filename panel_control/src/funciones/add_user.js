import axios from "axios";
import config from "../config_back/config";
import { toast } from "react-hot-toast";
export const AddUser_fn = async (usuario, password, nombre) => {
    try {
       axios.post(`${config}Add_user.php`, {
            usuario: usuario,
            password: password,
            nombre: nombre}).then((response) => {
                console.log('Respuesta del servidor:', response.data);
                if(response.data.respuesta===1){
                     toast.error("Lo sentimos el usuario ya existe, intente con otro nombre de usuario");
                     return;
                }
                if (response.data.respuesta==true) {
                    console.log('Usuario agregado exitosamente');
                    toast.success('Usuario agregado exitosamente');
                    return ;
                } else {
                    toast.error("Lo sentimos hubo un error al agregar el usuario, intentelo mas tarde o contacte al administrador del sistema");

                    console.error('Error al agregar usuario:', response.data.message);
                    return ;
                }
            }).catch((error) => {
                console.error('Error en la solicitud:', error);
            });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
