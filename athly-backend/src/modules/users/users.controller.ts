import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-rest.decorator';
import { UserModel } from './models/user.model';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: UserModel) {
    return user;
  }

  @Put('profile')
  updateProfile(
    @CurrentUser() user: UserModel,
    @Body() input: UpdateProfileInput,
  ) {
    const { password, dateOfBirth, ...updateData } = input;

    const data: any = { ...updateData };
    if (dateOfBirth) {
      data.dateOfBirth = new Date(dateOfBirth);
    }

    return this.usersService.updateProfile(user.id, data, password);
  }
}
