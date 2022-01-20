import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@models/article.entity';
import { ArticlesService } from '@services/articles.service';
import { ArticlesRepositories } from '@repositories/articles.repositories';
import { UserRepository } from '@repositories/user.repository';
import { AuthModule } from '@tags/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticlesRepositories, UserRepository ]),
    AuthModule
  ],
  controllers: [ArticlesController],
  providers: [ ArticlesService, ]
})
export class ArticlesModule {}
