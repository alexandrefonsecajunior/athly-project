import { SportType, WorkoutStatus } from '@prisma/client';
export declare class UpdateWorkoutInput {
    title?: string;
    description?: string;
    blocks?: WorkoutBlockInput[];
    intensity?: number;
    status?: WorkoutStatus;
    sportType?: SportType;
    date?: string;
}
export declare class WorkoutBlockInput {
    type: string;
    duration?: number;
    distance?: number;
    targetPace?: string;
    instructions?: string;
}
