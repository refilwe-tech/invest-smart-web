import { createFileRoute } from '@tanstack/react-router'

import { InvestmentsPage } from '@project/components'

export const Route = createFileRoute('/investments')({
  component: InvestmentsPage,
})

