import { User } from '@models/user.interface';

export interface Article {

  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  favoritesCount?: number;
  author?: User;
  limit?: number;
  offset?: number;
  tag?:string;


}
