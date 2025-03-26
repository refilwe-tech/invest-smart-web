import { createFileRoute } from '@tanstack/react-router'
import { Container } from '../components/layouts'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Container>
      <h3>Welcome {''}</h3>
      <section className='flex gap-4 w-full'></section>
    </Container>
  )
}