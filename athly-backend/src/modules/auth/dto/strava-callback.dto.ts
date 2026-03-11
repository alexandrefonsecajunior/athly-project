import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class StravaCallbackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
}
