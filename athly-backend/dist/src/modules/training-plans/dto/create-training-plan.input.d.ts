import { SportType, TrainingPlanStatus } from '@prisma/client';
export declare class CreateTrainingPlanInput {
    startDate: string;
    objective: string;
    status: TrainingPlanStatus;
    targetDate?: string;
    sports: SportType[];
    autoGenerate?: boolean;
}
