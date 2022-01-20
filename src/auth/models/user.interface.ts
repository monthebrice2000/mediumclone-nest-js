import { UserEntity } from '@models/user.entity';

export interface User {
  username?: string;
  email?: string;
  password?: string;
  id?: number;
  token?: string;
  image?: string;
  bio?: string;
//  user?: UserEntity & { token: string } ;
}
