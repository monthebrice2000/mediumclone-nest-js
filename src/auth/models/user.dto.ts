import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username?: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
