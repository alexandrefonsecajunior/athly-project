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
exports.StravaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let StravaService = class StravaService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async getRecentActivities(count) {
        const token = this.configService.get('STRAVA_ACCESS_TOKEN');
        if (!token) {
            throw new common_1.InternalServerErrorException('STRAVA_ACCESS_TOKEN is not configured.');
        }
        const url = `https://www.strava.com/api/v3/athlete/activities?per_page=${count}`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) {
            const body = await response.json().catch(() => ({}));
            const code = body?.errors?.[0]?.code;
            if (code === 'missing') {
                return [];
            }
            throw new common_1.UnauthorizedException('Strava token is expired or invalid. Please reconnect your Strava account.');
        }
        if (response.status === 429) {
            throw new common_1.HttpException('Strava rate limit exceeded. Please try again later.', 429);
        }
        if (!response.ok) {
            throw new common_1.HttpException(`Strava API error: ${response.statusText}`, response.status);
        }
        return response.json();
    }
};
exports.StravaService = StravaService;
exports.StravaService = StravaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StravaService);
//# sourceMappingURL=strava.service.js.map