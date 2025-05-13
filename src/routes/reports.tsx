import { ReportsPage } from '@project/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
})
