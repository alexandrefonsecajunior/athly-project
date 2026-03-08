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
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let IntegrationsService = class IntegrationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getIntegrations(userId) {
        const integrations = await this.prisma.integration.findMany({
            where: { userId },
        });
        return integrations.map((integration) => ({
            id: integration.id,
            name: integration.name,
            icon: integration.icon,
            connected: integration.connected,
            type: integration.type,
        }));
    }
    async connectIntegration(userId, id) {
        const updated = await this.prisma.integration.updateMany({
            where: { userId, id },
            data: { connected: true },
        });
        if (!updated.count) {
            throw new common_1.NotFoundException('Integration not found');
        }
        const integration = await this.prisma.integration.findFirst({
            where: { userId, id },
        });
        if (!integration) {
            throw new common_1.NotFoundException('Integration not found');
        }
        return this.toGraphQL(integration);
    }
    async disconnectIntegration(userId, id) {
        const updated = await this.prisma.integration.updateMany({
            where: { userId, id },
            data: { connected: false },
        });
        if (!updated.count) {
            throw new common_1.NotFoundException('Integration not found');
        }
        const integration = await this.prisma.integration.findFirst({
            where: { userId, id },
        });
        if (!integration) {
            throw new common_1.NotFoundException('Integration not found');
        }
        return this.toGraphQL(integration);
    }
    toGraphQL(integration) {
        return {
            id: integration.id,
            name: integration.name,
            icon: integration.icon,
            connected: integration.connected,
            type: integration.type,
        };
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map