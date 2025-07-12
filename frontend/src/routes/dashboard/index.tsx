import { useStore } from '@/store/authStore'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter()

  const { user } = useStore()

  if (!user) {
    router.navigate({ to: "/login" })
  }

  return <div>Hello "/dashboard/"!</div>
}
