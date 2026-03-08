import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanInput } from './dto/create-training-plan.input';
import { UpdateTrainingPlanInput } from './dto/update-training-plan.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-rest.decorator';
import { UserModel } from '../users/models/user.model';

@Controller('training-plans')
@UseGuards(JwtAuthGuard)
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) {}

  @Get('me')
  getMyTrainingPlan(@CurrentUser() user: UserModel) {
    return this.trainingPlansService.getMyTrainingPlan(user.id);
  }

  @Get(':id')
  getTrainingPlanById(@CurrentUser() user: UserModel, @Param('id') id: string) {
    return this.trainingPlansService.getTrainingPlanById(user.id, id);
  }
  @Post()
  createTrainingPlan(@CurrentUser() user: UserModel, @Body() input: CreateTrainingPlanInput) {
    return this.trainingPlansService.createTrainingPlan(user.id, input);
  }

  @Put(':id')
  updateTrainingPlan(
    @CurrentUser() user: UserModel,
    @Param('id') id: string,
    @Body() input: UpdateTrainingPlanInput,
  ) {
    return this.trainingPlansService.updateTrainingPlan(user.id, id, input);
  }

  @Delete(':id')
  deleteTrainingPlan(@CurrentUser() user: UserModel, @Param('id') id: string) {
    return this.trainingPlansService.deleteTrainingPlan(user.id, id);
  }
}
