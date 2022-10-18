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
  readonly status: number;

  @ApiProperty({ description: '标签拥有者' })
  @IsNumber()
  readonly createBy: number;
}
