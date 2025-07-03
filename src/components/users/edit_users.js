export default function Edit_users() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí irá la lógica para editar usuario
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Editar Usuario</h1>
                <p className="text-muted-foreground">Modificar información del usuario</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Usuario</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Nueva Contraseña (opcional)</label>
                    <input 
                        type="password" 
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button 
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}