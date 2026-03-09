import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiPlannerService } from './ai-planner.service';
import { PlanNextWeekInput } from './dto/plan-next-week.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-rest.decorator';
import { UserModel } from '../users/models/user.model';

@Controller('ai-planner')
@UseGuards(JwtAuthGuard)
export class AiPlannerController {
  constructor(private readonly aiPlannerService: AiPlannerService) {}

  @Post('plan-next-week')
  planNextWeek(@CurrentUser() user: UserModel, @Body() input: PlanNextWeekInput) {
    return this.aiPlannerService.planNextWeek(user.id, input);
  }
}
