import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';
import { SportType, TrainingPlanStatus } from '@prisma/client';

export class CreateTrainingPlanDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  objective: string;

  @ApiProperty({ enum: TrainingPlanStatus })
  @IsEnum(TrainingPlanStatus)
  @IsNotEmpty()
  status: TrainingPlanStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  targetDate?: string;

  @ApiProperty({ enum: SportType, isArray: true })
  @IsArray()
  @IsEnum(SportType, { each: true })
  sports: SportType[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoGenerate?: boolean;
}
