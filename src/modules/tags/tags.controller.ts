import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Get,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { userInfo } from 'src/constants/user';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: '创建标签' })
  @Post()
  create(@Body() createTagDto: CreateTagDto, @Req() request: Request) {
    const user: userInfo = request.user;

    return this.tagsService.create(createTagDto, user.userId);
  }

  @ApiOperation({ summary: '获取所有标签' })
  @Get()
  get(@Query() paginationQuery: PaginationQueryDto) {
    return this.tagsService.findAll(paginationQuery);
  }

  @ApiOperation({ summary: '修改标签' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: '删除标签' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
}
