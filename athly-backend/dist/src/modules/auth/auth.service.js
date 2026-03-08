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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../database/prisma.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    prisma;
    usersService;
    jwtService;
    config;
    constructor(prisma, usersService, jwtService, config) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
    }
    async register(input) {
        if (input.password !== input.confirmPassword) {
            throw new common_1.BadRequestException('As senhas não coincidem');
        }
        const existingUser = await this.usersService.findByEmail(input.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email já cadastrado');
        }
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: input.userName },
        });
        if (existingUsername) {
            throw new common_1.ConflictException('Username já está em uso');
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: input.email,
                username: input.userName,
                name: input.name,
                password: hashedPassword,
                dateOfBirth: new Date(input.dateOfBirth),
                weight: input.weight,
                height: input.height,
            },
        });
        const accessToken = this.signAccessToken(user);
        const refreshToken = await this.createSession(user);
        return {
            user: this.usersService.toUserModel(user),
            accessToken,
            refreshToken,
        };
    }
    async login(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const accessToken = this.signAccessToken(user);
        const refreshToken = await this.createSession(user);
        return {
            user: this.usersService.toUserModel(user),
            accessToken,
            refreshToken,
        };
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return this.usersService.toUserModel(user);
    }
    signAccessToken(user) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
    }
    async createSession(user) {
        const refreshToken = `${(0, crypto_1.randomUUID)()}-${(0, crypto_1.randomBytes)(24).toString('hex')}`;
        const expiresIn = this.config.get('REFRESH_TOKEN_EXPIRES_IN', '7d');
        const expiresAt = this.calculateExpiry(expiresIn);
        await this.prisma.session.create({
            data: {
                refreshToken,
                expiresAt,
                userId: user.id,
            },
        });
        return refreshToken;
    }
    calculateExpiry(value) {
        const now = new Date();
        const match = value.match(/^(\d+)([smhd])$/);
        if (!match) {
            now.setDate(now.getDate() + 7);
            return now;
        }
        const amount = Number(match[1]);
        const unit = match[2];
        switch (unit) {
            case 's':
                now.setSeconds(now.getSeconds() + amount);
                break;
            case 'm':
                now.setMinutes(now.getMinutes() + amount);
                break;
            case 'h':
                now.setHours(now.getHours() + amount);
                break;
            case 'd':
            default:
                now.setDate(now.getDate() + amount);
                break;
        }
        return now;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map