import { EntityRepository, Repository } from 'typeorm';
import { TagEntity } from '@models/tag.entity';


@EntityRepository(TagEntity)
export class TagsRepository extends Repository<TagEntity>{


}
