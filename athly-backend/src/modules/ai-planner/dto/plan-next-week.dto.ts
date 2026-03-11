import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PlanNextWeekDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  numberOfRuns?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  weekStartDate?: string;
}
