import { Module } from '@nestjs/common';
import { AiPlannerController } from './ai-planner.controller';
import { AiPlannerService } from './ai-planner.service';
import { StravaService } from './strava.service';
import { GeminiService } from './gemini.service';

@Module({
  controllers: [AiPlannerController],
  providers: [AiPlannerService, StravaService, GeminiService],
})
export class AiPlannerModule {}
