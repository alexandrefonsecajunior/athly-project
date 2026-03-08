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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcrypt"));
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
}
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString: databaseUrl }),
});
function getDateOffset(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}
async function main() {
    const password = await bcrypt.hash('1234', 10);
    const user = await prisma.user.upsert({
        where: { email: 'alexandre@email.com' },
        update: {
            name: 'Alexandre Silva',
            password,
            goals: ['Melhorar resistencia', 'Perder peso'],
            availability: 5,
        },
        create: {
            id: 'user-1',
            name: 'Alexandre Silva',
            username: 'alexandre',
            email: 'alexandre@email.com',
            password,
            goals: ['Melhorar resistencia', 'Perder peso'],
            availability: 5,
        },
    });
    await prisma.workoutFeedback.deleteMany({ where: { userId: user.id } });
    await prisma.workout.deleteMany({ where: { userId: user.id } });
    await prisma.weeklyGoal.deleteMany({ where: { trainingPlan: { userId: user.id } } });
    await prisma.trainingPlan.deleteMany({ where: { userId: user.id } });
    await prisma.integration.deleteMany({ where: { userId: user.id } });
    const workouts = [
        {
            id: 'workout-1',
            dateScheduled: new Date(),
            sportType: 'running',
            title: 'Corrida leve + tiros',
            description: 'Aquecimento 15min + 5x400m com 200m recuperacao',
            blocks: [
                { type: 'warmup', duration: 15, instructions: 'Corrida leve, zona 2' },
                {
                    type: 'interval',
                    duration: 2,
                    targetPace: '5:00/km',
                    instructions: 'Tiro 400m',
                },
                {
                    type: 'recovery',
                    duration: 1,
                    instructions: 'Caminhada/jog leve 200m',
                },
            ],
            status: 'scheduled',
            intensity: 7,
            trainingPlanId: 'plan-1',
        },
        {
            id: 'workout-2',
            dateScheduled: new Date(getDateOffset(1)),
            sportType: 'cycling',
            title: 'Bike Z2',
            description: 'Pedalada longa em zona 2',
            blocks: [
                { type: 'warmup', duration: 10, instructions: 'Pedal suave' },
                {
                    type: 'steady',
                    duration: 60,
                    targetPace: 'Z2',
                    instructions: 'Mantem cadencia 85-90',
                },
            ],
            status: 'scheduled',
            intensity: 4,
            trainingPlanId: 'plan-1',
        },
        {
            id: 'workout-3',
            dateScheduled: new Date(getDateOffset(2)),
            sportType: 'strength',
            title: 'Forca - Lower Body',
            description: 'Treino de pernas',
            blocks: [
                { type: 'warmup', duration: 10, instructions: 'Mobilizacao' },
                {
                    type: 'main',
                    duration: 45,
                    instructions: 'Squat, agachamento, leg press',
                },
            ],
            status: 'scheduled',
            intensity: 6,
            trainingPlanId: 'plan-1',
        },
        {
            id: 'workout-4',
            dateScheduled: new Date(getDateOffset(3)),
            sportType: 'running',
            title: 'Corrida longa',
            description: 'Longao em Z2',
            blocks: [
                { type: 'warmup', duration: 15, instructions: 'Progressive warmup' },
                {
                    type: 'steady',
                    duration: 60,
                    distance: 10,
                    targetPace: '6:00/km',
                    instructions: 'Confortavel',
                },
            ],
            status: 'scheduled',
            intensity: 5,
            trainingPlanId: 'plan-1',
        },
        {
            id: 'workout-5',
            dateScheduled: new Date(getDateOffset(4)),
            sportType: 'yoga',
            title: 'Yoga Recovery',
            description: 'Sessao de alongamento e mobilidade',
            blocks: [
                {
                    type: 'main',
                    duration: 45,
                    instructions: 'Flow suave + alongamentos',
                },
            ],
            status: 'scheduled',
            intensity: 2,
            trainingPlanId: 'plan-1',
        },
    ];
    await prisma.trainingPlan.create({
        data: {
            id: 'plan-1',
            userId: user.id,
            startDate: new Date().toISOString().split('T')[0],
            objective: 'Melhorar resistência e perder peso',
            targetDate: new Date(getDateOffset(90)),
            sports: ['running', 'cycling', 'strength', 'yoga'],
            autoGenerate: false,
        },
    });
    await prisma.workout.createMany({
        data: workouts.map((workout) => ({
            ...workout,
            userId: user.id,
        })),
    });
    await prisma.integration.createMany({
        data: [
            {
                id: 'strava',
                name: 'Strava',
                icon: 'STRAVA',
                connected: false,
                type: 'strava',
                userId: user.id,
            },
            {
                id: 'garmin',
                name: 'Garmin',
                icon: 'GARMIN',
                connected: false,
                type: 'garmin',
                userId: user.id,
            },
            {
                id: 'apple',
                name: 'Apple Health',
                icon: 'APPLE',
                connected: false,
                type: 'apple_health',
                userId: user.id,
            },
        ],
    });
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map