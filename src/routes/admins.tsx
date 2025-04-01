import { createFileRoute } from '@tanstack/react-router'
import { AdminUsersPage } from '../components'

export const Route = createFileRoute('/admins')({
  component: AdminUsersPage,
})
