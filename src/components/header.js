import { Settings, User, LogOut } from "lucide-react";
import { useState } from "react";
import cerrar_sesion from "../funciones/cerrar_sesion";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo y título */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">TBC</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Industrial TBC</h1>
            <span className="text-xs text-gray-500">Panel de Control</span>
          </div>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center gap-3 relative">
          {/* Avatar con menú desplegable */}
          <div>
            <button
              className="h-9 w-9 rounded-full overflow-hidden border border-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-14 w-56 bg-white border rounded shadow-lg z-50">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium">Administrador</p>
                  <p className="text-xs text-gray-500">admin@industrialestate.com</p>
                </div>
                <hr />
                <ul className="py-1">
                 
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Configuración
                  </li>
                  <hr />
                  <li onClick={cerrar_sesion} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}