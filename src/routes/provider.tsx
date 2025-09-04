import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/provider')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/provider"!</div>
}
