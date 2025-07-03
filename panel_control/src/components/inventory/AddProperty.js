import { Save, X } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { uploadImages } from "../../funciones/upload_imags";

export default function AddProperty() {
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setdescripcion]=useState("");
  const [tipo, settipo]=useState("");
  const [ubicacion, setubicacion]=useState("");
  const [tipoDePropiedad, settipoDePropiedad]=useState("");
  const [tamanoMax, settamanoMax]=useState("");
  const [precio, setprecio]=useState("");
  const [moneda, setmoneda]=useState("");
  const [seVendePorM2, setSeVendePorM2] = useState("");

  const handleFileChange = (e) => {
    setImagenes(e.target.files);
  };
  function borrar_datos() {
    setImagenes([]); 
    setdescripcion("");
    settipo("");
    setubicacion("");
    settipoDePropiedad("");
    settamanoMax("");
    setprecio("");
    setmoneda("");
    setSeVendePorM2("");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; 
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await uploadImages(imagenes, descripcion, tipo, ubicacion, tipoDePropiedad, tamanoMax, precio, moneda, seVendePorM2); 
      if (success) {
        toast.success('Inmueble guardado correctamente.');
      } else {
        toast.error('Error al guardar el inmueble.'); 
      }
      borrar_datos();
    } catch (error) {
      console.error("Error:", error);
      toast.error('Error al realizar la solicitud.'); 
    }
  };

  return (
    
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agregar Inmueble</h1>
        <p className="text-gray-600">Registra un nuevo inmueble en el inventario</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setdescripcion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción del inmueble"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select  
              value={tipo}
              onChange={(e) => settipo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar tipo</option>
                <option value="bodega">Bodega</option>
                <option value="nave_industrial">Nave Industrial</option>
                <option value="oficina">Oficina</option>
                <option value="terreno">Terreno</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setubicacion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dirección completa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Propiedad *
              </label>
              <select 
              value={tipoDePropiedad}
              onChange={(e) => settipoDePropiedad(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar</option>
                <option value="venta">Venta</option>
                <option value="renta">Renta</option>
                <option value="venta_renta">Venta/Renta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño (m²)
              </label>
              <input
                type="number"
                value={tamanoMax}
                onChange={(e) => settamanoMax(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

          

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
             <input
                type="number"
                value={precio}
                onChange={(e) => setprecio(e.target.value)}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿El producto se vende por m2 ?
              </label>
             <select 
              value={seVendePorM2}
              onChange={(e) => setSeVendePorM2(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar</option>
                <option value="true">Si </option>
                <option value="false">No </option>
              </select>
            </div>
<div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Moneda que se usara para el precio *
              </label>
            <select 
              value={moneda}
              onChange={(e) => setmoneda(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar</option>
                <option value="MX">Mexicana (MX)</option>
                <option value="US">Estadounidense (US) </option>
                <option value="EUR">Euros (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes *
              </label>
              <input
                type="file"
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={borrar_datos}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Guardar Inmueble
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}