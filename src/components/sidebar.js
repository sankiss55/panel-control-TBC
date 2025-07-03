import {
  Building2,
  Edit,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  Trash2,
  User2Icon,
  X
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Estado para controlar el colapso del sidebar

  return (
    <div className={`flex flex-col ${sidebarOpen ? "w-64" : "w-16"} h-full border-r bg-gray-100 transition-all duration-300`}>
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4 justify-between">
        <h2 className={`text-lg font-semibold ${sidebarOpen ? "block" : "hidden"} transition-all duration-300`}>
          Menú Principal
        </h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-200 rounded">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
       

        {/* Inventario */}
        <button
          className="flex w-full items-center justify-between px-2 py-2 hover:bg-gray-200 rounded"
          onClick={() => setInventoryOpen(!inventoryOpen)}
        >
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4" />
            {sidebarOpen && <span>Inventario</span>}
          </div>
          {sidebarOpen && <span>{inventoryOpen ? "−" : "+"}</span>}
        </button>
        {inventoryOpen && sidebarOpen && (
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
            
          </div>
        )}

        <hr className="my-3 border-gray-300" />

        {/* Usuarios */}
        <button
          className="flex w-full items-center justify-between px-2 py-2 hover:bg-gray-200 rounded"
          onClick={() => setUsersOpen(!usersOpen)}
        >
          <div className="flex items-center gap-3">
            <User2Icon className="h-4 w-4" />
            {sidebarOpen && <span>Usuarios</span>}
          </div>
          {sidebarOpen && <span>{usersOpen ? "−" : "+"}</span>}
        </button>
        {usersOpen && sidebarOpen && (
          <div className="pl-6 space-y-1">
            <Link to="/users/add_user" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-sm">
              <Plus className="h-3 w-3" />
              Agregar Usuario
            </Link>
            <Link to="/users/search_users" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-sm">
              <Search className="h-3 w-3" />
              Buscar usuario
            </Link>
          </div>
        )}

        <hr className="my-3 border-gray-300" />

        {/* Configuración */}
        <Link to="/settings" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded">
          <Settings className="h-4 w-4" />
          {sidebarOpen && <span>Configuración</span>}
        </Link>
      </nav>
    </div>
  );
}
