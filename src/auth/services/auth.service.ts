import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@models/user.interface';
import { UserEntity } from '@models/user.entity';
import { UserRepository } from '@repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
  }

  async createUser(user: User): Promise<User>{
    const newUser = await this.userRepository.createUser( user );
    return {
      ...newUser,
      token : await this.jwtService.signAsync( { ...newUser } )
    }
  }

  async login( user: User ){
    const userFind : User = await this.userRepository.login( user );
    //console.log( userFind );
    if( !userFind ){
      throw new NotFoundException("User Not Found ");
    }

    if(
      userFind &&
      userFind.email === user.email && (
        await bcrypt.compare( user.password, userFind.password ) || user.password === userFind.password
      )){
      return {
        ...userFind,
        token : await this.jwtService.signAsync( { ...userFind } )
      };
    }else{
      throw new NotFoundException("User Password incorrect");
    }
  }

  async updateUser( user: User ){
    const userUpdated  = await this.userRepository.updateUser( user );
    //console.log( userFind );
    if( !userUpdated ){
      throw new NotFoundException("User Not Updated ");
    }

    return "User was updated"
  }
}
