import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, Max, Min } from 'class-validator';

export class SubmitWorkoutFeedbackDto {
  @ApiProperty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(10)
  effort: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(10)
  fatigue: number;
}
