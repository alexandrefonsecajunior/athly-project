import type { WeeklyGoal, Workout } from "@/types";
import calendarJson from "./calendar-data.json";

/**
 * Typed calendar fixture for TrainingPlanCalendar.
 * Use this to fill the calendar with the JSON structure (e.g. March 2025).
 */
export const calendarWeeklyGoals = calendarJson.weeklyGoals as WeeklyGoal[];
export const calendarWorkouts = calendarJson.workouts as Workout[];

export const calendarData = {
  weeklyGoals: calendarWeeklyGoals,
  workouts: calendarWorkouts,
} as const;
