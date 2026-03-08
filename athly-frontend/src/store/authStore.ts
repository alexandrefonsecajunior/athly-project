import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { api } from '@/services/api'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setSession: (payload: {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
  }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setUser: (user) => set({
        user,
        isAuthenticated: !!user,
      }),
      setSession: ({ user, accessToken, refreshToken }) => {
        // Set token in API client
        if (accessToken) {
          api.setToken(accessToken)
        }
        
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: !!user && !!accessToken,
        })
      },
      logout: () => {
        // Clear token from API client
        api.clearToken()
        
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    { name: 'iafit-auth' }
  )
)

// Initialize API client with stored token on app load
const storedAuth = localStorage.getItem('iafit-auth')
if (storedAuth) {
  try {
    const parsed = JSON.parse(storedAuth)
    if (parsed.state?.accessToken) {
      api.setToken(parsed.state.accessToken)
    }
  } catch (error) {
    console.error('Failed to restore auth token:', error)
  }
}
