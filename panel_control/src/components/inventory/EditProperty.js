import { Save, X, Search } from "lucide-react";
import { useState } from "react";

export default function EditProperty() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Datos de ejemplo
  const properties = [
    {
      id: 1,
      descripcion: "Bodega Industrial Zona Norte",
      tipo: "bodega",
      ubicacion: "Av. Industrial 123, Zona Norte",
      tipo_propiedad: "renta",
      precio: 25000,
      tamano_max: 500,
      tamano_min: 300,
      imagenes: "imagen1.jpg,imagen2.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modificar Inmueble</h1>
        <p className="text-gray-600">Selecciona y edita un inmueble existente</p>
      </div>

      {/* Selector de inmueble */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Seleccionar Inmueble</h2>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar inmueble por descripción o ID..."
            />
          </div>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const property = properties.find(p => p.id === parseInt(e.target.value));
              setSelectedProperty(property);
            }}
          >
            <option value="">Seleccionar inmueble</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.descripcion} (ID: {property.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Formulario de edición */}
      {selectedProperty && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Editar Inmueble (ID: {selectedProperty.id})</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <input
                  type="text"
                  defaultValue={selectedProperty.descripcion}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select 
                  defaultValue={selectedProperty.tipo}
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
                  defaultValue={selectedProperty.ubicacion}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Propiedad *
                </label>
                <select 
                  defaultValue={selectedProperty.tipo_propiedad}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="venta">Venta</option>
                  <option value="renta">Renta</option>
                  <option value="venta_renta">Venta/Renta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño Máximo (m²)
                </label>
                <input
                  type="number"
                  defaultValue={selectedProperty.tamano_max}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño Mínimo (m²)
                </label>
                <input
                  type="number"
                  defaultValue={selectedProperty.tamano_min}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio *
                </label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={selectedProperty.precio}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes (URLs)
                </label>
                <textarea
                  defaultValue={selectedProperty.imagenes}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
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
