import { createFileRoute } from '@tanstack/react-router'
import { InvestmentsPage } from '../components/pages'

export const Route = createFileRoute('/investments')({
  component: InvestmentsPage,
})

