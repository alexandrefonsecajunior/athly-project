import { useEffect } from 'react'
import { useWorkoutStore } from '@/store/workoutStore'
import { getTodayWorkout, getCurrentTrainingPlan } from '@/services/workoutService'

export function useWorkoutData() {
  const {
    setTodayWorkout,
    setCurrentPlan,
    setLoading,
  } = useWorkoutStore()

  useEffect(() => {
    setLoading(true)
    Promise.all([getTodayWorkout(), getCurrentTrainingPlan()])
      .then(([today, plan]) => {
        setTodayWorkout(today)
        setCurrentPlan(plan)
      })
      .finally(() => setLoading(false))
  }, [setTodayWorkout, setCurrentPlan, setLoading])
}
