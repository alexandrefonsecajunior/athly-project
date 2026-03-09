import type { AiPlannerInput } from '../types/planner.types';
export type { AiPlannerInput };
export declare function buildAssessmentPrompt(weekDates: string[]): string;
export declare function buildPlannerPrompt(input: AiPlannerInput): string;
