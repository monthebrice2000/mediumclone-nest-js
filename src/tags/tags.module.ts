import { Module } from '@nestjs/common';
import { TagsController } from '@tags/tags.controller';
import { TagsService } from '@services/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepository } from '@repositories/tags.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagsRepository])
  ],
  controllers: [
    TagsController,
  ],
  providers: [TagsService]
})
export class TagsModule {}
