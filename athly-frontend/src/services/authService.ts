import type { User, AuthPayload } from '@/types'
import { api } from './api'

export async function login(email: string, password: string): Promise<AuthPayload> {
  const data = await api.login(email, password)
  return data
}

export interface RegisterInput {
  email: string
  userName: string
  name: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  weight: number
  height: number
}

export async function register(data: RegisterInput): Promise<AuthPayload> {
  return api.register(data)
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
