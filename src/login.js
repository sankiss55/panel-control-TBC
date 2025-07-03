import { Eye, EyeOff, Building2 } from "lucide-react";
import session from "./funciones/session";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
  
  const navigate = useNavigate();
    const [user, setuser]= useState("");
    const [passsword, setpasssword]= useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Toaster/>
      <div className="w-full max-w-md">
        {/* Card de login */}
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold">Iniciar Sesión</h2>
            <p className="text-sm text-gray-500">
              Ingrese sus credenciales para acceder al sistema
            </p>
          </div>

          <form onSubmit={(e)=>{session(user, passsword, navigate); e.preventDefault(); 
          }} className="space-y-4">
            {/* Usuario */}
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={user}
                onChange={(e)=>{setuser(e.target.value)}}
                placeholder="Ingrese su usuario"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={passsword}
                  required
                  onChange={((e)=>{setpasssword(e.target.value)})}
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

        
        </div>

        
      </div>
    </div>
  );
}
