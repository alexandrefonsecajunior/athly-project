"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findById(userId) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
    async findOrCreateByEmail(email, password) {
        const existing = await this.findByEmail(email);
        if (existing) {
            return existing;
        }
        const name = email.split('@')[0] || 'Usuário';
        const username = email.split('@')[0] || 'user';
        const hashedPassword = (await bcrypt.hash(password, 10));
        return this.prisma.user.create({
            data: {
                email,
                username,
                name,
                password: hashedPassword,
            },
        });
    }
    async updateProfile(userId, data, password) {
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.email !== undefined)
            updateData.email = data.email;
        if (data.role !== undefined)
            updateData.role = data.role;
        if (data.dateOfBirth !== undefined)
            updateData.dateOfBirth = data.dateOfBirth;
        if (data.weight !== undefined)
            updateData.weight = data.weight;
        if (data.height !== undefined)
            updateData.height = data.height;
        if (data.goals !== undefined)
            updateData.goals = data.goals;
        if (data.availability !== undefined)
            updateData.availability = data.availability;
        if (password !== undefined) {
            updateData.password = (await bcrypt.hash(password, 10));
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
        return this.toUserModel(updated);
    }
    async deleteUser(userId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.user.delete({
            where: { id: userId },
        });
    }
    toUserModel(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            dateOfBirth: user.dateOfBirth ?? undefined,
            weight: user.weight ?? undefined,
            height: user.height ?? undefined,
            goals: user.goals ?? [],
            availability: user.availability ?? null,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map