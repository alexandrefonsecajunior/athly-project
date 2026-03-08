import type { User, AuthPayload } from '@/types'
import { api } from './api'

export async function login(email: string, password: string): Promise<AuthPayload> {
  const data = await api.login(email, password)
  return data
}

export async function getMe(): Promise<User | null> {
  try {
    const user = await api.getMe()
    return user
  } catch (error) {
    console.error('Failed to get user:', error)
    return null
  }
}
