import { Route, Routes } from 'react-router-dom';
import AddProperty from "./components/inventory/AddProperty";
import EditProperty from "./components/inventory/EditProperty";
import RemoveProperty from "./components/inventory/RemoveProperty";
import SearchProperties from "./components/inventory/SearchProperties";
import AddUser from './components/users/add_user';
import Search_users from './components/users/search_users';
import Layout from "./components/layout";
import { useEffect } from 'react';
export default function App() {
  useEffect(()=>{
    const session = localStorage.getItem("session");
    if (!session) {
      window.location.href = "/login";
    }
  }, []);
  return (
      <Layout>
        <Routes>
          
          <Route path="inventory">
            <Route path="add" element={<AddProperty />} />
            <Route path="search" element={<SearchProperties />} />
            <Route path="edit" element={<EditProperty />} />
          </Route>
           <Route path="users">
            <Route path="add_user" element={<AddUser />} />
            <Route path="search_users" element={<Search_users />} />
          </Route>
          <Route path="settings" element={<div><h1 className="text-2xl font-bold">Configuración</h1></div>} />
          <Route index element={
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
                <p className="text-muted-foreground">Gestión de inventario de inmuebles industriales</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold">Total Inmuebles</h3>
                  <p className="text-2xl font-bold text-blue-600">248</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold">En Venta</h3>
                  <p className="text-2xl font-bold text-green-600">156</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold">En Renta</h3>
                  <p className="text-2xl font-bold text-orange-600">92</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold">Clientes Activos</h3>
                  <p className="text-2xl font-bold text-purple-600">67</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
  )
}
