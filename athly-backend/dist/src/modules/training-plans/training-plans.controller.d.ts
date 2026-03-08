import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanInput } from './dto/create-training-plan.input';
import { UpdateTrainingPlanInput } from './dto/update-training-plan.input';
import { UserModel } from '../users/models/user.model';
export declare class TrainingPlansController {
    private readonly trainingPlansService;
    constructor(trainingPlansService: TrainingPlansService);
    getMyTrainingPlan(user: UserModel): Promise<import("./models/training-plan.model").TrainingPlanModel | null>;
    getTrainingPlanById(user: UserModel, id: string): Promise<import("./models/training-plan.model").TrainingPlanModel>;
    createTrainingPlan(user: UserModel, input: CreateTrainingPlanInput): Promise<import("./models/training-plan.model").TrainingPlanModel>;
    updateTrainingPlan(user: UserModel, id: string, input: UpdateTrainingPlanInput): Promise<import("./models/training-plan.model").TrainingPlanModel>;
    deleteTrainingPlan(user: UserModel, id: string): Promise<void>;
}
