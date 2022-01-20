import { Controller, Get } from '@nestjs/common';
import { TagsService } from '@services/tags.service';


@Controller('tags')
export class TagsController {

  constructor(
    private readonly tagsService: TagsService
  ){

  }

  @Get()
  async getAllTags() {
    const tags = await this.tagsService.getTags();
    return {
      tags
    }
  }

}
