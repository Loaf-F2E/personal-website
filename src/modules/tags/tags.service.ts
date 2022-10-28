import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { tagStatus } from 'src/constants/user';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entitles/tag.entity';
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create({ ...createTagDto });

    return this.tagRepository.save(tag);
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.preload({
      tagId: id,
      ...updateTagDto,
    });

    if (!tag) {
      return {
        code: -1,
        message: '标签不存在！',
      };
    }
    return this.tagRepository.save(tag);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { pageNo = 1, pageSize = 10 } = paginationQuery;
    const allTags = await this.tagRepository.query(
      `SELECT * FROM "public"."tag" WHERE "status" != '${
        tagStatus.Deleted
      }' order by tag_id limit ${pageSize} OFFSET ${(pageNo - 1) * pageSize}`,
    );

    return {
      data: allTags,
      message: '获取成功',
    };
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne(id);

    if (!tag) {
      return {
        code: -1,
        message: '标签不存在！',
      };
    }
    return {
      data: tag,
      message: '获取成功',
    };
  }

  async delete(id: number) {
    const tag = await this.tagRepository.findOne(id);

    tag.status = tagStatus.Deleted;
    await this.tagRepository.save(tag);
    return {
      data: {},
      message: '删除成功',
    };
  }
}
