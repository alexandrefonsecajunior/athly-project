import type { User, UpdateProfileInput } from '@/types'
import { api } from './api'

export async function getProfile(): Promise<User> {
  return api.users.usersControllerMe()
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const input: UpdateProfileInput = {
    name: data.name,
    email: data.email,
    goals: data.goals,
    availableDays: data.availableDays ?? undefined,
  }
  return api.users.usersControllerUpdateProfile({
    updateProfileDto: input
  })
}
