import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: 'the name of a tag ' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ description: 'the color of a tag ' })
  @IsString()
  readonly color!: string;

  @ApiProperty({ description: 'The status of a user' })
  @IsNumber()
  readonly status: number;
}
