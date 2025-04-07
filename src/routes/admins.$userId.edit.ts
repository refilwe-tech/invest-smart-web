import { EditAdminPage } from '@project/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admins/$userId/edit')({
  component: EditAdminPage,
})

