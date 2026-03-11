import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Max,
  Min,
  ValidateNested,
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { SportType, WorkoutStatus } from '@prisma/client';
import { WorkoutBlockDto } from './workout-update.dto';

export class CreateWorkoutDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trainingPlanId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  weeklyGoalId?: string;

  @ApiProperty({ enum: SportType })
  @IsEnum(SportType)
  sportType: SportType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [WorkoutBlockDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutBlockDto)
  blocks?: WorkoutBlockDto[];

  @ApiProperty({ enum: WorkoutStatus })
  @IsEnum(WorkoutStatus)
  status: WorkoutStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  intensity?: number;
}
