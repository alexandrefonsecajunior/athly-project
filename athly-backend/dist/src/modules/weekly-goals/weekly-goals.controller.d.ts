import { WeeklyGoalsService } from './weekly-goals.service';
import { CreateWeeklyGoalInput } from './dto/create-weekly-goal.input';
import { UpdateWeeklyGoalInput } from './dto/update-weekly-goal.input';
import { UserModel } from '../users/models/user.model';
export declare class WeeklyGoalsController {
    private readonly weeklyGoalsService;
    constructor(weeklyGoalsService: WeeklyGoalsService);
    getWeeklyGoalsByTrainingPlan(user: UserModel, trainingPlanId: string): Promise<import("./models/weekly-goal.model").WeeklyGoalModel[]>;
    getWeeklyGoalById(user: UserModel, uuid: string): Promise<import("./models/weekly-goal.model").WeeklyGoalModel>;
    createWeeklyGoal(user: UserModel, input: CreateWeeklyGoalInput): Promise<import("./models/weekly-goal.model").WeeklyGoalModel>;
    updateWeeklyGoal(user: UserModel, uuid: string, input: UpdateWeeklyGoalInput): Promise<import("./models/weekly-goal.model").WeeklyGoalModel>;
    deleteWeeklyGoal(user: UserModel, uuid: string): Promise<void>;
}
