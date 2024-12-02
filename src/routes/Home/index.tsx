import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Home/"!</div>
}
