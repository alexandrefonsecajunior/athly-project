import { SportType, WorkoutStatus } from '@prisma/client';
import { WorkoutBlockInput } from './workout-update-input';
export declare class CreateWorkoutInput {
    date: string;
    trainingPlanId: string;
    weeklyGoalId?: string;
    sportType: SportType;
    title: string;
    description?: string;
    blocks?: WorkoutBlockInput[];
    status: WorkoutStatus;
    intensity?: number;
}
