import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
interface JwtPayload {
    sub: string;
    email: string;
}
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly config;
    private readonly authService;
    constructor(config: ConfigService, authService: AuthService);
    validate(payload: JwtPayload): Promise<import("../../users/models/user.model").UserModel>;
}
export {};
