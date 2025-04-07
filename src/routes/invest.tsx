import { InvestPage } from '@project/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/invest')({
  component: InvestPage,
})
