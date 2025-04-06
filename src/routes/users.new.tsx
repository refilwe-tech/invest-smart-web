import { NewUserPage } from '@project/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/new')({
  component: NewUserPage,
})

