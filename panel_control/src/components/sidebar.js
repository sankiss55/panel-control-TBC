import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  Home,
  Users,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

// Aquí puedes reemplazar con tus propios componentes o HTML básico
// según tu proyecto y tus estilos. Esto es un ejemplo base.
export default function Sidebar() {
  const [inventoryOpen, setInventoryOpen] = useState(false);

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-100">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Menú Principal</h2>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {/* Dashboard */}
        <Link to="/dashboard" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded">
          <Home className="h-4 w-4" />
          Dashboard
        </Link>

        {/* Inventario */}
        <button
          className="flex w-full items-center justify-between px-2 py-2 hover:bg-gray-200 rounded"
          onClick={() => setInventoryOpen(!inventoryOpen)}
        >
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4" />
            Inventario
          </div>
          <span>{inventoryOpen ? "−" : "+"}</span>
        </button>
        {inventoryOpen && (
          <div className="pl-6 space-y-1">
            <Link to="/inventory/add" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-sm">
              <Plus className="h-3 w-3" />
              Agregar Inmueble
            </Link>
            <Link to="/inventory/search" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-sm">
              <Search className="h-3 w-3" />
              Buscar Inmuebles
            </Link>
            <Link to="/inventory/edit" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-sm">
              <Edit className="h-3 w-3" />
              Modificar
            </Link>
            <Link to="/inventory/remove" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-sm">
              <Trash2 className="h-3 w-3" />
              Eliminar
            </Link>
          </div>
        )}

        <hr className="my-3 border-gray-300" />

        {/* Clientes */}
        <Link to="/clients" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded">
          <Users className="h-4 w-4" />
          Clientes
        </Link>

        {/* Contratos */}
        <Link to="/contracts" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded">
          <FileText className="h-4 w-4" />
          Contratos
        </Link>

        {/* Reportes */}
        <Link to="/reports" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded">
          <BarChart3 className="h-4 w-4" />
          Reportes
        </Link>

        <hr className="my-3 border-gray-300" />

        {/* Configuración */}
        <Link to="/settings" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded">
          <Settings className="h-4 w-4" />
          Configuración
        </Link>
      </nav>

      {/* Información del sistema */}
      <div className="border-t p-4 text-xs text-gray-500">
        <p>Sistema v2.1.0</p>
        <p>© 2024 Industrial Estate</p>
      </div>
    </div>
  );
}
