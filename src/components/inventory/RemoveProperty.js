import { Trash2, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";

export default function RemoveProperty() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Datos de ejemplo
  const properties = [
    {
      id: 1,
      descripcion: "Bodega Industrial Zona Norte",
      tipo: "Bodega",
      ubicacion: "Av. Industrial 123, Zona Norte",
      tipo_propiedad: "Renta",
      precio: 25000
    },
    {
      id: 2,
      descripcion: "Nave Industrial con Oficinas",
      tipo: "Nave Industrial",
      ubicacion: "Blvd. Manufacturero 456",
      tipo_propiedad: "Venta",
      precio: 2500000
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Eliminar Inmueble</h1>
        <p className="text-gray-600">Selecciona un inmueble para eliminarlo del inventario</p>
      </div>

      {/* Selector de inmueble */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Buscar Inmueble</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por descripción, ubicación o ID..."
            />
          </div>
        </div>

        {/* Lista de inmuebles */}
        <div className="space-y-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedProperty?.id === property.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedProperty(property)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{property.descripcion}</h3>
                  <p className="text-sm text-gray-500">ID: {property.id}</p>
                  <p className="text-sm text-gray-600">{property.ubicacion}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {property.tipo}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {property.tipo_propiedad}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${property.precio.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información del inmueble seleccionado */}
      {selectedProperty && !showConfirmation && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Inmueble Seleccionado para Eliminación
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">¡Advertencia!</p>
                <p className="text-red-700 text-sm">
                  Esta acción eliminará permanentemente el inmueble del sistema. 
                  No se puede deshacer.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <p className="text-gray-900">{selectedProperty.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <p className="text-gray-900">{selectedProperty.descripcion}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <p className="text-gray-900">{selectedProperty.tipo}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ubicación</label>
              <p className="text-gray-900">{selectedProperty.ubicacion}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelectedProperty(null)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => setShowConfirmation(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Inmueble
            </button>
          </div>
        </div>
      )}

      {/* Confirmación final */}
      {showConfirmation && selectedProperty && (
        <div className="bg-white rounded-lg border border-red-300 p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Confirmar Eliminación
            </h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el inmueble "{selectedProperty.descripcion}"? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aquí iría la lógica de eliminación
                  alert('Inmueble eliminado (funcionalidad pendiente)');
                  setSelectedProperty(null);
                  setShowConfirmation(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
