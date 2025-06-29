import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/layout"
import AddProperty from "./components/inventory/AddProperty"
import SearchProperties from "./components/inventory/SearchProperties"
import EditProperty from "./components/inventory/EditProperty"
import RemoveProperty from "./components/inventory/RemoveProperty"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={
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
          <Route path="/dashboard" element={
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
                <p className="text-muted-foreground">Gestión de inventario de inmuebles industriales</p>
              </div>
            </div>
          } />
          <Route path="/inventory/add" element={<AddProperty />} />
          <Route path="/inventory/search" element={<SearchProperties />} />
          <Route path="/inventory/edit" element={<EditProperty />} />
          <Route path="/inventory/remove" element={<RemoveProperty />} />
          <Route path="/clients" element={<div><h1 className="text-2xl font-bold">Clientes</h1></div>} />
          <Route path="/contracts" element={<div><h1 className="text-2xl font-bold">Contratos</h1></div>} />
          <Route path="/reports" element={<div><h1 className="text-2xl font-bold">Reportes</h1></div>} />
          <Route path="/settings" element={<div><h1 className="text-2xl font-bold">Configuración</h1></div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
