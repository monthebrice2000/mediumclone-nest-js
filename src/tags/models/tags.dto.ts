import { IsNotEmpty } from 'class-validator';

export class TagsDto {
  @IsNotEmpty()
  name: string;
}
