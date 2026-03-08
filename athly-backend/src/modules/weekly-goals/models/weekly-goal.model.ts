import { WeeklyGoalStatus } from '@prisma/client';

export class WeeklyGoalModel {
  id: string;
  trainingPlanId: string;
  weekStartDate: Date;
  weekEndDate: Date;
  status: WeeklyGoalStatus;
  metrics?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
