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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingPlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let TrainingPlansService = class TrainingPlansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyTrainingPlan(userId) {
        const plan = await this.prisma.trainingPlan.findUnique({
            where: { userId },
        });
        return plan ? this.mapTrainingPlan(plan) : null;
    }
    async getTrainingPlanById(userId, id) {
        const plan = await this.prisma.trainingPlan.findFirst({
            where: { id, userId },
        });
        if (!plan) {
            throw new common_1.NotFoundException('Training plan not found');
        }
        return this.mapTrainingPlan(plan);
    }
    async createTrainingPlan(userId, input) {
        const existing = await this.prisma.trainingPlan.findUnique({
            where: { userId },
        });
        if (existing) {
            throw new common_1.ConflictException('User already has a training plan. Use update or delete first.');
        }
        const plan = await this.prisma.trainingPlan.create({
            data: {
                userId,
                startDate: input.startDate,
                objective: input.objective,
                status: input.status,
                targetDate: input.targetDate ? new Date(input.targetDate) : undefined,
                sports: input.sports,
                autoGenerate: input.autoGenerate ?? false,
            },
        });
        return this.mapTrainingPlan(plan);
    }
    async updateTrainingPlan(userId, id, input) {
        const existing = await this.prisma.trainingPlan.findFirst({
            where: { id, userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Training plan not found');
        }
        const updateData = {};
        if (input.startDate !== undefined) {
            updateData.startDate = input.startDate;
        }
        if (input.objective !== undefined) {
            updateData.objective = input.objective;
        }
        if (input.targetDate !== undefined) {
            updateData.targetDate = input.targetDate ? new Date(input.targetDate) : null;
        }
        if (input.sports !== undefined) {
            updateData.sports = input.sports;
        }
        if (input.autoGenerate !== undefined) {
            updateData.autoGenerate = input.autoGenerate;
        }
        const plan = await this.prisma.trainingPlan.update({
            where: { id },
            data: updateData,
        });
        return this.mapTrainingPlan(plan);
    }
    async deleteTrainingPlan(userId, id) {
        const existing = await this.prisma.trainingPlan.findFirst({
            where: { id, userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Training plan not found');
        }
        await this.prisma.trainingPlan.delete({
            where: { id },
        });
    }
    mapTrainingPlan(plan) {
        return {
            id: plan.id,
            startDate: plan.startDate,
            objective: plan.objective,
            targetDate: plan.targetDate,
            sports: plan.sports,
            autoGenerate: plan.autoGenerate,
            createdAt: plan.createdAt,
            updatedAt: plan.updatedAt,
        };
    }
};
exports.TrainingPlansService = TrainingPlansService;
exports.TrainingPlansService = TrainingPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainingPlansService);
//# sourceMappingURL=training-plans.service.js.map