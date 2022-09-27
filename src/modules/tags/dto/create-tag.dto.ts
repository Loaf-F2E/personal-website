import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: 'the name of a tag ' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ description: 'the color of a tag ' })
  @IsString()
  readonly color!: string;
}
