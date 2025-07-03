import { useEffect, useState } from "react";
import { Delete_user_fn } from "../../funciones/delete_user";
import { Edit_user_fn } from "../../funciones/edit_user";
import { Search_users_fn } from "../../funciones/search_user";
import { Toaster, toast } from "react-hot-toast"; // Importar Toaster y toast

export default function Search_users() {
    const [usuario, setusuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [editandoUsuario, setEditandoUsuario] = useState(null); // Estado para el usuario en edición
    const [formData, setFormData] = useState({ nombre: "", usuario: "" }); // Datos del formulario

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const datos = await Search_users_fn("");
            setUsuarios(datos);
        };
        obtenerUsuarios();
    }, []);

    const handleChange = async (e) => {
        const nuevaLetra = e.target.value;
        setusuario(nuevaLetra);
        const resultados = await Search_users_fn(nuevaLetra);
        setUsuarios(resultados);
    };

    const iniciarEdicion = (user) => {
        setEditandoUsuario(user);
        setFormData({ nombre: user.nombre, usuario: user.usuario });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const guardarEdicion = async () => {
        try {
            await Edit_user_fn(editandoUsuario.id_usuario, formData); // Llamada a la función para guardar cambios
            const datosActualizados = await Search_users_fn(usuario); // Actualizar la lista de usuarios
            setUsuarios(datosActualizados);
            setEditandoUsuario(null); // Salir del modo edición
            toast.success("Usuario actualizado correctamente."); // Mostrar mensaje de éxito
        } catch (error) {
            toast.error("Error al actualizar el usuario."); // Mostrar mensaje de error
        }
    };

    const eliminarUsuario = async (id_usuario) => {
        await Delete_user_fn(id_usuario); // Llamada a la función para eliminar usuario
        const datosActualizados = await Search_users_fn(usuario); // Actualizar la lista de usuarios
        setUsuarios(datosActualizados);
        toast.success("Usuario eliminado correctamente."); // Mostrar mensaje de éxito
    };

    return (
        <div className="space-y-6">
            <Toaster />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Buscar Usuarios</h1>
                <p className="text-muted-foreground">Gestión de usuarios del sistema</p>
            </div>

            <div className="flex gap-4 mb-4">
                <input 
                    value={usuario}
                    onChange={handleChange}
                    type="text"
                    placeholder="Buscar usuario..."
                    className="w-full max-w-sm p-2 border rounded-md"
                />
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={async () => {
                        const resultados = await Search_users_fn(usuario);
                        setUsuarios(resultados);
                    }}
                >
                    Buscar
                </button>
            </div>

            <div className="border rounded-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Usuario</th>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {usuarios.length > 0 ? (
                            usuarios.map((user) => (
                                <tr key={user.id_usuario}>
                                    <td className="px-6 py-4">{user.id_usuario}</td>
                                    <td className="px-6 py-4">{user.usuario}</td>
                                    <td className="px-6 py-4">{user.nombre}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            className="text-blue-600 hover:underline"
                                            onClick={() => iniciarEdicion(user)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="text-red-600 hover:underline ml-4"
                                            onClick={() => eliminarUsuario(user.id_usuario)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-4 text-center" colSpan="4">No se encontraron usuarios</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {editandoUsuario && (
                <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuario</label>
                            <input 
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleEditChange}
                                type="text"
                                placeholder="Usuario"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input 
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleEditChange}
                                type="text"
                                placeholder="Nombre"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button 
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex-1"
                                onClick={guardarEdicion}
                            >
                                Guardar
                            </button>
                            <button 
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex-1"
                                onClick={() => setEditandoUsuario(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
