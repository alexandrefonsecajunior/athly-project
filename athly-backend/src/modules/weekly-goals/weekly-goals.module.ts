import { Module } from '@nestjs/common';
import { WeeklyGoalsService } from './weekly-goals.service';
import { WeeklyGoalsController } from './weekly-goals.controller';

@Module({
  controllers: [WeeklyGoalsController],
  providers: [WeeklyGoalsService],
  exports: [WeeklyGoalsService],
})
export class WeeklyGoalsModule {}
