import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterUserInput } from './dto/register-user.input';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(input: RegisterUserInput): Promise<{
        user: import("../users/models/user.model").UserModel;
        accessToken: string;
        refreshToken: string;
    }>;
    login(input: LoginInput): Promise<{
        user: import("../users/models/user.model").UserModel;
        accessToken: string;
        refreshToken: string;
    }>;
}
