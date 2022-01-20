import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@tags/middlewares/AuthMiddleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from '@tags/tags.module';
const configs = require('./configs/config');

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot( configs ),
    ArticlesModule,
    TagsModule,
    JwtModule.register({
      secret: 'tontonlaforce2000',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '1d'
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure( consumer: MiddlewareConsumer ){
    consumer.apply( AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }

}
