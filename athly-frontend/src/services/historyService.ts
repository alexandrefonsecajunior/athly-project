import type { Workout } from '@/types'
import { api } from './api'

export async function getWorkoutHistory(): Promise<Workout[]> {
  try {
    const workouts = await api.getWorkoutHistory()
    return workouts
  } catch (error) {
    console.error('Failed to get workout history:', error)
    return []
  }
}
