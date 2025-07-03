import axios from "axios";
import config from "../config_back/config";

export default async function SearchProperties() {
    try {
        const response = await axios.post(`${config}buscar_inventario.php`);
        console.log('Respuesta del servidor:', response.data);

        if (response.data.respuesta === 1) {
            console.log('No se encontraron propiedades');
            return [];
        }

        if (response.data.respuesta === true) {
            console.log('Propiedades encontradas:', response.data.articulos);
            return response.data.articulos;
        } else {
            console.error('Error al buscar propiedades:', response.data.message);
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
}