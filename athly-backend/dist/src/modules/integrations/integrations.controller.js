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
exports.IntegrationsController = void 0;
const common_1 = require("@nestjs/common");
const integrations_service_1 = require("./integrations.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_rest_decorator_1 = require("../auth/decorators/current-user-rest.decorator");
const user_model_1 = require("../users/models/user.model");
let IntegrationsController = class IntegrationsController {
    integrationsService;
    constructor(integrationsService) {
        this.integrationsService = integrationsService;
    }
    integrations(user) {
        return this.integrationsService.getIntegrations(user.id);
    }
    connectIntegration(user, integrationId) {
        return this.integrationsService.connectIntegration(user.id, integrationId);
    }
    disconnectIntegration(user, integrationId) {
        return this.integrationsService.disconnectIntegration(user.id, integrationId);
    }
};
exports.IntegrationsController = IntegrationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "integrations", null);
__decorate([
    (0, common_1.Post)(':integrationId/connect'),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('integrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, String]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "connectIntegration", null);
__decorate([
    (0, common_1.Delete)(':integrationId/disconnect'),
    __param(0, (0, current_user_rest_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('integrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, String]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "disconnectIntegration", null);
exports.IntegrationsController = IntegrationsController = __decorate([
    (0, common_1.Controller)('integrations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [integrations_service_1.IntegrationsService])
], IntegrationsController);
//# sourceMappingURL=integrations.controller.js.map