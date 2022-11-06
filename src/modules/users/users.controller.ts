import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import multer = require('multer');

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '获取所有用户信息' })
  // @ApiBearerAuth() // // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '查找用户' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '修改用户' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({
    description: '用户登录',
    type: LoginUserDto,
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  // 处理上传图片 保存在磁盘上的命令最好用 img/2022/11/6/ 这种格式来保存
  // 因为不同操作系统对于每个文件内的数量可能有限制
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: multer.diskStorage({
  //       destination: (req, file, cb) => {
  //         cb(null, './src/img/');
  //       },
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() file, @Res() res: Response) {
  //   console.log('file :>> ', file);

  // res.download(file.path, (err) => {
  //   console.log('err :>> ', err);
  // });
  // fs.writeFileSync(`./img/1.png`, file.buffer);

  //   return {
  //     data: {},
  //   };
  // }
}
