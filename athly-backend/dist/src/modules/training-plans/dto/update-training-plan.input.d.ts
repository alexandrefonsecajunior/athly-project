import { SportType } from '@prisma/client';
export declare class UpdateTrainingPlanInput {
    startDate?: string;
    weeks?: Record<string, unknown>;
    objective?: string;
    targetDate?: string;
    sports: SportType[];
    autoGenerate?: boolean;
}
