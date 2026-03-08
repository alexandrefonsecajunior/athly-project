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
exports.WeeklyGoalsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../database/prisma.service");
let WeeklyGoalsService = class WeeklyGoalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWeeklyGoal(userId, input) {
        const plan = await this.prisma.trainingPlan.findUnique({
            where: { id: input.trainingPlanId },
        });
        if (!plan || plan.userId !== userId) {
            throw new common_1.NotFoundException('Training plan not found');
        }
        const weeklyGoal = await this.prisma.weeklyGoal.create({
            data: {
                trainingPlanId: input.trainingPlanId,
                weekStartDate: new Date(input.weekStartDate),
                weekEndDate: new Date(input.weekEndDate),
                metrics: (input.metrics ?? {}),
            },
        });
        return this.mapWeeklyGoal({
            id: weeklyGoal.id,
            trainingPlanId: weeklyGoal.trainingPlanId,
            weekStartDate: weeklyGoal.weekStartDate,
            weekEndDate: weeklyGoal.weekEndDate,
            status: weeklyGoal.status,
            metrics: weeklyGoal.metrics,
            createdAt: weeklyGoal.createdAt,
            updatedAt: weeklyGoal.updatedAt,
        });
    }
    async getWeeklyGoalsByTrainingPlan(userId, trainingPlanId) {
        const plan = await this.prisma.trainingPlan.findUnique({
            where: { id: trainingPlanId },
        });
        if (!plan || plan.userId !== userId) {
            throw new common_1.NotFoundException('Training plan not found');
        }
        const weeklyGoals = await this.prisma.weeklyGoal.findMany({
            where: { trainingPlanId },
            orderBy: { weekStartDate: 'asc' },
        });
        return weeklyGoals.map((wg) => this.mapWeeklyGoal({
            ...wg,
            status: client_1.WeeklyGoalStatus.GENERATED,
        }));
    }
    async getWeeklyGoalById(userId, id) {
        const weeklyGoal = await this.prisma.weeklyGoal.findUnique({
            where: { id },
            include: { trainingPlan: true },
        });
        if (!weeklyGoal || weeklyGoal.trainingPlan.userId !== userId) {
            throw new common_1.NotFoundException('Weekly goal not found');
        }
        return this.mapWeeklyGoal({
            id: weeklyGoal.id,
            trainingPlanId: weeklyGoal.trainingPlanId,
            weekStartDate: weeklyGoal.weekStartDate,
            weekEndDate: weeklyGoal.weekEndDate,
            status: weeklyGoal.status,
            metrics: weeklyGoal.metrics,
            createdAt: weeklyGoal.createdAt,
            updatedAt: weeklyGoal.updatedAt,
        });
    }
    async updateWeeklyGoal(userId, id, input) {
        const existing = await this.prisma.weeklyGoal.findUnique({
            where: { id },
            include: { trainingPlan: true },
        });
        if (!existing || existing.trainingPlan.userId !== userId) {
            throw new common_1.NotFoundException('Weekly goal not found');
        }
        const updateData = {};
        if (input.weekStartDate !== undefined) {
            updateData.weekStartDate = new Date(input.weekStartDate);
        }
        if (input.weekEndDate !== undefined) {
            updateData.weekEndDate = new Date(input.weekEndDate);
        }
        if (input.status !== undefined) {
            updateData.status = input.status;
        }
        if (input.metrics !== undefined) {
            updateData.metrics = input.metrics;
        }
        const weeklyGoal = await this.prisma.weeklyGoal.update({
            where: { id },
            data: updateData,
        });
        return this.mapWeeklyGoal({
            id: weeklyGoal.id,
            trainingPlanId: weeklyGoal.trainingPlanId,
            weekStartDate: weeklyGoal.weekStartDate,
            weekEndDate: weeklyGoal.weekEndDate,
            status: weeklyGoal.status,
            metrics: weeklyGoal.metrics,
            createdAt: weeklyGoal.createdAt,
            updatedAt: weeklyGoal.updatedAt,
        });
    }
    async deleteWeeklyGoal(userId, id) {
        const weeklyGoal = await this.prisma.weeklyGoal.findUnique({
            where: { id },
            include: { trainingPlan: true },
        });
        if (!weeklyGoal || weeklyGoal.trainingPlan.userId !== userId) {
            throw new common_1.NotFoundException('Weekly goal not found');
        }
        await this.prisma.weeklyGoal.delete({
            where: { id },
        });
    }
    mapWeeklyGoal(weeklyGoal) {
        return {
            id: weeklyGoal.id,
            trainingPlanId: weeklyGoal.trainingPlanId,
            weekStartDate: weeklyGoal.weekStartDate,
            weekEndDate: weeklyGoal.weekEndDate,
            status: weeklyGoal.status,
            metrics: weeklyGoal.metrics ?? undefined,
            createdAt: weeklyGoal.createdAt,
            updatedAt: weeklyGoal.updatedAt,
        };
    }
};
exports.WeeklyGoalsService = WeeklyGoalsService;
exports.WeeklyGoalsService = WeeklyGoalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WeeklyGoalsService);
//# sourceMappingURL=weekly-goals.service.js.map