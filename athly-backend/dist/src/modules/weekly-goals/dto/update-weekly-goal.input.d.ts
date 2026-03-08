import { WeeklyGoalStatus } from '@prisma/client';
export declare class UpdateWeeklyGoalInput {
    weekStartDate?: string;
    weekEndDate?: string;
    status?: WeeklyGoalStatus;
    metrics?: Record<string, unknown>;
}
