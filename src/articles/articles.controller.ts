import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Article } from '@models/article.interface';
import { AuthGuard } from '@middlewares/middlewares';
import { User } from '@models/user.interface';
import { UserDecorator } from '@middlewares/user.decorator';
import { ArticlesService } from '@services/articles.service';
import { ArticleEntity } from '@models/article.entity';
import { CreateArticleDto } from '@models/create-article-dto';


@Controller('articles')
export class ArticlesController {


  constructor(
    private readonly articlesService: ArticlesService
  ){}

  @Post()
  @UseGuards( AuthGuard )
  //@UsePipes( new ValidationPipe() )
  async createArticle(
    @UserDecorator() user: User,
    @Body('article') article: CreateArticleDto): Promise<{ article: ArticleEntity }>{
    return {
      article : await this.articlesService.createArticle( { author: user, ...article } )
    }
  }

  @Get('/:slug')
  //@UsePipes( new ValidationPipe() )
  async findArticleBySlug(
    @UserDecorator() user: User,
    @Param('slug') slug: string): Promise<{ article : Article } >{
    return {
      article : await this.articlesService.findArticleBySlug( slug )
    };
  }

  @Delete('/:slug')
  @UseGuards( AuthGuard )
  //@UsePipes( new ValidationPipe() )
  async deleteArticle(
    @UserDecorator() user: User,
    @Query() article: Article): Promise<{articles:Article[], articlesCount: number}>{
    return {
      ...await this.articlesService.findAll( article )
    };
  }

  @Post('/:slug/like')
  @UseGuards( AuthGuard )
  //@UsePipes( new ValidationPipe() )
  async likeArticle(
    @UserDecorator() user: User,
    @Param( 'slug' ) slug: string): Promise<ArticleEntity>{
    return await this.articlesService.likeArticle( { author: user, slug })
  }

  @Delete('/:slug/like')
  @UseGuards( AuthGuard )
  //@UsePipes( new ValidationPipe() )
  async dislikeArticle(
    @UserDecorator() user: User,
    @Param( 'slug' ) slug: string): Promise<ArticleEntity>{
    return await this.articlesService.dislikeArticle( { author: user, slug })
  }
}
