import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@models/user.entity';
import { UserRepository } from '@repositories/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from '@tags/middlewares/AuthMiddleware';
import { AuthGuard } from '@tags/middlewares/middlewares';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'tontonlaforce2000',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '1d'
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [  ]
})
export class AuthModule {}
