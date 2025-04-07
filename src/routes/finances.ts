import { FinancialPlanPage } from '@project/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/finances')({
  component: FinancialPlanPage,
})
