import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject, IsEnum, IsBoolean, IsDateString } from 'class-validator';
import { SportType } from '@prisma/client';

export class UpdateTrainingPlanDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  weeks?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  objective?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  targetDate?: string;

  @ApiPropertyOptional({ enum: SportType, isArray: true })
  @IsOptional()
  @IsEnum(SportType)
  sports: SportType[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoGenerate?: boolean;
}
