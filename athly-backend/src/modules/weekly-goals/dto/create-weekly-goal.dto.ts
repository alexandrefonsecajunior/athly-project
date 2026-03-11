import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional, IsObject } from 'class-validator';

export class CreateWeeklyGoalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trainingPlanId: string;

  @ApiProperty()
  @IsDateString()
  weekStartDate: string;

  @ApiProperty()
  @IsDateString()
  weekEndDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metrics?: Record<string, unknown>;
}
