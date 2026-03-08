import type {
  User,
  Workout,
  TrainingPlan,
  WorkoutFeedback,
  Integration,
  WeeklyGoal,
} from "@/types";

export const mockUser: User = {
  id: "user-1",
  name: "Alexandre Silva",
  email: "alexandre@email.com",
  goals: ["Melhorar resistência", "Perder peso"],
  availability: 5,
};

const planId = "plan-1";
const currentWeekGoalId = "wg-2";

export const mockWorkouts: Workout[] = [
  {
    id: "workout-1",
    date: new Date().toISOString().split("T")[0],
    sportType: "running",
    trainingPlanId: planId,
    weeklyGoalId: currentWeekGoalId,
    title: "Corrida leve +++++++++++++ tiros",
    description: "Aquecimento 15min + 5x400m com 200m recuperação",
    blocks: [
      { type: "warmup", duration: 15, instructions: "Corrida leve, zona 2" },
      {
        type: "interval",
        duration: 2,
        targetPace: "5:00/km",
        instructions: "Tiro 400m",
      },
      {
        type: "recovery",
        duration: 1,
        instructions: "Caminhada/jog leve 200m",
      },
    ],
    status: "scheduled",
    intensity: 7,
  },
  {
    id: "workout-2",
    date: getDateOffset(1),
    sportType: "cycling",
    trainingPlanId: planId,
    weeklyGoalId: currentWeekGoalId,
    title: "Bike Z2",
    description: "Pedalada longa em zona 2",
    blocks: [
      { type: "warmup", duration: 10, instructions: "Pedal suave" },
      {
        type: "steady",
        duration: 60,
        targetPace: "Z2",
        instructions: "Mantém cadência 85-90",
      },
    ],
    status: "scheduled",
    intensity: 4,
  },
  {
    id: "workout-3",
    date: getDateOffset(2),
    sportType: "strength",
    trainingPlanId: planId,
    weeklyGoalId: currentWeekGoalId,
    title: "Força - Lower Body",
    description: "Treino de pernas",
    blocks: [
      { type: "warmup", duration: 10, instructions: "Mobilização" },
      {
        type: "main",
        duration: 45,
        instructions: "Squat, agachamento, leg press",
      },
    ],
    status: "scheduled",
    intensity: 6,
  },
  {
    id: "workout-4",
    date: getDateOffset(3),
    sportType: "running",
    trainingPlanId: planId,
    weeklyGoalId: currentWeekGoalId,
    title: "Corrida longa",
    description: "Longão em Z2",
    blocks: [
      { type: "warmup", duration: 15, instructions: "Progressive warmup" },
      {
        type: "steady",
        duration: 60,
        distance: 10,
        targetPace: "6:00/km",
        instructions: "Confortável",
      },
    ],
    status: "scheduled",
    intensity: 5,
  },
  {
    id: "workout-5",
    date: getDateOffset(4),
    sportType: "yoga",
    trainingPlanId: planId,
    weeklyGoalId: currentWeekGoalId,
    title: "Yoga Recovery",
    description: "Sessão de alongamento e mobilidade",
    blocks: [
      { type: "main", duration: 45, instructions: "Flow suave + alongamentos" },
    ],
    status: "scheduled",
    intensity: 2,
  },
];

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function getWeekRange(weekOffset: number): { start: string; end: string } {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff + weekOffset * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  };
}

export const mockWeeklyGoals: WeeklyGoal[] = [
  {
    uuid: "wg-1",
    trainingPlanId: "plan-1",
    weekStartDate: getWeekRange(-1).start,
    weekEndDate: getWeekRange(-1).end,
    status: "GENERATED",
    metrics: { title: "Meta Semana 1 – Volume" },
  },
  {
    uuid: "wg-2",
    trainingPlanId: "plan-1",
    weekStartDate: getWeekRange(0).start,
    weekEndDate: getWeekRange(0).end,
    status: "PLANNED",
    metrics: { title: "Meta Semana 2 – Intensidade" },
  },
  {
    uuid: "wg-3",
    trainingPlanId: "plan-1",
    weekStartDate: getWeekRange(1).start,
    weekEndDate: getWeekRange(1).end,
    status: "PLANNED",
    metrics: { title: "Meta Semana 3 – Consolidação" },
  },
];

export const mockTrainingPlan: TrainingPlan = {
  id: "plan-1",
  startDate: new Date().toISOString().split("T")[0],
  weeks: [
    {
      number: 1,
      workouts: mockWorkouts,
    },
  ],
};

export const mockFeedback: WorkoutFeedback[] = [];

export const mockIntegrations: Integration[] = [
  {
    id: "strava",
    name: "Strava",
    icon: "🏃",
    connected: false,
    type: "strava",
  },
  {
    id: "garmin",
    name: "Garmin",
    icon: "⌚",
    connected: false,
    type: "garmin",
  },
  {
    id: "apple",
    name: "Apple Health",
    icon: "🍎",
    connected: false,
    type: "apple_health",
  },
];
