import { useStore } from '@/store/authStore'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter()

  const { user } = useStore()

  useEffect(() => {
    if (!user) {
      router.navigate({ to: '/login' })
    }
  }, [user, router])

  if (!user) return null

  return <div>Hello "/dashboard/"!</div>
}
