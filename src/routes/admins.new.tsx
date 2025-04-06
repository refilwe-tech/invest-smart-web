import { NewAdminPage } from '@project/components/pages/app-pages/new-admin-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admins/new')({
  component: NewAdminPage,
})

