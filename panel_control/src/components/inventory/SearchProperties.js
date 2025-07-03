import { Edit, Eye, Filter, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import buscar_propuedad from "../../funciones/buscar_propiedades";
import delete_propiedad from "../../funciones/delete_propiedad";
export default function SearchProperties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPropertyType, setFilterPropertyType] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await buscar_propuedad();
        if (response && Array.isArray(response)) {
          setProperties(response);
          setFilteredProperties(response); 
        } else {
          console.error("Error en la respuesta de la API:", response);
        }
      } catch (error) {
        console.error("Error al obtener las propiedades:", error);
      }
    }
    fetchProperties();
  }, []);

  const handleFilter = () => {
    const filtered = properties.filter((property) => {
      const matchesSearchTerm =
        property.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType ? property.tipo === filterType : true;
      const matchesPropertyType = filterPropertyType
        ? property.tipo_de_propiedad === filterPropertyType
        : true;

      return matchesSearchTerm && matchesType && matchesPropertyType;
    });
    setFilteredProperties(filtered);
  };

  const handleDelete = async (id) => {
    const success = await delete_propiedad(id);
    if (success) {
      toast.success("Se ha removido la propiedad");
      const updatedProperties = properties.filter((property) => property.id_articulo !== id);
      setProperties(updatedProperties);
      setFilteredProperties(updatedProperties);
    } else {
      toast.error("Hubo un error al remover la propiedad");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción, ubicación..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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
            <select
              value={filterPropertyType}
              onChange={(e) => setFilterPropertyType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="venta">Venta</option>
              <option value="renta">Renta</option>
              <option value="venta_renta">Venta/Renta</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleFilter}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Resultados ({filteredProperties.length})</h2>
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
              {filteredProperties.map((property) => (
                <tr key={property.id_articulo} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {property.descripcion || "Sin descripción"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.tipo_de_propiedad || "Sin tipo de propiedad"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {property.tipo || "Sin tipo"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {property.ubicacion || "Sin ubicación"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${property.precio ? property.precio.toLocaleString() + property.moneda : "Sin precio"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {property.tamano || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id_articulo)}
                        className="p-1 hover:bg-gray-200 rounded text-red-600"
                      >
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