import { User } from '@models/user.interface';

export interface Author {

  user: User;
  following: boolean;

}
