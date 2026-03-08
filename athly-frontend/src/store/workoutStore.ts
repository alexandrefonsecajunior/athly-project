import { create } from 'zustand'
import type { Workout, TrainingPlan } from '@/types'

interface WorkoutState {
  todayWorkout: Workout | null
  currentPlan: TrainingPlan | null
  selectedWorkout: Workout | null
  isLoading: boolean
  setTodayWorkout: (workout: Workout | null) => void
  setCurrentPlan: (plan: TrainingPlan | null) => void
  setSelectedWorkout: (workout: Workout | null) => void
  setLoading: (loading: boolean) => void
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  todayWorkout: null,
  currentPlan: null,
  selectedWorkout: null,
  isLoading: false,
  setTodayWorkout: (workout) => set({ todayWorkout: workout }),
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  setSelectedWorkout: (workout) => set({ selectedWorkout: workout }),
  setLoading: (isLoading) => set({ isLoading }),
}))
