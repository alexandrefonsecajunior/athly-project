import { SportType } from '@prisma/client';
export declare class TrainingPlanModel {
    id: string;
    startDate: string;
    objective: string;
    targetDate: Date | null;
    sports: SportType[];
    autoGenerate: boolean;
    createdAt: Date;
    updatedAt: Date;
}
