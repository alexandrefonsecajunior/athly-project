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
  IsNumber,
} from 'class-validator';
import { SportType, WorkoutStatus } from '@prisma/client';

export class UpdateWorkoutInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutBlockInput)
  blocks?: WorkoutBlockInput[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  intensity?: number;

  @IsOptional()
  @IsEnum(WorkoutStatus)
  status?: WorkoutStatus;

  @IsOptional()
  @IsEnum(SportType)
  sportType?: SportType;

  @IsOptional()
  @IsString()
  date?: string;
}

export class WorkoutBlockInput {
  @IsString()
  type: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  @IsString()
  targetPace?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}
