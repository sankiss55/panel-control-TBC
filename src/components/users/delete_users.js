export default function Delete_users() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Eliminar Usuario</h1>
                <p className="text-muted-foreground">Seleccione el usuario a eliminar</p>
            </div>

            <div className="border rounded-lg">
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
                        {/* Aquí irán los usuarios con botón de eliminar */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}