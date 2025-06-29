import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";

export default function SearchProperties() {
  // Datos de ejemplo
  const properties = [
    {
      id: 1,
      descripcion: "Bodega Industrial Zona Norte",
      tipo: "Bodega",
      ubicacion: "Av. Industrial 123, Zona Norte",
      tipo_propiedad: "Renta",
      precio: 25000,
      tamano_max: 500,
      tamano_min: 300
    },
    {
      id: 2,
      descripcion: "Nave Industrial con Oficinas",
      tipo: "Nave Industrial",
      ubicacion: "Blvd. Manufacturero 456",
      tipo_propiedad: "Venta",
      precio: 2500000,
      tamano_max: 1200,
      tamano_min: 1000
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buscar Inmuebles</h1>
        <p className="text-gray-600">Encuentra y gestiona inmuebles del inventario</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción, ubicación..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todos</option>
              <option value="bodega">Bodega</option>
              <option value="nave_industrial">Nave Industrial</option>
              <option value="oficina">Oficina</option>
              <option value="terreno">Terreno</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Propiedad
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todos</option>
              <option value="venta">Venta</option>
              <option value="renta">Renta</option>
              <option value="venta_renta">Venta/Renta</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Resultados ({properties.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inmueble
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamaño (m²)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {property.descripcion}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.tipo_propiedad}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {property.tipo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {property.ubicacion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${property.precio.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {property.tamano_min} - {property.tamano_max}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
