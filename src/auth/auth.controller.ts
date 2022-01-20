import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.interface';
import { UserDto } from '@models/user.dto';
import { UserLoginDto } from '@models/user.login.dto';
import { ExpressRequest } from '@models/ExpressRequest';
import { UserDecorator } from './middlewares/user.decorator';
import { AuthGuard } from '@tags/middlewares/middlewares';
import { UserUpdateDto } from '@models/user.update.dto';

@Controller('auth')
export class AuthController {


  constructor(
    private authService: AuthService
  ){

  }

  @Post('users')
  async createUser(@Body('users') userDto: UserDto): Promise<{  user: User }>{
    const newUser : User = await this.authService.createUser( userDto );
    return {
      user : newUser,
    };
  }

  @Post( 'users/login')
  async login( @Body('user') UserLoginDto : UserLoginDto ) : Promise<{ user: User}>{
    return {
      user: await this.authService.login( UserLoginDto )
    };
  }

  @Get( 'user')
  @UseGuards( AuthGuard )
  async currentUser(
    @UserDecorator() user
    ) : Promise<{ user: User}>{
    return {
      user: await this.authService.login( user )
    };
  }

  @Patch( 'user')
  @UseGuards( AuthGuard )
  async updateUser(
    @Body('user') userDto: UserUpdateDto
  ) : Promise<{ message: string}>{
    console.log(userDto)
    return {
      message : await this.authService.updateUser( userDto )
    };
  }


}
