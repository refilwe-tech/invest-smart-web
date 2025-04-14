import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '@project/components'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})
