import { createFileRoute } from '@tanstack/react-router'

import { LandingPage } from '../components'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

