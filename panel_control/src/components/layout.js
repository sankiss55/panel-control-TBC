import Header from "./header"
import Sidebar from "./sidebar"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col min-h-full">
            <div className="flex-1 p-6">{children}</div>
          
          </div>
        </main>
      </div>
    </div>
  )
}
