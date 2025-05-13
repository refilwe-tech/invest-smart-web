import { UserReportPage } from '@project/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/report')({
  component: UserReportPage,
})
