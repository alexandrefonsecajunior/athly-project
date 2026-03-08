import { RoleEnum } from '@prisma/client';

export class UserModel {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
  dateOfBirth?: Date;
  weight?: number;
  height?: number;
  goals?: string[];
  availability?: number | null;
}
