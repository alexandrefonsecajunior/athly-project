import type { Workout, TrainingPlan, WorkoutFeedback, UpdateWorkoutInput, SubmitWorkoutFeedbackInput } from '@/types'
import { api } from './api'

export async function getTodayWorkout(): Promise<Workout | null> {
  try {
    const workout = await api.getTodayWorkout()
    return workout
  } catch (error) {
    console.error('Failed to get today workout:', error)
    return null
  }
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const workout = await api.getWorkout(id)
    return workout
  } catch (error) {
    console.error('Failed to get workout:', error)
    return null
  }
}

export async function getCurrentTrainingPlan(): Promise<TrainingPlan> {
  const plan = await api.getTrainingPlan()
  return plan
}

export async function submitWorkoutFeedback(
  workoutId: string,
  feedback: Omit<WorkoutFeedback, 'workoutId'>
): Promise<WorkoutFeedback> {
  const input: SubmitWorkoutFeedbackInput = {
    completed: feedback.completed,
    effort: feedback.effort,
    fatigue: feedback.fatigue,
  }
  const result = await api.submitWorkoutFeedback(workoutId, input)
  return result
}

export async function completeWorkout(workoutId: string): Promise<Workout> {
  const workout = await api.completeWorkout(workoutId)
  return workout
}

export async function skipWorkout(workoutId: string): Promise<Workout> {
  const workout = await api.skipWorkout(workoutId)
  return workout
}

export async function updateWorkout(
  workoutId: string,
  input: {
    title: string
    sportType: Workout['sportType']
    description?: string
    blocks: Workout['blocks']
  }
): Promise<Workout> {
  const updateInput: UpdateWorkoutInput = {
    title: input.title,
    sportType: input.sportType,
    description: input.description,
    blocks: input.blocks,
  }
  const workout = await api.updateWorkout(workoutId, updateInput)
  return workout
}
