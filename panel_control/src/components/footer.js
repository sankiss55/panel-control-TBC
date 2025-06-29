export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>© 2024 Industrial Estate Management System</span>
          <span>•</span>
          <span>Versión 2.1.0</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button className="hover:text-foreground transition-colors">Soporte Técnico</button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">Documentación</button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">Términos de Uso</button>
        </div>
      </div>
    </footer>
  )
}
