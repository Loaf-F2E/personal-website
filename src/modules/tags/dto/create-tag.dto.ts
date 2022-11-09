import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: '标签名称' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ description: '标签颜色' })
  @IsString()
  readonly color!: string;

  @ApiProperty({ description: '标签状态' })
  @IsNumber()
  readonly tag_status: number;

  @ApiProperty({ description: '被引用次数' })
  @IsNumber()
  readonly count: number;
}
