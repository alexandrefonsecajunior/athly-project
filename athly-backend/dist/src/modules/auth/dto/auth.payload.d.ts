import { UserModel } from '../../users/models/user.model';
export declare class AuthPayload {
    user: UserModel;
    accessToken: string;
    refreshToken: string;
}
