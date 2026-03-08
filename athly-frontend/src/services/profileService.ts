import type { User, UpdateProfileInput } from '@/types'
import { api } from './api'

export async function getProfile(): Promise<User> {
  const user = await api.getMe()
  return user
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const input: UpdateProfileInput = {
    name: data.name,
    email: data.email,
    goals: data.goals,
    availability: data.availability ?? undefined,
  }
  const user = await api.updateProfile(input)
  return user
}
