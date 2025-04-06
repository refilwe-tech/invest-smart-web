import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '../components'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

