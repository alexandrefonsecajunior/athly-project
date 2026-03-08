"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingPlansController = void 0;
const common_1 = require("@nestjs/common");
const training_plans_service_1 = require("./training-plans.service");
const create_training_plan_input_1 = require("./dto/create-training-plan.input");
const update_training_plan_input_1 = require("./dto/update-training-plan.input");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_rest_decorator_1 = require("../auth/decorators/current-user-rest.decorator");
const user_model_1 = require("../users/models/user.model");
let TrainingPlansController = class TrainingPlansController {
    trainingPlansService;
    constructor(trainingPlansService) {
        this.trainingPlansService = trainingPlansService;
    }
    getMyTrainingPlan(user) {
        return this.trainingPlansService.getMyTrainingPlan(user.id);
    }
    getTrainingPlanById(user, id) {
        return this.trainingPlansService.getTrainingPlanById(user.id, id);
    }
    createTrainingPlan(user, input) {
        return this.trainingPlansService.createTrainingPlan(user.id, input);
    }
    updateTrainingPlan(user, id, input) {
        return this.trainingPlansService.updateTrainingPlan(user.id, id, input);
    }
    deleteTrainingPlan(user, id) {
        return this.trainingPlansService.deleteTrainingPlan(user.id, id);
    }
};
exports.TrainingPlansController = TrainingPlansController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], TrainingPlansController.prototype, "getMyTrainingPlan", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, String]),
    __metadata("design:returntype", void 0)
], TrainingPlansController.prototype, "getTrainingPlanById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, create_training_plan_input_1.CreateTrainingPlanInput]),
    __metadata("design:returntype", void 0)
], TrainingPlansController.prototype, "createTrainingPlan", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, String, update_training_plan_input_1.UpdateTrainingPlanInput]),
    __metadata("design:returntype", void 0)
], TrainingPlansController.prototype, "updateTrainingPlan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, String]),
    __metadata("design:returntype", void 0)
], TrainingPlansController.prototype, "deleteTrainingPlan", null);
exports.TrainingPlansController = TrainingPlansController = __decorate([
    (0, common_1.Controller)('training-plans'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [training_plans_service_1.TrainingPlansService])
], TrainingPlansController);
//# sourceMappingURL=training-plans.controller.js.map