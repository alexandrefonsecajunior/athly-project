import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  ArrayMinSize,
  IsDateString,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HealthRunItemDto {
  @ApiProperty({ description: 'ISO 8601 start date of the run' })
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  distanceMeters: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  durationSeconds: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  averagePaceSecondsPerKm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  activeEnergyBurned?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  elevationGainMeters?: number;
}

export class PlanFromHealthDto {
  @ApiProperty({ type: [HealthRunItemDto], minItems: 1 })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => HealthRunItemDto)
  runs: HealthRunItemDto[];

  @ApiPropertyOptional({ description: 'Week start date (YYYY-MM-DD), defaults to next Monday' })
  @IsOptional()
  @IsDateString()
  weekStartDate?: string;
}
