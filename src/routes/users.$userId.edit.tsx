import { EditUserPage } from '@project/components/pages/app-pages/edit-user.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId/edit')({
  component: EditUserPage,
})
