import { PrismaService } from '../../database/prisma.service';
import { User } from '@prisma/client';
import { UserModel } from './models/user.model';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    findOrCreateByEmail(email: string, password: string): Promise<User>;
    updateProfile(userId: string, data: Partial<UserModel>, password?: string): Promise<UserModel>;
    deleteUser(userId: string): Promise<void>;
    toUserModel(user: User): UserModel;
}
