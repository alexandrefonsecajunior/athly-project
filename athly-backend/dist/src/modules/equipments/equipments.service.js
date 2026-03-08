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
exports.EquipmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let EquipmentsService = class EquipmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEquipment(input) {
        const equipment = await this.prisma.equipment.create({
            data: {
                name: input.name,
                imagePath: input.imagePath,
            },
        });
        return this.mapEquipment(equipment);
    }
    async getAllEquipments() {
        const equipments = await this.prisma.equipment.findMany({
            orderBy: { name: 'asc' },
        });
        return equipments.map((equipment) => this.mapEquipment(equipment));
    }
    async getEquipmentById(uuid) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { uuid },
        });
        if (!equipment) {
            throw new common_1.NotFoundException('Equipment not found');
        }
        return this.mapEquipment(equipment);
    }
    async updateEquipment(uuid, input) {
        const equipment = await this.prisma.equipment.update({
            where: { uuid },
            data: input,
        });
        return this.mapEquipment(equipment);
    }
    async deleteEquipment(uuid) {
        await this.prisma.equipment.delete({
            where: { uuid },
        });
    }
    async addEquipmentToUser(userId, equipmentId) {
        await this.prisma.userEquipment.create({
            data: {
                userId,
                equipmentId,
            },
        });
    }
    async removeEquipmentFromUser(userId, equipmentId) {
        await this.prisma.userEquipment.delete({
            where: {
                userId_equipmentId: {
                    userId,
                    equipmentId,
                },
            },
        });
    }
    async getUserEquipments(userId) {
        const userEquipments = await this.prisma.userEquipment.findMany({
            where: { userId },
            include: { equipment: true },
        });
        return userEquipments.map((ue) => this.mapEquipment(ue.equipment));
    }
    mapEquipment(equipment) {
        return {
            uuid: equipment.uuid,
            name: equipment.name,
            imagePath: equipment.imagePath,
            createdAt: equipment.createdAt,
            updatedAt: equipment.updatedAt,
        };
    }
};
exports.EquipmentsService = EquipmentsService;
exports.EquipmentsService = EquipmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EquipmentsService);
//# sourceMappingURL=equipments.service.js.map