import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { tgaStatus } from 'src/constants/user';
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
      id: id,
      ...updateTagDto,
    });

    if (!tag) {
      throw new NotFoundException(`Tag ${id} not found`);
    }
    return this.tagRepository.save(tag);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { pageNo = 1, pageSize = 10 } = paginationQuery;

    return this.tagRepository.query(
      `SELECT * FORM "public"."tga" WHERE "status" !== '${
        tgaStatus.Deleted
      }' order by id limit ${pageSize} OFFSET ${(pageNo - 1) * pageSize}`,
    );
  }

  async findOne(id: number) {
    const tga = await this.tagRepository.findOne(id);

    if (!tga) {
      throw new NotFoundException(`Tga ${id} not found`);
    }
    return tga;
  }

  async delete(id: number) {
    const tga = await this.findOne(id);

    tga.status = tgaStatus.Deleted;
    return this.tagRepository.save(tga);
  }
}
