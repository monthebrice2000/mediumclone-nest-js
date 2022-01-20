import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { User } from '@models/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

  async createUser( user: User): Promise<User>{
    try{
      const { username, email, password } = user;
      let newUser = await this.create({ email, password, username })
      console.log( newUser );

      return await this.save( newUser );
    }catch( err ){
      console.log( err );
      if( err.code === '23505' ){
        if( err.detail.includes('email') ){
          throw new ConflictException( "Email already exists" );
        }else{
          throw new ConflictException( "Username already exists" );
        }

      }else{
        throw new ConflictException( err.message );
      }

    }
  }

  async login( user: User ) : Promise<User>{
    try{
      const { email } = user;
      return await this.findOne( { email } );
    }catch( err ){
      if( err.code === '23505' ){
        if( err.detail.includes('email') ){
          throw new ConflictException( "Email already exists" );
        }else{
          throw new ConflictException( "Username already exists" );
        }

      }else{
        throw new ConflictException( err.message );
      }
    }
  }

  async updateUser( user: User ) : Promise<UpdateResult>{
    try{
      const { email, bio, image } = user;
      const userToUpdate : UserEntity = await this.findOne({email});
      console.log(userToUpdate)
      userToUpdate.email = email;
      userToUpdate.bio = bio;
      userToUpdate.image = image;
      console.log(userToUpdate)
      return await this.update( {email}, userToUpdate);
    }catch( err ){
      if( err.code === '23505' ){
        if( err.detail.includes('email') ){
          throw new ConflictException( "Email already exists" );
        }
      }else{
        throw new ConflictException( err.message );
      }
    }
  }

}
