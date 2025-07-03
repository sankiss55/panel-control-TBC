import axios from "axios";
import { Save, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import config from "../../config_back/config";
import buscar_propuedad from "../../funciones/buscar_propiedades";

export default function EditProperty() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await buscar_propuedad();
        if (response && Array.isArray(response)) {
          setProperties(response); // Actualizar el estado con las propiedades obtenidas
          setFilteredProperties(response); // Inicializar las propiedades filtradas
        } else {
          console.error("Error en la respuesta de la API:", response);
        }
      } catch (error) {
        console.error("Error al obtener las propiedades:", error);
      }
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      const existingImages = selectedProperty.imagenes.split('|').map((image) => ({
        preview: `https://yofibox.com/api_aura/archivos/${image}`, // Construir la ruta completa del servidor
        isNew: false,
      }));
      setImages(existingImages); // Inicializar las imágenes existentes
    }
  }, [selectedProperty]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = properties.filter(
      (property) =>
        property.descripcion.toLowerCase().includes(term) ||
        property.id_articulo.toString().includes(term)
    );
    setFilteredProperties(filtered);
  };

  const handleSelectProperty = (id) => {
    const property = properties.find((p) => p.id_articulo === id);
    setSelectedProperty(property);
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      const objectURL = URL.createObjectURL(file); // Crear una URL temporal para mostrar la imagen
      return { file, preview: objectURL, isNew: true }; // Marcar como nueva imagen
    });
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const base64Images = await Promise.all(
        images.map((image) => {
          if (image.isNew) {
            // Convertir imágenes nuevas a base64
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(image.file);
            });
          } else {
            // Mantener las imágenes existentes como están
            return image.preview.replace('https://yofibox.com/api_aura/archivos/', ''); // Remover la ruta del servidor
          }
        })
      );

      const updatedProperty = {
        id: selectedProperty.id_articulo,
        descripcion: e.target.descripcion.value.trim(),
        tipo: e.target.tipo.value.trim(),
        ubicacion: e.target.ubicacion.value.trim(),
        tipo_propiedad: e.target.tipo_propiedad.value.trim(),
        tamano: e.target.tamano.value.trim(),
        precio: e.target.precio.value.trim(),
        seVendePorM2: e.target.seVendePorM2.value === "true",
        moneda: e.target.moneda.value.trim(),
        imagenes: base64Images.join('|'), // Enviar imágenes en formato base64 o rutas existentes
      };

      if (
        !updatedProperty.descripcion ||
        !updatedProperty.tipo ||
        !updatedProperty.ubicacion ||
        !updatedProperty.tipo_propiedad ||
        !updatedProperty.tamano ||
        !updatedProperty.precio ||
        !updatedProperty.moneda
      ) {
        toast.error("Todos los campos son obligatorios.");
        return;
      }

      const response = await axios.post(`${config}editar_inventario.php`, updatedProperty);
      console.error(response.data);
      if (response.data.success) {
        toast.success("Inmueble actualizado correctamente.");
      } else {
        toast.error("Error al actualizar el inmueble.");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      toast.error("Error al realizar la solicitud.");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modificar Inmueble</h1>
        <p className="text-gray-600">Selecciona y edita un inmueble existente</p>
      </div>

      {/* Buscador dinámico */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Seleccionar Inmueble</h2>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar inmueble por descripción o ID..."
            />
          </div>
          <ul className="border rounded-md max-h-40 overflow-y-auto">
            {filteredProperties.map((property) => (
              <li
                key={property.id_articulo}
                onClick={() => handleSelectProperty(property.id_articulo)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {property.descripcion} (ID: {property.id_articulo})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Formulario de edición */}
      {selectedProperty && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Editar Inmueble (ID: {selectedProperty.id_articulo})</h2>
          <form className="space-y-6" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <input
                  type="text"
                  name="descripcion"
                  defaultValue={selectedProperty.descripcion}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  name="tipo"
                  defaultValue={selectedProperty.tipo}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
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
                  name="ubicacion"
                  defaultValue={selectedProperty.ubicacion}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Propiedad *
                </label>
                <select
                  name="tipo_propiedad"
                  defaultValue={selectedProperty.tipo_de_propiedad}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="venta">Venta</option>
                  <option value="renta">Renta</option>
                  <option value="venta_renta">Venta/Renta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño (m²) *
                </label>
                <input
                  type="number"
                  name="tamano"
                  defaultValue={selectedProperty.tamano}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿El producto se vende por m²? *
                </label>
                <select
                  name="seVendePorM2"
                  defaultValue={selectedProperty.seVendePorM2 ? "true" : "false"}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moneda que se usará para el precio *
                </label>
                <select
                  name="moneda"
                  defaultValue={selectedProperty.moneda}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MX">Mexicana (MX)</option>
                  <option value="US">Estadounidense (US)</option>
                  <option value="EUR">Euros (EUR)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio *
                </label>
                <input
                  type="number"
                  name="precio"
                  step="0.01"
                  defaultValue={selectedProperty.precio}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview} // Usar la URL de vista previa para mostrar la imagen
                        alt={`Imagen ${index + 1}`}
                        className="w-20 h-20 object-cover border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleAddImage}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
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
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

