import { UserModel } from '../../users/models/user.model';

export class AuthPayload {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
}
