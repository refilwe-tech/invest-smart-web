import { createFileRoute } from '@tanstack/react-router'

import { AboutPage } from '../components/pages'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
