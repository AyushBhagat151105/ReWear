import { create } from 'zustand'

// Define roles explicitly
type Role = 'USER' | 'ADMIN'

type User = {
  id: string
  username: string
  role: Role
}

// Mock user
const mockUser: User = {
  id: 'user-123',
  username: 'User',
  role: 'ADMIN',
}

// Zustand store
type Store = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))

export { useStore, mockUser }
