import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WeeklyGoalsService } from './weekly-goals.service';
import { CreateWeeklyGoalInput } from './dto/create-weekly-goal.input';
import { UpdateWeeklyGoalInput } from './dto/update-weekly-goal.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-rest.decorator';
import { UserModel } from '../users/models/user.model';

@Controller('weekly-goals')
@UseGuards(JwtAuthGuard)
export class WeeklyGoalsController {
  constructor(private readonly weeklyGoalsService: WeeklyGoalsService) {}

  @Get('training-plan/:trainingPlanId')
  getWeeklyGoalsByTrainingPlan(
    @CurrentUser() user: UserModel,
    @Param('trainingPlanId') trainingPlanId: string,
  ) {
    return this.weeklyGoalsService.getWeeklyGoalsByTrainingPlan(user.id, trainingPlanId);
  }

  @Get(':uuid')
  getWeeklyGoalById(@CurrentUser() user: UserModel, @Param('uuid') uuid: string) {
    return this.weeklyGoalsService.getWeeklyGoalById(user.id, uuid);
  }

  @Post()
  createWeeklyGoal(@CurrentUser() user: UserModel, @Body() input: CreateWeeklyGoalInput) {
    return this.weeklyGoalsService.createWeeklyGoal(user.id, input);
  }

  @Put(':uuid')
  updateWeeklyGoal(
    @CurrentUser() user: UserModel,
    @Param('uuid') uuid: string,
    @Body() input: UpdateWeeklyGoalInput,
  ) {
    return this.weeklyGoalsService.updateWeeklyGoal(user.id, uuid, input);
  }

  @Delete(':uuid')
  deleteWeeklyGoal(@CurrentUser() user: UserModel, @Param('uuid') uuid: string) {
    return this.weeklyGoalsService.deleteWeeklyGoal(user.id, uuid);
  }
}
