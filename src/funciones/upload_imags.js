import { API_URL } from "../config"; 

export async function uploadImages(imagenes, descripcion, tipo, ubicacion, tipoDePropiedad, tamanoMax, precio, moneda, seVendePorM2, Nombre) {
  
  const formData = new FormData();
  for (let i = 0; i < imagenes.length; i++) {
    formData.append("imagenes[]", imagenes[i]);
  }
  formData.append("descripcion", descripcion);
  formData.append("tipo", tipo);
  formData.append("ubicacion", ubicacion);
  formData.append("tipo_de_propiedad", tipoDePropiedad);
  formData.append("tamano_max", tamanoMax);
  formData.append("moneda", moneda);
  formData.append("precio", precio);
  
  formData.append("nombre", Nombre);
  
  formData.append("seVendePorM2", seVendePorM2);

  try {
    const response = await fetch(`${API_URL}upload_images.php`, {
      method: "POST",
      body: formData,
    });
console.log(response);
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    return false;
  }
}
