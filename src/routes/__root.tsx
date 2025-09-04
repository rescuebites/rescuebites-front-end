import { Outlet, createRootRoute } from '@tanstack/react-router'

// Aquí definís tu root layout
export const Route = createRootRoute({
  component: () => (
    <div>
      <h1>Mi App con TanStack 🚀</h1>
      <Outlet /> {/* <- aquí se renderizan las rutas hijas */}
    </div>
  ),
})
