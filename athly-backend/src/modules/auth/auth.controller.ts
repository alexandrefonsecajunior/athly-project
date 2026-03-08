import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterUserInput } from './dto/register-user.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() input: RegisterUserInput) {
    return this.authService.register(input);
  }

  @Post('login')
  async login(@Body() input: LoginInput) {
    return this.authService.login(input.email, input.password);
  }
}
