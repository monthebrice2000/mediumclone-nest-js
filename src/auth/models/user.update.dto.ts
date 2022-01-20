import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  bio: string;

  @IsNotEmpty()
  image: string;


}
