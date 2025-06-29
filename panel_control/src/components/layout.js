import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col min-h-full">
            <div className="flex-1 p-6">{children}</div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}
