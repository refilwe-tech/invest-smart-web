import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/invest')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/invest"!</div>
}
