import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsEnum, IsObject } from 'class-validator';
import { WeeklyGoalStatus } from '@prisma/client';

export class UpdateWeeklyGoalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  weekStartDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  weekEndDate?: string;

  @ApiPropertyOptional({ enum: WeeklyGoalStatus })
  @IsOptional()
  @IsEnum(WeeklyGoalStatus)
  status?: WeeklyGoalStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metrics?: Record<string, unknown>;
}
