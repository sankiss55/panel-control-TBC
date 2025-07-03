import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AddUser_fn } from "../../funciones/add_user";
export default function AddUser() {
    const [user, setuser]=useState("");
    const [password, setpassword]=useState("");
    const [nombre, setnombre]=useState("");
    return (
        <div className="space-y-6">
             <Toaster/>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Agregar Usuario</h1>
                <p className="text-muted-foreground">Ingrese los datos del nuevo usuario</p>
            </div>
            
            <form onSubmit={(e)=>{e.preventDefault();
                AddUser_fn(user, password, nombre);
                setnombre("");
                setpassword("");
                setuser("");
                }} className="space-y-4 w-full max-w-2xl">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Usuario</label>
                    <input 
                        type="text" 
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                        name="usuario"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium">Contraseña</label>
                    <input 
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        name="password"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <input 
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                        type="text"
                        name="nombre"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Agregar Usuario
                </button>
            </form>
        </div>
    );
}
