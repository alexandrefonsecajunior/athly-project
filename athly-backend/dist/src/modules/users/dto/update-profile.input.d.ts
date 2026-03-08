import { RoleEnum } from '@prisma/client';
export declare class UpdateProfileInput {
    name?: string;
    email?: string;
    role?: RoleEnum;
    dateOfBirth?: string;
    weight?: number;
    height?: number;
    goals?: string[];
    availability?: number;
    password?: string;
}
