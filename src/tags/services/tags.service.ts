import { Injectable } from '@nestjs/common';
import { TagsRepository } from '@repositories/tags.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '@models/tag.interface';

@Injectable()
export class TagsService {
  
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository
  ){

  }

  async getTags(): Promise<Tag[]> {
    return await this.tagsRepository.find({ take: 20 });
  }

}
